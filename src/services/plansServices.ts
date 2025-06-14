import { AxiosPromise } from "axios";
import { api } from "./api";
import { ScanPlanResponse } from "@/types/services/plansResponse";

export const plansServices = {
  ScanPlan(file: File): AxiosPromise<ScanPlanResponse> {
    const data = new FormData();
    data.append("file", file);

    return api.post("/plans/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
