import Beverage1 from "../assets/images/offerings/beverage-1.jpg";
import Beverage2 from "../assets/images/offerings/beverage-2.jpg";
import Beverage3 from "../assets/images/offerings/beverage-3.jpg";
import Beverage4 from "../assets/images/offerings/beverage-4.jpg";
import Beverage5 from "../assets/images/offerings/beverage-5.jpg";
import Beverage6 from "../assets/images/offerings/beverage-6.jpg";
import Beverage7 from "../assets/images/offerings/beverage-7.jpg";
import Beverage8 from "../assets/images/offerings/beverage-8.jpg";
import Beverage9 from "../assets/images/offerings/beverage-9.jpg";
import Food1 from "../assets/images/offerings/food-1.jpg";
import Food2 from "../assets/images/offerings/food-2.jpg";
import Food3 from "../assets/images/offerings/food-3.jpg";
import Food4 from "../assets/images/offerings/food-4.jpg";
import Food5 from "../assets/images/offerings/food-5.jpg";
import Food6 from "../assets/images/offerings/food-6.jpg";
import Food7 from "../assets/images/offerings/food-7.jpg";
import Food8 from "../assets/images/offerings/food-8.jpg";
import Food9 from "../assets/images/offerings/food-9.jpg";
import Incense1 from "../assets/images/offerings/incense-1.jpg";
import Incense2 from "../assets/images/offerings/incense-2.jpg";
import Incense3 from "../assets/images/offerings/incense-3.jpg";
import Incense4 from "../assets/images/offerings/incense-4.jpg";
import Incense5 from "../assets/images/offerings/incense-5.jpg";
import Incense6 from "../assets/images/offerings/incense-6.jpg";
import Incense7 from "../assets/images/offerings/incense-7.jpg";
import Incense8 from "../assets/images/offerings/incense-8.jpg";
import Incense9 from "../assets/images/offerings/incense-9.jpg";
import MusicInstrument1 from "../assets/images/offerings/music-instrument-1.jpg";
import MusicInstrument2 from "../assets/images/offerings/music-instrument-2.jpg";
import MusicInstrument3 from "../assets/images/offerings/music-instrument-3.jpg";
import MusicInstrument4 from "../assets/images/offerings/music-instrument-4.jpg";
import MusicInstrument5 from "../assets/images/offerings/music-instrument-5.jpg";
import MusicInstrument6 from "../assets/images/offerings/music-instrument-6.jpg";
import MusicInstrument7 from "../assets/images/offerings/music-instrument-7.jpg";
import MusicInstrument8 from "../assets/images/offerings/music-instrument-8.jpg";
import MusicInstrument9 from "../assets/images/offerings/music-instrument-9.jpg";
import Plant1 from "../assets/images/offerings/plant-1.jpg";
import Plant2 from "../assets/images/offerings/plant-2.jpg";
import Plant3 from "../assets/images/offerings/plant-3.jpg";
import Plant4 from "../assets/images/offerings/plant-4.jpg";
import Plant5 from "../assets/images/offerings/plant-5.jpg";
import Plant6 from "../assets/images/offerings/plant-6.jpg";
import Plant7 from "../assets/images/offerings/plant-7.jpg";
import Plant8 from "../assets/images/offerings/plant-8.jpg";
import Plant9 from "../assets/images/offerings/plant-9.jpg";
import Treasure1 from "../assets/images/offerings/treasure-1.jpg";
import Treasure2 from "../assets/images/offerings/treasure-2.jpg";
import Treasure3 from "../assets/images/offerings/treasure-3.jpg";
import Treasure4 from "../assets/images/offerings/treasure-4.jpg";
import Treasure5 from "../assets/images/offerings/treasure-5.jpg";
import Treasure6 from "../assets/images/offerings/treasure-6.jpg";
import Treasure7 from "../assets/images/offerings/treasure-7.jpg";
import Treasure8 from "../assets/images/offerings/treasure-8.jpg";
import Treasure9 from "../assets/images/offerings/treasure-9.jpg";
import Number1 from "../assets/images/symbols/1.png";
import Number2 from "../assets/images/symbols/2.png";
import Number3 from "../assets/images/symbols/3.png";
import Number4 from "../assets/images/symbols/4.png";
import Number5 from "../assets/images/symbols/5.png";
import Number6 from "../assets/images/symbols/6.png";
import Number7 from "../assets/images/symbols/7.png";
import Number8 from "../assets/images/symbols/8.png";
import Number9 from "../assets/images/symbols/9.png";
import BeverageSymbol from "../assets/images/symbols/beverage.png";
import FoodSymbol from "../assets/images/symbols/food.png";
import IncenseSymbol from "../assets/images/symbols/incense.png";
import MusicInstrumentSymbol from "../assets/images/symbols/music-instrument.png";
import PlantSymbol from "../assets/images/symbols/plant.png";
import TreasureSymbol from "../assets/images/symbols/treasure.png";

