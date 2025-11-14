import { UllTitle } from "./ull-title";
import { UllIcon } from "./ull-icon";
import { UllHexadecimalColor } from "../color/ull-hexadecimal-color";
import { UllIso8601Duration } from "../time/ull-iso8601-duration";
import { UllIso8601Time } from "../time/ull-iso8601-time";
import { UllFraction } from "../fraction/ull-fraction";

export class UllKPI {

  private readonly __brand: 'UllKPI';

  public title: UllTitle;
  public icon: UllIcon;
  public color: UllHexadecimalColor;
  public value: UllIso8601Duration | UllIso8601Time | UllFraction | number | Date | null | undefined;
  public tooltip?: string;
  public units?: string;

  constructor(
    title: UllTitle,
    icon: UllIcon,
    color: UllHexadecimalColor,
    value: UllIso8601Duration | UllIso8601Time | UllFraction | number | Date | null | undefined,
    tooltip: string = '',
    units: string = ''
  ) {
    this.title = title;
    this.icon = icon;
    this.color = color;
    this.value = value;
    this.tooltip = tooltip;
    this.units = units;
  }

  public static create(
    title: string,
    icon: string,
    color: string,
    value: UllIso8601Duration | UllIso8601Time | UllFraction | number | Date | null | undefined,
    tooltip?: string,
    units?: string
  ) {
    return new UllKPI(
      new UllTitle(title),
      new UllIcon(icon),
      new UllHexadecimalColor(color),
      value,
      tooltip,
      units
    );
  }

  public equals(other: any): boolean {
    if (this === other) return true;
    if (other === null || other === undefined) return false;
    if (!(other instanceof UllKPI)) return false;
    return this.title.equals(other.title)
      && this.icon.equals(other.icon)
      && this.color.equals(other.color)
      && this.value === other.value
      && this.tooltip === other.tooltip
      && this.units === other.units;
  }

  public getTitle(): UllTitle {
    return this.title;
  }

  public getIcon(): UllIcon {
    return this.icon;
  }

  public getColor(): UllHexadecimalColor {
    return this.color;
  }

  public getValue(): UllIso8601Duration | UllIso8601Time | UllFraction | number | Date | null | undefined {
    return this.value;
  }

  public getTooltip(): string | undefined {
    return this.tooltip;
  }

  public getUnits(): string | undefined {
    return this.units;
  }

  public setUnits(u: string): void {
    this.units = u;
  }

  public setTooltip(t: string): void {
    this.tooltip = t;
  }

  public setTitle(title: UllTitle): void {
    this.title = title;
  }

  public setIcon(icon: UllIcon): void {
    this.icon = icon;
  }

  public setColor(color: UllHexadecimalColor): void {
    this.color = color;
  }

  public setValue(value: UllIso8601Duration | UllIso8601Time | UllFraction | number | Date | null | undefined): void {
    this.value = value;
  }

  public toString(): string {
    if (this.value === null || this.value === undefined) {
      return `UllKPI={title=${this.title.getValue()}, icon=${this.icon.getValue()}, color=${this.color.getValue()}, value=No disponible, tooltip=${this.tooltip}, units=${this.units}}`;
    }
    let valueStr = '';
    if (this.value instanceof UllIso8601Duration) {
      valueStr = this.value.getValue();
    } else if (this.value instanceof UllIso8601Time) {
      valueStr = this.value.toString();
    } else if (this.value instanceof UllFraction) {
      valueStr = this.value.toString();
    } else if (this.value instanceof Date) {
      valueStr = this.value.toISOString();
    } else {
      valueStr = this.value.toString();
    }
    return `UllKPI={title=${this.title.getValue()}, icon=${this.icon.getValue()}, color=${this.color.getValue()}, value=${valueStr}, tooltip=${this.tooltip}, units=${this.units}}`;
  }
}
