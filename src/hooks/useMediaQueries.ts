import { useMediaQuery, useTheme } from '@mui/material';

export const useMediaQueries = () => {
  const { breakpoints } = useTheme();

  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const isTablet = useMediaQuery(breakpoints.down('md'));
  const isDesktop = useMediaQuery(breakpoints.down('lg'));

  return {
    isMobile,
    isTablet: !isMobile && isTablet,
    isDesktop: !isTablet && isDesktop,
  };
};
