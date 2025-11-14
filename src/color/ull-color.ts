export class UllColor {

    private static readonly LARGEST_COLOR_VALUE: number = 16777215;

    public static colorPalette(count: number): string[] {
        const colors: string[] = [];
        const step: number = Math.floor(UllColor.LARGEST_COLOR_VALUE / count);
        for (let i = 0; i < count; i++) {
            const colorValue: number = (i * step) % UllColor.LARGEST_COLOR_VALUE;
            const hexadecimalColor: string = `#${colorValue.toString(16).padStart(6, '0')}`;
            colors.push(hexadecimalColor);
        }
        return colors;
    }

    public static randomColors(count: number): string[] {
        const colors: string[] = [];
        const step: number = Math.floor(UllColor.LARGEST_COLOR_VALUE / count);
        const startColor: number = Math.floor(Math.random() * UllColor.LARGEST_COLOR_VALUE);
        for (let i = 0; i < count; i++) {
            const colorValue: number = (startColor + i * step) % UllColor.LARGEST_COLOR_VALUE;
            const hexadecimalColor: string = `#${colorValue.toString(16).padStart(6, '0')}`;
            colors.push(hexadecimalColor);
        }
        return colors;
    }

    public static randomColors2(count: number): string[] {
        const colors: Set<string> = new Set();
        while (colors.size < count) {
            const colorValue: number = Math.floor(Math.random() * UllColor.LARGEST_COLOR_VALUE);
            const hexColor: string = `#${colorValue.toString(16).padStart(6, '0')}`;
            if (![...colors].some(existingColor => this.isTooSimilar(existingColor, hexColor))) {
                colors.add(hexColor);
            }
        }
        return Array.from(colors);
    }

    private static isTooSimilar(color1: string, color2: string): boolean {
        const rgb1 = this.hexadecimalToRgb(color1);
        const rgb2 = this.hexadecimalToRgb(color2);
        const distance = Math.sqrt(
            Math.pow(rgb1.r - rgb2.r, 2) +
            Math.pow(rgb1.g - rgb2.g, 2) +
            Math.pow(rgb1.b - rgb2.b, 2)
        );
        return distance < 100;
    }

    public static hexadecimalToRgb(hexadecimalColor: string): { r: number, g: number, b: number } {
        const bigint = parseInt(hexadecimalColor.substring(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }
}