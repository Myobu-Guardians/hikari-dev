import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { GameBoard } from "../lib/board";
import { NumOfKitsuneCardsInPlay } from "../lib/constants";
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
  const [isSelectingKitsuneCardToReplace, setIsSelectingKitsuneCardToReplace] =
    useState<boolean>(false);
  const [selectedKitsuneCardToActivate, setSelectedKitsuneCardToActivate] =
    useState<KitsuneCard | null>(null);

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

  const getPlayer = useCallback(() => {
    if (isPlayerTurn) {
      return board.player;
    } else {
      return board.opponent;
    }
  }, [board, isPlayerTurn]);

  const placeAndActivateKitsuneCard = useCallback(
    (kitsuneCard: KitsuneCard, kitsuneCardToReplaceWith?: KitsuneCard) => {
      const player = getPlayer();
      setSelectedKitsuneCardToActivate(kitsuneCard);

      // Replace the selected kitsune card with the one to be activated
      if (
        player?.kitsuneCardsInPlay.length === NumOfKitsuneCardsInPlay &&
        !kitsuneCardToReplaceWith &&
        player?.kitsuneCardsInPlay.indexOf(kitsuneCard) < 0
      ) {
        return setIsSelectingKitsuneCardToReplace(true);
      }

      const success = board.placeAndActivateKitsuneCard(
        kitsuneCard,
        Array.from(selectedOfferingCards),
        turns,
        kitsuneCardToReplaceWith
      );
      if (success) {
        setTurns((turns) => turns + 1);
      } else {
        alert("Failed to place and activate the card");
      }
    },
    [board, selectedOfferingCards, turns, getPlayer]
  );

  useEffect(() => {
    (window as any)["board"] = board;
  }, [board]);

  useEffect(() => {
    setIsPlayerTurn(turns % 2 === board.player?.turnRemainder);
    setSelectedOfferingCards(new Set());
    setHighlightedKitsuneCards(new Set());

    setIsSelectingKitsuneCardToReplace(false);
    setSelectedKitsuneCardToActivate(null);
  }, [board, turns]);

  useEffect(() => {
    setHighlightedKitsuneCards(() => {
      const newHighlightedKitsuneCards = new Set<KitsuneCard>();
      const player = isPlayerTurn ? board.player : board.opponent;
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

  useEffect(() => {
    if (!isSelectingKitsuneCardToReplace) {
      setSelectedKitsuneCardToActivate(null);
    }
  }, [isSelectingKitsuneCardToReplace]);

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
    getPlayer,

    isSelectingKitsuneCardToReplace,
    setIsSelectingKitsuneCardToReplace,
    selectedKitsuneCardToActivate,
  };
});
