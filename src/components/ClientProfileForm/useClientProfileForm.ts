import { KeyboardEventHandler, useState } from 'react';
import { useForm, ValidationRule } from 'react-hook-form';

import { validationErrors } from '@/declarations/fieldValidation';
import { ActivityLevel, ClientProfileInput, FitnessGoal } from '@/types/client-profiles';

export type Input = {
  name: keyof FormFields;
  type?: 'number' | 'options' | 'tags';
  options?: string[];
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
  age: ClientProfileInput['age'];
  height: ClientProfileInput['height'];
  weight: ClientProfileInput['weight'];
  dailyCalorieCount: ClientProfileInput['dailyCalorieCount'];
  dietaryRestriction: string;
  dietaryPreference: string;
  activityLevel?: ClientProfileInput['activityLevel'] | '';
  goal?: ClientProfileInput['goal'];
};

export const useClientProfileForm = () => {
  const defaultValues: FormFields = {
    age: 18,
    height: 1.73,
    weight: 75,
    dailyCalorieCount: 2000,
    dietaryPreference: '',
    dietaryRestriction: '',
    activityLevel: '',
    goal: 'maintenance',
  };
  const { control, handleSubmit, setValue, formState } = useForm<FormFields>({ mode: 'all', defaultValues });

  const [dailyCalorieCount, setDailyCalorieCount] = useState<number>(1800);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);

  // const [activityLevel, setActivityLevel] = useState<ClientProfileInput['activityLevel']>('moderate');
  // const [goal, setGoal] = useState<ClientProfileInput['goal']>('weight loss');

  const handleKeyDown =
    (
      state: string[],
      setState: (s: string[]) => void,
      fieldName: keyof FormFields,
    ): KeyboardEventHandler<HTMLInputElement> =>
    ({ key, currentTarget }) => {
      const trimmed = currentTarget.value.trim();
      if (key === 'Enter' || (key === ' ' && trimmed)) {
        setState([...state, trimmed]);
        setValue(fieldName, ''); // updates the field's input value to empty
      }
      if (key === 'Backspace' && !currentTarget.value && state.length > 0) {
        setState(state.splice(0, state.length - 1));
      }
    };

  const inputs: Record<keyof ClientProfileInput, Input> = {
    age: {
      name: 'age',
      type: 'number',
      rules: { required: { value: true, message: validationErrors.required } },
      label: 'Age',
    },
    height: {
      name: 'height',
      type: 'number',
      rules: { required: { value: true, message: validationErrors.required } },
      label: 'Height (meters)',
    },
    weight: {
      name: 'weight',
      type: 'number',
      rules: { required: { value: true, message: validationErrors.required } },
      label: 'Weight (kg)',
    },
    dailyCalorieCount: {
      name: 'dailyCalorieCount',
      state: [dailyCalorieCount, setDailyCalorieCount],
      label: 'Daily calorie consumption',
    },
    dietaryRestrictions: {
      name: 'dietaryRestriction',
      state: dietaryRestrictions,
      type: 'tags',
      label: 'Dietary restrictions',
      placeholder: 'ex: meats, nuts, banana',
      hint: 'Press Enter or Space',
      onKeyDown: handleKeyDown(dietaryRestrictions, setDietaryRestrictions, 'dietaryRestriction'),
      onDelete: (index: number) => {
        setDietaryRestrictions(dietaryRestrictions.filter((_, i) => i !== index));
      },
    },
    dietaryPreferences: {
      name: 'dietaryPreference',
      state: dietaryPreferences,
      type: 'tags',
      label: 'Dietary preferences',
      placeholder: 'ex: chocolate, kiwi, banana',
      hint: 'Press Enter or Space',
      onKeyDown: handleKeyDown(dietaryPreferences, setDietaryPreferences, 'dietaryPreference'),
      onDelete: (index: number) => {
        setDietaryPreferences(dietaryPreferences.filter((_, i) => i !== index));
      },
    },
    activityLevel: {
      name: 'activityLevel',
      label: 'Activity level',
      type: 'options',
      options: ['sedentary', 'light', 'moderate', 'very active', 'extremely active'] as ActivityLevel[],
    },
    goal: {
      name: 'goal',
      label: 'Fitness goal',
      type: 'options',
      options: ['maintenance', 'weight loss', 'muscle gain'] as FitnessGoal[],
    },
  };

  return {
    inputs,
    states: {
      dailyCalorieCount,
      dietaryPreferences,
      dietaryRestrictions,
    },
    setValue,
    formState,
    control,
    validate: handleSubmit,
  };
};
