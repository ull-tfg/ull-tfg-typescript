import { simplify } from '../ull-string';
import { randomBoolean } from '../lang/ull-boolean';

export class UllIso8601Duration {

    public static readonly REGULAR_EXPRESSION: RegExp = /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d+[HMS])(\d+H)?(\d+M)?(\d+S)?)?$/;
    public static readonly ERROR_NOT_DEFINED: string = "Duration is not defined";
    public static readonly ERROR_EMPTY: string = "Duration cannot be empty";
    public static readonly ERROR_WRONG_FORMAT: string = "Duration must be ISO 8601 format duration";
    private readonly value: string;

    constructor(value: string) {
        this.validate(value);
        this.value = simplify(value);
    }

    private validate(value: string): void {
        if (value === null) {
            throw new Error(UllIso8601Duration.ERROR_NOT_DEFINED);
        }
        value = simplify(value);
        if (value.length === 0) {
            throw new Error(UllIso8601Duration.ERROR_EMPTY);
        }
        if (!UllIso8601Duration.REGULAR_EXPRESSION.test(value)) {
            throw new Error(UllIso8601Duration.ERROR_WRONG_FORMAT);
        }
    }
    
    private parseDuration(): { years: number; months: number; weeks: number; days: number; hours: number; minutes: number; seconds: number } {
        const value = this.getValue()
        const [datePart, timePartRaw] = value.startsWith('P') ? value.substring(1).split('T') : ['', ''];
        const timePart = timePartRaw || '';
        const years = datePart.includes('Y') ? parseInt(datePart.match(/(\d+)Y/)![1]) : 0;
        const months = datePart.includes('M') ? parseInt(datePart.match(/(\d+)M/)![1]) : 0;
        const weeks = datePart.includes('W') ? parseInt(datePart.match(/(\d+)W/)![1]) : 0;
        const days = datePart.includes('D') ? parseInt(datePart.match(/(\d+)D/)![1]) : 0;
        const hours = timePart.includes('H') ? parseInt(timePart.match(/(\d+)H/)![1]) : 0;
        const minutes = timePart.includes('M') ? parseInt(timePart.match(/(\d+)M/)![1]) : 0;
        const seconds = timePart.includes('S') ? parseInt(timePart.match(/(\d+)S/)![1]) : 0;
        return { years, months, weeks, days, hours, minutes, seconds };
    }

    public clone(): UllIso8601Duration {
        return Object.create(
            Object.getPrototypeOf(this),
            Object.getOwnPropertyDescriptors(this));
    }

    public equals(other: any): boolean {
        if (this === other) {
            return true;
        }
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof UllIso8601Duration)) {
            return false;
        }
        const otherDuration: UllIso8601Duration = other as UllIso8601Duration;
        return this.value === otherDuration.value;
    }

    public hashCode(): number {
        let hash = 0;
        for (let i = 0; i < this.value.length; i++) {
            const char = this.value.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return hash;
    }

    public getValue(): string {
        return this.value;
    }

    public getYears(): number {
        return this.parseDuration().years;
    }

    public getMonths(): number {
        return this.parseDuration().months;
    }

    public getWeeks(): number {
        return this.parseDuration().weeks;
    }

    public getDays(): number {
        return this.parseDuration().days;
    }

    public getHours(): number {
        return this.parseDuration().hours;
    }

    public getMinutes(): number {
        return this.parseDuration().minutes;
    }

    public getSeconds(): number {
        return this.parseDuration().seconds;
    }

    public toYears(): number {
        const { years, months, weeks, days, hours, minutes, seconds } = this.parseDuration();
        const monthsInYear = 12;
        const daysInYear = 365;
        const yearsFromMonths = months / monthsInYear;
        const yearsFromWeeks = weeks * 7 / daysInYear;
        const yearsFromDays = days / daysInYear;
        const yearsFromHours = hours / (daysInYear * 24);
        const yearsFromMinutes = minutes / (daysInYear * 24 * 60);
        const yearsFromSeconds = seconds / (daysInYear * 24 * 3600);
        return years + yearsFromMonths + yearsFromWeeks + yearsFromDays + yearsFromHours + yearsFromMinutes + yearsFromSeconds;
    }

    public toMonths(): number {
        const { years, months, weeks, days, hours, minutes, seconds } = this.parseDuration();
        const monthsInYear = 12;
        const daysInMonth = 30;
        const monthsFromYears = years * monthsInYear;
        const monthsFromWeeks = weeks * 7 / daysInMonth;
        const monthsFromDays = days / daysInMonth;
        const monthsFromHours = hours / (daysInMonth * 24);
        const monthsFromMinutes = minutes / (daysInMonth * 24 * 60);
        const monthsFromSeconds = seconds / (daysInMonth * 24 * 3600);
        return monthsFromYears + months + monthsFromWeeks + monthsFromDays + monthsFromHours + monthsFromMinutes + monthsFromSeconds;
    }

    public toWeeks(): number {
        const { years, months, weeks, days, hours, minutes, seconds } = this.parseDuration();
        const daysInYear = 365;
        const daysInMonth = 30;
        const daysInWeek = 7;
        const weeksFromYears = years * daysInYear / daysInWeek;
        const weeksFromMonths = months * daysInMonth / daysInWeek;
        const weeksFromWeeks = weeks;
        const weeksFromDays = days / daysInWeek;
        const weeksFromHours = hours / (daysInWeek * 24);
        const weeksFromMinutes = minutes / (daysInWeek * 24 * 60);
        const weeksFromSeconds = seconds / (daysInWeek * 24 * 3600);
        return weeksFromYears + weeksFromMonths + weeksFromWeeks + weeksFromDays + weeksFromHours + weeksFromMinutes + weeksFromSeconds;
    }

    public toDays(): number {
        const { years, months, weeks, days, hours, minutes, seconds } = this.parseDuration();
        const daysInYear = 365;
        const daysInMonth = 30;
        const daysFromYears = years * daysInYear;
        const daysFromMonths = months * daysInMonth;
        const daysFromWeeks = weeks * 7;
        const daysFromHours = hours / 24;
        const daysFromMinutes = minutes / 1440;
        const daysFromSeconds = seconds / 86400;
        return daysFromYears + daysFromMonths + daysFromWeeks + days + daysFromHours + daysFromMinutes + daysFromSeconds;
    }

    public toHours(): number {
        const { years, months, weeks, days, hours, minutes, seconds } = this.parseDuration();
        const hoursInDay = 24;
        const daysInYear = 365;
        const daysInMonth = 30;
        const hoursFromYears = years * daysInYear * hoursInDay;
        const hoursFromMonths = months * daysInMonth * hoursInDay;
        const hoursFromWeeks = weeks * 7 * hoursInDay;
        const hoursFromDays = days * hoursInDay;
        const hoursFromMinutes = minutes / 60;
        const hoursFromSeconds = seconds / 3600;
        return hoursFromYears + hoursFromMonths + hoursFromWeeks + hoursFromDays + hours + hoursFromMinutes + hoursFromSeconds;
    }

    public toMinutes(): number {
        const { years, months, weeks, days, hours, minutes, seconds } = this.parseDuration();
        const minutesInHour = 60;
        const hoursInDay = 24;
        const daysInYear = 365;
        const daysInMonth = 30;
        const minutesFromYears = years * daysInYear * hoursInDay * minutesInHour;
        const minutesFromMonths = months * daysInMonth * hoursInDay * minutesInHour;
        const minutesFromWeeks = weeks * 7 * hoursInDay * minutesInHour;
        const minutesFromDays = days * hoursInDay * minutesInHour;
        const minutesFromHours = hours * minutesInHour;
        const minutesFromSeconds = seconds / 60;
        return minutesFromYears + minutesFromMonths + minutesFromWeeks + minutesFromDays + minutesFromHours + minutes + minutesFromSeconds;
    }

    public toSeconds(): number {
        const { years, months, weeks, days, hours, minutes, seconds } = this.parseDuration();
        const secondsInMinute = 60;
        const minutesInHour = 60;
        const hoursInDay = 24;
        const daysInYear = 365;
        const daysInMonth = 30;
        const secondsFromYears = years * daysInYear * hoursInDay * minutesInHour * secondsInMinute;
        const secondsFromMonths = months * daysInMonth * hoursInDay * minutesInHour * secondsInMinute;
        const secondsFromWeeks = weeks * 7 * hoursInDay * minutesInHour * secondsInMinute;
        const secondsFromDays = days * hoursInDay * minutesInHour * secondsInMinute;
        const secondsFromHours = hours * minutesInHour * secondsInMinute;
        const secondsFromMinutes = minutes * secondsInMinute;
        return secondsFromYears + secondsFromMonths + secondsFromWeeks + secondsFromDays + secondsFromHours + secondsFromMinutes + seconds;
    }

    public static fromMinutes(value: number): UllIso8601Duration {
        const years = Math.floor(value / (365 * 24 * 60));
        const months = Math.floor((value % (365 * 24 * 60)) / (30 * 24 * 60));
        const days = Math.floor((value % (30 * 24 * 60)) / (24 * 60));
        const hours = Math.floor((value % (24 * 60)) / 60);
        const minutes = Math.floor(value % 60);
        return UllIso8601Duration.fromTimeAndUnit(
            [years, months, 0, days, hours, minutes, 0],
            ['YEARS', 'MONTHS', 'WEEKS', 'DAYS', 'HOURS', 'MINUTES', 'SECONDS']
        );
    }

    public static fromTimeAndUnit(
        value: number[],
        unit: string[]
    ): UllIso8601Duration {
        let durationString = 'P';
        let timeSection = '';
        for (let i = 0; i < value.length; i++) {
            if (value[i] < 0) {
                throw new Error('Duration values must be positive.');
            }
            if (value[i] === 0) {
                continue;
            }
            switch (unit[i]) {
                case 'YEARS':
                    durationString += value[i] + 'Y';
                    break;
                case 'MONTHS':
                    durationString += value[i] + 'M';
                    break;
                case 'WEEKS':
                    durationString += value[i] + 'W';
                    break;
                case 'DAYS':
                    durationString += value[i] + 'D';
                    break;
                case 'HOURS':
                    timeSection += value[i] + 'H';
                    break;
                case 'MINUTES':
                    timeSection += value[i] + 'M';
                    break;
                case 'SECONDS':
                    timeSection += value[i] + 'S';
                    break;
                default:
                    throw new Error('Unknown unit: ' + unit[i]);
            }
		}    
        if (timeSection) {
            durationString += 'T' + timeSection;
        }
        return new UllIso8601Duration(durationString);
    }

    public static random(): UllIso8601Duration {
        const years = randomBoolean() ? Math.floor(Math.random() * 5) : 0;
        const months = randomBoolean() ? Math.floor(Math.random() * 12) : 0;
        const weeks = randomBoolean() ? Math.floor(Math.random() * 4) : 0;
        const days = randomBoolean() ? Math.floor(Math.random() * 30) : 0;
        const hours = randomBoolean() ? Math.floor(Math.random() * 24) : 0;
        const minutes = randomBoolean() ? Math.floor(Math.random() * 60) : 0;
        const seconds = randomBoolean() ? Math.floor(Math.random() * 60) : 0;
        return UllIso8601Duration.fromTimeAndUnit(
            [years, months, weeks, days, hours, minutes, seconds],
            ['YEARS', 'MONTHS', 'WEEKS', 'DAYS', 'HOURS', 'MINUTES', 'SECONDS']
        );
    }

    public toString(): string {
        const { years, months, weeks, days, hours, minutes, seconds } = this.parseDuration();
        let result = 'P';
        if (years > 0) result += `${years}Y`;
        if (months > 0) result += `${months}M`;
        if (weeks > 0) result += `${weeks}W`;
        if (days > 0) result += `${days}D`;
        if (hours > 0 || minutes > 0 || seconds > 0) {
            result += 'T';
            if (hours > 0) result += `${hours}H`;
            if (minutes > 0) result += `${minutes}M`;
            if (seconds > 0) result += `${seconds}S`;
        }
        return result;
    }
}