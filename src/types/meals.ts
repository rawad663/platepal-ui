type MealModelInputs = 'mealPlanId' | 'dayOfWeek' | 'mealType';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'snack2' | 'dessert';

export type MealInput = {
  mealPlanId: number;
  dayOfWeek: number; // between 0 and 6
  mealType: MealType;
  name: string;
  calories?: number;
  ingredients: string[];
};

export type MealInputRaw = Omit<MealInput, MealModelInputs> & {
  meal_plan_id: number;
  day_of_week: Date;
  meal_type: Date;
};

export type IMeal = MealInput & {
  id: number;
  createdAt: Date;
};

// "Raw" is a term used for the database version
// where snake case is used instead of camel case
export type IMealRaw = Omit<IMeal, 'createdAt' | MealModelInputs> & {
  created_at: Date;
  meal_plan_id: number;
  day_of_week: Date;
  meal_type: Date;
};
