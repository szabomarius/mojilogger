import { NO_ID_SYMBOL } from "../config/config";
import { LogOptions, MojiLog, MojiLogger } from "../types/types";
import { ColorAssigner } from "./color-assigner";
import { EmojiAssigner } from "./emoji-assigner";

export class Mojilogger implements MojiLogger {
    constructor(
        private emojiAssigner: EmojiAssigner = new EmojiAssigner(new Map()),
        private colorAssigner: ColorAssigner = new ColorAssigner(new Map()),
    ) {}

    public withId(id: any, customEmoji?: string | undefined): MojiLog {
        return {
            log: this._log.bind(this, {id, customEmoji}),
            withId: (secondId: any, customColor?: string) => {
                return {
                    log: this._log.bind(this, {id, customEmoji, extra: {id: secondId, customColor}})
                }
            }
        }
    }

    public log(message?: any, ...optionalParams: any[]): void {
        this.withId(NO_ID_SYMBOL, '💬').log(message, ...optionalParams);
    }

    public getMojiMap(): Map<any, string> {
        return this.emojiAssigner.getEmojiMap();
    }

    public getColorMap(): Map<any, string> {
        return this.colorAssigner.getColorMap();
    }

    public setMojiList(emojiList: string[]): void {
        this.emojiAssigner.setEmojiList(emojiList);
    }

    public getMojiList(): string[] {
        return this.emojiAssigner.getEmojiList();
    }

    public setColorList(colorList: string[]): void {
        this.colorAssigner.setColorList(colorList);
    }

    public getColorList(): string[] {
        return this.colorAssigner.getColorList();
    }

    public resetAll(): void {
        this.emojiAssigner = new EmojiAssigner(new Map());
        this.colorAssigner = new ColorAssigner(new Map());
    }

    private assignEmojiForId(id: any, customEmoji?: string): string {
        if (customEmoji && typeof customEmoji === 'string') {
            return this.emojiAssigner.assignEmojiForId(id, customEmoji);
        }
        return this.emojiAssigner.assignEmojiForId(id);
    }

    private assignColorForId(id: any, customColor?: string): string {
        if (customColor && typeof customColor === 'string') {
            return this.colorAssigner.assignColorForId(id, customColor);
        }
        return this.colorAssigner.assignColorForId(id);
    }

    private _log({id , customEmoji, extra}: LogOptions, message?: any, ...optionalParams: any[]): void {
        let emoji: string = this.assignEmojiForId(id, customEmoji);
        const params = [];
        let colorParam = undefined;
        if (extra && extra.id) {
            const color = this.assignColorForId(extra.id, extra.customColor);
            colorParam = `background-color: ${color}, color: #fff`;
            emoji = `%c ${emoji}`;
        }
        if (typeof message === 'string') {
            /** If it's string we concatenate with emoji so we can have coloring */
            params.push(`${emoji} ${message}`);
            colorParam && params.push(colorParam);
        } else {
            /** If it's something else we will add the message after the coloring */
            params.push(`${emoji} `);
            /** If colors then we have to specify the color param immediately after the emoji */
            colorParam && params.push(colorParam);
            params.push(message);
        }
        console.log(...params, ...optionalParams);
    }
}