export enum OfferingSymbol {
  Beverage = "Beverage",
  Food = "Food",
  Incense = "Incense",
  MusicInstrument = "MusicInstrument",
  Plant = "Plant",
  Treasure = "Treasure",
}

export interface OfferingCard {
  id: string;
  symbol: OfferingSymbol;
  number: number;
  imageSrc: string;
}

export function getNumberImageSrcFromNumber(number: number): string {
  switch (number) {
    case 1:
      return Number1;
    case 2:
      return Number2;
    case 3:
      return Number3;
    case 4:
      return Number4;
    case 5:
      return Number5;
    case 6:
      return Number6;
    case 7:
      return Number7;
    case 8:
      return Number8;
    case 9:
      return Number9;
    default:
      return "";
  }
}

export function getSymbolImageSrcFromSymbol(symbol: OfferingSymbol): string {
  switch (symbol) {
    case OfferingSymbol.Beverage:
      return BeverageSymbol;
    case OfferingSymbol.Food:
      return FoodSymbol;
    case OfferingSymbol.Incense:
      return IncenseSymbol;
    case OfferingSymbol.MusicInstrument:
      return MusicInstrumentSymbol;
    case OfferingSymbol.Plant:
      return PlantSymbol;
    case OfferingSymbol.Treasure:
      return TreasureSymbol;
    default:
      return "";
  }
}

