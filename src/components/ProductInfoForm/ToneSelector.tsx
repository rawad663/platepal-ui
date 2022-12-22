import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Tone } from '@pdg/types/product-descriptions';

type Props = {
  activeTone: Tone;
  setActiveTone: (tone: Tone) => void;
};

export const ToneSelector = ({ activeTone, setActiveTone }: Props) => {
  const tones: Tone[] = ['formal', 'curious', 'friendly'];

  return (
    <Box mb={1}>
      <Typography variant="body2" color="text.secondary">
        Select the tone of voice for the description
      </Typography>

      <ToggleButtonGroup
        color="secondary"
        value={activeTone}
        exclusive
        onChange={(_, newTone) => setActiveTone(newTone)}
        aria-label="product description voice tone"
      >
        {tones.map((tone) => (
          <ToggleButton size="medium" sx={{ px: 3 }} key={tone} value={tone} aria-label="left aligned">
            {tone.charAt(0).toUpperCase() + tone.slice(1)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
