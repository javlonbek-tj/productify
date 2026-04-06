import type { AuthUser } from './user';

export type ConnectionStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

export interface ConnectionRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: ConnectionStatus;
  message: string | null;
  sender?: AuthUser;
  receiver?: AuthUser;
  createdAt: string;
  updatedAt: string;
}

// Requests
export interface SendConnectionRequest {
  message?: string;
}
