import React from "react";
import { useTranslation } from "react-i18next";
import {
  createKitsuneCards,
  KitsuneCard,
  kitsuneCardIsLightType,
} from "../lib/kitsune";
import KitsuneCardComponent from "./KitsuneCard";

function Cards({ cards }: { cards: KitsuneCard[] }) {
  const [mouseOverCard, setMouseOverCard] = React.useState<KitsuneCard | null>(
    null
  );

  return (
    <div className="flex flex-col sm:flex-row flex-wrap px-2 sm:px-4">
      {cards.map((card) => {
        return (
          <div
            key={`all-cards-${card.id}`}
            className="my-2 sm:m-2 hover:scale-150 hover:z-50 cursor-pointer font-assasin"
            onMouseEnter={() => setMouseOverCard(card)}
            onMouseLeave={() => setMouseOverCard(null)}
          >
            <KitsuneCardComponent
              kitsuneCard={card}
              isInPlay={true}
              showAnimation={mouseOverCard === card}
            ></KitsuneCardComponent>
          </div>
        );
      })}
    </div>
  );
}

export default function CardsModal() {
  const { t } = useTranslation();
  const cards = createKitsuneCards();

  return (
    <>
      <input type="checkbox" id="cards-modal" className="modal-toggle" />

      <label htmlFor="cards-modal" className="modal font-sans">
        <label
          className="modal-box relative pb-10"
          htmlFor=""
          style={{
            maxWidth: "100%",
            maxHeight: "96%",
          }}
        >
          <div className="flex flex-row items-center justify-between text-xl font-bold">
            <h3 className="mb-2">{t("Card library")}</h3>
            <label
              htmlFor="cards-modal"
              className="btn btn-circle btn-sm btn-ghost border-0"
            >
              {"✖"}
            </label>
          </div>
          <p>{t("Light")}</p>
          <Cards
            cards={cards.filter((card) => kitsuneCardIsLightType(card))}
          ></Cards>
          <p>{t("Dark")}</p>
          <Cards
            cards={cards.filter((card) => !kitsuneCardIsLightType(card))}
          ></Cards>
        </label>
      </label>
    </>
  );
}
