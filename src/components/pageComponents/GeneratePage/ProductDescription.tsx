import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import { validationErrors } from '@pdg/declarations/fieldValidation';
import { IProductDescription } from '@pdg/types/product-descriptions';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  productDescription?: IProductDescription;
  isLoading: boolean;
};

export const ProductDescription = ({ productDescription, isLoading }: Props) => {
  const { control, setValue } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (!productDescription) return;

    setValue('productDescription', productDescription.content);
  }, [productDescription, setValue]);

  return (
    <Box flex={1} py={2}>
      <Typography variant="h4" mb={2}>
        Result
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <Controller
          name="productDescription"
          control={control}
          rules={{ required: { value: true, message: validationErrors.required } }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              InputProps={{
                sx: { color: 'common.white' },
              }}
              inputProps={{
                ...field,
              }}
              variant="filled"
              value={productDescription?.content ?? ''}
              disabled={!productDescription || isLoading || !!error}
              fullWidth
              label="Product name"
              color="secondary"
              multiline
              rows={20}
              placeholder="ex: Funky Monkey"
            />
          )}
        />

        {isLoading && (
          <CircularProgress size={70} sx={{ position: 'absolute', m: 'auto', top: 0, right: 0, bottom: 0, left: 0 }} />
        )}
      </Box>
    </Box>
  );
};
