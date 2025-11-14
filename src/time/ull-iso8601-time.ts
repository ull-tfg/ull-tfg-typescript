export class UllIso8601Time {

    public static readonly ERROR_INVALID_FORMAT: string = "Invalid ISO 8601 time format. Expected HH:mm:ss[+HH:mm|-HH:mm|Z]";
    public static readonly ERROR_INVALID_OFFSET_FORMAT: string = "Invalid ISO 8601 offset format. Expected +HH:mm, -HH:mm, or Z";
    public static readonly iso8601Regex: RegExp = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(Z|([+-]([01]\d|2[0-3]):[0-5]\d))?$/;
    public static readonly iso8601OffsetRegex: RegExp = /^Z|[+-]([01]\d|2[0-3]):[0-5]\d$/;
    /**
     * Hours of the time in 24-hour format (0-23).
     */
    private hours: number;
    /**
     * Minutes of the time (0-59).
     */
    private minutes: number;
    /**
     * Seconds of the time (0-59).
     */
    private seconds: number;
    /**
     * Offset in "+HH:mm", "-HH:mm", or "Z" format, or undefined if not set.
     */
    private offset?: string;

    /**
     * Constructs a new UllIso8601Time instance from an ISO 8601 time string, with optional offset.
     * @param timeString The time string in HH:mm:ss[+HH:mm|-HH:mm|Z] format.
     * @throws {Error} If the time string is not in valid ISO 8601 format.
     */
    constructor(timeString: string) {
        const match = timeString.match(UllIso8601Time.iso8601Regex);
        if (!match) {
            throw new Error(UllIso8601Time.ERROR_INVALID_FORMAT);
        }
        const [main, hours, minutes, seconds, offset] = match;
        this.hours = Number(hours);
        this.minutes = Number(minutes);
        this.seconds = Number(seconds);
        this.offset = offset || undefined;
    }

    /**
     * It checks if the provided string is a valid ISO 8601 time format (HH:mm:ss[+HH:mm|-HH:mm|Z]).
     * @param time The time string to validate.
     * @returns True if the time string is valid, false otherwise.
     */
    public static isValidIso8601Time(time: string): boolean {
        return UllIso8601Time.iso8601Regex.test(time);
    }

    /**
     * Returns the string representation of the time in HH:mm:ss[+HH:mm|-HH:mm|Z] format.
     * @returns The time as a string in HH:mm:ss[+HH:mm|-HH:mm|Z] format.
     */
    public toString(): string {
        const base = [
            this.hours.toString().padStart(2, '0'),
            this.minutes.toString().padStart(2, '0'),
            this.seconds.toString().padStart(2, '0')
        ].join(":");
        return this.offset ? base + this.offset : base;
    }

    /**
     * Returns the basic format of the time in ISO 8601 format, including offset if present.
     * @returns A basic format of the time in ISO 8601 format (THHmmss[+HH:mm|-HH:mm|Z]).
     */
    public basicFormat(): string {
        const base = `T${this.hours.toString().padStart(2, '0')}${this.minutes.toString().padStart(2, '0')}${this.seconds.toString().padStart(2, '0')}`;
        return this.offset ? base + this.offset : base;
    }

    /**
     * Returns the extended format of the time in ISO 8601 format, including offset if present.
     * @returns An extended format of the time in ISO 8601 format (T HH:mm:ss[+HH:mm|-HH:mm|Z]).
     */
    public extendedFormat(): string {
        const base = `T ${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
        return this.offset ? base + this.offset : base;
    }

    /**
     * Returns the offset string (e.g., "+02:00", "-05:30", "Z") or undefined if not set.
     */
    public getOffset(): string | undefined {
        return this.offset;
    }

    /**
     * Checks if the offset is set (not undefined).
     * @returns True if the offset is set (not undefined), false otherwise.
     */
    public hasOffset(): boolean {
        return this.offset !== undefined;
    }

    /**
     * Sets the offset string. Must be in "+HH:mm", "-HH:mm", or "Z" format, or undefined.
     * @param offset The offset string.
     */
    public setOffset(offset?: string): void {
        if (offset === undefined) {
            this.offset = undefined;
            return;
        }
        if (!UllIso8601Time.iso8601OffsetRegex.test(offset)) {
            throw new Error(UllIso8601Time.ERROR_INVALID_OFFSET_FORMAT);
        }
        this.offset = offset;
    }

    /**
     * Returns the hours of the time in 24-hour format.
     * @returns Hours of the time (0-23).
     */
    public getHours(): number {
        return this.hours;
    }

    /**
     * Returns the minutes of the time.
     * @returns Minutes of the time (0-59).
     */
    public getMinutes(): number {
        return this.minutes;
    }

    /**
     * Returns the seconds of the time.
     * @returns Seconds of the time (0-59).
     */
    public getSeconds(): number {
        return this.seconds;
    }

    /**
     * It sets the time using hours, minutes, and seconds.
     * @param hours Hours in 24-hour format (0-23).
     * @param minutes Minutes (0-59).
     * @param seconds Seconds (0-59).
     */
    public setTime(hours: number, minutes: number, seconds: number): void {
        if (
            hours < 0 || hours > 23 ||
            minutes < 0 || minutes > 59 ||
            seconds < 0 || seconds > 59
        ) {
            throw new Error("Invalid time values. Must be within 24-hour range.");
        }
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    /**
     * Adds seconds to the current time.
     * @param secondsToAdd The number of seconds to add to the current time.
     */
    public addSeconds(secondsToAdd: number): void {
        const totalSeconds = this.hours * 3600 + this.minutes * 60 + this.seconds + secondsToAdd;
        const newHours = Math.floor((totalSeconds / 3600) % 24);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;
        this.setTime(newHours, newMinutes, newSeconds);
    }

    /**
     * It subtracts seconds from the current time.
     * @param secondsToSubtract The number of seconds to subtract from the current time.
     */
    public subtractSeconds(secondsToSubtract: number): void {
        this.addSeconds(-secondsToSubtract);
    }

    /**
     * It converts the time to seconds.
     * @returns The total time in seconds.
     */
    public toSeconds(): number {
        return this.hours * 3600 + this.minutes * 60 + this.seconds;
    }

    /**
     * It converts the time to milliseconds.
     * @returns The total time in milliseconds.
     */
    public toMilliseconds(): number {
        return this.toSeconds() * 1000;
    }

    /**
     * It converts the time to nanoseconds.
     * @returns The total time in nanoseconds.
     */
    public toNanoseconds(): number {
        return this.toMilliseconds() * 1_000_000;
    }

    /**
     * Creates a new UllIso8601Time instance from a total number of hours.
     * @param hours The total number of hours.
     * @returns A new UllIso8601Time instance.
     */
    public static fromHours(hours: number): UllIso8601Time {
        const totalSeconds = Math.floor(hours * 3600);
        return UllIso8601Time.fromSeconds(totalSeconds);
    }

    /**
     * Creates a new UllIso8601Time instance from a total number of minutes.
     * @param minutes The total number of minutes.
     * @returns A new UllIso8601Time instance.
     */
    public static fromMinutes(minutes: number): UllIso8601Time {
        const totalSeconds = Math.floor(minutes * 60);
        return UllIso8601Time.fromSeconds(totalSeconds);
    }

    /**
     * Creates a new UllIso8601Time instance from a total number of seconds.
     * @param seconds The total number of seconds.
     * @returns A new UllIso8601Time instance.
     */
    public static fromSeconds(seconds: number): UllIso8601Time {
        const hours = Math.floor((seconds / 3600) % 24);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return new UllIso8601Time(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`);
    }

    /**
     * Adds minutes to the current time.
     * @param minutesToAdd The number of minutes to add to the current time.
     */
    public addMinutes(minutesToAdd: number): void {
        this.addSeconds(minutesToAdd * 60);
    }

    /**
     * Subtracts minutes from the current time.
     * @param minutesToSubtract The number of minutes to subtract from the current time.
     */
    public subtractMinutes(minutesToSubtract: number): void {
        this.addMinutes(-minutesToSubtract);
    }

    /**
     * Adds hours to the current time.
     * @param hoursToAdd The number of hours to add to the current time.
     */
    public addHours(hoursToAdd: number): void {
        this.addMinutes(hoursToAdd * 60);
    }

    /**
     * Subtracts hours from the current time.
     * @param hoursToSubtract The number of hours to subtract from the current time.
     */
    public subtractHours(hoursToSubtract: number): void {
        this.addHours(-hoursToSubtract);
    }

    /**
     * Checks if the time is midnight (00:00:00).
     * @returns True if the time is midnight, false otherwise.
     */
    public isMidnight(): boolean {
        return this.hours === 0 && this.minutes === 0 && this.seconds === 0;
    }

    /**
     * Checks if the time is noon (12:00:00).
     * @returns True if the time is noon, false otherwise.
     */
    public isNoon(): boolean {
        return this.hours === 12 && this.minutes === 0 && this.seconds === 0;
    }

    /**
     * Calculates the difference in seconds between this time and another time.
     * @param other The other UllIso8601Time instance.
     * @returns The difference in seconds.
     */
    public differenceInSeconds(other: UllIso8601Time): number {
        return Math.abs(this.toSeconds() - other.toSeconds());
    }

    /**
     * Calculates the difference in minutes between this time and another time.
     * @param other The other UllIso8601Time instance.
     * @returns The difference in minutes.
     */
    public differenceInMinutes(other: UllIso8601Time): number {
        return Math.abs(this.toSeconds() - other.toSeconds()) / 60;
    }

    /**
     * Calculates the difference in hours between this time and another time.
     * @param other The other UllIso8601Time instance.
     * @returns The difference in hours.
     */
    public differenceInHours(other: UllIso8601Time): number {
        return Math.abs(this.toSeconds() - other.toSeconds()) / 3600;
    }

    /**
     * Checks if this time is before another time.
     * @param other The other UllIso8601Time instance.
     * @returns True if this time is before the other time, false otherwise.
     */
    public isBefore(other: UllIso8601Time): boolean {
        return this.toSeconds() < other.toSeconds();
    }

    /**
     * Checks if this time is after another time.
     * @param other The other UllIso8601Time instance.
     * @returns True if this time is after the other time, false otherwise.
     */
    public isAfter(other: UllIso8601Time): boolean {
        return this.toSeconds() > other.toSeconds();
    }

    /**
     * Checks if this time is equal to another time.
     * @param other The other UllIso8601Time instance.
     * @returns True if this time is equal to the other time, false otherwise.
     */
    public equals(other: UllIso8601Time): boolean {
        return this.toSeconds() === other.toSeconds();
    }

    /**
     * Creates a clone of this UllIso8601Time instance, including offset.
     * @returns A new UllIso8601Time instance with the same time and offset.
     */
    public clone(): UllIso8601Time {
        return new UllIso8601Time(this.toString());
    }

    /**
     * Formats the time using a custom format string.
     * Supported tokens:
     * - HH: Hours (24-hour format, zero-padded)
     * - hh: Hours (12-hour format, zero-padded)
     * - mm: Minutes (zero-padded)
     * - ss: Seconds (zero-padded)
     * - a: AM/PM
     * @param format The format string.
     * @returns The formatted time string.
     */
    public format(format: string): string {
        const hours12 = this.hours % 12 || 12;
        const amPm = this.hours >= 12 ? 'PM' : 'AM';
        return format
            .replace('HH', this.hours.toString().padStart(2, '0'))
            .replace('hh', hours12.toString().padStart(2, '0'))
            .replace('mm', this.minutes.toString().padStart(2, '0'))
            .replace('ss', this.seconds.toString().padStart(2, '0'))
            .replace('a', amPm);
    }

    /**
     * Generates a random valid ISO 8601 time, with optional random offset.
     * @param withOffset If true, includes a random offset (Z, +HH:mm, or -HH:mm).
     * @returns A new UllIso8601Time instance with random time and optional offset.
     */
    public static random(withOffset: boolean = false): UllIso8601Time {
        const hours = Math.floor(Math.random() * 24);
        const minutes = Math.floor(Math.random() * 60);
        const seconds = Math.floor(Math.random() * 60);
        let offset = '';
        if (withOffset) {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) offset = 'Z';
            else {
                const sign = type === 1 ? '+' : '-';
                const oh = Math.floor(Math.random() * 24).toString().padStart(2, '0');
                const om = Math.floor(Math.random() * 60).toString().padStart(2, '0');
                offset = `${sign}${oh}:${om}`;
            }
        }
        return new UllIso8601Time(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}${offset}`);
    }

    /**
     * Validates if the given time values are valid without throwing errors.
     * @param hours The hours to validate.
     * @param minutes The minutes to validate.
     * @param seconds The seconds to validate.
     * @returns True if the time is valid, false otherwise.
     */
    public static isValidTime(hours: number, minutes: number, seconds: number): boolean {
        return (
            hours >= 0 && hours <= 23 &&
            minutes >= 0 && minutes <= 59 &&
            seconds >= 0 && seconds <= 59
        );
    }

    /**
     * Returns the time as a string in UTC (offset normalized to "Z").
     */
    public toUTCString(): string {
        return this.toString().replace(/([+-][0-9]{2}:[0-9]{2}|Z)?$/, 'Z');
    }

    /**
     * Returns a new instance with the same time but a different offset.
     * @param offset The new offset string ("+HH:mm", "-HH:mm", or "Z").
     */
    public withOffset(offset: string): UllIso8601Time {
        const clone = this.clone();
        clone.setOffset(offset);
        return clone;
    }

    /**
     * Returns the current system time as a UllIso8601Time instance, with optional offset.
     * @param offset Optional offset string ("+HH:mm", "-HH:mm", or "Z").
     */
    public static now(offset?: string): UllIso8601Time {
        const now: Date = new Date();
        const hours: number = now.getHours();
        const minutes: number = now.getMinutes();
        const seconds: number = now.getSeconds();
        let timeString: string = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (offset) timeString += offset;
        return new UllIso8601Time(timeString);
    }

    /**
     * Compares this time to another, returning -1 if before, 0 if equal, 1 if after.
     * @param other The other UllIso8601Time instance.
     */
    public compare(other: UllIso8601Time): -1 | 0 | 1 {
        if (this.toSeconds() < other.toSeconds()) {
            return -1;
        }
        if (this.toSeconds() > other.toSeconds()) {
            return 1;
        }
        return 0;
    }

    /**
     * Attempts to parse a string, returning an instance or null if invalid (non-throwing).
     * @param timeString The time string to parse.
     */
    public static parse(timeString: string): UllIso8601Time | null {
        return new UllIso8601Time(timeString);
    }

    /**
     * Returns a JSON-safe string representation (e.g., for serialization).
     */
    public toJSON(): string {
        return this.toString();
    }

    /**
     * Checks if this time is between two other times (inclusive).
     * @param start The start time (inclusive).
     * @param end The end time (inclusive).
     * @returns True if this time is between start and end, false otherwise.
     */
    public isBetween(start: UllIso8601Time, end: UllIso8601Time): boolean {
        const thisSec = this.toSeconds();
        const startSec = start.toSeconds();
        const endSec = end.toSeconds();
        return thisSec >= startSec && thisSec <= endSec;
    }

    /**
     * Converts this ISO 8601 time to the local time of the system,
     * considering the timezone and daylight saving rules.
     * @returns A new UllIso8601Time instance representing the local time.
     */
    public toLocalTime(): UllIso8601Time {
        const date = new Date(`1970-01-01T${this.toString()}`);
        const formatted = date.toLocaleTimeString("en-GB", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });  
        return new UllIso8601Time(formatted);
    }
}
