type ClientProfileModelInputs = 'dailyCalorieCount' | 'dietaryRestrictions' | 'dietaryPreferences' | 'activityLevel';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very active' | 'extremely active';
export type FitnessGoal = 'weight loss' | 'maintenance' | 'muscle gain';

export type ClientProfileInput = {
  age: number;
  height: number;
  weight: number;
  dailyCalorieCount: number;
  dietaryRestrictions?: string[];
  dietaryPreferences?: string[];
  activityLevel?: ActivityLevel;
  goal?: FitnessGoal;
};

export type ClientProfileInputRaw = Omit<ClientProfileInput, ClientProfileModelInputs> & {
  daily_calorie_count: number;
  dietary_restrictions?: string[];
  dietary_preferences?: string[];
  activity_level?: ActivityLevel;
};

export type IClientProfile = ClientProfileInput & {
  id: number;
  createdAt: Date;
};

// "Raw" is a term used for the database version
// where snake case is used instead of camel case
export type IClientProfileRaw = Omit<IClientProfile, 'createdAt' | ClientProfileModelInputs> & {
  created_at: Date;
  daily_calorie_count: number;
  dietary_restrictions?: string[];
  dietary_preferences?: string[];
  activity_level?: ActivityLevel;
};
