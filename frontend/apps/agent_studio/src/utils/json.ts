import type { JSONSchema7 } from 'json-schema';

import jsonata from 'jsonata';
import { isEmpty } from 'lodash-es';

function isNotEmpty(val: any) {
  return val !== null && val !== '' && val !== undefined;
}

export function isJSON(str?: any) {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str);
      if (obj && typeof obj === 'object') {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}

export function tranJsonToArray(str?: any) {
  let res: any = [];

  if (typeof str === 'string' && isJSON(str)) {
    res = JSON.parse(str);
  } else {
    res = str;
  }

  if (Array.isArray(res)) {
    return res;
  }

  return [];
}

export function tranJsonToObject(str?: any) {
  let res: any = {};

  if (typeof str === 'string' && isJSON(str)) {
    res = JSON.parse(str);
  } else {
    res = str;
  }

  if (typeof res === 'object' && !isEmpty(res)) {
    return res;
  }

  return {};
}

export function handleJsonParse(str?: any) {
  if (isJSON(str)) {
    return JSON.parse(str);
  } else {
    return str;
  }
}

export function arrayToObject(arr: any[]) {
  return arr.reduce((acc, item) => {
    // 检查key和value都不为null/undefined/空字符串，但允许0和false
    if (isNotEmpty(item.key) && isNotEmpty(item.value)) {
      acc[item.key] = item.value;
    }
    return acc;
  }, {});
}

export function objectToArray(obj: Record<string, any>) {
  return Object.entries(obj)
    .filter(([key, value]) => isNotEmpty(key) && isNotEmpty(value))
    .map(([key, value]) => ({
      key,
      value,
    }));
}

// 校验对象是否符合 JSONSchema7 类型
export function validateJsonSchema(schema: JSONSchema7, t: any): string | null {
  // 校验 schema 是否是一个对象
  if (typeof schema !== 'object' || schema === null) {
    return t('MESSAGE_17');
  }

  // 校验 type 属性是否是字符串
  if (schema.type && typeof schema.type !== 'string') {
    return t('MESSAGE_18');
  }

  // 校验 properties 属性是否是一个对象
  if (schema.properties) {
    if (typeof schema.properties !== 'object' || schema.properties === null) {
      return t('MESSAGE_19');
    }

    // 遍历 properties 的每个键值对，递归校验子属性是否符合 JSONSchema7 类型
    for (const key in schema.properties) {
      const property = schema.properties[key];
      // 检查是否为 boolean 类型
      if (typeof property === 'boolean') {
        continue; // boolean 类型的 schema 定义是合法的
      }
      // 当做 JSONSchema7 处理
      const info = validateJsonSchema(property, t);
      if (info) {
        return info;
      }
    }
  }

  // 校验 required 属性是否是字符串数组
  if (schema.required) {
    if (!Array.isArray(schema.required) || !schema.required.every(item => typeof item === 'string')) {
      return t('MESSAGE_20');
    }
  }

  // 校验 description 属性是否是字符串
  if (schema.description && typeof schema.description !== 'string') {
    return t('MESSAGE_21');
  }

  // 如果所有校验都通过，返回 null
  return null;
}

export function isValidJSONata(str?: string): boolean {
  if (!str) return false;
  try {
    // 尝试解析 JSONata 表达式
    jsonata(str);
    return true; // 如果解析成功，返回 true
  } catch (error) {
    return false; // 如果解析失败，返回 false
  }
}
