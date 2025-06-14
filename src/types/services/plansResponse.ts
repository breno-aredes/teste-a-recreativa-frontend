export type Plan = {
  title: string;
  subject: string;
  grade: string;
  duration: string;
  objectives: string;
  activities: string;
  resources: string;
  evaluation: string;
  homework: string;
  notes: string;
};

export type ScanPlanResponse = {
  plan: Plan;
};
