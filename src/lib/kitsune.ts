import { OfferingSymbol } from "./offering";

export class KitsuneCard {
  public name: string;
  public number: number;
  public symbol: OfferingSymbol;
  public imageSrc: string; // image source or color

  constructor(
    name: string,
    number: number,
    symbol: OfferingSymbol,
    imageSrc: string
  ) {
    this.name = name;
    this.number = number;
    this.symbol = symbol;
    this.imageSrc = imageSrc;
  }
}
