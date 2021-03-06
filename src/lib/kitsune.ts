import { OfferingSymbol } from "./offering";
import Tail1 from "../assets/images/kitsunes/tail-1.png";
import Tail2 from "../assets/images/kitsunes/tail-2.png";
import Tail3 from "../assets/images/kitsunes/tail-3.png";
import Tail4 from "../assets/images/kitsunes/tail-4.png";
import Tail5 from "../assets/images/kitsunes/tail-5.png";
import Tail6 from "../assets/images/kitsunes/tail-6.png";
import Tail7 from "../assets/images/kitsunes/tail-7.png";
import Tail8 from "../assets/images/kitsunes/tail-8.png";
import Tail9 from "../assets/images/kitsunes/tail-9.png";
import KitsuneCardBack from "../assets/images/kitsunes/back.jpg";
import LightBorder from "../assets/images/borders/light.png";
import DarkBorder from "../assets/images/borders/dark.png";
import { MaxKitsuneCardNumber } from "./constants";
import { getSpellById, Spell } from "./spells";

export enum KitsuneCardType {
  Tail1Light = "t1l",
  Tail2Light = "t2l",
  Tail3Light = "t3l",
  Tail4Light = "t4l",
  Tail5Light = "t5l",
  Tail6Light = "t6l",
  Tail7Light = "t7l",
  Tail8Light = "t8l",
  Tail9Light = "t9l",

  Tail1Dark = "t1d",
  Tail2Dark = "t2d",
  Tail3Dark = "t3d",
  Tail4Dark = "t4d",
  Tail5Dark = "t5d",
  Tail6Dark = "t6d",
  Tail7Dark = "t7d",
  Tail8Dark = "t8d",
  Tail9Dark = "t9d",
}

export function getKitsuneCardBorderImageSrc(card: KitsuneCard) {
  if (
    card.type === KitsuneCardType.Tail1Light ||
    card.type === KitsuneCardType.Tail2Light ||
    card.type === KitsuneCardType.Tail3Light ||
    card.type === KitsuneCardType.Tail4Light ||
    card.type === KitsuneCardType.Tail5Light ||
    card.type === KitsuneCardType.Tail6Light ||
    card.type === KitsuneCardType.Tail7Light ||
    card.type === KitsuneCardType.Tail8Light ||
    card.type === KitsuneCardType.Tail9Light
  ) {
    return LightBorder;
  } else {
    return DarkBorder;
  }
}

export function getKitsuneCardImageSrc(card: KitsuneCard) {
  if (
    card.type === KitsuneCardType.Tail1Light ||
    card.type === KitsuneCardType.Tail1Dark
  ) {
    return Tail1;
  } else if (
    card.type === KitsuneCardType.Tail2Light ||
    card.type === KitsuneCardType.Tail2Dark
  ) {
    return Tail2;
  } else if (
    card.type === KitsuneCardType.Tail3Light ||
    card.type === KitsuneCardType.Tail3Dark
  ) {
    return Tail3;
  } else if (
    card.type === KitsuneCardType.Tail4Light ||
    card.type === KitsuneCardType.Tail4Dark
  ) {
    return Tail4;
  } else if (
    card.type === KitsuneCardType.Tail5Light ||
    card.type === KitsuneCardType.Tail5Dark
  ) {
    return Tail5;
  } else if (
    card.type === KitsuneCardType.Tail6Light ||
    card.type === KitsuneCardType.Tail6Dark
  ) {
    return Tail6;
  } else if (
    card.type === KitsuneCardType.Tail7Light ||
    card.type === KitsuneCardType.Tail7Dark
  ) {
    return Tail7;
  } else if (
    card.type === KitsuneCardType.Tail8Light ||
    card.type === KitsuneCardType.Tail8Dark
  ) {
    return Tail8;
  } else if (
    card.type === KitsuneCardType.Tail9Light ||
    card.type === KitsuneCardType.Tail9Dark
  ) {
    return Tail9;
  } else {
    return KitsuneCardBack;
  }
}

export function kitsuneCardIsLightType(kitsuneCard: KitsuneCard) {
  return (
    kitsuneCard.type === KitsuneCardType.Tail1Light ||
    kitsuneCard.type === KitsuneCardType.Tail2Light ||
    kitsuneCard.type === KitsuneCardType.Tail3Light ||
    kitsuneCard.type === KitsuneCardType.Tail4Light ||
    kitsuneCard.type === KitsuneCardType.Tail5Light ||
    kitsuneCard.type === KitsuneCardType.Tail6Light ||
    kitsuneCard.type === KitsuneCardType.Tail7Light ||
    kitsuneCard.type === KitsuneCardType.Tail8Light ||
    kitsuneCard.type === KitsuneCardType.Tail9Light
  );
}

