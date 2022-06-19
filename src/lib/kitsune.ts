import { OfferingSymbol } from "./offering";
import Tail1 from "../assets/images/kitsunes/tail-1.jpeg";
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

export const exampleKitsuneCard: KitsuneCard = {
  id: "tail-1-dark",
  symbol: OfferingSymbol.Beverage,
  number: 1,
  imageSrc: Tail1,
  borderSrc: DarkBorder,
  spell: "Enemy loses one point",
  spellTrigger: [[OfferingSymbol.Food], [OfferingSymbol.Beverage]],
};
