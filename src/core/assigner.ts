import { SymbolAssigner, SymbolAssignerOptions } from "../types/types";

export class Assigner implements SymbolAssigner {
    private readonly map: Map<any, string>;
    private readonly defaultSymbol: string;
    private readonly generator?: Generator<string, null, void>;
    private currentList: string[] = [];
    
    constructor({
        symbolList,
        symbolMap,
        defaultSymbol,
        symbolGenerator
    }: SymbolAssignerOptions) {
        this.currentList = [...symbolList];
        this.map = new Map(symbolMap);
        this.defaultSymbol = defaultSymbol;
        this.generator = symbolGenerator;
    }

    /**
     * Assigns a symbol (emoji, string, number what have you) to an id and returns it,
     * if already assigned it returns the assigned emoji
     * @param id - An identifier that gets matched with a symbol
     * @returns - an assigned symbol for that id
    */
    public assign(id: any, customSymbol?: string): string {
        if (this.map.has(id)) {
            return this.map.get(id)!;
        }
        let symbol = customSymbol || this.getNewSymbol();
        const values = [...this.map.values()];
        while (symbol && values.includes(symbol)) {
            symbol = this.getNewSymbol();
        }
        if (!symbol) {
            return this.defaultSymbol;
        }
        this.map.set(id, symbol);
        return symbol;
    }

    /**
     * Replaces the symbol list with a new one, if list contains
     * symbols that are already assigned, they will be skipped
     * @param emojiList - An array of symbols to use sequentially
     */
    public setList(list: string[]): void {
        this.currentList = [...list];
    }

    /**
     * Returns the symbol list that the logger uses when assigning symbols
     * to new ids.
    */
    public getList(): string[] {
        return this.currentList;
    }

    /**
     * Returns a map of identifiers to symbols
     * @returns - A map of identifiers to symbols
    */
    public getMap(): Map<any, string> {
        return new Map(this.map);
    }

    /**
     * Returns a new symbol from supplied list of symbols
     * or generates a new one if the list is consumed and
     * a generator was supplied at class construction
    */
    private getNewSymbol(): string | null {
        if (this.currentList.length  > 0) {
            return this.currentList.shift()!;
        }
        if (!this.generator) {
            return null;
        }
        return this.generator.next().value;
    }

}