import {
  Tail6DarkShowEnemyKitsuneCardsTurns,
  Tail6LightHidePlayerKitsuneCardsTurns,
  Tail7DarkLockEnemyKitsuneCardsturns,
  Tail7LightSpellExtraKitsuneCardsInPlayTurns,
  Tail9DarkLockedOfferingCardsNum,
  Tail9DarkLockedOfferingCardsTurns,
  Tail9LightSpellExtraOfferingCardsToDraw,
  WinPoints,
} from "../../lib/constants";

export const enUS = {
  translation: {
    Menu: "Menu",
    "Game rules": "Game rules",
    "Play with friends": "Play with friends",
    "Card library": "Card library",
    Close: "Close",
    Cancel: "Cancel",
    "Send message": "Send message",

    "menu/invite-success": `Invite link copied to clipboard. Share it with your friends!`,
    "menu/invite-fail-title": "Failed to connect to Myobu metaverse",
    "menu/invite-fail-message": "Try reloading the web page",

    // Game rules
    "Code version": "Code version",
    "game-rules/subtitle":
      "What you can do on your turn (only one action per turn)",
    "game-rules/action-1": "Draw a Kitsune card",
    "game-rules/action-2": "Place and activate Kitsune card",
    "game-rules/action-3": "Activate Kitsune card",
    "game-rules/action-4": "Cast Kitsune spell",
    "game-rules/action-5": "Remove any Offering",
    "game-rules/subtitle-2":
      "You can plase a Kitsune card on empty space OR replace with an already placed Kitsune card (that then goes into your hand).",
    "game-rules/win-requirements": `First player that scores ${WinPoints} points wins.`,

    // Card library
    Light: "Light",
    Dark: "Dark",

    // Board
    "board/your-id": "Your ID",
    "board/connecting": "Connecting to Myobu Metaverse",
    "board/local-game": "Local game",
    "board/playing-against": "Playing against",
    "board/empty-shrine": "Empty Shrine",
    "board/draw-a-card": "Draw a card",
    "board/draw-kitsune-card": "Draw a Kitsune card ^",
    "board/click-here-to-discard": "Click here to discard",
    "board/used-offerings": "Used Offerings",

    // Card
    "card/cast-spell": "Cast Spell",
    "card/point": "point",
    "card/points": "points",
    "card/replace-this-card": "Replace this card",
    "card/modify-symbol": "Modify symbol",
    "card/target-this-card": "Target this card",
    "card/show-for-turns": "Show for {{turns}} turns",
    "card/hide-for-turns": "Hide for {{turns}} turns",
    "card/locked-for-turns": "Locked for {{turns}} turns",

    // Spells
    "spells/tail-1-light": "Gain 1 point",
    "spells/tail-2-light": "Increase any card number by 3",
    "spells/tail-3-light":
      "When you activate any card, you have 33% chance to cast any spell",
    "spells/tail-4-light": "Add any symbol to target card",
    "spells/tail-5-light":
      "When X Flora Offerings are placed, you have X/4 chance to cast any spell",
    "spells/tail-6-light": `Hide all of your cards for ${Tail6LightHidePlayerKitsuneCardsTurns} turns`,
    "spells/tail-7-light": `Can place 1 more kitsune card for ${Tail7LightSpellExtraKitsuneCardsInPlayTurns} turns`,
    "spells/tail-8-light": "Gain 3 points",
    "spells/tail-9-light": `Draw ${Tail9LightSpellExtraOfferingCardsToDraw} offerings, act again, then put them back to deck in any order`,
    "spells/tail-1-dark": "Enemy loses 1 point",
    "spells/tail-2-dark": "Decrease any card number by 3",
    "spells/tail-3-dark":
      "When enemy activates their card, you have 33% chance to cast any spell",
    "spells/tail-4-dark": "Remove any symbol from target card",
    "spells/tail-5-dark":
      "When X Bounty Offerings are placed, you have X/4 chance to cast any spell",
    "spells/tail-6-dark": `Show all of enemy's cards for ${Tail6DarkShowEnemyKitsuneCardsTurns} turns`,
    "spells/tail-7-dark": `Return target card to its owners hand and lock for ${Tail7DarkLockEnemyKitsuneCardsturns} turns`,
    "spells/tail-8-dark": "Enemy loses 3 points",
    "spells/tail-9-dark": `Prevent enemy from using ${Tail9DarkLockedOfferingCardsNum} offering for ${Tail9DarkLockedOfferingCardsTurns} turns`,
  },
};
