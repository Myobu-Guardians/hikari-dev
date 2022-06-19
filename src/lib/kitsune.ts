import { OfferingSymbol } from "./offering";
import Tail1 from "../assets/images/kitsunes/tail-1.jpeg";
import LightBorder from "../assets/images/borders/light.png";
import DarkBorder from "../assets/images/borders/dark.png";

export interface KitsuneCard {
  id: string;
  symbol: OfferingSymbol;
  number: number;
  imageSrc: string;
  borderSrc: string;
  spell: string;
  /**
   * [[A], [B]] means A || B
   * [[A, B], [C]] means (A && B) || C
   */
  spellTrigger: OfferingSymbol[][];
}

export function createKitsuneCards(): KitsuneCard[] {
  return [
    /* Light */
    {
      id: "tail-1-light",
      symbol: OfferingSymbol.Plant,
      number: 1,
      imageSrc: Tail1,
      borderSrc: LightBorder,
      spell: "Gain one point",
      spellTrigger: [
        [OfferingSymbol.MusicInstrument],
        [OfferingSymbol.Incense],
      ],
    },
    {
      id: "tail-2-light",
      symbol: OfferingSymbol.MusicInstrument,
      number: 2,
      imageSrc: Tail1,
      borderSrc: LightBorder,
      spell: "Increase any card number by three",
      spellTrigger: [[OfferingSymbol.Plant], [OfferingSymbol.Incense]],
    },
    {
      id: "tail-3-light",
      symbol: OfferingSymbol.Incense,
      number: 3,
      imageSrc: Tail1,
      borderSrc: LightBorder,
      spell: "When you activate any card, you can cast any spell",
      spellTrigger: [],
    },
    {
      id: "tail-4-light",
      symbol: OfferingSymbol.Plant,
      number: 4,
      imageSrc: Tail1,
      borderSrc: LightBorder,
      spell: "Add any symbol to target card",
      spellTrigger: [[OfferingSymbol.MusicInstrument, OfferingSymbol.Incense]],
    },
    {
      id: "tail-5-light",
      symbol: OfferingSymbol.MusicInstrument,
      number: 5,
      imageSrc: Tail1,
      borderSrc: LightBorder,
      spell: "When any Flora Offering is placed, you can activate any card",
      spellTrigger: [[OfferingSymbol.Plant]],
    },
    {
      id: "tail-6-light",
      symbol: OfferingSymbol.Incense,
      number: 6,
      imageSrc: Tail1,
      borderSrc: LightBorder,
      spell: "Replace this card with any card in your hand",
      spellTrigger: [],
    },
    {
      id: "tail-7-light",
      symbol: OfferingSymbol.Plant,
      number: 7,
      imageSrc: Tail1,
      borderSrc: LightBorder,
      spell: "Gain three points",
      spellTrigger: [
        [
          OfferingSymbol.MusicInstrument,
          OfferingSymbol.Plant,
          OfferingSymbol.Incense,
        ],
      ],
    },
    {
      id: "tail-8-light",
      symbol: OfferingSymbol.MusicInstrument,
      number: 8,
      imageSrc: Tail1,
      borderSrc: LightBorder,
      spell:
        "When you cast a spell, you can remove any number or effects from any card",
      spellTrigger: [],
    },
    {
      id: "tail-9-light",
      symbol: OfferingSymbol.Incense,
      number: 9,
      imageSrc: Tail1,
      borderSrc: LightBorder,
      spell: "Draw three offerings, then put them back in any order",
      spellTrigger: [[OfferingSymbol.Incense]],
    },

    /* Dark */
    {
      id: "tail-1-dark",
      symbol: OfferingSymbol.Beverage,
      number: 1,
      imageSrc: Tail1,
      borderSrc: DarkBorder,
      spell: "Enemy loses one point",
      spellTrigger: [[OfferingSymbol.Food], [OfferingSymbol.Treasure]],
    },
    {
      id: "tail-2-dark",
      symbol: OfferingSymbol.Food,
      number: 2,
      imageSrc: Tail1,
      borderSrc: DarkBorder,
      spell: "Decrease any card number by three",
      spellTrigger: [[OfferingSymbol.Treasure], [OfferingSymbol.Beverage]],
    },
    {
      id: "tail-3-dark",
      symbol: OfferingSymbol.Treasure,
      number: 3,
      imageSrc: Tail1,
      borderSrc: DarkBorder,
      spell: "When enemy activates their card, you can cast any spell",
      spellTrigger: [],
    },
    {
      id: "tail-4-dark",
      symbol: OfferingSymbol.Beverage,
      number: 4,
      imageSrc: Tail1,
      borderSrc: DarkBorder,
      spell: "Remove any symbol from target card",
      spellTrigger: [[OfferingSymbol.Treasure], [OfferingSymbol.Food]],
    },
    {
      id: "tail-5-dark",
      symbol: OfferingSymbol.Food,
      number: 5,
      imageSrc: Tail1,
      borderSrc: DarkBorder,
      spell: "When any Bounty Offering is placed, you can cast any spell",
      spellTrigger: [[OfferingSymbol.Treasure]],
    },
    {
      id: "tail-6-dark",
      symbol: OfferingSymbol.Treasure,
      number: 6,
      imageSrc: Tail1,
      borderSrc: DarkBorder,
      spell: "Look at the enemies hand",
      spellTrigger: [[OfferingSymbol.Food], [OfferingSymbol.Beverage]],
    },
    {
      id: "tail-7-dark",
      symbol: OfferingSymbol.Beverage,
      number: 7,
      imageSrc: Tail1,
      borderSrc: DarkBorder,
      spell: "Return target card to its owners hand",
      spellTrigger: [[OfferingSymbol.Food], [OfferingSymbol.Treasure]],
    },
    {
      id: "tail-8-dark",
      symbol: OfferingSymbol.Food,
      number: 8,
      imageSrc: Tail1,
      borderSrc: DarkBorder,
      spell: "Enemy loses three points",
      spellTrigger: [
        [OfferingSymbol.Food, OfferingSymbol.Beverage, OfferingSymbol.Treasure],
      ],
    },
    {
      id: "tail-9-dark",
      symbol: OfferingSymbol.Treasure,
      number: 9,
      imageSrc: Tail1,
      borderSrc: DarkBorder,
      spell: "Discard all Offerings",
      spellTrigger: [[OfferingSymbol.Treasure]],
    },
  ];
}

export const exampleKitsuneCard: KitsuneCard = {
  id: "tail-1-dark",
  symbol: OfferingSymbol.Beverage,
  number: 1,
  imageSrc: Tail1,
  borderSrc: DarkBorder,
  spell: "Enemy loses one point",
  spellTrigger: [[OfferingSymbol.Food], [OfferingSymbol.Beverage]],
};
