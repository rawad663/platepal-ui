export const validationErrors = {
  required: 'This field is required',
  minLength: (min: number) => `This field should be at least ${min} characters long`,
  maxLength: (max: number) => `This field should be at most ${max} characters long`,
  maxValues: (max: number) => `This field can hold at most ${max} values`,
  minMaxValues: (min: number, max: number) => `This field can only hold between ${min} and ${max} values`,
};
