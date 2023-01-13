type ClientProfileModelInputs =
  | 'dailyCalorieCount'
  | 'dietaryRestrictions'
  | 'dietaryPreferences'
  | 'activityLevel';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type WeightGoal = 'weight_loss' | 'maintenance' | 'muscle_gain';

export type ClientProfileInput = {
  age: number;
  height: number;
  weight: number;
  sex: 'male' | 'female';
  activityLevel: ActivityLevel;
  goal: WeightGoal;
  dietaryRestrictions?: string[];
  dietaryPreferences?: string[];
  amr: number;
  bmr: number;
};

export type ClientProfileInputRaw = Omit<ClientProfileInput, ClientProfileModelInputs> & {
  dietary_restrictions: ClientProfileInput['dietaryRestrictions'];
  dietary_preferences: ClientProfileInput['dietaryPreferences'];
  activity_level: ClientProfileInput['activityLevel'];
};

export type IClientProfile = ClientProfileInput & {
  id: number;
  createdAt: Date;
};

// "Raw" is a term used for the database version
// where snake case is used instead of camel case
export type IClientProfileRaw = ClientProfileInputRaw & {
  id: IClientProfile['id'];
  created_at: IClientProfile['createdAt'];
}
