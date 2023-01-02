import { Box } from '@mui/material';
import { ProductInfoForm } from '@pdg/components/ProductInfoForm';
import { useProductInfoForm } from '@pdg/components/ProductInfoForm/useProductInfoForm';
import { usePdgApi } from '@pdg/hooks/usePdgApi';
import { IProductDescription, ProductInfoInput } from '@pdg/types/product-descriptions';
import { useState } from 'react';

import { styles } from './GeneratePage.styles';
import { ProductDescription } from './ProductDescription';

export const GeneratePage = () => {
  const [productDescriptions, setDescriptions] = useState<IProductDescription[] | undefined>();
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
      wordCount: states.activeCount,
    };

    setIsLoading(true);

    try {
      const { data } = await instance.post<IProductDescription[]>('/descriptions/create', body);
      setDescriptions(data);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Box flex={1} sx={{ display: 'flex', minHeight: '100vh' }}>
      <ProductInfoForm sx={styles.productInfoForm} {...{ onSubmit, inputs, control, formState, isLoading }} />
      <ProductDescription
        {...{
          productDescriptions,
          isLoading,
        }}
      />
    </Box>
  );
};
