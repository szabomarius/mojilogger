import { DEFAULT_COLOR_LIST, NO_MORE_COLOR } from "../config/config";

export class ColorAssigner {
    private colorList: string[];
    constructor(
        private readonly colorMap: Map<any, string>,
        colorList: string[] = DEFAULT_COLOR_LIST,
    ) {
        this.colorList = [...colorList];
    }

    /**
     * Assigns an emoji to an id and returns it, if already assigned it returns the assigned emoji
     * @param id - An identifier that gets matched with an emoji
     * @returns - an assigned emoji for that id
     */
    public assignColorForId(id: any, customColor?: string): string {
        if (this.colorMap.has(id)) {
            return this.colorMap.get(id)!;
        }
        let color = customColor || this._getNewColor();
        const values = [...this.colorMap.values()];
        while (color && values.includes(color)) {
            color = this._getNewColor();
        }
        if (!color) {
            return NO_MORE_COLOR;
        }
        this.colorMap.set(id, color);
        return color;
    }

    /**
     * Replaces the emoji list with a new one, if list contains
     * emojis that are already assigned, they will be skipped
     * @param colorList - An array of emojis to use sequentially
     */
    public setColorList(colorList: string[]): void {
        this.colorList = [...colorList];
    }

    /**
     * Returns the emoji list that the logger uses when assigning emojis
     * to new ids. You can use this to see what the default one is.
     */
    public getColorList(): string[] {
        return [...this.colorList];
    }

    /**
     * Returns a map of identifiers to emojis
     * @returns - A map of identifiers to emojis
     */
    public getColorMap(): Map<any, string> {
        return new Map(this.colorMap);
    }

    /**
     * Returns a new color from supplied list of colors
     * If it reaches end of the list it starts from
     * the beginning
     */
    private _getNewColor(): string | null {
        if (this.colorList.length  > 0) {
            return this.colorList.shift()!;
        }
        return null;
    }
}