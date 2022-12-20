import { Box, TextField, Typography } from '@mui/material';
import { IProductDescription } from '@pdg/types/product-descriptions';

type Props = {
  productDescription?: IProductDescription;
  isLoading: boolean;
};

export const ProductDescription = ({ productDescription, isLoading }: Props) => {
  return (
    <Box flex={1} py={2}>
      <Typography variant="h4" mb={2}>
        Result
      </Typography>

      {!isLoading ? (
        <TextField
          variant="filled"
          value={productDescription?.content ?? ''}
          disabled={!productDescription}
          fullWidth
          label="Product name"
          color="secondary"
          multiline
          rows={14}
          placeholder="ex: Funky Monkey"
        />
      ) : (
        <h2>loading...</h2>
      )}
    </Box>
  );
};
