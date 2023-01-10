import { Add as AddIcon } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';
import { useState } from 'react';

import { ClientProfileForm, ClientProfileFormMobile } from '@/components/ClientProfileForm';
import { MealPlan } from '@/components/MealPlan/MealPlan';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import { IMealPlan } from '@/types/meal-plans';

import { styles } from './GeneratePage.styles';

export const GeneratePage = () => {
  const [mealPlan, setMealPlan] = useState<IMealPlan | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { isMobile } = useMediaQueries();

  return (
    <Box flex={1} sx={{ display: { md: 'flex', xs: 'inline-block' }, width: '100%', minHeight: '92vh' }}>
      {isMobile ? (
        <ClientProfileFormMobile
          open={drawerOpen}
          onOpen={() => setDrawerOpen(true)}
          onClose={() => setDrawerOpen(false)}
          {...{ isLoading, setIsLoading, setMealPlan }}
        />
      ) : (
        <ClientProfileForm sx={styles.productInfoForm} {...{ isLoading, setIsLoading, setMealPlan }} />
      )}

      <MealPlan {...{ mealPlan, isLoading }} />

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
