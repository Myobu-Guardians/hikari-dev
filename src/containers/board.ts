import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { GameBoard } from "../lib/board";
import { NumOfKitsuneCardsInPlay, PlayerId } from "../lib/constants";
import { KitsuneCard } from "../lib/kitsune";
import {
  OfferingCard,
  OfferingCardType,
  OfferingSymbol,
} from "../lib/offering";
import { Korona } from "@0xgg/korona";
import { GameBoardState, GameStateAction } from "../lib/state";
import toastr from "toastr";
import { canCastSpell } from "../lib/spellFn";
import { Player, PlayerProfile, PlayerProfileRole } from "../lib/player";
import { gitCommit } from "../git_commit";
import { GameContainer } from "./game";

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
      peer.send(stateAction);
    }
    if (boardState) {
      setBoardStates((states) => [...states, boardState]);
    }
  }, [board, peer, gameContainer.signerAddress]);

  const nextTurnIfNecessary = useCallback(() => {
    board.nextTurn();
    setTurns(board.turns);
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
        const sender = gameContainer.signerAddress
          ? gameContainer.signerAddress.slice(0, 12) + "..."
          : playerId;
        const action: GameStateAction = {
          type: "SendMessage",
          from: sender,
          message,
        };
        peer.send(action);
        toastr.info(message, sender);
      }
    },
    [peer, playerId, gameContainer.signerAddress]
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
        card.spell?.id === "tail-4-light-spell" ||
        card.spell?.id === "tail-4-dark-spell"
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
      cancelCastingSpell(true);
    },
    [
      isModifyingSymbolOfKitsuneCard,
      castingSpellsOfKitsuneCards,
      cancelCastingSpell,
    ]
  );

  const castSpellUsingKitsuneCard = useCallback((card: KitsuneCard) => {
    setCastingSpellsOfKitsuneCards((cards) => [card, ...cards]);
    setIsSelectingKitsuneCardToCastSpell(false);
  }, []);

  const checkPassiveSpell = useCallback(() => {
    console.log(
      `checkPassiveSpell total board states length: `,
      boardStates.length
    );
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

      console.log("previousBoardState", previousBoardState);
      console.log("currentBoardState", currentBoardState);
      console.log("opponentPreviousTurn", opponentPreviousTurn);
      console.log("opponentThisTurn", opponentThisTurn);
      console.log("playerThisTurn", playerThisTurn);

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
      console.log("usedOfferingCards", usedOfferingCards);
      console.log("newlyPlacedOfferingCards", newlyPlacedOfferingCards);
      console.log("newlyPlacedKitsuneCards", newlyPlacedKitsuneCards);
      console.log("newlyActivatedKitsuneCards", newlyActivatedKitsuneCards);
      console.log("currentPlacedOfferingCards", currentPlacedOfferingCards);
      const player = playerThisTurn;
      if (newlyActivatedKitsuneCards.length > 0) {
        // Check if tail 3 dark card passive spell will be triggered
        //  "When enemy activates their card, you can cast any spell"
        // If so, set the state to selecting a kitsune card to cast a spell
        console.log("player this turn: ", player);
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
          console.log("** Triggered tail3DarkCard passive spell");
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
        console.log("** Triggered tail5LightCard passive spell");
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
        console.log("** Triggered tail5DarkCard passive spell");
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
        let opponentId = "";
        const roomId = `myobu-hikari-${
          gameContainer.network.chainId
        }-${gitCommit.hash.slice(0, 6)}-private-${roomName}`;
        const playerId = `myobu-hikari-${
          gameContainer.network.chainId
        }-${gitCommit.hash.slice(0, 6)}-private-${gameContainer.signerAddress}`;
        const playerProfile = gameContainer.playerProfile;

        const peer = new Korona({
          peerId: playerId,
          roomId: roomId,
          peerJSOptions: {},
          maxPeers: 5,
          async onOpen() {
            console.log("peer opened");
            setPlayerId(playerId);
            (window as any)["peer"] = peer;
            setPeer(peer);

            setPlayersInRoom([
              Object.assign(playerProfile, {
                role: PlayerProfileRole.Viewer,
              }),
            ]);
          },
          async onData(data: any, connection) {
            console.log("received data: ", data, connection.peer);
            if ("type" in data) {
              const stateAction = data as GameStateAction;
              if (stateAction.type === "CreateBoard") {
                const boardState = stateAction.board;
                board.loadState(boardState);
                setTurns(board.turns);
                setBoardId(board.id);
                setBoardStates([boardState]);
              } else if (stateAction.type === "CheckGameVersion") {
                if (stateAction.gitCommit.hash !== gitCommit.hash) {
                  peer.send({
                    type: "GameVersionsMismatch",
                    gitCommit: gitCommit,
                  });
                  alert(
                    "Game version is out of date. Please refresh the page."
                  );
                } else {
                  peer.send({
                    type: "StartGame",
                  });
                }
              } /* else if (stateAction.type === "GameVersionsMismatch") {
                alert("Game version is out of date. Please refresh the page.");
                // TODO: probably don't need to do this ^^
              }*/ else if (stateAction.type === "StartGame") {
                console.log("initialize remote game");
                board.initializeBoardForPvP(
                  playerId,
                  opponentId,
                  gameContainer.signerAddress,
                  stateAction.walletAddress
                );
                const boardState = board.saveState();
                if (boardState === null) {
                  alert("Failed to initialize remote game");
                } else {
                  setBoardStates([boardState]);
                  const action: GameStateAction = {
                    type: "CreateBoard",
                    board: boardState,
                  };
                  console.log(action);
                  peer.send(action);

                  setTurns(0);
                  setBoardId(boardState.id);
                }
              } else if (stateAction.type === "UpdateBoard") {
                // TODO: Validate it is the right user
                const boardState = stateAction.board;
                board.loadState(boardState);
                setTurns(board.turns);
                setBoardId(board.id);
                setBoardStates((states) => [...states, boardState]);
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
              } else if (stateAction.type === "SetWalletAddress") {
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
              }
            }
          },
          async onDisconnected() {
            console.log("peer disconnected");
            // alert("You disconnected");
          },
          async onPeerJoined(peerId) {
            console.log("peer joined: ", peerId, peer.network);
          },
          async onPeerLeft(peerId) {
            console.log("peer left: ", peerId);
            if (peerId === playerId) {
              setPlayerId("");
              alert("You are disconnected from the Myobu metaverse");
            } else if (peerId === opponentId) {
              setOpponentId("");
              alert(`Your opponent ${opponentId} left`);
            }
          },
          async createDataForInitialSync() {
            console.log("createDataForInitialSync: ", peer.network.size);
            return {};
            /*
            if (peer.network.size === 2) {
              // opponent
              const stateAction: GameStateAction = {
                type: "CheckGameVersion",
                gitCommit: gitCommit,
              };
              return stateAction;
            } else {
              // viewers
              const boardState = board.saveState();
              return {
                type: "CreateBoard",
                board: boardState,
              };
            }*/
          },
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
      toggleOfferingCard_,
      gameContainer.signerAddress,
      gameContainer.network,
      gameContainer.playerProfile,
    ]
  );

  const leavePrivateMatchRoom = useCallback(() => {
    if (peer) {
      peer.peer?.destroy();
      setPeer(null);
    }
  }, [peer]);

  const playAsRoleInPrivateMatchRoom = useCallback(
    (role: PlayerProfileRole) => {
      if (peer && gameContainer.signerAddress) {
        peer.send({
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
    [peer, gameContainer.signerAddress]
  );

  useEffect(() => {
    setIsInPrivateMatchRoom(
      !!(
        peer &&
        peer.peer &&
        gameContainer.network &&
        peer.peer.id.startsWith(
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
      // When you activate any card, you can cast any spell
      // When enemy activates any card, you can cast any spell
      // When `n` Flora Offering is placed, you have n/4 chance to cast any spell
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
    if (peer && typeof gameContainer.signerAddress !== "undefined") {
      console.log("SetWalletAddress: ", gameContainer.signerAddress);
      const action: GameStateAction = {
        type: "SetWalletAddress",
        walletAddress: gameContainer.signerAddress,
      };
      peer.send(action);
    }
  }, [peer, gameContainer.signerAddress]);

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
    playersInRoom,
    playAsRoleInPrivateMatchRoom,
  };
});
