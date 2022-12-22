import {
  Box,
  Button,
  Chip,
  InputAdornment,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { ProductInfoInput, Tone } from '@pdg/types/product-descriptions';
import { useState } from 'react';
import { Control, Controller, FormState } from 'react-hook-form';

import { styles } from './ProductInfoForm.styles';
import { ToneSelector } from './ToneSelector';
import { FormFields, ProductInput } from './useProductInfoForm';

type Step = {
  name: string;
  inputs: ProductInput[];
  description: string;
  hint?: string;
  onNext?: () => void;
};

type Props = {
  sx?: SxProps;
  inputs: Record<keyof ProductInfoInput, ProductInput>;
  formState: FormState<FormFields>;
  control: Control<FormFields>;
  onSubmit: () => Promise<void>;
  validate: (f: () => void) => () => void;
};

export const ProductInfoForm = ({ sx, inputs, formState, control, onSubmit, validate }: Props) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: Step[] = [
    {
      name: 'name',
      inputs: [inputs.name],
      description: 'What is the name of your product?',
      hint: '',
    },
    {
      name: 'description',
      inputs: [inputs.description],
      description: 'Give a short description of your product.',
      hint: 'A sentence or two should suffice',
    },
    {
      name: 'additionalInfo',
      inputs: [inputs.tone, inputs.features, inputs.audience, inputs.guarantee],
      description: 'Additional information (Recommended)',
      hint: 'Fill in as many of these fields to create a more relevant description.',
    },
  ];

  const handleNext = validate(() => {
    if (activeStep < steps.length - 1) {
      setActiveStep((activeStep) => activeStep + 1);
    } else {
      onSubmit();
    }
  });

  const handleBack = () => {
    if (activeStep === 0) {
      return;
    }

    setActiveStep((activeStep) => activeStep - 1);
  };

  const renderStep = ({ name, inputs, hint, description }: Step, index: number) => {
    const answer = control._formValues[name];

    return (
      <Step sx={styles.root} key={name}>
        <StepLabel optional={(answer || hint) && <Typography variant="caption">{answer || hint}</Typography>}>
          {description}
        </StepLabel>
        <StepContent>
          {inputs.map(({ onDelete, onKeyDown, hint: inputHint, state, rules, ...input }) => (
            <Controller
              key={input.name}
              name={input.name}
              control={control}
              rules={rules}
              render={({ field, fieldState: { error } }) =>
                input.name === 'tone' ? (
                  <ToneSelector activeTone={state[0] as Tone} setActiveTone={state[1]} />
                ) : (
                  <TextField
                    sx={{ mb: 1 }}
                    variant="filled"
                    fullWidth
                    {...input}
                    rows={3}
                    required={!!rules?.required}
                    error={!!error}
                    color="secondary"
                    helperText={error?.message ?? inputHint}
                    inputProps={{
                      ...field,
                    }}
                    InputProps={{
                      sx: { color: 'common.white' },
                      onKeyDown: onKeyDown,
                      startAdornment:
                        input.name === 'features'
                          ? (state as string[]).map((val, i) => (
                              <InputAdornment key={i} position="start">
                                <Chip
                                  size="small"
                                  color="secondary"
                                  variant="filled"
                                  label={val}
                                  onDelete={() => onDelete && onDelete(i)}
                                />
                              </InputAdornment>
                            ))
                          : null,
                    }}
                  />
                )
              }
            />
          ))}

          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                disabled={!!formState.errors[steps[activeStep].name as keyof FormFields]}
                variant="contained"
                onClick={() => handleNext()}
                sx={{ mt: 1, mr: 1 }}
              >
                {index === steps.length - 1 ? 'Finish' : 'Continue'}
              </Button>
              <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1, color: grey[900] }}>
                Back
              </Button>
            </div>
          </Box>
        </StepContent>
      </Step>
    );
  };

  return (
    <Box py={2} sx={sx}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map(renderStep)}
      </Stepper>
    </Box>
  );
};
