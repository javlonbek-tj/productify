export interface Experience {
  id: string;
  userId: string;
  title: string;
  company: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

// Requests
export interface CreateExperienceRequest {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export type UpdateExperienceRequest = Partial<CreateExperienceRequest>;
