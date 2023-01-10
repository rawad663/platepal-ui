import { Box, Button } from '@mui/material';
import Image from 'next/image';

type Props = {
  pages: string[];
};

export const LeftAdornment = ({ pages }: Props) => {
  return (
    <>
      <Box sx={{ my: 1 }}>
        <Image priority src="/logos/logo-full.webp" alt="PlatePal logo" width={135} height={63} />
      </Box>

      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Button key={page} sx={{ my: 2, color: 'white', display: 'block' }}>
            {page}
          </Button>
        ))}
      </Box>
    </>
  );
};