export function createOfferingCards(): OfferingCard[] {
  return [
    // Beverage
    {
      id: "Beverage 1",
      symbol: OfferingSymbol.Beverage,
      number: 1,
      imageSrc: Beverage1,
    },
    {
      id: "Beverage 2",
      symbol: OfferingSymbol.Beverage,
      number: 2,
      imageSrc: Beverage2,
    },
    {
      id: "Beverage 3",
      symbol: OfferingSymbol.Beverage,
      number: 3,
      imageSrc: Beverage3,
    },
    {
      id: "Beverage 4",
      symbol: OfferingSymbol.Beverage,
      number: 4,
      imageSrc: Beverage4,
    },
    {
      id: "Beverage 5",
      symbol: OfferingSymbol.Beverage,
      number: 5,
      imageSrc: Beverage5,
    },
    {
      id: "Beverage 6",
      symbol: OfferingSymbol.Beverage,
      number: 6,
      imageSrc: Beverage6,
    },
    {
      id: "Beverage 7",
      symbol: OfferingSymbol.Beverage,
      number: 7,
      imageSrc: Beverage7,
    },
    {
      id: "Beverage 8",
      symbol: OfferingSymbol.Beverage,
      number: 8,
      imageSrc: Beverage8,
    },
    {
      id: "Beverage 9",
      symbol: OfferingSymbol.Beverage,
      number: 9,
      imageSrc: Beverage9,
    },
    // Food
    {
      id: "Food 1",
      symbol: OfferingSymbol.Food,
      number: 1,
      imageSrc: Food1,
    },
    {
      id: "Food 2",
      symbol: OfferingSymbol.Food,
      number: 2,
      imageSrc: Food2,
    },
    {
      id: "Food 3",
      symbol: OfferingSymbol.Food,
      number: 3,
      imageSrc: Food3,
    },
    {
      id: "Food 4",
      symbol: OfferingSymbol.Food,
      number: 4,
      imageSrc: Food4,
    },
    {
      id: "Food 5",
      symbol: OfferingSymbol.Food,
      number: 5,
      imageSrc: Food5,
    },
    {
      id: "Food 6",
      symbol: OfferingSymbol.Food,
      number: 6,
      imageSrc: Food6,
    },
    {
      id: "Food 7",
      symbol: OfferingSymbol.Food,
      number: 7,
      imageSrc: Food7,
    },
    {
      id: "Food 8",
      symbol: OfferingSymbol.Food,
      number: 8,
      imageSrc: Food8,
    },
    {
      id: "Food 9",
      symbol: OfferingSymbol.Food,
      number: 9,
      imageSrc: Food9,
    },
    // Incense
    {
      id: "Incense 1",
      symbol: OfferingSymbol.Incense,
      number: 1,
      imageSrc: Incense1,
    },
    {
      id: "Incense 2",
      symbol: OfferingSymbol.Incense,
      number: 2,
      imageSrc: Incense2,
    },
    {
      id: "Incense 3",
      symbol: OfferingSymbol.Incense,
      number: 3,
      imageSrc: Incense3,
    },
    {
      id: "Incense 4",

      symbol: OfferingSymbol.Incense,
      number: 4,
      imageSrc: Incense4,
    },
    {
      id: "Incense 5",
      symbol: OfferingSymbol.Incense,
      number: 5,
      imageSrc: Incense5,
    },
    {
      id: "Incense 6",
      symbol: OfferingSymbol.Incense,
      number: 6,
      imageSrc: Incense6,
    },
    {
      id: "Incense 7",
      symbol: OfferingSymbol.Incense,
      number: 7,
      imageSrc: Incense7,
    },
    {
      id: "Incense 8",
      symbol: OfferingSymbol.Incense,
      number: 8,
      imageSrc: Incense8,
    },
    {
      id: "Incense 9",
      symbol: OfferingSymbol.Incense,
      number: 9,
      imageSrc: Incense9,
    },
    // MusicInstrument
    {
      id: "MusicInstrument 1",
      symbol: OfferingSymbol.MusicInstrument,
      number: 1,
      imageSrc: MusicInstrument1,
    },
    {
      id: "MusicInstrument 2",
      symbol: OfferingSymbol.MusicInstrument,
      number: 2,
      imageSrc: MusicInstrument2,
    },
    {
      id: "MusicInstrument 3",
      symbol: OfferingSymbol.MusicInstrument,
      number: 3,
      imageSrc: MusicInstrument3,
    },
    {
      id: "MusicInstrument 4",
      symbol: OfferingSymbol.MusicInstrument,
      number: 4,
      imageSrc: MusicInstrument4,
    },
    {
      id: "MusicInstrument 5",
      symbol: OfferingSymbol.MusicInstrument,
      number: 5,
      imageSrc: MusicInstrument5,
    },
    {
      id: "MusicInstrument 6",
      symbol: OfferingSymbol.MusicInstrument,
      number: 6,
      imageSrc: MusicInstrument6,
    },
    {
      id: "MusicInstrument 7",
      symbol: OfferingSymbol.MusicInstrument,
      number: 7,
      imageSrc: MusicInstrument7,
    },
    {
      id: "MusicInstrument 8",
      symbol: OfferingSymbol.MusicInstrument,
      number: 8,

      imageSrc: MusicInstrument8,
    },
    {
      id: "MusicInstrument 9",
      symbol: OfferingSymbol.MusicInstrument,
      number: 9,
      imageSrc: MusicInstrument9,
    },
    // Plant
    {
      id: "Plant 1",
      symbol: OfferingSymbol.Plant,
      number: 1,
      imageSrc: Plant1,
    },
    {
      id: "Plant 2",
      symbol: OfferingSymbol.Plant,
      number: 2,
      imageSrc: Plant2,
    },
    {
      id: "Plant 3",
      symbol: OfferingSymbol.Plant,
      number: 3,

      imageSrc: Plant3,
    },
    {
      id: "Plant 4",
      symbol: OfferingSymbol.Plant,
      number: 4,
      imageSrc: Plant4,
    },
    {
      id: "Plant 5",
      symbol: OfferingSymbol.Plant,
      number: 5,
      imageSrc: Plant5,
    },
    {
      id: "Plant 6",
      symbol: OfferingSymbol.Plant,
      number: 6,
      imageSrc: Plant6,
    },
    {
      id: "Plant 7",
      symbol: OfferingSymbol.Plant,
      number: 7,
      imageSrc: Plant7,
    },
    {
      id: "Plant 8",
      symbol: OfferingSymbol.Plant,
      number: 8,
      imageSrc: Plant8,
    },
    {
      id: "Plant 9",
      symbol: OfferingSymbol.Plant,
      number: 9,
      imageSrc: Plant9,
    },
    // Treasure
    {
      id: "Treasure 1",
      symbol: OfferingSymbol.Treasure,
      number: 1,
      imageSrc: Treasure1,
    },
    {
      id: "Treasure 2",
      symbol: OfferingSymbol.Treasure,
      number: 2,
      imageSrc: Treasure2,
    },
    {
      id: "Treasure 3",
      symbol: OfferingSymbol.Treasure,
      number: 3,
      imageSrc: Treasure3,
    },
    {
      id: "Treasure 4",
      symbol: OfferingSymbol.Treasure,
      number: 4,
      imageSrc: Treasure4,
    },
    {
      id: "Treasure 5",
      symbol: OfferingSymbol.Treasure,
      number: 5,
      imageSrc: Treasure5,
    },
    {
      id: "Treasure 6",
      symbol: OfferingSymbol.Treasure,
      number: 6,
      imageSrc: Treasure6,
    },
    {
      id: "Treasure 7",
      symbol: OfferingSymbol.Treasure,
      number: 7,
      imageSrc: Treasure7,
    },
    {
      id: "Treasure 8",
      symbol: OfferingSymbol.Treasure,
      number: 8,
      imageSrc: Treasure8,
    },
    {
      id: "Treasure 9",
      symbol: OfferingSymbol.Treasure,
      number: 9,
      imageSrc: Treasure9,
    },
  ];
}
