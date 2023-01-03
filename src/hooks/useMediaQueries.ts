import { useMediaQuery, useTheme } from '@mui/material';

export const useMediaQueries = () => {
  const { breakpoints } = useTheme();

  return {
    isMobile: useMediaQuery(breakpoints.down('sm')),
    isTablet: useMediaQuery(breakpoints.down('md')),
    isDesktop: useMediaQuery(breakpoints.down('lg')),
  };
};
