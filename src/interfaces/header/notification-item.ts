export interface NotificationItem {
  icon: string;
  title: string;
  relativeDate: string;
  actionText?: string;
  onClick?: () => void;
  backgroundColor?: string;
}