import { Box, Slider, Typography } from '@mui/material';

type Props = {
  label: string;
  value: number;
  setValue: (v: number) => void;
};

export const RangeSelector = ({ label, value, setValue }: Props) => {
  const max = 4000;
  const min = 1000;

  const sliderMarks = [
    { value: 2000, label: `2000 kcal` },
    { value: 3000, label: `3000 kcal` },
  ];

  return (
    <Box mb={1}>
      <Typography sx={{ mb: 1 }} variant="body1" color="text.secondary">
        {label}: {value}
      </Typography>

      <Slider
        color="secondary"
        getAriaLabel={() => 'number of calories'}
        value={value}
        onChange={(_, newValue) => setValue(newValue as number)}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        marks={sliderMarks}
      />
    </Box>
  );
};
