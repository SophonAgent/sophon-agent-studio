export const DEFAULT_PARAMETER = {
  type: 'object',
  required: ['location', 'format'],
  properties: {
    format: {
      enum: ['celsius', 'fahrenheit'],
      type: 'string',
      description: 'The temperature unit to use. Infer this from the users location.',
    },
    location: {
      type: 'string',
      description: 'The city and state',
    },
  },
};
