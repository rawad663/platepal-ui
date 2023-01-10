import { Box, Card, Chip, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import { useMediaQueries } from '@/hooks/useMediaQueries';
import { IMealPlan } from '@/types/meal-plans';

import { NoContent } from './NoContent';
import { capitalizeFirst } from '@/utils/helpers';
import moment from 'moment';

type Props = {
  mealPlan?: IMealPlan;
  isLoading: boolean;
};

export const MealPlan = ({ mealPlan, isLoading }: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { startDate, endDate, meals } = mealPlan ?? {};
  const { isMobile } = useMediaQueries();

  const day = `day${tabIndex + 1}` as keyof IMealPlan['meals'];

  return (
    <Box sx={{ flex: 1, position: 'relative', pt: 2, backgroundColor: 'background.paper' }}>
      {/* CREATE BANNER HERE */}
      {/* <Box></Box> */}

      {!mealPlan && <NoContent {...{ isLoading }} />}

      {mealPlan && meals && (
        <Box width="100%" m={0}>
          <Box p={2}>
            <Typography variant="h6" color="text.primary">
              From{' '}
              <Box component="span" fontWeight="bold">
                {moment(startDate).format('MMM Do YYYY')}
              </Box>{' '}
              to{' '}
              <Box component="span" fontWeight="bold">
                {moment(endDate).format('MMM Do YYYY')}
              </Box>
            </Typography>
          </Box>

          {/* <Typography>From: </Typography> */}
          <Box sx={{ borderBottom: 1, borderColor: 'primary.light' }}>
            <Tabs
              sx={{
                backgroundColor: 'white',
                '& .MuiTab-textColorPrimary.Mui-selected': {
                  backgroundColor: 'primary.light',
                  borderRadius: '4px 4px 0 0',
                },
              }}
              variant={isMobile ? 'scrollable' : 'fullWidth'}
              value={tabIndex}
              onChange={(_, newTab) => setTabIndex(newTab)}
            >
              <Tab label="Day 1" />
              <Tab label="Day 2" />
              <Tab label="Day 3" />
              <Tab label="Day 4" />
              <Tab label="Day 5" />
              <Tab label="Day 6" />
              <Tab label="Day 7" />
            </Tabs>
          </Box>
          <Typography p={2} variant="h5" color="text.primary">
            Total: {meals[day].reduce<number>((acc, { calories }) => acc + (calories || 0), 0)} calories
          </Typography>
          <Box pt={2} px={2} display="flex" flexWrap="wrap">
            {meals[day].map(({ name, ingredients, calories, mealType }) => (
              <Card
                key={name}
                sx={{ p: 3, width: isMobile ? '100%' : 360, minHeight: 300, m: 1, borderRadius: 4 }}
                elevation={2}
              >
                <Chip
                  sx={{ fontWeight: 'bold' }}
                  size="medium"
                  variant="outlined"
                  color="secondary"
                  label={capitalizeFirst(mealType)}
                />
                <Typography variant="h4" mt={2}>
                  {name}
                </Typography>
                <Typography color="text.secondary">{calories} calories</Typography>

                <Typography sx={{ mt: 2 }} variant="h6" fontWeight="bold">
                  Ingredients
                </Typography>
                {ingredients.map((i) => (
                  <Typography color="text.secondary" key={i}>
                    - {i}
                  </Typography>
                ))}
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
