import type { AuthUser } from './user';

export interface Conversation {
  id: string;
  participants?: AuthUser[];
  lastMessage?: Message;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  sender?: AuthUser;
  createdAt: string;
  updatedAt: string;
}

// Requests
export interface StartConversationRequest {
  userId: string;
}

export interface SendMessageRequest {
  content: string;
}
