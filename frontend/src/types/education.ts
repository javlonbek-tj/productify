export interface Education {
  id: string;
  userId: string;
  school: string;
  degree: string | null;
  field: string | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

// Requests
export interface CreateEducationRequest {
  school: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export type UpdateEducationRequest = Partial<CreateEducationRequest>;
