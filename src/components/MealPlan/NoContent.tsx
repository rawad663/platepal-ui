import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import { useMediaQueries } from '@/hooks/useMediaQueries';

export const NoContent = ({ isLoading }: { isLoading: boolean }) => {
  const { isMobile } = useMediaQueries();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{ '& > img': { borderRadius: 8 }, mt: { xs: 4 } }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={isLoading ? '/assets/salad-toss.gif' : '/assets/plate-of-food.png'}
          alt="no-content-picture-of-food"
          width={isMobile ? 200 : 500}
          height={isMobile ? 200 : 500}
        />
        <Typography
          fontStyle="italic"
          variant="h6"
          mt={-2}
          fontWeight="normal"
          color="text.secondary"
          textAlign="center"
        >
          {isLoading ? 'This may take a couple of seconds...' : 'Your AI generated content will show up here'}
        </Typography>
      </Box>
    </Box>
  );
};
