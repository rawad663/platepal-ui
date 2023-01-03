import { Box, Button } from '@mui/material';
import Image from 'next/image';

type Props = {
  pages: string[];
};

export const LeftAdornment = ({ pages }: Props) => {
  return (
    <>
      <Box sx={{ my: 1 }}>
        <Image src="/logos/logo-w-text.png" alt="CreativPen logo" width={152} height={70} />
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
