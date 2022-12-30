import { Button, Chip, Divider, InputAdornment, Paper, SxProps, TextField, Typography } from '@mui/material';
import { ProductInfoInput, Tone } from '@pdg/types/product-descriptions';
import { Control, Controller, FormState } from 'react-hook-form';

import { RangeSelector } from './RangeSelector';
import { ToneSelector } from './ToneSelector';
import { FormFields, ProductInput } from './useProductInfoForm';

type Props = {
  sx?: SxProps;
  inputs: Record<keyof ProductInfoInput, ProductInput>;
  formState: FormState<FormFields>;
  control: Control<FormFields>;
  isLoading: boolean;
  onSubmit: () => Promise<void>;
};

export const ProductInfoForm = ({ sx, inputs, formState, control, onSubmit, isLoading }: Props) => {
  const renderInput = ({ onDelete, onKeyDown, hint: inputHint, state, rules, ...input }: ProductInput) => {
    let inputComponent: React.ReactNode = null;
    switch (input.name) {
      case 'tone': {
        inputComponent = <ToneSelector activeTone={state[0] as Tone} setActiveTone={state[1]} />;
        break;
      }
      case 'wordCount': {
        inputComponent = <RangeSelector activeCount={state[0] as number} setActiveCount={state[1]} />;
        break;
      }
      default: {
        inputComponent = null;
        break;
      }
    }

    return (
      <Controller
        key={input.name}
        name={input.name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            {inputComponent ?? (
              <TextField
                sx={{ mb: 2 }}
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
            )}
          </>
        )}
      />
    );
  };

  return (
    <Paper elevation={1} sx={sx}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Describe your product
      </Typography>

      {[inputs.name, inputs.description].map(renderInput)}

      <Divider sx={{ mt: 1, mb: 2 }} />

      <Typography sx={{ mb: 1 }}>Additional Information (Recommended)</Typography>

      {[inputs.tone, inputs.wordCount, inputs.features, inputs.audience].map(renderInput)}

      <Button
        fullWidth
        disabled={!!Object.keys(formState.errors).length || isLoading}
        variant="contained"
        onClick={() => onSubmit()}
        color="primary"
      >
        Generate
      </Button>
    </Paper>
  );
};
