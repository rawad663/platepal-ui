import { IMeal } from './meals';

type MealPlanModelInputs = 'targetCalories' | 'startDate' | 'endDate' | 'clientProfileId';

export type MealPlanInput = {
  targetCalories: number;
  startDate: Date;
  endDate: Date;
  clientProfileId: number;
};

export type MealPlanInputRaw = Omit<MealPlanInput, MealPlanModelInputs> & {
  target_calories: number;
  start_date: Date;
  end_date: Date;
  client_profile_id: number;
};

export type MealPlanMeal = {
  name: IMeal['name'];
  calories: IMeal['calories'];
  ingredients: IMeal['ingredients'];
  mealType: IMeal['name'];
};

export type IMealPlan = MealPlanInput & {
  id: number;
  createdAt: Date;
  meals: {
    day1: MealPlanMeal[];
    day2: MealPlanMeal[];
    day3: MealPlanMeal[];
    day4: MealPlanMeal[];
    day5: MealPlanMeal[];
    day6: MealPlanMeal[];
    day7: MealPlanMeal[];
  };
};

// "Raw" is a term used for the database version
// where snake case is used instead of camel case
export type IMealPlanRaw = Omit<IMealPlan, 'createdAt' | 'meals' | MealPlanModelInputs> & {
  created_at: Date;
  target_calories: number;
  start_date: Date;
  end_date: Date;
  client_profile_id: number;
};
