import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { GameBoard } from "../lib/board";
import {
  NumOfKitsuneCardsInPlay,
  Tail7DarkLockedOfferingCardsNum,
} from "../lib/constants";
import { KitsuneCard } from "../lib/kitsune";
import {
  OfferingCard,
  OfferingCardType,
  OfferingSymbol,
} from "../lib/offering";
import { Korona, randomId } from "@0xgg/korona";
import { GameBoardState, GameStateAction } from "../lib/state";
import toastr from "toastr";
import { canCastSpell } from "../lib/spellFn";
import { Player, PlayerProfile, PlayerProfileRole } from "../lib/player";
import { gitCommit } from "../git_commit";
import { GameContainer } from "./game";
import {
  getPossibleArrayElementsCombinations,
  toastrMessage,
} from "../lib/utils";
import { useTranslation } from "react-i18next";

export const BoardContainer = createContainer(() => {
  const [peer, setPeer] = useState<Korona | null>(null);
  const [boardId, setBoardId] = useState<string>("");
  const [board] = useState<GameBoard>(new GameBoard());
  const [boardStates, setBoardStates] = useState<GameBoardState[]>([]);
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
    castingPassiveSpellOfKitsuneCard,
    setCastingPassiveSpellOfKitsuneCard,
  ] = useState<KitsuneCard | null>(null);
  const [
    isSelectingKitsuneCardToCastSpellAt,
    setIsSelectingKitsuneCardToCastSpellAt,
  ] = useState<boolean>(false);
  const [
    isSelectingKitsuneCardToCastSpell,
    setIsSelectingKitsuneCardToCastSpell,
  ] = useState<boolean>(false);
  const [isModifyingSymbolOfKitsuneCard, setIsModifyingSymbolOfKitsuneCard] =
    useState<KitsuneCard | null>(null);
  const [playerId, setPlayerId] = useState<string>("");
  const [opponentId, setOpponentId] = useState<string>("");
  const [isInPrivateMatchRoom, setIsInPrivateMatchRoom] =
    useState<boolean>(false);
  const [playersInRoom, setPlayersInRoom] = useState<PlayerProfile[]>([]);
  const [isPlayingGame, setIsPlayingGame] = useState<boolean>(false);
  const [aiIsActing, setAiIsActing] = useState<boolean>(false);
  const [aiKitsuneCardToActivate, setAiKitsuneCardToActivate] = useState<
    KitsuneCard | undefined
  >(undefined);
  const [aiKitsuneCardToCastSpell, setAiKitsuneCardToCastSpell] = useState<
    KitsuneCard | undefined
  >(undefined);

  const { t } = useTranslation();
  const gameContainer = GameContainer.useContainer();

  const resetState = useCallback(() => {
    setSelectedOfferingCards(new Set());
    setHighlightedKitsuneCards(new Set());
    setIsSelectingKitsuneCardToReplace(false);
    setIsSelectingKitsuneCardToCastSpell(false);
    setIsSelectingKitsuneCardToCastSpellAt(false);
    setIsModifyingSymbolOfKitsuneCard(null);
    setSelectedKitsuneCardToActivate(null);
    setCastingPassiveSpellOfKitsuneCard(null);
  }, []);

  const broadcastBoardState = useCallback(() => {
    const boardState = board.saveState();
    const actor = board.getPreviousActor();
    const playerId = actor?.id;
    if (peer && boardState && playerId) {
      // Update boardState player wallet address
      const player =
        boardState.playerA.id === playerId
          ? boardState.playerA
          : boardState.playerB;
      player.walletAddress = gameContainer.signerAddress;
      const stateAction: GameStateAction = {
        type: "UpdateBoard",
        playerId: playerId,
        board: boardState,
      };
      peer.broadcast(stateAction);
    }
    if (boardState) {
      setBoardStates((states) => [...states, boardState]);
    }
  }, [board, peer, gameContainer.signerAddress]);

  const nextTurnIfNecessary = useCallback(() => {
    board.nextTurn();
    setTurns(board.turns);
    setAiIsActing(false);
    broadcastBoardState();
  }, [board, broadcastBoardState]);

  const drawKitsuneCard = useCallback(async () => {
    board.drawKitsuneCard(turns);
    nextTurnIfNecessary();
  }, [board, turns, nextTurnIfNecessary]);

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
        peer.broadcast(action);
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
      nextTurnIfNecessary();
    }
  }, [selectedOfferingCards, board, isPlayerTurn, nextTurnIfNecessary]);

  const getPlayerThisTurn = useCallback(() => {
    if (isPlayerTurn) {
      return board.player;
    } else {
      return board.opponent;
    }
  }, [board, isPlayerTurn]);

  const getPlayerPreviousTurn = useCallback(() => {
    if (isPlayerTurn) {
      return board.opponent;
    } else {
      return board.player;
    }
  }, [board, isPlayerTurn]);

  const placeAndActivateKitsuneCard = useCallback(
    (kitsuneCard: KitsuneCard, kitsuneCardToReplaceWith?: KitsuneCard) => {
      const player = getPlayerThisTurn();
      if (!player) {
        return;
      }
      setSelectedKitsuneCardToActivate(kitsuneCard);

      // Replace the selected kitsune card with the one to be activated
      if (
        player.kitsuneCardsInPlay.length ===
          NumOfKitsuneCardsInPlay +
            (player.extraKitsuneCardsInPlay > 0 ? 1 : 0) &&
        !kitsuneCardToReplaceWith &&
        player.kitsuneCardsInPlay.indexOf(kitsuneCard) < 0
      ) {
        return setIsSelectingKitsuneCardToReplace(true);
      }

      const isPlacingCard = player.kitsuneCardsInPlay.indexOf(kitsuneCard) < 0;
      const success = board.placeAndActivateKitsuneCard(
        kitsuneCard,
        Array.from(selectedOfferingCards),
        turns,
        kitsuneCardToReplaceWith
      );
      if (success) {
        // Check if the player can cast a spell by tail 3 light card.
        //     "When you activate any card, you can cast any spell"
        // If so, set the state to selecting a kitsune card to cast a spell
        const tail3LightCardIndex = player.kitsuneCardsInPlay.findIndex(
          (card) => card.spell?.id === "tail-3-light-spell"
        );

        if (
          // 33% chance to trigger passive
          Math.random() < 0.33 &&
          tail3LightCardIndex >= 0 &&
          !(
            isPlacingCard &&
            player.kitsuneCardsInPlay[tail3LightCardIndex] === kitsuneCard
          ) &&
          player.kitsuneCardsInPlay.filter(
            (card) =>
              card.id !== player.kitsuneCardsInPlay[tail3LightCardIndex].id &&
              card.spell &&
              card.spell.trigger.length > 0
          ).length > 0
        ) {
          setCastingSpellsOfKitsuneCards((cards) =>
            cards.concat(player.kitsuneCardsInPlay[tail3LightCardIndex])
          );
        } else {
          nextTurnIfNecessary();
        }
      } else {
        alert("Failed to place and activate the card");
      }
    },
    [
      board,
      selectedOfferingCards,
      turns,
      getPlayerThisTurn,
      nextTurnIfNecessary,
    ]
  );

  const sendMessage = useCallback(
    (message: string) => {
      if (peer) {
        const myProfile = playersInRoom.find(
          (player) => player.walletAddress === gameContainer.signerAddress
        );
        if (myProfile) {
          const action: GameStateAction = {
            type: "SendMessage",
            from: myProfile,
            message,
          };
          peer.broadcast(action);
          toastrMessage(message, myProfile);
        }
      }
    },
    [peer, playersInRoom, gameContainer.signerAddress]
  );

  const castSpell = useCallback(
    (kitsuneCard: KitsuneCard) => {
      if (canCastSpell(kitsuneCard, Array.from(selectedOfferingCards))) {
        setCastingSpellsOfKitsuneCards((cards) => [kitsuneCard, ...cards]);
      }
    },
    [selectedOfferingCards]
  );

  const cancelCastingSpell = useCallback(
    (spellCasted?: boolean) => {
      setIsSelectingKitsuneCardToCastSpell(false);
      setIsSelectingKitsuneCardToCastSpellAt(false);
      setIsModifyingSymbolOfKitsuneCard(null);
      setCastingPassiveSpellOfKitsuneCard(null);
      setAiKitsuneCardToCastSpell(undefined);

      /*
      console.log("cancelCastingSpell: ");
      console.log("* castSpell: ", spellCasted);
      console.log(
        "* castingPassiveSpellOfKitsuneCard: ",
        castingPassiveSpellOfKitsuneCard
      );
      console.log(
        "* castingSpellsOfKitsuneCards: ",
        castingSpellsOfKitsuneCards
      );
      */

      if (castingPassiveSpellOfKitsuneCard) {
        if (castingSpellsOfKitsuneCards.length === 0) {
          if (
            castingPassiveSpellOfKitsuneCard.spell?.id === "tail-3-light-spell"
          ) {
            nextTurnIfNecessary();
          } else if (
            castingPassiveSpellOfKitsuneCard.spell?.id ===
              "tail-3-dark-spell" ||
            castingPassiveSpellOfKitsuneCard.spell?.id ===
              "tail-5-light-spell" ||
            castingPassiveSpellOfKitsuneCard.spell?.id === "tail-5-dark-spell"
          ) {
            // Do thing, and don't go next turn
          } else {
            alert("Error cancelCastingSpell");
          }
        } else {
          if (spellCasted) {
            if (castingSpellsOfKitsuneCards.length <= 1) {
              setCastingSpellsOfKitsuneCards([]);

              if (
                castingPassiveSpellOfKitsuneCard.spell?.id ===
                  "tail-3-dark-spell" ||
                castingPassiveSpellOfKitsuneCard.spell?.id ===
                  "tail-5-light-spell" ||
                castingPassiveSpellOfKitsuneCard.spell?.id ===
                  "tail-5-dark-spell"
              ) {
                // Do nothing, and don't go next turn
              } else {
                nextTurnIfNecessary();
              }
            } else {
              setCastingSpellsOfKitsuneCards((cards) => [...cards.slice(1)]);
            }
          } else {
            // Put card with passive spell back to the queue
            setCastingSpellsOfKitsuneCards((cards) => [
              castingPassiveSpellOfKitsuneCard,
              ...cards.slice(1),
            ]);
          }
        }
      } else if (spellCasted && castingSpellsOfKitsuneCards.length <= 1) {
        setCastingSpellsOfKitsuneCards([]);
        nextTurnIfNecessary();
      } else {
        setCastingSpellsOfKitsuneCards((cards) => cards.slice(1));
      }
    },
    [
      castingPassiveSpellOfKitsuneCard,
      castingSpellsOfKitsuneCards,
      nextTurnIfNecessary,
    ]
  );

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
        cancelCastingSpell(true);
      } else if (card.spell?.id === "tail-2-dark-spell") {
        /** Decrease any card number by three */
        board.castTail2DarkSpell(
          targetKitsuneCard,
          Array.from(selectedOfferingCards),
          turns
        );
        cancelCastingSpell(true);
      } else if (
        card.spell?.id === "tail-4-light-spell" || // Add any symbol to target card
        card.spell?.id === "tail-4-dark-spell" // Remove any symbol from target card
      ) {
        setIsModifyingSymbolOfKitsuneCard(targetKitsuneCard);
      } else if (card.spell?.id === "tail-9-dark-spell") {
        /** Return target card to its owners hand */
        board.castTail9DarkSpell(
          targetKitsuneCard,
          Array.from(selectedOfferingCards),
          turns
        );
        cancelCastingSpell(true);
      } else {
        alert(`Error: castSpellAtKitsuneCard invalid spell ${card.spell?.id}`);
      }
    },
    [
      selectedOfferingCards,
      castingSpellsOfKitsuneCards,
      board,
      turns,
      cancelCastingSpell,
    ]
  );

  const discardSelectedOfferingCards = useCallback(() => {
    if (selectedOfferingCards && board) {
      selectedOfferingCards.forEach((offeringCard) => {
        board.discardOfferingCard(offeringCard);
      });
    }
  }, [selectedOfferingCards, board]);

  const modifySymbolOfKitsuneCard = useCallback(
    (symbol: OfferingSymbol) => {
      const card = castingSpellsOfKitsuneCards[0];
      if (!card) {
        return alert("Error: castSpellAtKitsuneCard no card to cast spell");
      }
      if (!isModifyingSymbolOfKitsuneCard) {
        return alert("Error: castSpellAtKitsuneCard no card to modify");
      }
      if (card.spell?.id === "tail-4-light-spell") {
        //  Add symbol
        isModifyingSymbolOfKitsuneCard.symbols.push(symbol);
      } else {
        // Remove symbol
        isModifyingSymbolOfKitsuneCard.symbols =
          isModifyingSymbolOfKitsuneCard.symbols.filter((s) => s !== symbol);
      }
      discardSelectedOfferingCards();
      cancelCastingSpell(true);
    },
    [
      isModifyingSymbolOfKitsuneCard,
      castingSpellsOfKitsuneCards,
      cancelCastingSpell,
      discardSelectedOfferingCards,
    ]
  );

  const castSpellUsingKitsuneCard = useCallback((card: KitsuneCard) => {
    setCastingSpellsOfKitsuneCards((cards) => [card, ...cards]);
    setIsSelectingKitsuneCardToCastSpell(false);
  }, []);

  const checkPassiveSpell = useCallback(() => {
    if (boardStates.length > 1) {
      const currentBoardState = boardStates[boardStates.length - 1];
      const previousBoardState = boardStates[boardStates.length - 2];

      if (currentBoardState.turns - previousBoardState.turns !== 1) {
        return;
      }

      // Get the difference between the two boards
      // Get
      //   1. newly placed kitsune cards
      //   2. newly activated kitsune cards
      //   2. used offering cards
      //   3. new placed offering cards
      const opponentPreviousTurn: Player =
        previousBoardState.turns % 2 ===
        previousBoardState.playerA.turnRemainder
          ? previousBoardState.playerA
          : previousBoardState.playerB;
      const opponentThisTurn: Player =
        currentBoardState.playerA.id === opponentPreviousTurn.id
          ? currentBoardState.playerA
          : currentBoardState.playerB;
      const playerThisTurn: Player =
        currentBoardState.playerA.id === opponentPreviousTurn.id
          ? currentBoardState.playerB
          : currentBoardState.playerA;

      // console.log("previousBoardState", previousBoardState);
      // console.log("currentBoardState", currentBoardState);
      // console.log("opponentPreviousTurn", opponentPreviousTurn);
      // console.log("opponentThisTurn", opponentThisTurn);
      // console.log("playerThisTurn", playerThisTurn);

      const newlyPlacedKitsuneCards =
        opponentThisTurn.kitsuneCardsInPlay.filter(
          (kc) =>
            !opponentPreviousTurn.kitsuneCardsInPlay.find(
              (kc2) => kc.id === kc2.id
            )
        );
      const newlyActivatedKitsuneCards =
        opponentThisTurn.kitsuneCardsInPlay.filter((kc) => {
          const previousKitsuneCard =
            opponentPreviousTurn.kitsuneCardsInPlay.find(
              (kc2) => kc.id === kc2.id
            );
          if (previousKitsuneCard) {
            return previousKitsuneCard.ac !== kc.ac;
          } else {
            return true;
          }
        });

      const usedOfferingCards = previousBoardState.offeringCardsInPlay.filter(
        (oc) =>
          !currentBoardState.offeringCardsInPlay.find((oc2) => oc.id === oc2.id)
      );
      const newlyPlacedOfferingCards =
        currentBoardState.offeringCardsInPlay.filter(
          (oc) =>
            !previousBoardState.offeringCardsInPlay.find(
              (oc2) => oc.id === oc2.id
            )
        );
      const currentPlacedOfferingCards = currentBoardState.offeringCardsInPlay;
      // console.log("usedOfferingCards", usedOfferingCards);
      // console.log("newlyPlacedOfferingCards", newlyPlacedOfferingCards);
      // console.log("newlyPlacedKitsuneCards", newlyPlacedKitsuneCards);
      // console.log("newlyActivatedKitsuneCards", newlyActivatedKitsuneCards);
      // console.log("currentPlacedOfferingCards", currentPlacedOfferingCards);
      const player = playerThisTurn;
      if (newlyActivatedKitsuneCards.length > 0) {
        // Check if tail 3 dark card passive spell will be triggered
        //  "When enemy activates their card, you can cast any spell"
        // If so, set the state to selecting a kitsune card to cast a spell
        // console.log("player this turn: ", player);
        const tail3DarkCardIndex = player.kitsuneCardsInPlay.findIndex(
          (kc) => kc.spell?.id === "tail-3-dark-spell"
        );
        if (
          // 33% chance to trigger passive
          Math.random() < 0.33 &&
          tail3DarkCardIndex >= 0 &&
          player.kitsuneCardsInPlay.filter(
            (card) =>
              card.id !== player.kitsuneCardsInPlay[tail3DarkCardIndex].id &&
              card.spell &&
              card.spell.trigger.length > 0
          ).length > 0
        ) {
          // console.log("** Triggered tail3DarkCard passive spell");
          setCastingSpellsOfKitsuneCards((cards) =>
            cards.concat(player.kitsuneCardsInPlay[tail3DarkCardIndex])
          );
        }
      }

      // Check if tail 5 light card passive spell will be triggered
      //  "When `n` Flora Offering is placed, you have n/4 chance to cast any spell"
      // If so, set the state to selecting a kitsune card to cast a spell
      const tail5LightCardIndex = player.kitsuneCardsInPlay.findIndex(
        (kc) => kc.spell?.id === "tail-5-light-spell"
      );
      if (
        currentBoardState.turns % 2 === player.turnRemainder &&
        tail5LightCardIndex >= 0 &&
        currentPlacedOfferingCards.findIndex(
          (card) => card.symbol === OfferingSymbol.Plant
        ) >= 0 &&
        player.kitsuneCardsInPlay.filter(
          (card) =>
            card.id !== player.kitsuneCardsInPlay[tail5LightCardIndex].id &&
            card.spell &&
            card.spell.trigger.length > 0
        ).length > 0 &&
        // n/4 chance to trigger passive
        Math.random() <
          currentPlacedOfferingCards.filter(
            (card) => card.symbol === OfferingSymbol.Plant
          ).length /
            4
      ) {
        // console.log("** Triggered tail5LightCard passive spell");
        setCastingSpellsOfKitsuneCards((cards) =>
          cards.concat(player.kitsuneCardsInPlay[tail5LightCardIndex])
        );
      }

      // Check if tail 5 dark card passive spell will be triggered
      //   "When `n` Bounty Offerings are placed, you have n/4 chance to cast any spell"
      // If so, set the state to selecting a kitsune card to cast a spell
      const tail5DarkCardIndex = player.kitsuneCardsInPlay.findIndex(
        (kc) => kc.spell?.id === "tail-5-dark-spell"
      );
      if (
        currentBoardState.turns % 2 === player.turnRemainder &&
        tail5DarkCardIndex >= 0 &&
        currentPlacedOfferingCards.findIndex(
          (card) => card.symbol === OfferingSymbol.Treasure
        ) >= 0 &&
        player.kitsuneCardsInPlay.filter(
          (card) =>
            card.id !== player.kitsuneCardsInPlay[tail5DarkCardIndex].id &&
            card.spell &&
            card.spell.trigger.length > 0
        ).length > 0 &&
        // n/4 chance to trigger passive
        Math.random() <
          currentPlacedOfferingCards.filter(
            (card) => card.symbol === OfferingSymbol.Treasure
          ).length /
            4
      ) {
        // console.log("** Triggered tail5DarkCard passive spell");
        setCastingSpellsOfKitsuneCards((cards) =>
          cards.concat(player.kitsuneCardsInPlay[tail5DarkCardIndex])
        );
      }
    }
  }, [boardStates]);

  const joinPrivateMatchRoom = useCallback(
    (roomName: string) => {
      if (
        board &&
        gameContainer.signerAddress &&
        gameContainer.network &&
        gameContainer.playerProfile
      ) {
        const prefix = `myobu-hikari-${
          gameContainer.network.chainId
        }-${gitCommit.hash.slice(0, 6)}-private`;
        const roomId = `${prefix}-${roomName}`;
        const myId = `${prefix}-${randomId()}`;
        const playerProfile = gameContainer.playerProfile;

        const peer = new Korona({
          peerId: myId, // Reuse the same Id might cause the versionVectors bug
          roomId: roomId,
          peerJSOptions: {},
          maxPeers: 5,
        });

        peer.on("open", async (peerId) => {
          console.log("peer opened");
          (window as any)["peer"] = peer;
          setPeer(peer);
          const myProfile: PlayerProfile = Object.assign(playerProfile, {
            role: PlayerProfileRole.Viewer,
            peerId: peerId,
          });
          setPlayersInRoom([myProfile]);
        });
      }
      return () => {
        if (board) {
          console.log("deconstrucing peer");
        }
      };
    },
    [
      board,
      gameContainer.signerAddress,
      gameContainer.network,
      gameContainer.playerProfile,
    ]
  );

  const leavePrivateMatchRoom = useCallback(() => {
    if (peer) {
      peer.destroy();
      setPeer(null);

      if (board) {
        board.initializeBoardForLocalPlay();
        const state = board.saveState();
        if (state) {
          setBoardStates([state]);
        }
      }
    }
  }, [peer, board]);

  const playAsRoleInPrivateMatchRoom = useCallback(
    (role: PlayerProfileRole) => {
      if (peer && gameContainer.signerAddress && board.gameMode === "local") {
        peer.broadcast({
          type: "PlayAsRole",
          role: role,
          walletAddress: gameContainer.signerAddress,
        });

        setPlayersInRoom((playerProfiles) => {
          const self = playerProfiles.find(
            (p) => p.walletAddress === gameContainer.signerAddress
          );
          if (self) {
            self.role = role;
          }
          return [...playerProfiles];
        });
      }
    },
    [peer, gameContainer.signerAddress, board]
  );

  const startMatchInPrivateMatchRoom = useCallback(
    (lightPlayer: PlayerProfile, darkPlayer: PlayerProfile) => {
      if (peer && board) {
        if (!peer.isPubsubHost()) {
          return toastr.error("Only host can start match");
        }

        board.initializeBoardForPvP(
          lightPlayer.walletAddress,
          darkPlayer.walletAddress,
          lightPlayer.walletAddress,
          darkPlayer.walletAddress
        );
        const boardState = board.saveState();
        if (!boardState) {
          alert("Failed to initialize remote game");
        } else {
          const action: GameStateAction = {
            type: "CreateBoard",
            board: boardState,
          };
          peer.broadcast(action);
          setBoardStates([boardState]);
        }
      }
    },
    [peer, board]
  );

  useEffect(() => {
    setIsInPrivateMatchRoom(
      !!(
        peer &&
        peer.id &&
        gameContainer.network &&
        peer.id.startsWith(
          `myobu-hikari-${gameContainer.network.chainId}-${gitCommit.hash.slice(
            0,
            6
          )}-private`
        )
      )
    );
  }, [peer, gameContainer.network]);

  useEffect(() => {
    (window as any)["board"] = board;
  }, [board]);

  useEffect(() => {
    setIsPlayerTurn(
      turns % 2 === board.player?.turnRemainder &&
        (board.player.id === playerId || board.gameMode === "local")
    );
    resetState();
    checkPassiveSpell();
  }, [board, turns, boardId, playerId, resetState, checkPassiveSpell]);

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
    if (
      castingSpellsOfKitsuneCards.length > 0 &&
      !isSelectingKitsuneCardToCastSpellAt &&
      !isSelectingKitsuneCardToCastSpell
    ) {
      const card = castingSpellsOfKitsuneCards[0];
      // Gain one point
      if (card.spell?.id === "tail-1-light-spell") {
        board.castTail1LightSpell(Array.from(selectedOfferingCards), turns);
        cancelCastingSpell(true);
      } else if (
        // Increase any card number by three
        card.spell?.id === "tail-2-light-spell" ||
        // Decrease any card number by three
        card.spell?.id === "tail-2-dark-spell" ||
        // Add any symbol to target card
        card.spell?.id === "tail-4-light-spell" ||
        // Remove any symbol from target card
        card.spell?.id === "tail-4-dark-spell" ||
        // Return target card to its owners hand
        card.spell?.id === "tail-9-dark-spell"
      ) {
        setIsSelectingKitsuneCardToCastSpellAt(true);
      }
      // When you activate any card, you have 33% chance to cast any spell
      // When enemy activates their card, you have 33% chance to cast any spell
      // When `n` Flora Offering is placed, you have n/4 chance to cast any spell
      // When X Bounty Offerings are placed, you have X/4 chance to cast any spell
      else if (
        card.spell?.id === "tail-3-light-spell" ||
        card.spell?.id === "tail-3-dark-spell" ||
        card.spell?.id === "tail-5-light-spell" ||
        card.spell?.id === "tail-5-dark-spell"
      ) {
        setCastingPassiveSpellOfKitsuneCard(card); // Set current card with passive spell
        setCastingSpellsOfKitsuneCards((cards) => cards.slice(1)); // Remove the card with passive spell from the casting queue
        setSelectedKitsuneCardToActivate(null);
        // setSelectedOfferingCards(new Set()); // => Cause infinite loop
        setIsSelectingKitsuneCardToCastSpellAt(false);
        setIsSelectingKitsuneCardToCastSpell(true);
        setIsSelectingKitsuneCardToReplace(false);
      }
      // Hide all of your cards for 2 turns
      else if (card.spell?.id === "tail-6-light-spell") {
        board.castTail6LightSpell(Array.from(selectedOfferingCards), turns);
        cancelCastingSpell(true);
      }
      // Can place 1 more kitsune card for 4 turns
      else if (card.spell?.id === "tail-9-light-spell") {
        board.castTail9LightSpell(Array.from(selectedOfferingCards), turns);
        cancelCastingSpell(true);
      }
      // Gain three points
      else if (card.spell?.id === "tail-8-light-spell") {
        board.castTail8LightSpell(Array.from(selectedOfferingCards), turns);
        cancelCastingSpell(true);
      }
      // Draw three offerings, then put them back in any order
      else if (card.spell?.id === "tail-7-light-spell") {
        board.castTail7LightSpell(Array.from(selectedOfferingCards), turns);
        cancelCastingSpell(false); // Don't go to next ture
        setSelectedOfferingCards(new Set());
      }
      // Enemy loses one point
      else if (card.spell?.id === "tail-1-dark-spell") {
        board.castTail1DarkSpell(Array.from(selectedOfferingCards), turns);
        cancelCastingSpell(true);
      }
      // Show all of enemy cards for 2 turns
      else if (card.spell?.id === "tail-6-dark-spell") {
        board.castTail6DarkSpell(Array.from(selectedOfferingCards), turns);
        cancelCastingSpell(true);
      }
      // Enemy loses three points
      else if (card.spell?.id === "tail-8-dark-spell") {
        board.castTail8DarkSpell(Array.from(selectedOfferingCards), turns);
        cancelCastingSpell(true);
      } // `Prevent enemy from using ${Tail7DarkLockedOfferingCardsNum} offerings for ${Tail7DarkLockedOfferingCardsTurns} turns`
      else if (card.spell?.id === "tail-7-dark-spell") {
        board.castTail7DarkSpell(turns);
        cancelCastingSpell(true);
      } else {
        alert(`Spell ${card.spell?.id} not implemented`);
        setIsSelectingKitsuneCardToCastSpell(false);
        setIsSelectingKitsuneCardToCastSpellAt(false);
        setCastingSpellsOfKitsuneCards((castingSpellsOfKitsuneCards) =>
          castingSpellsOfKitsuneCards.slice(1)
        );
      }
    }
  }, [
    board,
    turns,
    selectedOfferingCards,
    castingSpellsOfKitsuneCards,
    isSelectingKitsuneCardToCastSpellAt,
    isSelectingKitsuneCardToCastSpell,
    cancelCastingSpell,
  ]);

  useEffect(() => {
    const boardState = board.saveState();
    if (boardState) {
      setBoardStates([boardState]);
    }
  }, [board]);

  useEffect(() => {
    if (peer && peer.id && board) {
      const onData = async (data: any) => {
        console.log("received data: ", data);
        if ("type" in data) {
          const stateAction = data as GameStateAction;
          if (stateAction.type === "CreateBoard") {
            const boardState = stateAction.board;
            setBoardStates([boardState]);

            const i = document.getElementById(
              "private-match-modal"
            ) as HTMLInputElement;
            if (i) {
              i.checked = false;
            }
          } else if (stateAction.type === "UpdateBoard") {
            // TODO: Validate it is the right user
            const boardState = stateAction.board;
            setBoardStates((states) => [...states, boardState]);
          } else if (stateAction.type === "SendMessage") {
            toastrMessage(stateAction.message, stateAction.from);
          } else if (stateAction.type === "ClickOfferingCard") {
            const offeringCard = board.offeringCardsInPlay.find(
              (c) => c.id === stateAction.cardId
            );
            if (offeringCard) {
              toggleOfferingCard_(offeringCard);
            }
          } else if (stateAction.type === "PlayAsRole") {
            setPlayersInRoom((playerProfiles) => {
              const target = playerProfiles.find(
                (p) => p.walletAddress === stateAction.walletAddress
              );
              if (target) {
                target.role = stateAction.role;
              }
              return [...playerProfiles];
            });
          } else if (stateAction.type === "InitializePrivateRoom") {
            const myProfile = playersInRoom.find(
              (p) => p.walletAddress === gameContainer.signerAddress
            );
            const players = stateAction.players;
            if (myProfile) {
              setPlayersInRoom([myProfile, ...players]);

              const stateAction: GameStateAction = {
                type: "PlayerJoinedRoom",
                player: myProfile,
              };

              peer.broadcast(stateAction);
            }

            const boardState = stateAction.board;
            if (boardState) {
              setBoardStates([boardState]);
            }
          } else if (stateAction.type === "PlayerJoinedRoom") {
            setPlayersInRoom((players) => {
              const index = players.findIndex(
                (p) => p.walletAddress === stateAction.player.walletAddress
              );
              if (index >= 0) {
                players[index] = stateAction.player;
              } else {
                players.push(stateAction.player);
              }
              return [...players];
            });
          }
        }
      };
      const onSync = async (send: (data: any) => void) => {
        console.log("onSync: ", peer.network.size);
        const boardState = board.saveState();
        const stateAction: GameStateAction = {
          type: "InitializePrivateRoom",
          players: playersInRoom,
          board: board.gameMode === "local" ? undefined : boardState,
        };
        send(stateAction);
      };
      const onDisconnected = async () => {
        console.log("Your peer disconnected");
      };
      const onPeerJoined = async (peerId: string) => {
        console.log("peer joined: ", peerId, peer.network);
      };
      const onPeerLeft = async (peerId: string) => {
        console.log("peer left: ", peerId);
        const profile = playersInRoom.find((p) => p.peerId === peerId);
        setPlayersInRoom((players) => {
          return players.filter((p) => p.peerId !== peerId);
        });
        if (
          profile?.walletAddress !== gameContainer.signerAddress &&
          (profile?.walletAddress === playerId ||
            profile?.walletAddress === opponentId)
        ) {
          // alert("You are disconnected from the Myobu metaverse");
          alert(
            `Player ${profile ? `${profile.walletAddress} ` : ""}left the room`
          );
        }
      };

      peer.on("data", onData);
      peer.on("sync", onSync);
      peer.on("disconnected", onDisconnected);
      peer.on("peerJoined", onPeerJoined);
      peer.on("peerLeft", onPeerLeft);
      return () => {
        peer.off("data", onData);
        peer.off("sync", onSync);
        peer.off("disconnected", onDisconnected);
        peer.off("peerJoined", onPeerJoined);
        peer.off("peerLeft", onPeerLeft);
      };
    }
  }, [
    peer,
    board,
    toggleOfferingCard_,
    playersInRoom,
    gameContainer.getPlayerProfileFromWalletAddress,
    gameContainer.signerAddress,
    playerId,
    opponentId,
  ]);

  useEffect(() => {
    const boardState = boardStates[boardStates.length - 1];
    if (board && gameContainer.signerAddress && boardState) {
      if (boardState.playerA.id === gameContainer.signerAddress) {
        setPlayerId(boardState.playerA.id);
        setOpponentId(boardState.playerB.id);
        setIsPlayingGame(true);
      } else if (boardState.playerB.id === gameContainer.signerAddress) {
        setPlayerId(boardState.playerB.id);
        setOpponentId(boardState.playerA.id);
        setIsPlayingGame(true);
      } else {
        // Spectator
        setPlayerId("");
        setOpponentId("");
        setIsPlayingGame(false);
      }
      board.loadState(boardState, gameContainer.signerAddress);
      setTurns(board.turns);
      setBoardId(board.id);
    }
  }, [board, boardStates, gameContainer.signerAddress]);

  // AI logic
  useEffect(() => {
    const waitForSeconds = (seconds: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          return resolve(undefined);
        }, seconds * 1000);
      });
    };

    if (
      board &&
      board.gameMode === "local" &&
      board.turns % 2 === board.opponent?.turnRemainder &&
      board.opponent &&
      board.player &&
      !aiIsActing
    ) {
      (async () => {
        const aiPlayer = board.opponent;
        if (!aiPlayer) {
          return;
        }

        setAiIsActing(true);

        // Get possible combination of offering cards

        const offeringCardsCombinations: OfferingCard[][] =
          getPossibleArrayElementsCombinations(
            board.offeringCardsInPlay
              .map((offeringCard, index, self) => {
                if (
                  board.opponent?.lockOfferingCardsInPlay &&
                  board.opponent.lockOfferingCardsInPlay > 0 &&
                  index >= self.length - Tail7DarkLockedOfferingCardsNum
                ) {
                  return null;
                }
                return offeringCard;
              })
              .filter((x) => !!x) as OfferingCard[]
          );

        const getCardsThatCanBeActivated = (
          kitsuneCards: KitsuneCard[]
        ): {
          kitsuneCard: KitsuneCard;
          offeringCards: OfferingCard[];
        }[] => {
          return kitsuneCards
            .map((kitsuneCard) => {
              let maxEarningPoint = 0;
              let returnValue: {
                kitsuneCard: KitsuneCard;
                offeringCards: OfferingCard[];
              } = {
                kitsuneCard,
                offeringCards: [],
              };
              for (let i = 0; i < offeringCardsCombinations.length; i++) {
                const offeringCards = offeringCardsCombinations[i];
                const earningPoint = board.calculateEarningPoints(
                  kitsuneCard,
                  offeringCards
                );
                if (earningPoint > maxEarningPoint) {
                  maxEarningPoint = earningPoint;
                  returnValue.offeringCards = offeringCards;
                }
              }
              return returnValue;
            })
            .filter((x) => x.offeringCards.length > 0);
        };

        const getCardsThatCanCastSpell = (
          kitsuneCards: KitsuneCard[]
        ): {
          kitsuneCard: KitsuneCard;
          offeringCards: OfferingCard[];
        }[] => {
          return kitsuneCards
            .map((kitsuneCard) => {
              const result: {
                kitsuneCard: KitsuneCard;
                offeringCards: OfferingCard[];
              }[] = [];
              for (let i = 0; i < offeringCardsCombinations.length; i++) {
                const offeringCards = offeringCardsCombinations[i];
                const canCastSpell_ = canCastSpell(kitsuneCard, offeringCards);
                if (canCastSpell_) {
                  result.push({
                    kitsuneCard,
                    offeringCards,
                  });
                }

                if (
                  ((kitsuneCard.spell?.id === "tail-2-dark-spell" || // Decrease any card number by 3
                    kitsuneCard.spell?.id === "tail-4-dark-spell" || // Remove any symbol from target card
                    kitsuneCard.spell?.id === "tail-9-dark-spell") && // Return target card to its owners hand
                    board.player &&
                    board.player.kitsuneCardsInPlay.length === 0) || // player has no cards in play
                  (board.player && board.player?.hideKitsuneCardsInPlay > 0) || // player is hiding cards
                  (typeof kitsuneCard.locked === "number" &&
                    kitsuneCard.locked > 0) ||
                  kitsuneCard.spell?.id === "tail-7-light-spell" // Don't use this spell for now: Tail 7 Light Spell: Draw three offerings, then put them back in any order
                ) {
                  // Cannot cast such spell if player has no kitsune card in play because there is no available target
                  result.splice(result.length - 1, 1);
                }
              }

              return result;
            })
            .flat()
            .filter((x) => x.offeringCards.length > 0);
        };

        // Get kitsune cards in play that can be activated
        const kitsuneCardsThatCanBeActivated: {
          kitsuneCard: KitsuneCard;
          offeringCards: OfferingCard[];
        }[] = getCardsThatCanBeActivated([
          ...aiPlayer.kitsuneCardsInPlay,
          ...aiPlayer.kitsuneCardsInHand,
        ]);

        // Get kitsune cards in play that can cast spell
        const kitsuneCardsThatCanCastSpell: {
          kitsuneCard: KitsuneCard;
          offeringCards: OfferingCard[];
        }[] = getCardsThatCanCastSpell(aiPlayer.kitsuneCardsInPlay);

        console.log(
          `* kitsuneCardsThatCanBeActivated: `,
          kitsuneCardsThatCanBeActivated
        );
        console.log(
          "* kitsuneCardsThatCanCastSpell: ",
          kitsuneCardsThatCanCastSpell
        );

        // Cast spell
        if (kitsuneCardsThatCanCastSpell.length > 0 && Math.random() > 0.7) {
          const randomIndex = Math.floor(
            Math.random() * kitsuneCardsThatCanCastSpell.length
          );
          const kituneCard =
            kitsuneCardsThatCanCastSpell[randomIndex].kitsuneCard;
          const offeringCards =
            kitsuneCardsThatCanCastSpell[randomIndex].offeringCards;
          setSelectedOfferingCards(new Set(offeringCards));
          await waitForSeconds(3);
          setAiKitsuneCardToCastSpell(kituneCard);
        }
        // Place and activate kitsune card
        else if (kitsuneCardsThatCanBeActivated.length > 0) {
          // Randomly place/activate a kitune card
          const randomIndex = Math.floor(
            Math.random() * kitsuneCardsThatCanBeActivated.length
          );
          const kituneCard =
            kitsuneCardsThatCanBeActivated[randomIndex].kitsuneCard;
          const offeringCards =
            kitsuneCardsThatCanBeActivated[randomIndex].offeringCards;
          setSelectedOfferingCards(new Set(offeringCards));
          await waitForSeconds(3);
          setAiKitsuneCardToActivate(kituneCard);
        } else if (aiPlayer.kitsuneCardsInDeck.length > 0) {
          await waitForSeconds(2);
          drawKitsuneCard();
        }
        // TODO: Discard offering cards
        else {
          // No action
          nextTurnIfNecessary();
        }
      })();
    }
  }, [board, drawKitsuneCard, nextTurnIfNecessary, aiIsActing]);

  /**
   * AI activate and place the selected kitsune card
   */
  useEffect(() => {
    if (
      aiIsActing &&
      aiKitsuneCardToActivate &&
      selectedOfferingCards.size > 0 &&
      board &&
      board.opponent
    ) {
      // Randomly replace one kitsune card in hand if necessary
      // TODO: Replace random with more strategic replacement
      const aiPlayer = board.opponent;
      let kitsuneCardToReplaceWith: KitsuneCard | undefined = undefined;
      if (
        aiPlayer.kitsuneCardsInPlay.length >= NumOfKitsuneCardsInPlay &&
        !aiPlayer.kitsuneCardsInPlay.find(
          (card) => card.id === aiKitsuneCardToActivate.id
        )
      ) {
        kitsuneCardToReplaceWith =
          aiPlayer.kitsuneCardsInPlay[
            Math.floor(Math.random() * aiPlayer.kitsuneCardsInPlay.length)
          ];
      }

      placeAndActivateKitsuneCard(
        aiKitsuneCardToActivate,
        kitsuneCardToReplaceWith
      );

      setAiKitsuneCardToActivate(undefined);
      setSelectedOfferingCards(new Set());
    }
  }, [
    board,
    aiKitsuneCardToActivate,
    placeAndActivateKitsuneCard,
    selectedOfferingCards,
    aiIsActing,
  ]);

  /**
   * AI cast spell
   */
  useEffect(() => {
    if (
      aiIsActing &&
      aiKitsuneCardToCastSpell &&
      selectedOfferingCards.size > 0 &&
      board &&
      board.opponent
    ) {
      console.log("* aiKitsuneCardToCastSpell: ", aiKitsuneCardToCastSpell);
      setCastingSpellsOfKitsuneCards([aiKitsuneCardToCastSpell]);
    }
  }, [board, aiKitsuneCardToCastSpell, selectedOfferingCards, aiIsActing]);

  /**
   * AI select target card to cast spell at
   */
  useEffect(() => {
    if (
      aiIsActing &&
      aiKitsuneCardToCastSpell &&
      selectedOfferingCards.size > 0 &&
      board &&
      board.opponent &&
      board.player &&
      isSelectingKitsuneCardToCastSpellAt
    ) {
      if (aiKitsuneCardToCastSpell.spell?.id === "tail-2-light-spell") {
        /** Increase any card number by three */
        const randomIndex = Math.floor(
          Math.random() * board.opponent.kitsuneCardsInPlay.length
        );
        if (randomIndex >= 0) {
          const targetKitsuneCard =
            board.opponent.kitsuneCardsInPlay[randomIndex];
          castSpellAtKitsuneCard(targetKitsuneCard);
        } else {
          cancelCastingSpell(true);
        }
      } else if (
        aiKitsuneCardToCastSpell.spell?.id === "tail-2-dark-spell" ||
        aiKitsuneCardToCastSpell.spell?.id === "tail-9-dark-spell"
      ) {
        /** Decrease any card number by three */
        /** Return target card to its owners hand */
        const randomIndex = Math.floor(
          Math.random() * board.player.kitsuneCardsInPlay.length
        );
        if (randomIndex >= 0) {
          const targetKitsuneCard =
            board.player.kitsuneCardsInPlay[randomIndex];
          castSpellAtKitsuneCard(targetKitsuneCard);
        } else {
          cancelCastingSpell(true);
        }
      } else if (aiKitsuneCardToCastSpell.spell?.id === "tail-4-light-spell") {
        /** Add any symbol to target card */
        const randomIndex = Math.floor(
          Math.random() * board.opponent.kitsuneCardsInPlay.length
        );
        if (randomIndex >= 0) {
          const targetKitsuneCard =
            board.opponent.kitsuneCardsInPlay[randomIndex];
          const availableSymbols = [
            OfferingSymbol.Beverage,
            OfferingSymbol.Food,
            OfferingSymbol.Incense,
            OfferingSymbol.MusicInstrument,
            OfferingSymbol.Plant,
            OfferingSymbol.Treasure,
          ].filter((symbol) => !targetKitsuneCard.symbols.includes(symbol));
          const randomSymbolIndex = Math.floor(
            Math.random() * availableSymbols.length
          );
          if (randomSymbolIndex >= 0) {
            const symbolToAdd = availableSymbols[randomSymbolIndex];
            targetKitsuneCard.symbols.push(symbolToAdd);
          }
          discardSelectedOfferingCards();
          cancelCastingSpell(true);
        } else {
          discardSelectedOfferingCards();
          cancelCastingSpell(true);
        }
      } else if (aiKitsuneCardToCastSpell.spell?.id === "tail-4-dark-spell") {
        // Remove any symbol from target card
        const randomIndex = Math.floor(
          Math.random() * board.player.kitsuneCardsInPlay.length
        );
        if (randomIndex >= 0) {
          const targetKitsuneCard =
            board.player.kitsuneCardsInPlay[randomIndex];
          const randomSymbolIndex = Math.floor(
            Math.random() * targetKitsuneCard.symbols.length
          );
          targetKitsuneCard.symbols.splice(randomSymbolIndex, 1);
          discardSelectedOfferingCards();
          cancelCastingSpell(true);
        } else {
          discardSelectedOfferingCards();
          cancelCastingSpell(true);
        }
      } else {
        alert(
          `Error: AI castSpellAtKitsuneCard invalid spell ${aiKitsuneCardToCastSpell.spell?.id}`
        );
      }
    }
  }, [
    board,
    aiKitsuneCardToCastSpell,
    selectedOfferingCards,
    aiIsActing,
    isSelectingKitsuneCardToCastSpellAt,
    castSpellAtKitsuneCard,
    cancelCastingSpell,
    discardSelectedOfferingCards,
  ]);

  // AI passive spell triggered
  // Skip for now.
  // TODO: implement the logic
  useEffect(() => {
    if (aiIsActing && castingPassiveSpellOfKitsuneCard) {
      cancelCastingSpell(true);
    }
  }, [board, aiIsActing, castingPassiveSpellOfKitsuneCard, cancelCastingSpell]);

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

    isSelectingKitsuneCardToReplace,
    setIsSelectingKitsuneCardToReplace,
    selectedKitsuneCardToActivate,

    castSpell,
    castSpellAtKitsuneCard,
    castSpellUsingKitsuneCard,
    modifySymbolOfKitsuneCard,
    cancelCastingSpell,
    isSelectingKitsuneCardToCastSpellAt,
    isSelectingKitsuneCardToCastSpell,
    isModifyingSymbolOfKitsuneCard,
    castingSpellsOfKitsuneCards,
    castingPassiveSpellOfKitsuneCard,

    getPlayerThisTurn,

    // p2p
    playerId,
    opponentId,
    sendMessage,
    peer,
    joinPrivateMatchRoom,
    leavePrivateMatchRoom,
    isInPrivateMatchRoom,
    isPlayingGame,
    playersInRoom,
    playAsRoleInPrivateMatchRoom,
    startMatchInPrivateMatchRoom,
  };
});
