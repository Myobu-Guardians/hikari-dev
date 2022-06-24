import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { GameBoard } from "../lib/board";
import { NumOfKitsuneCardsInPlay, PlayerId } from "../lib/constants";
import { KitsuneCard } from "../lib/kitsune";
import { OfferingCard } from "../lib/offering";
import { Korona } from "@0xgg/korona";
import { GameStateAction } from "../lib/state";
import toastr from "toastr";
import { canCastSpell } from "../lib/spellFn";

export const BoardContainer = createContainer(() => {
  const [peer, setPeer] = useState<Korona | null>(null);
  const [boardId, setBoardId] = useState<string>("");
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
  const [castingSpellsOfKitsuneCards, setCastingSpellsOfKitsuneCards] =
    useState<KitsuneCard[]>([]);
  const [
    isSelectingKitsuneCardToCastSpellAt,
    setIsSelectingKitsuneCardToCastSpellAt,
  ] = useState<boolean>(false);

  const [playerId, setPlayerId] = useState<string>("");
  const [opponentId, setOpponentId] = useState<string>("");

  const broadcastBoardState = useCallback(() => {
    const boardState = board.saveState();
    const playerId = board.getPreviousActionInitiatorId();
    if (peer && boardState) {
      const stateAction: GameStateAction = {
        type: "UpdateBoard",
        playerId: playerId,
        board: boardState,
      };
      peer.send(stateAction);
    }
  }, [board, peer]);

  const drawKitsuneCard = useCallback(async () => {
    board.drawKitsuneCard(turns);
    board.nextTurn();
    setTurns(board.turns);
    broadcastBoardState();
  }, [board, turns, broadcastBoardState]);

  const toggleOfferingCard_ = useCallback((offeringCard: OfferingCard) => {
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

  const toggleOfferingCard = useCallback(
    (offeringCard: OfferingCard) => {
      toggleOfferingCard_(offeringCard);
      if (peer) {
        const action: GameStateAction = {
          type: "ClickOfferingCard",
          cardId: offeringCard.id,
        };
        peer.send(action);
      }
    },
    [peer, toggleOfferingCard_]
  );

  const discardSelectedOfferingCard = useCallback(() => {
    if (
      selectedOfferingCards.size === 1 &&
      (board.gameMode === "local" || isPlayerTurn)
    ) {
      const offeringCards = Array.from(selectedOfferingCards);
      offeringCards.forEach((offeringCard) => {
        board.discardOfferingCard(offeringCard);
      });
      board.nextTurn();
      setTurns(board.turns);

      broadcastBoardState();
    }
  }, [selectedOfferingCards, board, isPlayerTurn, broadcastBoardState]);

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
        board.nextTurn();
        setTurns(board.turns);
        broadcastBoardState();
      } else {
        alert("Failed to place and activate the card");
      }
    },
    [board, selectedOfferingCards, turns, getPlayer, broadcastBoardState]
  );

  const sendMessage = useCallback(
    (message: string) => {
      if (peer) {
        const action: GameStateAction = {
          type: "SendMessage",
          from: playerId,
          message,
        };
        peer.send(action);
        toastr.info(message, playerId);
      }
    },
    [peer, playerId]
  );

  const castSpell = useCallback(
    (kitsuneCard: KitsuneCard) => {
      if (canCastSpell(kitsuneCard, Array.from(selectedOfferingCards))) {
        setCastingSpellsOfKitsuneCards((castingSpellsOfKitsuneCards) => [
          ...castingSpellsOfKitsuneCards,
          kitsuneCard,
        ]);
      }
    },
    [selectedOfferingCards]
  );
  const cancelCastingSpell = useCallback(() => {
    setIsSelectingKitsuneCardToCastSpellAt(false);
    setCastingSpellsOfKitsuneCards((cards) => cards.slice(1));
  }, []);

  const castSpellAtKitsuneCard = useCallback(
    (targetKitsuneCard: KitsuneCard) => {
      const card = castingSpellsOfKitsuneCards[0];
      if (!card) {
        return alert("Error: castSpellAtKitsuneCard no card to cast spell");
      }
      if (card.spell?.id === "tail-2-light-spell") {
        /** Increase any card number by three */
        board.castTail2LightSpell(
          targetKitsuneCard,
          Array.from(selectedOfferingCards),
          turns
        );
        board.nextTurn();
        setTurns(board.turns);
        cancelCastingSpell();
        broadcastBoardState();
      } else if (card.spell?.id === "tail-2-dark-spell") {
        /** Decrease any card number by three */
        board.castTail2DarkSpell(
          targetKitsuneCard,
          Array.from(selectedOfferingCards),
          turns
        );
        board.nextTurn();
        setTurns(board.turns);
        cancelCastingSpell();
        broadcastBoardState();
      } else {
        alert(`Error: castSpellAtKitsuneCard invalid spell ${card.spell?.id}`);
      }
    },
    [
      selectedOfferingCards,
      castingSpellsOfKitsuneCards,
      board,
      broadcastBoardState,
      turns,
      cancelCastingSpell,
    ]
  );

  useEffect(() => {
    (window as any)["board"] = board;
  }, [board]);

  useEffect(() => {
    setIsPlayerTurn(
      turns % 2 === board.player?.turnRemainder &&
        (board.player.id === playerId || board.gameMode === "local")
    );
    setSelectedOfferingCards(new Set());
    setHighlightedKitsuneCards(new Set());

    setIsSelectingKitsuneCardToReplace(false);
    setSelectedKitsuneCardToActivate(null);
  }, [board, turns, boardId, playerId]);

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

  useEffect(() => {
    // TODO: game over
  }, [board.player?.gamePoints, board.opponent?.gamePoints]);

  useEffect(() => {
    if (board) {
      const playerId = PlayerId;
      let opponentId = "";
      const peer = new Korona({
        peerID: playerId,
        peerJSOptions: {},
        maxPeers: 5,
        onOpen() {
          console.log("peer opened");
          setPlayerId(playerId);

          const targetPeerIDMatch =
            window.location.search.match(/peerId\=(.+)$/);
          if (targetPeerIDMatch) {
            const targetPeerId = targetPeerIDMatch[1];
            peer.requestConnection(targetPeerId);
            setOpponentId(targetPeerId);
            opponentId = targetPeerId;
          }

          (window as any)["peer"] = peer;
          setPeer(peer);
        },
        onData(data: any, connection) {
          console.log("received data: ", data);
          if ("type" in data) {
            const stateAction = data as GameStateAction;
            if (stateAction.type === "CreateBoard") {
              const boardState = stateAction.board;
              board.loadState(boardState);
              setTurns(board.turns);
              setBoardId(board.id);
            } else if (stateAction.type === "UpdateBoard") {
              // TODO: Validate it is the right user
              const boardState = stateAction.board;
              board.loadState(boardState);
              setTurns(board.turns);
              setBoardId(board.id);
            } else if (stateAction.type === "SendMessage") {
              toastr.info(stateAction.message, stateAction.from, {
                timeOut: 8000,
              });
            } else if (stateAction.type === "ClickOfferingCard") {
              const offeringCard = board.offeringCardsInPlay.find(
                (c) => c.id === stateAction.cardId
              );
              if (offeringCard) {
                toggleOfferingCard_(offeringCard);
              }
            }
          }
        },
        onDisconnected() {
          console.log("peer disconnected");
        },
        onPeerJoined(peerId) {
          console.log("peer joined: ", peerId, peer.network);
          if (peer.network.length === 2) {
            if (!opponentId && peerId !== playerId) {
              opponentId = peerId;
              setOpponentId(opponentId);
              console.log("initialize remote game");

              board.initializeBoardForPvP(playerId, opponentId);
              const boardState = board.saveState();
              if (boardState === null) {
                alert("Failed to initialize remote game");
              } else {
                const action: GameStateAction = {
                  type: "CreateBoard",
                  board: boardState,
                };
                console.log(action);
                peer.send(action);

                setTurns(0);
                setBoardId(boardState.id);
              }
            }
          }
        },
        onPeerLeft(peerId) {
          console.log("peer left: ", peerId);
          if (peerId === playerId) {
            setPlayerId("");
            alert("You are disconnected from the Myobu metaverse");
          } else if (peerId === opponentId) {
            setOpponentId("");
            alert(`Your opponent ${opponentId} left`);
          }
        },
        createDataForInitialSync() {
          const boardState = board.saveState();
          return {
            type: "CreateBoard",
            board: boardState,
          };
        },
      });
    }
    return () => {
      if (board) {
        console.log("deconstrucing peer");
      }
    };
  }, [board]);

  useEffect(() => {
    if (
      castingSpellsOfKitsuneCards.length > 0 &&
      !isSelectingKitsuneCardToCastSpellAt
    ) {
      const card = castingSpellsOfKitsuneCards[0];
      // Gain one point
      if (card.spell?.id === "tail-1-light-spell") {
        board.castTail1LightSpell(Array.from(selectedOfferingCards), turns);
        setCastingSpellsOfKitsuneCards((castingSpellsOfKitsuneCards) =>
          castingSpellsOfKitsuneCards.slice(1)
        );
        board.nextTurn();
        setTurns(board.turns);
        broadcastBoardState();
      }
      // Increase any card number by three
      else if (card.spell?.id === "tail-2-light-spell") {
        setIsSelectingKitsuneCardToCastSpellAt(true);
      }
      // Gain three points
      else if (card.spell?.id === "tail-7-light-spell") {
        board.castTail7LightSpell(Array.from(selectedOfferingCards), turns);
        setCastingSpellsOfKitsuneCards((castingSpellsOfKitsuneCards) =>
          castingSpellsOfKitsuneCards.slice(1)
        );
        board.nextTurn();
        setTurns(board.turns);
        broadcastBoardState();
      } // Enemy loses one point
      else if (card.spell?.id === "tail-1-dark-spell") {
        board.castTail1DarkSpell(Array.from(selectedOfferingCards), turns);
        setCastingSpellsOfKitsuneCards((castingSpellsOfKitsuneCards) =>
          castingSpellsOfKitsuneCards.slice(1)
        );
        board.nextTurn();
        setTurns(board.turns);
        broadcastBoardState();
      }
      // Decrease any card number by three
      else if (card.spell?.id === "tail-2-dark-spell") {
        setIsSelectingKitsuneCardToCastSpellAt(true);
      } else {
        alert(`Spell ${card.spell?.id} not implemented`);
      }
    }
  }, [
    board,
    turns,
    selectedOfferingCards,
    castingSpellsOfKitsuneCards,
    broadcastBoardState,
    isSelectingKitsuneCardToCastSpellAt,
  ]);

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

    castSpell,
    castSpellAtKitsuneCard,
    cancelCastingSpell,
    isSelectingKitsuneCardToCastSpellAt,
    castingSpellsOfKitsuneCards,

    // p2p
    playerId,
    opponentId,
    sendMessage,
  };
});
