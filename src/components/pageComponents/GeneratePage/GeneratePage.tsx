import { Box, Card, ThemeProvider, Typography } from '@mui/material';
import { ProductInfoForm } from '@pdg/components/ProductInfoForm';
import { useProductInfoForm } from '@pdg/components/ProductInfoForm/useProductInfoForm';
import { usePdgApi } from '@pdg/hooks/usePdgApi';
import { IProductDescription, ProductInfoInput } from '@pdg/types/product-descriptions';
import { lightTheme } from '@pdg/utils/theme';
import { useState } from 'react';

import { styles } from './GeneratePage.styles';
import { ProductDescription } from './ProductDescription';

export const GeneratePage = () => {
  const [productDescription, setDescription] = useState<IProductDescription | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const instance = usePdgApi();
  const { inputs } = useProductInfoForm();

  const onSubmit = async () => {
    const body = Object.entries(inputs).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value.value?.trim() || value.values,
      }),
      {},
    ) as ProductInfoInput;

    if (!body.name || !body.description || !body.features) {
      throw new Error('invalid body fields');
    }

    setIsLoading(true);
    const { data } = await instance.post<IProductDescription>('/descriptions/create', body);

    setDescription(data);
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Box mt={8} flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card raised sx={styles.card}>
          <Typography mb={4} variant="h3" textAlign="center">
            Describe your product
          </Typography>

          <Box sx={styles.context}>
            <ProductInfoForm sx={{ width: '50%' }} {...{ onSubmit, inputs }} />
            <ProductDescription {...{ productDescription, isLoading }} />
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  );
};
