export interface Plan {
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
}

export interface PlanWithOptionalFields
  extends Omit<Plan, "notes" | "homework"> {
  notes?: string;
  homework?: string;
  file?: File;
}

export interface PlanResponse extends Omit<Plan, "notes" | "homework"> {
  notes?: string;
  homework?: string;
  filePath?: File;
  createdAt: string;
  id: string;
}

export interface ScanPlanResponse {
  plan: Plan;
}
