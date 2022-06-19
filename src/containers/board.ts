import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { GameBoard } from "../lib/board";
import { KitsuneCard } from "../lib/kitsune";
import { OfferingCard } from "../lib/offering";

export const BoardContainer = createContainer(() => {
  const [board, setBoard] = useState<GameBoard>(new GameBoard());
  const [turns, setTurns] = useState<number>(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);
  const [selectedOfferingCards, setSelectedOfferingCards] = useState<
    Set<OfferingCard>
  >(new Set());
  const [highlightedKitsuneCards, setHighlightedKitsuneCards] = useState<
    Set<KitsuneCard>
  >(new Set());
  const [
    isSelectingKitsuneCardToReplaceWith,
    setIsSelectingKitsuneCardToReplaceWith,
  ] = useState<boolean>(false);

  const drawKitsuneCard = useCallback(async () => {
    board.drawKitsuneCard(turns);
    setTurns((turns) => turns + 1);
  }, [board, turns]);

  const toggleOfferingCard = useCallback((offeringCard: OfferingCard) => {
    setSelectedOfferingCards((selectedOfferingCards) => {
      const newSelectedOfferingCards = new Set(selectedOfferingCards);
      if (newSelectedOfferingCards.has(offeringCard)) {
        newSelectedOfferingCards.delete(offeringCard);
      } else {
        newSelectedOfferingCards.add(offeringCard);
      }
      return newSelectedOfferingCards;
    });
  }, []);

  const discardSelectedOfferingCard = useCallback(() => {
    if (selectedOfferingCards.size === 1) {
      const offeringCards = Array.from(selectedOfferingCards);
      offeringCards.forEach((offeringCard) => {
        board.discardOfferingCard(offeringCard);
      });
      setTurns((turns) => turns + 1);
    }
  }, [selectedOfferingCards, board]);

  const placeAndActivateKitsuneCard = useCallback(
    (kitsuneCard: KitsuneCard, replaceKitsuneCard?: KitsuneCard) => {
      const success = board.placeAndActivateKitsuneCard(
        kitsuneCard,
        Array.from(selectedOfferingCards),
        turns,
        replaceKitsuneCard
      );
      if (success) {
        setTurns((turns) => turns + 1);
      } else {
        alert("Failed to place and activate the card");
      }
    },
    [board, selectedOfferingCards, turns]
  );

  useEffect(() => {
    (window as any)["board"] = board;
  }, [board]);

  useEffect(() => {
    setIsPlayerTurn(turns % 2 === board.player?.turnRemainder);
    setSelectedOfferingCards(new Set());
    setHighlightedKitsuneCards(new Set());
  }, [board, turns]);

  useEffect(() => {
    setHighlightedKitsuneCards(() => {
      const newHighlightedKitsuneCards = new Set<KitsuneCard>();
      const player = isPlayerTurn ? board.player : board.opponent;
      console.log("player: ", player);
      const kitsuneCards = [
        ...(player?.kitsuneCardsInHand || []),
        ...(player?.kitsuneCardsInPlay || []),
      ];
      const offeringCards = Array.from(selectedOfferingCards);
      if (!offeringCards.length) {
        return newHighlightedKitsuneCards;
      }
      for (const kitsuneCard of kitsuneCards) {
        const earningPoints = board.calculateEarningPoints(
          kitsuneCard,
          offeringCards
        );
        if (earningPoints > 0) {
          newHighlightedKitsuneCards.add(kitsuneCard);
        }
      }
      return newHighlightedKitsuneCards;
    });
  }, [isPlayerTurn, board, selectedOfferingCards]);

  return {
    board,
    turns,
    isPlayerTurn,
    selectedOfferingCards,
    highlightedKitsuneCards,
    drawKitsuneCard,
    toggleOfferingCard,
    discardSelectedOfferingCard,
    placeAndActivateKitsuneCard,
  };
});
