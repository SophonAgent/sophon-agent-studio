import { handleJsonParse, isJSON, isValidJSONata, validateJsonSchema } from './json';

export const RequiredValidator = [
  {
    validator: (_: any, value: any) => {
      if (value === undefined || value === null) {
        return Promise.reject('必填');
      } else if (typeof value === 'string' && !value?.trim()) {
        return Promise.reject('必填');
      }
      return Promise.resolve();
    },
  },
];

export const JsonValidator = [
  {
    validator: (_: any, value: any) => {
      if (value && !isJSON(value)) {
        return Promise.reject('请填写符合 JSON 格式内容');
      }
      return Promise.resolve();
    },
  },
];

export const LowerCasePathValidator = [
  {
    validator: (_: any, value: any) => {
      if (!/^[a-z][a-z0-9_/-]*$/.test(value)) {
        return Promise.reject('只能包含小写字母、数字、"_"、"-"、和"/"，并且只能以小写字母开头');
      }
      return Promise.resolve();
    },
  },
];

export const AlphanumericWithDashesValidator = [
  {
    validator: (_: any, value: any) => {
      if (!/^[a-zA-Z0-9_-]*$/.test(value)) {
        return Promise.reject('输入只能包含英文、数字、下划线_、中划线-');
      }
      return Promise.resolve();
    },
  },
];

export const JsonSchemaValidator = [
  {
    validator: (_: any, value: any) => {
      if (value && !isJSON(value)) {
        return Promise.reject('请填写符合 JSON 格式内容');
      }
      const schema = handleJsonParse(value);
      const info = validateJsonSchema(schema);
      if (info) {
        return Promise.reject(info);
      }
      return Promise.resolve();
    },
  },
];

export const JSONataValidator = [
  {
    validator: (_: any, value: any) => {
      if (!value) {
        return Promise.resolve();
      }
      if (!isValidJSONata(value)) {
        return Promise.reject('请填写符合 JSONata 格式内容');
      }
      return Promise.resolve();
    },
  },
];
