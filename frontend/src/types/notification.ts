import type { AuthUser } from './user';

export type NotificationType =
  | 'connection_request'
  | 'connection_accepted'
  | 'post_reaction'
  | 'post_comment'
  | 'comment_reply'
  | 'mention'
  | 'profile_view';

export interface Notification {
  id: string;
  recipientId: string;
  senderId: string | null;
  type: NotificationType;
  entityId: string | null;
  message: string | null;
  isRead: boolean;
  sender?: AuthUser;
  createdAt: string;
}
