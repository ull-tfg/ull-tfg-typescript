export interface TaskCalendar {
  id: string;
  employeeId: string;
  title: string;
  start: string;
  end: string;
  color?: string;
  icon?: string;
  actionIcon?: string;
  action?: () => void;
  background?: boolean;
}