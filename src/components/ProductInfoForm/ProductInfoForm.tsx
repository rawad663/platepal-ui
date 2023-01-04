import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  CircularProgress,
  InputAdornment,
  Paper,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import { useMediaQueries } from '@pdg/hooks/useMediaQueries';
import { usePdgApi } from '@pdg/hooks/usePdgApi';
import { IProductDescription, ProductInfoInput, Tone } from '@pdg/types/product-descriptions';
import { darkTheme } from '@pdg/utils/theme';
import { Controller } from 'react-hook-form';

import { RangeSelector } from './RangeSelector';
import { ToneSelector } from './ToneSelector';
import { ProductInput, useProductInfoForm } from './useProductInfoForm';

export type Props = {
  sx?: SxProps;
  isLoading: boolean;
  setDescriptions: (descriptions: IProductDescription[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  onSubmit?: () => void;
};

export const ProductInfoForm = ({ sx, isLoading, setDescriptions, setIsLoading, onSubmit }: Props) => {
  const instance = usePdgApi();
  const { inputs, control, states, validate, formState } = useProductInfoForm();
  const { isMobile } = useMediaQueries();

  const handleSubmit = validate(async ({ name, description, audience, guarantee }) => {
    if (Object.keys(formState.errors).length > 0) return;

    const body: ProductInfoInput = {
      name,
      description,
      features: states.features,
      audience,
      guarantee,
      tone: states.activeTone,
      wordCount: states.activeCount,
    };

    setIsLoading(true);

    try {
      const { data } = await instance.post<IProductDescription[]>('/descriptions/create', body);
      setDescriptions(data);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
      onSubmit && onSubmit();
    }
  });

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
                color="primary"
                helperText={error?.message ?? inputHint}
                inputProps={{
                  ...field,
                }}
                InputProps={{
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
    <Paper sx={{ ...sx, backgroundColor: 'lightBackground.main' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Describe your product
      </Typography>

      {[inputs.name, inputs.description].map(renderInput)}

      <Accordion
        disableGutters
        elevation={0}
        defaultExpanded={!isMobile}
        sx={{ mb: 3, backgroundColor: 'lightBackground.main' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Additional Information (Recommended)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {[inputs.tone, inputs.wordCount, inputs.features, inputs.audience].map(renderInput)}
        </AccordionDetails>
      </Accordion>

      <Button
        sx={{ mb: 2 }}
        fullWidth
        disabled={!!Object.keys(formState.errors).length || isLoading}
        variant="contained"
        onClick={() => handleSubmit()}
        color="primary"
      >
        {isLoading ? <CircularProgress color="secondary" /> : 'Generate'}
      </Button>
    </Paper>
  );
};
