type MealModelInputs = 'mealPlanId' | 'dayOfWeek' | 'mealType';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'snack2' | 'dessert';

export type MealInput = {
  mealPlanId: number;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  mealType: MealType;
  name: string;
  calories?: number;
  ingredients: string[];
  macros: { // in grams
    protein: number;
    fats: number;
    carbs: number;
  };
};

export type MealInputRaw = Omit<MealInput, MealModelInputs> & {
  meal_plan_id: MealInput['mealPlanId'];
  day_of_week: MealInput['dayOfWeek'];
  meal_type: MealInput['mealType'];
};

export type IMeal = MealInput & {
  id: number;
  createdAt: Date;
};

// "Raw" is a term used for the database version
// where snake case is used instead of camel case
export type IMealRaw = MealInputRaw & {
  id: IMeal['id'];
  createdAt: IMeal['createdAt'];
}
