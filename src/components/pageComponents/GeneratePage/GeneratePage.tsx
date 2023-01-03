import { Add as AddIcon } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';
import { ProductInfoForm } from '@pdg/components/ProductInfoForm';
import { ProductInfoFormSlider } from '@pdg/components/ProductInfoForm/ProductInfoFormSlider';
import { useMediaQueries } from '@pdg/hooks/useMediaQueries';
import { IProductDescription } from '@pdg/types/product-descriptions';
import { useState } from 'react';

import { styles } from './GeneratePage.styles';
import { ProductDescription } from './ProductDescription';

export const GeneratePage = () => {
  const [productDescriptions, setDescriptions] = useState<IProductDescription[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { isMobile } = useMediaQueries();

  return (
    <Box flex={1} sx={{ display: { md: 'flex', xs: 'inline-block' }, width: '100%', minHeight: '92vh' }}>
      {isMobile ? (
        <ProductInfoFormSlider
          open={drawerOpen}
          onOpen={() => setDrawerOpen(true)}
          onClose={() => setDrawerOpen(false)}
          {...{ isLoading, setIsLoading, setDescriptions }}
        />
      ) : (
        <ProductInfoForm sx={styles.productInfoForm} {...{ isLoading, setIsLoading, setDescriptions }} />
      )}

      <ProductDescription
        {...{
          productDescriptions,
          isLoading,
        }}
      />

      <Fab
        color="primary"
        onClick={() => setDrawerOpen(true)}
        variant="extended"
        sx={{ display: { md: 'none' }, position: 'fixed', bottom: 24, right: 24 }}
      >
        <AddIcon />
        Generate
      </Fab>
    </Box>
  );
};
