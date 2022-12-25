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
  const { inputs, control, states, validate, formState } = useProductInfoForm();

  const onSubmit = validate(async ({ name, description, audience, guarantee }) => {
    if (Object.keys(formState.errors).length > 0) return;

    const body: ProductInfoInput = {
      name,
      description,
      features: states.features,
      audience,
      guarantee,
      tone: states.activeTone,
      wordRange: states.activeRange,
    };

    setIsLoading(true);

    try {
      const { data } = await instance.post<IProductDescription>('/descriptions/create', body);
      setDescription(data);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <Box mt={8} flex={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography mb={4} variant="h3" textAlign="center">
          Create Product Descriptions
        </Typography>

        <Card raised sx={styles.card}>
          <Box sx={styles.context}>
            <ProductInfoForm
              sx={styles.productInfoForm}
              {...{ onSubmit, inputs, control, formState, validate, isLoading }}
            />
            <ProductDescription {...{ productDescription, isLoading }} />
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  );
};
