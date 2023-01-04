import { Box, Slider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { PlatformType } from '@pdg/types/product-descriptions';
import { useState } from 'react';

type Platform = { name: string; value: PlatformType };

type Props = {
  activeCount: number;
  setActiveCount: (range: number) => void;
};

export const RangeSelector = ({ activeCount, setActiveCount }: Props) => {
  const [activePlatform, setActivePlatform] = useState<PlatformType>('socialMedia');

  const platforms: Platform[] = [
    { name: 'Social media', value: 'socialMedia' },
    { name: 'E-commerce', value: 'ecomm' },
    { name: 'Other', value: 'other' },
  ];
  const wordCounts: Record<PlatformType, number> = {
    other: 80,
    ecomm: 300,
    socialMedia: 150,
  };

  const sliderMarks = [
    { value: 0, label: '0' },
    { value: 150, label: '150' },
    { value: 300, label: '300' },
  ];

  return (
    <Box mb={1}>
      <Typography sx={{ mb: 1 }} variant="body2" color="text.secondary">
        Select the word count of your description
      </Typography>

      <ToggleButtonGroup
        color="primary"
        value={activePlatform}
        exclusive
        size="small"
        onChange={(_, platform) => {
          if (!platform) return;
          setActiveCount(wordCounts[(platform as PlatformType) ?? 'other']);
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
        color="primary"
        getAriaLabel={() => 'Minimum distance'}
        value={activeCount}
        onChange={(_, newCount) => {
          setActivePlatform('other');
          setActiveCount(newCount as number);
        }}
        valueLabelDisplay="auto"
        disableSwap
        min={0}
        max={300}
        marks={sliderMarks}
      />
    </Box>
  );
};
