import type {
  ChatCompletionRequestParams,
  ConversationItem,
  ConversationListRequestParams,
  SimpleConversationItem,
  ToolCallItem,
  UpdateConversationRequestParams,
} from '@/interface/chat';
import type { PageInfo } from '@/interface/base';

import request from './request';
import { RoleEnum } from '@/interface/chat';
import { getUuid } from '@/utils/uuid';
import { isJSON, tranJsonToObject } from '@/utils/json';
import dayjs from 'dayjs';

function hasChunk(buffer: string) {
  return buffer.includes('\n\n');
}

/**
 * 模型对话接口
 */
export async function* createChatCompletion(
  params: ChatCompletionRequestParams,
  abortController?: AbortController,
) {
  const sseStartTime = new Date().getTime();
  const { messages, modelConfig, stream, tools } = params;

  try {
    const headers = stream ? { Accept: 'text/event-stream' } : undefined;
    const res = await fetch('/api/v1/chat/completions', {
      headers,
      method: 'POST',
      signal: abortController?.signal,
      body: JSON.stringify({
        ...modelConfig,
        stream,
        messages,
        cache: false,
        tools,
      }),
    });

    if (!res.body) {
      throw new Error('The response body is empty.');
    }
    if (!res.ok) {
      throw new Error((await res.text()) || 'Failed to fetch the chat response.');
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let result = '';
    const msgObj = {};

    while (true) {
      const { value, done } = await reader.read();
      const sseEndTime = new Date().getTime();
      const costTime = sseEndTime - sseStartTime;
      if (done) {
        break;
      }
      const chunk = decoder.decode(value);
      result += chunk;

      if (!stream) {
        // 非流式
        const chunkObj = tranJsonToObject(chunk);
        if (chunkObj.error || (chunkObj.status && chunkObj.status !== '200')) {
          throw new Error(chunkObj?.error?.message || `${chunkObj.message} status: ${chunkObj.status}`);
        }
        const { choices = [], id, logId, usage = {} } = chunkObj || {};
        yield {
          id: logId || id,
          logId,
          content: choices[0]?.message?.content,
          role: RoleEnum.ASSISTANT,
          costTime,
          tool_calls: choices?.[0]?.message?.tool_calls,
          ...usage,
        };
      } else if (hasChunk(result)) {
        // 流式
        const lastSplitIndex = result.lastIndexOf('\n\n');
        const chunks = result
          .slice(0, lastSplitIndex)
          .split('\n\n')
          .map(chunk => {
            if (chunk.startsWith('data:data:')) {
              return chunk.substring(10).trim();
            }
            throw new Error(`Unexpected chunk found: ${chunk}`);
          });
        const content: string[] = [];
        const reasoningContent: string[] = [];
        const toolCallList: ToolCallItem[] = [];
        chunks.forEach(chunk => {
          if (isJSON(chunk)) {
            const chunkObj = tranJsonToObject(chunk);
            if (chunkObj.error || (chunkObj.status && chunkObj.status !== '200')) {
              throw new Error(chunkObj?.error?.message || `${chunkObj.message} status: ${chunkObj.status}`);
            }
            const { choices = [], id, logId, usage = {} } = chunkObj || {};
            const realId = logId || id || getUuid(5);
            Object.assign(msgObj, { id: realId, logId, ...usage });
            // 回复内容
            const c = choices[0]?.delta?.content || '';
            content.push(c);
            // 思考内容
            const rc = choices[0]?.delta?.reasoning_content || '';
            reasoningContent.push(rc);
            // 工具项
            const tcs = choices[0]?.delta?.tool_calls || [];
            tcs.forEach((tc: any) => {
              // id可能不存在，index存在，以index为准
              if (tc.index === undefined) return;

              // 工具不存在，直接添加
              if (!toolCallList[tc.index]) {
                const toolCall: ToolCallItem = {
                  id: tc.id || `custom_call_id_${getUuid(24)}`,
                  index: tc.index,
                  type: 'function',
                  function: { name: tc.function.name, arguments: tc.function.arguments || '' },
                };
                const idx = toolCallList.findIndex(item => item.id === id);
                if (idx === -1) {
                  // 当前 tool call 没有出现过
                  toolCallList.push(toolCall);
                } else {
                  toolCallList[idx] = toolCall;
                }
                return;
              }

              // 工具存在，拼接arguments
              if (toolCallList[tc.index]) {
                toolCallList[tc.index].function.arguments += tc.function.arguments || '';
                return;
              }
            });
            // console.log('chunkObj>>>', chunkObj);
          }
        });
        yield {
          ...msgObj,
          content: content.join(''),
          reasoningContent: reasoningContent.join(''),
          role: RoleEnum.ASSISTANT,
          costTime,
          tool_calls: toolCallList.length ? toolCallList : undefined,
        };
      } else if (tranJsonToObject(chunk)?.success === false) {
        throw new Error(tranJsonToObject(chunk).message);
      }
    }
  } catch (err) {
    if ((err as any).name === 'AbortError') {
      return null;
    }
    yield { id: getUuid(5), role: RoleEnum.ERROR, content: String(err) };
  }
}

export default {
  /**
   * 对话记录列表
   */
  async getConversationList(params?: ConversationListRequestParams) {
    const { pageNum = 1, pageSize = 10 } = params || {};
    const queryString = new URLSearchParams({
      ...params,
      pageNum: String(pageNum),
      pageSize: String(pageSize),
    }).toString();
    return await request.get<{ datas: SimpleConversationItem[]; pageInfo: PageInfo }>(
      `/playground-chat-records/listChatRecords?${queryString}`,
    );
  },
  /**
   * 根据 sessionId 查询对话记录
   */
  async getConversationBySessionId(sessionId: string, userId: string) {
    return await request.get<ConversationItem>(
      `/playground-chat-records/queryChatRecordBySessionId?sessionId=${sessionId}&userId=${userId}`,
    );
  },
  /**
   * 删除对话记录
   */
  async deleteConversation(sessionId: string, userId: string) {
    return await request.post<boolean>(
      `/playground-chat-records/removeChatRecord?sessionId=${sessionId}&userId=${userId}`,
    );
  },
  /**
   * 清空对话记录
   */
  async clearAllConversation(userId: string) {
    const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    return await request.post(`/playground-chat-records/clearChatRecords?userId=${userId}&date=${date}`);
  },
  /**
   * 保存对话记录
   */
  async saveConversation(params: ConversationItem) {
    return await request.post<number>('/playground-chat-records/saveChatRecord', params);
  },
  /**
   * 更新对话记录
   */
  async updateConversation(params: UpdateConversationRequestParams) {
    return await request.post<boolean>('/playground-chat-records/updateSimpleInfo', params);
  },
};
