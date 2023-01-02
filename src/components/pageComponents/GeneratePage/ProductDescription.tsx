import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { IProductDescription } from '@pdg/types/product-descriptions';
import ReadingIllustration from '@root/public/assets/reading.webp';
import Image from 'next/image';

type Props = {
  productDescriptions?: IProductDescription[];
  isLoading: boolean;
};

export const ProductDescription = ({ productDescriptions, isLoading }: Props) => {
  return (
    <Box p={4} sx={{ flex: 1, position: 'relative' }}>
      {/* CREATE BANNER HERE */}
      <Box></Box>

      {productDescriptions ? (
        productDescriptions.map(({ id, content }) => (
          <Paper key={id} elevation={1} sx={{ p: 2 }}>
            <Typography paragraph variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {content}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {content.split(' ').length} words / {content.length} characters
            </Typography>
          </Paper>
        ))
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Box sx={{ '& > img': { borderRadius: 8 } }} display="flex" flexDirection="column" alignItems="center">
            <Image
              src={ReadingIllustration.src}
              alt="a person reading a book"
              width={ReadingIllustration.width / 2.5}
              height={ReadingIllustration.height / 2.5}
            />
            <Typography mt={2} fontWeight="normal" color="text.secondary">
              Your AI generated content will show up here
            </Typography>
          </Box>
        </Box>
      )}

      {isLoading && (
        <CircularProgress size={70} sx={{ position: 'absolute', m: 'auto', top: 0, right: 0, bottom: 0, left: 0 }} />
      )}
    </Box>
  );
};
