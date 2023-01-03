import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useMediaQueries } from '@pdg/hooks/useMediaQueries';
import { IProductDescription } from '@pdg/types/product-descriptions';
import ReadingIllustration from '@root/public/assets/people.webp';
import Image from 'next/image';

type Props = {
  productDescriptions?: IProductDescription[];
  isLoading: boolean;
};

export const ProductDescription = ({ productDescriptions, isLoading }: Props) => {
  const { isMobile } = useMediaQueries();

  return (
    <Box sx={{ flex: 1, position: 'relative', p: { xs: 1, md: 4 } }}>
      {/* CREATE BANNER HERE */}
      <Box></Box>

      {productDescriptions ? (
        productDescriptions.map(({ id, content }) => (
          <Paper key={id} elevation={1} sx={{ p: 2, mb: 2 }}>
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
          <Box
            sx={{ '& > img': { borderRadius: 8 }, mt: { xs: 4 } }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={ReadingIllustration.src}
              alt="a person reading a book"
              width={isMobile ? ReadingIllustration.width / 6.2 : ReadingIllustration.width / 3.2}
              height={isMobile ? ReadingIllustration.height / 6.2 : ReadingIllustration.height / 3.2}
            />
            <Typography variant="body1" mt={2} fontWeight="normal" color="text.secondary" textAlign="center">
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