export interface KitsuneCard {
  /*
   * Might be the NFT address in the future
   */
  id: string;
  type: KitsuneCardType;
  symbols: OfferingSymbol[];
  number: number;
  spell?: Spell;
  /**
   * the number of times the card has been activated
   */
  ac?: number;
  /**
   * The turns this card is locked
   */
  locked?: number;
}

export function createKitsuneCards(): KitsuneCard[] {
  return [
    /* Light */
    {
      id: "tail-1-light",
      type: KitsuneCardType.Tail1Light,
      symbols: [OfferingSymbol.Plant],
      number: 1,
      spell: getSpellById("tail-1-light-spell"),
    },
    {
      id: "tail-2-light",
      type: KitsuneCardType.Tail2Light,
      symbols: [OfferingSymbol.MusicInstrument],
      number: 2,
      spell: getSpellById("tail-2-light-spell"),
    },
    {
      id: "tail-3-light",
      type: KitsuneCardType.Tail3Light,
      symbols: [OfferingSymbol.Incense],
      number: 3,
      spell: getSpellById("tail-3-light-spell"),
    },
    {
      id: "tail-4-light",
      type: KitsuneCardType.Tail4Light,
      symbols: [OfferingSymbol.Plant],
      number: 4,
      spell: getSpellById("tail-4-light-spell"),
    },
    {
      id: "tail-5-light",
      type: KitsuneCardType.Tail5Light,
      symbols: [OfferingSymbol.MusicInstrument],
      number: 5,
      spell: getSpellById("tail-5-light-spell"),
    },
    {
      id: "tail-6-light",
      type: KitsuneCardType.Tail6Light,
      symbols: [OfferingSymbol.Incense],
      number: 6,
      spell: getSpellById("tail-6-light-spell"),
    },
    {
      id: "tail-7-light",
      type: KitsuneCardType.Tail7Light,
      symbols: [OfferingSymbol.Plant],
      number: 7,
      spell: getSpellById("tail-7-light-spell"),
    },
    {
      id: "tail-8-light",
      type: KitsuneCardType.Tail8Light,
      symbols: [OfferingSymbol.MusicInstrument],
      number: 8,
      spell: getSpellById("tail-8-light-spell"),
    },
    {
      id: "tail-9-light",
      type: KitsuneCardType.Tail9Light,
      symbols: [OfferingSymbol.Incense],
      number: 9,
      spell: getSpellById("tail-9-light-spell"),
    },
    /* Dark */
    {
      id: "tail-1-dark",
      type: KitsuneCardType.Tail1Dark,
      symbols: [OfferingSymbol.Beverage],
      number: 1,
      spell: getSpellById("tail-1-dark-spell"),
    },
    {
      id: "tail-2-dark",
      type: KitsuneCardType.Tail2Dark,
      symbols: [OfferingSymbol.Food],
      number: 2,
      spell: getSpellById("tail-2-dark-spell"),
    },
    {
      id: "tail-3-dark",
      type: KitsuneCardType.Tail3Dark,
      symbols: [OfferingSymbol.Treasure],
      number: 3,
      spell: getSpellById("tail-3-dark-spell"),
    },
    {
      id: "tail-4-dark",
      type: KitsuneCardType.Tail4Dark,
      symbols: [OfferingSymbol.Beverage],
      number: 4,
      spell: getSpellById("tail-4-dark-spell"),
    },
    {
      id: "tail-5-dark",
      type: KitsuneCardType.Tail5Dark,
      symbols: [OfferingSymbol.Food],
      number: 5,
      spell: getSpellById("tail-5-dark-spell"),
    },
    {
      id: "tail-6-dark",
      type: KitsuneCardType.Tail6Dark,
      symbols: [OfferingSymbol.Treasure],
      number: 6,
      spell: getSpellById("tail-6-dark-spell"),
    },
    {
      id: "tail-7-dark",
      type: KitsuneCardType.Tail7Dark,
      symbols: [OfferingSymbol.Beverage],
      number: 7,
      spell: getSpellById("tail-7-dark-spell"),
    },
    {
      id: "tail-8-dark",
      type: KitsuneCardType.Tail8Dark,
      symbols: [OfferingSymbol.Food],
      number: 8,
      spell: getSpellById("tail-8-dark-spell"),
    },
    {
      id: "tail-9-dark",
      type: KitsuneCardType.Tail9Dark,
      symbols: [OfferingSymbol.Treasure],
      number: 9,
      spell: getSpellById("tail-9-dark-spell"),
    },
  ].filter((card) => card.number <= MaxKitsuneCardNumber);
}
