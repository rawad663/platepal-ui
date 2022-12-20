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
import { ProductInfoInput } from '@pdg/types/product-descriptions';
import { useState } from 'react';

import { styles } from './ProductInfoForm.styles';
import { ProductInput } from './useProductInfoForm';

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
  onSubmit: () => Promise<void>;
};

export const ProductInfoForm = ({ sx, inputs, onSubmit }: Props) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: Step[] = [
    {
      name: 'productName',
      inputs: [inputs.name],
      description: 'What is your product called?',
      hint: '',
    },
    {
      name: 'productDescription',
      inputs: [inputs.description],
      description: 'How would you describe your product?',
      hint: '',
    },
    {
      name: 'features',
      inputs: [inputs.features],
      description: 'What are some features of your product?',
      hint: '',
    },
    {
      name: 'additionalInfo',
      inputs: [inputs.audience, inputs.guarantee, inputs.userNeed],
      description: 'Additional information (Recommended)',
      hint: 'Fill in as many of these fields to create a more relevant description.',
    },
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((activeStep) => activeStep + 1);
    } else {
      onSubmit();
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      return;
    }

    setActiveStep((activeStep) => activeStep - 1);
  };

  const renderStep = ({ name, inputs, hint, description, onNext }: Step, index: number) => {
    return (
      <Step sx={styles.root} key={name}>
        <StepLabel optional={hint && <Typography variant="caption">{hint}</Typography>}>{description}</StepLabel>
        <StepContent>
          {inputs.map(({ onDelete, ...input }) => (
            <TextField
              key={input.name}
              variant="filled"
              value={input.value}
              fullWidth
              InputProps={{
                sx: { color: 'common.white' },
                onKeyDown: input.onKeyDown,
                startAdornment:
                  input.name === 'features'
                    ? input.values?.map((val) => (
                        <InputAdornment key={val} position="start">
                          <Chip
                            size="small"
                            color="secondary"
                            variant="filled"
                            label={val}
                            onDelete={() => onDelete && onDelete(val)}
                          />
                        </InputAdornment>
                      ))
                    : null,
              }}
              onChange={input.onChange}
              multiline={input.multiline}
              rows={2}
              label={input.label}
              color="secondary"
              placeholder={input.placeholder}
              helperText={input.hint}
            />
          ))}

          <Box sx={{ mb: 2 }}>
            <div>
              <Button variant="contained" onClick={() => handleNext()} sx={{ mt: 1, mr: 1 }}>
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
