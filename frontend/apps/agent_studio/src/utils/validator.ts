import { handleJsonParse, isJSON, isValidJSONata, validateJsonSchema } from './json';

export const RequiredValidator = (t: any) => [
  {
    validator: (_: any, value: any) => {
      if (value === undefined || value === null) {
        return Promise.reject(t('MESSAGE_12'));
      } else if (typeof value === 'string' && !value?.trim()) {
        return Promise.reject(t('MESSAGE_12'));
      }
      return Promise.resolve();
    },
  },
];

export const JsonValidator = (t: any) => [
  {
    validator: (_: any, value: any) => {
      if (value && !isJSON(value)) {
        return Promise.reject(t('MESSAGE_13'));
      }
      return Promise.resolve();
    },
  },
];

export const LowerCasePathValidator = (t: any) => [
  {
    validator: (_: any, value: any) => {
      if (!/^[a-z][a-z0-9_/-]*$/.test(value)) {
        return Promise.reject(t('MESSAGE_14'));
      }
      return Promise.resolve();
    },
  },
];

export const AlphanumericWithDashesValidator = (t: any) => [
  {
    validator: (_: any, value: any) => {
      if (!/^[a-zA-Z0-9_-]*$/.test(value)) {
        return Promise.reject(t('MESSAGE_15'));
      }
      return Promise.resolve();
    },
  },
];

export const JsonSchemaValidator = (t: any) => [
  {
    validator: (_: any, value: any) => {
      if (value && !isJSON(value)) {
        return Promise.reject(t('MESSAGE_13'));
      }
      const schema = handleJsonParse(value);
      const info = validateJsonSchema(schema, t);
      if (info) {
        return Promise.reject(info);
      }
      return Promise.resolve();
    },
  },
];

export const JSONataValidator = (t: any) => [
  {
    validator: (_: any, value: any) => {
      if (!value) {
        return Promise.resolve();
      }
      if (!isValidJSONata(value)) {
        return Promise.reject(t('MESSAGE_16'));
      }
      return Promise.resolve();
    },
  },
];
