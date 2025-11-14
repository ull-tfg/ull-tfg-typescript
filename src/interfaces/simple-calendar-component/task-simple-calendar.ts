export interface TaskSimpleCalendar {
    id: string;
    title: string;
    start: string;
    end: string;
    color?: string;
    icon?: string;
    actionIcon?: string;
    action?: () => void;
    background?: boolean;
}