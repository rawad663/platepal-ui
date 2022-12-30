import { validationErrors } from '@pdg/declarations/fieldValidation';
import { ProductInfoInput, Tone } from '@pdg/types/product-descriptions';
import { KeyboardEventHandler, useState } from 'react';
import { useForm, ValidationRule } from 'react-hook-form';

export type ProductInput = {
  name: keyof FormFields;
  state?: any;
  label: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onDelete?: (i: number) => void;
  placeholder?: string;
  multiline?: boolean;
  hint?: string;
  rules?: ValidationRule<any>;
};

export type FormFields = {
  name: string;
  description: string;
  features: string;
  guarantee: string;
  audience: string;
  tone: string;
  wordCount: string;
};

export const useProductInfoForm = () => {
  const defaultValues: FormFields = {
    name: '',
    description: '',
    features: '',
    guarantee: '',
    audience: '',
    tone: '',
    wordCount: '',
  };
  const { control, handleSubmit, setValue, formState } = useForm<FormFields>({ mode: 'all', defaultValues });

  const [features, setFeatures] = useState<string[]>([]);
  const [activeTone, setActiveTone] = useState<Tone | undefined>();
  const [activeCount, setActiveCount] = useState<number>(150);

  const inputs: Record<keyof ProductInfoInput, ProductInput> = {
    name: {
      name: 'name',
      rules: { required: { value: true, message: validationErrors.required } },
      label: 'Product name',
      placeholder: 'ex: Funky Monkey',
    },
    description: {
      name: 'description',
      rules: { required: { value: true, message: validationErrors.required } },
      label: 'Product description',
      multiline: true,
    },
    wordCount: {
      name: 'wordCount',
      state: [activeCount, setActiveCount],
      label: 'Word count',
    },
    features: {
      name: 'features',
      state: features,
      label: 'Features',
      placeholder: 'ex: Cute, colorful, entertaining',
      hint: 'Press Enter or Space',
      onKeyDown: ({ key, currentTarget }) => {
        const trimmed = currentTarget.value.trim();
        if (key === 'Enter' || (key === ' ' && trimmed)) {
          setFeatures([...features, trimmed]);
          setValue('features', ''); // updates the field's (called "features") input value
        }
        if (key === 'Backspace' && !currentTarget.value && features.length > 0) {
          setFeatures(features.splice(0, features.length - 1));
        }
      },
      onDelete: (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
      },
    },
    audience: {
      name: 'audience',
      label: 'Audience',
      placeholder: 'ex: Babies, Business person, Graphic designer',
    },
    guarantee: {
      name: 'guarantee',
      label: 'Guarantee',
      placeholder: 'ex: 30 day guarantee, 50% off',
    },
    tone: {
      name: 'tone',
      label: 'Tone of voice',
      state: [activeTone, setActiveTone],
    },
  };

  return {
    inputs,
    states: {
      features,
      activeTone,
      activeCount,
    },
    formState,
    control,
    validate: handleSubmit,
  };
};
