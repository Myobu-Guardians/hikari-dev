import {
  Tail6DarkShowEnemyKitsuneCardsTurns,
  Tail6LightHidePlayerKitsuneCardsTurns,
  Tail9DarkLockEnemyKitsuneCardsturns,
  Tail9LightSpellExtraKitsuneCardsInPlayTurns,
  Tail7DarkLockedOfferingCardsNum,
  Tail7DarkLockedOfferingCardsTurns,
  Tail7LightSpellExtraOfferingCardsToDraw,
  WinPoints,
} from "../../lib/constants";

export const enUS = {
  translation: {
    Menu: "Menu",
    "Game rules": "Game rules",
    "Play with friends": "Play with friends",
    "Card library": "Card library",
    Settings: "Settings",
    Close: "Close",
    Cancel: "Cancel",
    "Send message": "Send message",
    "Connect Wallet": "Connect Wallet",
    "Disconnect Wallet": "Disconnect Wallet",
    "Wrong Network": "Please switch to Ropsten Testnet",
    "Change Profile": "Change Profile",
    "Private Match": "Private Match",
    "Public Match": "Public Match",
    "Coming Soon": "Coming Soon",

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
    "board/wallet-not-connected": "Wallet not connected",
    "board/local-game": "Local game",
    "board/playing-against": "Playing against",
    "board/remote-player": "Remote player",
    "board/empty-shrine": "Empty Shrine",
    "board/draw-a-card": "Draw a card",
    "board/draw-kitsune-card": "Draw a Kitsune card ^",
    "board/click-here-to-discard": "Click here to discard",
    "board/used-offerings": "Used Offerings",
    "board/passive-spell-triggered":
      "Passive spell triggered. Please select a kitunse card to cast spell",
    "board/select-kitsune-card-to-replace-with":
      "Please select the Kitsune card to replace with",

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
    "spells/tail-7-light": `Draw ${Tail7LightSpellExtraOfferingCardsToDraw} offerings, act again, then put them back to deck in any order`,
    "spells/tail-8-light": "Gain 3 points",
    "spells/tail-9-light": `Can place 1 more kitsune card for ${Tail9LightSpellExtraKitsuneCardsInPlayTurns} turns`,
    "spells/tail-1-dark": "Enemy loses 1 point",
    "spells/tail-2-dark": "Decrease any card number by 3",
    "spells/tail-3-dark":
      "When enemy activates their card, you have 33% chance to cast any spell",
    "spells/tail-4-dark": "Remove any symbol from target card",
    "spells/tail-5-dark":
      "When X Bounty Offerings are placed, you have X/4 chance to cast any spell",
    "spells/tail-6-dark": `Show all of enemy's cards for ${Tail6DarkShowEnemyKitsuneCardsTurns} turns`,
    "spells/tail-7-dark": `Prevent enemy from using ${Tail7DarkLockedOfferingCardsNum} offering for ${Tail7DarkLockedOfferingCardsTurns} turns`,
    "spells/tail-8-dark": "Enemy loses 3 points",
    "spells/tail-9-dark": `Return target card to its owners hand and lock for ${Tail9DarkLockEnemyKitsuneCardsturns} turns`,

    // Settings
    "kitsune-card-font": "Kitsune card font",

    // Private match
    Room: "Room",
    "Room name": "Room name",
    "Leave room": "Leave room",
    None: "None",
    Spectators: "Spectators",
    "Back to match": "Back to match",
    "Watch match": "Watch match",
    "Start match": "Start match",
    "match/waiting_for_players":
      "Waiting for light and dark players to get ready",
    "match/waiting_for_host_to_start": "Waiting for room host to start match",
    Join: "Join",
    Joining: "Joining",
  },
};
