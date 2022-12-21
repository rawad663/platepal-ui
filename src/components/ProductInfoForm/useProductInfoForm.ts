import { ProductInfoInput } from '@pdg/types/product-descriptions';
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';

export type ProductInput = {
  name: string;
  value?: string;
  values?: string[];
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onDelete?: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  hint?: string;
};

export const useProductInfoForm = () => {
  const [values, setValues] = useState<ProductInfoInput>({
    name: '',
    description: '',
    features: [],
    audience: '',
    guarantee: '',
    userNeed: '',
  });
  const [currentFeature, setCurrentFeature] = useState<string>('');

  const setValue = (field: keyof ProductInfoInput, newValue: any) => setValues({ ...values, [field]: newValue });

  // const validate = (field, isValid) => {};

  const inputs: Record<keyof ProductInfoInput, ProductInput> = {
    name: {
      name: 'name',
      value: values.name,
      onChange: ({ currentTarget }) => setValue('name', currentTarget.value),
      label: 'Product name',
      placeholder: 'ex: Funky Monkey',
    },
    description: {
      name: 'description',
      value: values.description,
      onChange: ({ currentTarget }) => setValue('description', currentTarget.value),
      label: 'Product description',
      multiline: true,
    },
    features: {
      name: 'features',
      value: currentFeature,
      values: values.features,
      onChange: ({ currentTarget }) => setCurrentFeature(currentTarget.value),
      onKeyDown: ({ key, currentTarget }) => {
        const trimmed = currentTarget.value.trim();
        if (key === 'Enter' || (key === ' ' && trimmed)) {
          setValue('features', [...values.features, trimmed]);
          setCurrentFeature('');
        }
        if (key === 'Backspace' && !currentTarget.value && values.features.length > 0) {
          setValue('features', values.features.splice(0, values.features.length - 1));
        }
      },
      onDelete: (value) => {
        setValue(
          'features',
          values.features.filter((feature) => value !== feature),
        );
      },
      label: 'Features',
      placeholder: 'ex: Funky Monkey',
    },
    audience: {
      name: 'audience',
      value: values.audience,
      onChange: ({ currentTarget }) => setValue('audience', currentTarget.value),
      label: 'Audience',
      hint: 'ex: Babies, Business person, Graphic designer',
    },
    guarantee: {
      name: 'guarantee',
      value: values.guarantee,
      onChange: ({ currentTarget }) => setValue('guarantee', currentTarget.value),
      label: 'Guarantee',
      hint: 'ex: 30 day guarantee, 50% off',
    },
    userNeed: {
      name: 'userNeed',
      value: values.userNeed,
      onChange: ({ currentTarget }) => setValue('userNeed', currentTarget.value),
      label: 'User need',
    },
  };

  return {
    values,
    inputs,
    errors: [],
    setValue,
  };
};
