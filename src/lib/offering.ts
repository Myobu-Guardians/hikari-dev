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

export enum OfferingSymbol {
  Beverage = "Beverage",
  Food = "Food",
  Incense = "Incense",
  MusicInstrument = "MusicInstrument",
  Plant = "Plant",
  Treasure = "Treasure",
}

export interface OfferingCard {
  name?: string;
  symbol: OfferingSymbol;
  number: number;
  imageSrc: string;
}

export const OfferingCards: OfferingCard[] = [
  // Beverage
  {
    name: "Beverage 1",
    symbol: OfferingSymbol.Beverage,
    number: 1,
    imageSrc: Beverage1,
  },
  {
    name: "Beverage 2",
    symbol: OfferingSymbol.Beverage,
    number: 2,
    imageSrc: Beverage2,
  },
  {
    name: "Beverage 3",
    symbol: OfferingSymbol.Beverage,
    number: 3,
    imageSrc: Beverage3,
  },
  {
    name: "Beverage 4",
    symbol: OfferingSymbol.Beverage,
    number: 4,
    imageSrc: Beverage4,
  },
  {
    name: "Beverage 5",
    symbol: OfferingSymbol.Beverage,
    number: 5,
    imageSrc: Beverage5,
  },
  {
    name: "Beverage 6",
    symbol: OfferingSymbol.Beverage,
    number: 6,
    imageSrc: Beverage6,
  },
  {
    name: "Beverage 7",
    symbol: OfferingSymbol.Beverage,
    number: 7,
    imageSrc: Beverage7,
  },
  {
    name: "Beverage 8",
    symbol: OfferingSymbol.Beverage,
    number: 8,
    imageSrc: Beverage8,
  },
  {
    name: "Beverage 9",
    symbol: OfferingSymbol.Beverage,
    number: 9,
    imageSrc: Beverage9,
  },
  // Food
  {
    name: "Food 1",
    symbol: OfferingSymbol.Food,
    number: 1,
    imageSrc: Food1,
  },
  {
    name: "Food 2",
    symbol: OfferingSymbol.Food,
    number: 2,
    imageSrc: Food2,
  },
  {
    name: "Food 3",
    symbol: OfferingSymbol.Food,
    number: 3,
    imageSrc: Food3,
  },
  {
    name: "Food 4",
    symbol: OfferingSymbol.Food,
    number: 4,
    imageSrc: Food4,
  },
  {
    name: "Food 5",
    symbol: OfferingSymbol.Food,
    number: 5,
    imageSrc: Food5,
  },
  {
    name: "Food 6",
    symbol: OfferingSymbol.Food,
    number: 6,
    imageSrc: Food6,
  },
  {
    name: "Food 7",
    symbol: OfferingSymbol.Food,
    number: 7,
    imageSrc: Food7,
  },
  {
    name: "Food 8",
    symbol: OfferingSymbol.Food,
    number: 8,
    imageSrc: Food8,
  },
  {
    name: "Food 9",
    symbol: OfferingSymbol.Food,
    number: 9,
    imageSrc: Food9,
  },
  // Incense
  {
    name: "Incense 1",
    symbol: OfferingSymbol.Incense,
    number: 1,
    imageSrc: Incense1,
  },
  {
    name: "Incense 2",
    symbol: OfferingSymbol.Incense,
    number: 2,
    imageSrc: Incense2,
  },
  {
    name: "Incense 3",
    symbol: OfferingSymbol.Incense,
    number: 3,
    imageSrc: Incense3,
  },
  {
    name: "Incense 4",

    symbol: OfferingSymbol.Incense,
    number: 4,
    imageSrc: Incense4,
  },
  {
    name: "Incense 5",
    symbol: OfferingSymbol.Incense,
    number: 5,
    imageSrc: Incense5,
  },
  {
    name: "Incense 6",
    symbol: OfferingSymbol.Incense,
    number: 6,
    imageSrc: Incense6,
  },
  {
    name: "Incense 7",
    symbol: OfferingSymbol.Incense,
    number: 7,
    imageSrc: Incense7,
  },
  {
    name: "Incense 8",
    symbol: OfferingSymbol.Incense,
    number: 8,
    imageSrc: Incense8,
  },
  {
    name: "Incense 9",
    symbol: OfferingSymbol.Incense,
    number: 9,
    imageSrc: Incense9,
  },
  // MusicInstrument
  {
    name: "MusicInstrument 1",
    symbol: OfferingSymbol.MusicInstrument,
    number: 1,
    imageSrc: MusicInstrument1,
  },
  {
    name: "MusicInstrument 2",
    symbol: OfferingSymbol.MusicInstrument,
    number: 2,
    imageSrc: MusicInstrument2,
  },
  {
    name: "MusicInstrument 3",
    symbol: OfferingSymbol.MusicInstrument,
    number: 3,
    imageSrc: MusicInstrument3,
  },
  {
    name: "MusicInstrument 4",
    symbol: OfferingSymbol.MusicInstrument,
    number: 4,
    imageSrc: MusicInstrument4,
  },
  {
    name: "MusicInstrument 5",
    symbol: OfferingSymbol.MusicInstrument,
    number: 5,
    imageSrc: MusicInstrument5,
  },
  {
    name: "MusicInstrument 6",
    symbol: OfferingSymbol.MusicInstrument,
    number: 6,
    imageSrc: MusicInstrument6,
  },
  {
    name: "MusicInstrument 7",
    symbol: OfferingSymbol.MusicInstrument,
    number: 7,
    imageSrc: MusicInstrument7,
  },
  {
    name: "MusicInstrument 8",
    symbol: OfferingSymbol.MusicInstrument,
    number: 8,

    imageSrc: MusicInstrument8,
  },
  {
    name: "MusicInstrument 9",
    symbol: OfferingSymbol.MusicInstrument,
    number: 9,
    imageSrc: MusicInstrument9,
  },
  // Plant
  {
    name: "Plant 1",
    symbol: OfferingSymbol.Plant,
    number: 1,
    imageSrc: Plant1,
  },
  {
    name: "Plant 2",
    symbol: OfferingSymbol.Plant,
    number: 2,
    imageSrc: Plant2,
  },
  {
    name: "Plant 3",
    symbol: OfferingSymbol.Plant,
    number: 3,

    imageSrc: Plant3,
  },
  {
    name: "Plant 4",
    symbol: OfferingSymbol.Plant,
    number: 4,
    imageSrc: Plant4,
  },
  {
    name: "Plant 5",
    symbol: OfferingSymbol.Plant,
    number: 5,
    imageSrc: Plant5,
  },
  {
    name: "Plant 6",
    symbol: OfferingSymbol.Plant,
    number: 6,
    imageSrc: Plant6,
  },
  {
    name: "Plant 7",
    symbol: OfferingSymbol.Plant,
    number: 7,
    imageSrc: Plant7,
  },
  {
    name: "Plant 8",
    symbol: OfferingSymbol.Plant,
    number: 8,
    imageSrc: Plant8,
  },
  {
    name: "Plant 9",
    symbol: OfferingSymbol.Plant,
    number: 9,
    imageSrc: Plant9,
  },
  // Treasure
  {
    name: "Treasure 1",
    symbol: OfferingSymbol.Treasure,
    number: 1,
    imageSrc: Treasure1,
  },
  {
    name: "Treasure 2",
    symbol: OfferingSymbol.Treasure,
    number: 2,
    imageSrc: Treasure2,
  },
  {
    name: "Treasure 3",
    symbol: OfferingSymbol.Treasure,
    number: 3,
    imageSrc: Treasure3,
  },
  {
    name: "Treasure 4",
    symbol: OfferingSymbol.Treasure,
    number: 4,
    imageSrc: Treasure4,
  },
  {
    name: "Treasure 5",
    symbol: OfferingSymbol.Treasure,
    number: 5,
    imageSrc: Treasure5,
  },
  {
    name: "Treasure 6",
    symbol: OfferingSymbol.Treasure,
    number: 6,
    imageSrc: Treasure6,
  },
  {
    name: "Treasure 7",
    symbol: OfferingSymbol.Treasure,
    number: 7,
    imageSrc: Treasure7,
  },
  {
    name: "Treasure 8",
    symbol: OfferingSymbol.Treasure,
    number: 8,
    imageSrc: Treasure8,
  },
  {
    name: "Treasure 9",
    symbol: OfferingSymbol.Treasure,
    number: 9,
    imageSrc: Treasure9,
  },
];
