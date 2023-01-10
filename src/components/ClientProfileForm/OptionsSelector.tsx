import { Box, SxProps, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { capitalizeFirst } from '@/utils/helpers';

type Props = {
  label: string;
  options: string[];
  activeOption: string;
  setActiveOption: (o: string) => void;
  sx?: SxProps;
};

// Use me if you want to display 3 options AT MOST
export const OptionsSelector = ({ label, options, activeOption, setActiveOption, sx }: Props) => {
  return (
    <Box mb={2} sx={sx}>
      <Typography sx={{ mb: 1 }} variant="body1" color="text.secondary">
        {label}
      </Typography>

      <ToggleButtonGroup
        color="secondary"
        size="small"
        value={activeOption}
        exclusive
        onChange={(_, newOption) => setActiveOption(newOption)}
        aria-label="product description voice tone"
      >
        {options.map((o) => (
          <ToggleButton
            size="small"
            sx={{ px: 3, fontSize: 12, fontWeight: 'bold', lineHeight: 1.3 }}
            key={o}
            value={o}
            aria-label="left aligned"
          >
            {capitalizeFirst(o)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
