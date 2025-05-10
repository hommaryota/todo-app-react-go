export interface Lists {
  id: number;
  text: string;
  completed: boolean;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  updatedItem: Lists & {
    updatedAt: string;
  };
}
