import { IMeal } from './meals';

type MealPlanModelInputs = 'targetCalories' | 'startDate' | 'endDate' | 'clientProfileId' | 'macroDistribution';

export type MealPlanInput = {
  targetCalories: number;
  macroDistribution: { // percentages
    protein: number;
    fats: number;
    carbs: number
  };
  startDate: Date;
  endDate: Date;
  clientProfileId: number;
  cuisine?: 'lebanese' | 'asian';
};

export type MealPlanInputRaw = Omit<MealPlanInput, MealPlanModelInputs> & {
  target_calories: MealPlanInput['targetCalories'];
  macro_distribution: MealPlanInput['macroDistribution']
  start_date: MealPlanInput['startDate'];
  end_date: MealPlanInput['endDate'];
  client_profile_id: MealPlanInput['clientProfileId'];
};

export type MealPlanMeal = {
  name: IMeal['name'];
  calories: IMeal['calories'];
  ingredients: IMeal['ingredients'];
  mealType: IMeal['name'];
  macros: IMeal['macros'];
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
export type IMealPlanRaw = MealPlanInputRaw & {
  id: IMealPlan['id'];
  createdAt: IMealPlan['createdAt'];
}
