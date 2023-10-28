import { NO_ID_SYMBOL } from "./config/config";
import { LogOptions, MojiLogger } from "./types/types";
import { EmojiAssigner } from "./core/emoji-assigner";
import { ColorAssigner } from "./core/color-assigner";

let mojiAssigner = new EmojiAssigner(new Map());
let colorAssigner = new ColorAssigner(new Map());

function log({id , customEmoji, extra}: LogOptions, message?: any, ...optionalParams: any[]): void {
    let emoji: string;
    let color: string = '';
    const params = [...optionalParams];
    let emojiMessage = '';
    if (customEmoji && typeof customEmoji === 'string') {
        emoji = mojiAssigner.assignEmojiForId(id, customEmoji);
    } else {
        emoji = mojiAssigner.assignEmojiForId(id);
    }

    if (typeof message === 'string') {
        emojiMessage = `${emoji} ${message}`;
    } else {
        emojiMessage = `${emoji}`;
    }

    if (extra && extra.id) {
        if (extra.customColor) {
            color = colorAssigner.assignColorForId(extra.id, extra.customColor);
        } else {
            color = colorAssigner.assignColorForId(extra.id);
        }
        params.unshift(`background-color: ${color}, color: #fff`);
    }
    console.log(emojiMessage, ...params);
}

export const mojilogger: MojiLogger = {
    withId: (id: any, customEmoji?: string) => {
        return {
            log: log.bind(null, {id, customEmoji}),
            withId: (secondId: any, customColor?: string) => {
                return {
                    log: log.bind(null, {id, customEmoji, extra: {id: secondId, customColor}})
                }
            }
        }
    },
    log: log.bind(null, {id: NO_ID_SYMBOL, customEmoji: '💬'}),
    getMojiMap: () => {
        return mojiAssigner.getEmojiMap();
    },
    getColorMap: () => {
        return colorAssigner.getColorMap();
    },
    setMojiList: (emojiList: string[]) => {
        mojiAssigner.setEmojiList(emojiList);
    },
    getMojiList: () => {
        return mojiAssigner.getEmojiList();
    },
    setColorList: (colorList: string[]) => {
        return colorAssigner.setColorList(colorList);
    },
    getColorList: () => {
        return colorAssigner.getColorList();
    },
    resetAll: () => {
        mojiAssigner = new EmojiAssigner(new Map());
        colorAssigner = new ColorAssigner(new Map());
    }
};
export type { MojiLog } from './types/types';