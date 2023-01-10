import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
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
import { Box } from '@mui/system';
import { Controller, ControllerRenderProps } from 'react-hook-form';

import { useMediaQueries } from '@/hooks/useMediaQueries';
import { routes, usePlatePalApi } from '@/hooks/usePlatePalApi';
import { ActivityLevel, ClientProfileInput, FitnessGoal } from '@/types/client-profiles';
import { IMealPlan } from '@/types/meal-plans';
import { capitalizeFirst } from '@/utils/helpers';

import { OptionsSelector } from './OptionsSelector';
import { RangeSelector } from './RangeSelector';
import { FormFields, Input, useClientProfileForm } from './useClientProfileForm';

export type Props = {
  sx?: SxProps;
  isLoading: boolean;
  setMealPlan: (descriptions: IMealPlan) => void;
  setIsLoading: (isLoading: boolean) => void;
  onSubmit?: () => void;
};

export const ClientProfileForm = ({ sx, isLoading, setMealPlan, setIsLoading, onSubmit }: Props) => {
  const instance = usePlatePalApi();
  const { inputs, control, states, validate, formState, setValue } = useClientProfileForm();
  const { isMobile } = useMediaQueries();

  const handleSubmit = validate(async ({ age, height, weight, goal, activityLevel }) => {
    if (Object.keys(formState.errors).length > 0) return;

    const body: ClientProfileInput = {
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      dailyCalorieCount: states.dailyCalorieCount,
      dietaryPreferences: states.dietaryPreferences,
      dietaryRestrictions: states.dietaryRestrictions,
      activityLevel: activityLevel || undefined,
      goal,
    };

    setIsLoading(true);

    try {
      const { data } = await instance.post<IMealPlan>(routes.mealPlans.create, body);
      setMealPlan(data);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
      onSubmit && onSubmit();
    }
  });

  const renderInput = ({ onDelete, onKeyDown, hint: inputHint, options, state, rules, ...input }: Input) => {
    const renderInputComponent = (field: ControllerRenderProps<FormFields, keyof FormFields>) => {
      let inputComponent: React.ReactNode = null;

      switch (input.name) {
        case 'dailyCalorieCount': {
          inputComponent = <RangeSelector label={input.label} value={state[0] as number} setValue={state[1]} />;
          break;
        }
        case 'activityLevel': {
          inputComponent = (
            <FormControl variant="filled" fullWidth>
              <InputLabel id="activity-level">{input.label}</InputLabel>
              <Select
                color="secondary"
                labelId="activity-level"
                id="activity-level-select"
                value={field.value}
                label="Age"
                onChange={({ target }) => setValue('activityLevel', target?.value as ActivityLevel)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {options?.map((o) => (
                  <MenuItem key={o} value={o}>
                    {capitalizeFirst(o)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
          break;
        }
        case 'goal': {
          inputComponent = (
            <OptionsSelector
              sx={{ mt: 2 }}
              label={input.label}
              options={options ?? []}
              activeOption={field.value as FitnessGoal}
              setActiveOption={(o) => setValue('goal', o as FitnessGoal)}
            />
          );
          break;
        }
        default: {
          inputComponent = null;
          break;
        }
      }

      return inputComponent;
    };

    return (
      <Controller
        key={input.name}
        name={input.name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            {renderInputComponent(field) ?? (
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
                  onKeyDown: onKeyDown,
                  startAdornment:
                    input.type === 'tags'
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
    <Paper sx={{ ...sx, backgroundColor: 'primary.light' }}>
      <Box my={2}>
        <Typography variant="h4">Client profile</Typography>
        <Typography variant="body2" color="text.secondary">
          Provide the details of your client to generate a meal plan
        </Typography>
      </Box>

      {[inputs.age, inputs.weight, inputs.height, inputs.dailyCalorieCount].map(renderInput)}

      <Accordion disableGutters elevation={0} defaultExpanded={!isMobile} sx={{ mb: 3, backgroundColor: 'inherit' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body1" fontWeight="bold">
            Additional Information (Recommended)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {[inputs.dietaryRestrictions, inputs.dietaryPreferences, inputs.activityLevel, inputs.goal].map(renderInput)}
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
