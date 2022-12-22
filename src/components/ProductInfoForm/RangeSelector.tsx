import { Box, Slider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { PlatformType, WordRange } from '@pdg/types/product-descriptions';
import { useState } from 'react';

type Platform = { name: string; value: PlatformType };

type Props = {
  activeRange: WordRange;
  setActiveRange: (range: WordRange) => void;
};

export const RangeSelector = ({ activeRange, setActiveRange }: Props) => {
  const [activePlatform, setActivePlatform] = useState<PlatformType>('ecomm');

  const platforms: Platform[] = [
    { name: 'E-commerce', value: 'ecomm' },
    { name: 'Social media', value: 'socialMedia' },
    { name: 'Other', value: 'other' },
  ];
  const wordRanges: Record<PlatformType, WordRange> = {
    other: [50, 350],
    ecomm: [300, 350],
    socialMedia: [50, 100],
  };

  const sliderMarks = [
    { value: 0, label: '0' },
    { value: 200, label: '200' },
    { value: 400, label: '400' },
  ];

  return (
    <Box mb={1}>
      <Typography sx={{ mb: 1 }} variant="body2" color="text.secondary">
        Select the word range of your description
      </Typography>

      <ToggleButtonGroup
        color="secondary"
        value={activePlatform}
        exclusive
        size="small"
        onChange={(_, platform) => {
          if (!platform) return;
          setActiveRange(wordRanges[(platform as PlatformType) ?? 'other']);
          setActivePlatform(platform as PlatformType);
        }}
        aria-label="product description voice tone"
      >
        {platforms.map(({ name, value }) => (
          <ToggleButton size="small" sx={{ px: 3 }} key={value} value={value} aria-label="left aligned">
            {name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Slider
        color="secondary"
        getAriaLabel={() => 'Minimum distance'}
        value={activeRange}
        onChange={(_, newRange) => {
          setActivePlatform('other');
          setActiveRange(newRange as WordRange);
        }}
        valueLabelDisplay="auto"
        disableSwap
        min={0}
        max={400}
        marks={sliderMarks}
      />
    </Box>
  );
};
