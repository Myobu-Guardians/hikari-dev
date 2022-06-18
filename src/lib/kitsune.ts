import { OfferingSymbol } from "./offering";
import Tail1 from "../assets/images/kitsunes/tail-1.jpg";

export class KitsuneCard {
  public id: string;
  public number: number;
  public symbol: OfferingSymbol;
  public imageSrc: string; // image source or color

  constructor(
    id: string,
    number: number,
    symbol: OfferingSymbol,
    imageSrc: string
  ) {
    this.id = id;
    this.number = number;
    this.symbol = symbol;
    this.imageSrc = imageSrc;
  }
}

export const exampleKitsuneCard = new KitsuneCard(
  "Example Kitsune Card",
  1,
  OfferingSymbol.Plant,
  Tail1
);
