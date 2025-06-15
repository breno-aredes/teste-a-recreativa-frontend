import { AxiosPromise } from "axios";
import { api } from "./api";
import { PlanWithOptionalFields, ScanPlanResponse } from "@/types/plansTypes";

export const plansServices = {
  GetPlans() {
    return api.get("/plans");
  },

  CreatePlan(data: PlanWithOptionalFields) {
    console.log(data);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "file" && value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null && key !== "file") {
        formData.append(key, value);
      }
    });

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    return api.post("/plans", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

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
