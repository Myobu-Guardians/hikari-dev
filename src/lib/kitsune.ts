import { OfferingSymbol } from "./offering";
import Tail1 from "../assets/images/kitsunes/tail-1.jpeg";
import Tail2 from "../assets/images/kitsunes/tail-2.jpeg";
import Tail3 from "../assets/images/kitsunes/tail-3.jpeg";
import Tail4 from "../assets/images/kitsunes/tail-4.jpeg";
import Tail5 from "../assets/images/kitsunes/tail-5.jpeg";
import Tail6 from "../assets/images/kitsunes/tail-6.jpeg";
import Tail7 from "../assets/images/kitsunes/tail-7.jpeg";
import Tail8 from "../assets/images/kitsunes/tail-8.jpeg";
import Tail9 from "../assets/images/kitsunes/tail-9.jpeg";

import LightBorder from "../assets/images/borders/light.png";
import DarkBorder from "../assets/images/borders/dark.png";
import { MaxKitsuneCardNumber } from "./constants";
import { getSpellById, Spell } from "./spells";

export interface KitsuneCard {
  id: string;
  symbol?: OfferingSymbol;
  number: number;
  imageSrc: string;
  borderSrc: string;
  spell?: Spell;
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
      spell: getSpellById("tail-1-light-spell"),
    },
    {
      id: "tail-2-light",
      symbol: OfferingSymbol.MusicInstrument,
      number: 2,
      imageSrc: Tail2,
      borderSrc: LightBorder,
      spell: getSpellById("tail-2-light-spell"),
    },
    {
      id: "tail-3-light",
      symbol: OfferingSymbol.Incense,
      number: 3,
      imageSrc: Tail3,
      borderSrc: LightBorder,
      spell: getSpellById("tail-3-light-spell"),
    },
    {
      id: "tail-4-light",
      symbol: OfferingSymbol.Plant,
      number: 4,
      imageSrc: Tail4,
      borderSrc: LightBorder,
      spell: getSpellById("tail-4-light-spell"),
    },
    {
      id: "tail-5-light",
      symbol: OfferingSymbol.MusicInstrument,
      number: 5,
      imageSrc: Tail5,
      borderSrc: LightBorder,
      spell: getSpellById("tail-5-light-spell"),
    },
    {
      id: "tail-6-light",
      symbol: OfferingSymbol.Incense,
      number: 6,
      imageSrc: Tail6,
      borderSrc: LightBorder,
      spell: getSpellById("tail-6-light-spell"),
    },
    {
      id: "tail-7-light",
      symbol: OfferingSymbol.Plant,
      number: 7,
      imageSrc: Tail7,
      borderSrc: LightBorder,
      spell: getSpellById("tail-7-light-spell"),
    },
    {
      id: "tail-8-light",
      symbol: OfferingSymbol.MusicInstrument,
      number: 8,
      imageSrc: Tail8,
      borderSrc: LightBorder,
      spell: getSpellById("tail-8-light-spell"),
    },
    {
      id: "tail-9-light",
      symbol: OfferingSymbol.Incense,
      number: 9,
      imageSrc: Tail9,
      borderSrc: LightBorder,
      spell: getSpellById("tail-9-light-spell"),
    },
    /* Dark */
    {
      id: "tail-1-dark",
      symbol: OfferingSymbol.Beverage,
      number: 1,
      imageSrc: Tail1,
      borderSrc: DarkBorder,
      spell: getSpellById("tail-1-dark-spell"),
    },
    {
      id: "tail-2-dark",
      symbol: OfferingSymbol.Food,
      number: 2,
      imageSrc: Tail2,
      borderSrc: DarkBorder,
      spell: getSpellById("tail-2-dark-spell"),
    },
    {
      id: "tail-3-dark",
      symbol: OfferingSymbol.Treasure,
      number: 3,
      imageSrc: Tail3,
      borderSrc: DarkBorder,
      spell: getSpellById("tail-3-dark-spell"),
    },
    {
      id: "tail-4-dark",
      symbol: OfferingSymbol.Beverage,
      number: 4,
      imageSrc: Tail4,
      borderSrc: DarkBorder,
      spell: getSpellById("tail-4-dark-spell"),
    },
    {
      id: "tail-5-dark",
      symbol: OfferingSymbol.Food,
      number: 5,
      imageSrc: Tail5,
      borderSrc: DarkBorder,
      spell: getSpellById("tail-5-dark-spell"),
    },
    {
      id: "tail-6-dark",
      symbol: OfferingSymbol.Treasure,
      number: 6,
      imageSrc: Tail6,
      borderSrc: DarkBorder,
      spell: getSpellById("tail-6-dark-spell"),
    },
    {
      id: "tail-7-dark",
      symbol: OfferingSymbol.Beverage,
      number: 7,
      imageSrc: Tail7,
      borderSrc: DarkBorder,
      spell: getSpellById("tail-7-dark-spell"),
    },
    {
      id: "tail-8-dark",
      symbol: OfferingSymbol.Food,
      number: 8,
      imageSrc: Tail8,
      borderSrc: DarkBorder,
      spell: getSpellById("tail-8-dark-spell"),
    },
    {
      id: "tail-9-dark",
      symbol: OfferingSymbol.Treasure,
      number: 9,
      imageSrc: Tail9,
      borderSrc: DarkBorder,
      spell: getSpellById("tail-9-dark-spell"),
    },
  ].filter((card) => card.number <= MaxKitsuneCardNumber);
}
