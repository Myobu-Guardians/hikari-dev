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

export const deDE = {
  translation: {
    Menu: "Menü",
    "Game rules": "Spielregeln",
    "Play with friends": "Spiele mit Freunden",
    "Card library": "Kartensammlung",
    Settings: "Einstellungen",
    Close: "Schließen",
    Cancel: "Abbruch",
    "Send message": "Nachricht schicken",
    "Connect Wallet": "Wallet verbinden",
    "Disconnect Wallet": "Wallet trennen",
    "Wrong Network": "Bitte wechsle zu Ropsten Testnetzwerk",
    "Change Profile": "Profil ändern",
    "Private Match": "Privates Spiel",
    "Public Match": "Öffentliches Spiel",
    "Coming Soon": "Bald Verfügbar",

    "menu/invite-success": `Einladungslink zwischengespeichert. Teile ihn mit deinen Freunden!`,
    "menu/invite-fail-title": "Verbindung zum Myobu-Metaverse fehlgeschlagen.",
    "menu/invite-fail-message": "Versuche die Seite neuzuladen.",

    // Game rules
    "Code version": "Version des Codes",
    "game-rules/subtitle":
      "Was du in deinem Zug tun kannst (Nur eine Aktion pro Zug)",
    "game-rules/action-1": "Ziehe eine Kitsune-Karte",
    "game-rules/action-2": "Platziere und aktiviere eine Kitsune-Karte",
    "game-rules/action-3": "Aktiviere eine Kitsune-Karte",
    "game-rules/action-4": "Wirke einen Kitsune-Zauber",
    "game-rules/action-5": "Entferne alle Gaben",
    "game-rules/subtitle-2":
      "Du kannst eine Kitsune-Karte auf einem leeren Feld platzieren ODER mit einer bereits platzierten Kitsune-Karte austauschen (welche dann in deine Hand zurückkehrt).",
    "game-rules/win-requirements": `Der erste Spieler, der ${WinPoints} erreicht, gewinnt.`,

    // Card library
    Light: "Licht",
    Dark: "Dunkelheit",

    // Board
    "board/your-id": "Deine ID",
    "board/connecting": "Verbinde mit dem Myobu-Metaverse",
    "board/wallet-not-connected": "Wallet nicht verbunden",
    "board/local-game": "Lokales Spiel",
    "board/playing-against": "Spiel gegen",
    "board/remote-player": "Gegner",
    "board/empty-shrine": "Leerer Schrein",
    "board/draw-a-card": "Zieh eine Karte",
    "board/draw-kitsune-card": "Zieh eine Kitsune-Karte^",
    "board/click-here-to-discard": "Klicke hier um abzuwerfen",
    "board/used-offerings": "Verwendete Gaben",
    "board/passive-spell-triggered":
      "Passiver Zauber ausgelöst. Bitte wähle eine Kitsune-Karte um den Zauber zu wirken",

    // Card
    "card/cast-spell": "Wirke Zauber",
    "card/point": "Punkt",
    "card/points": "Punkte",
    "card/replace-this-card": "Tausche diese Karte aus",
    "card/modify-symbol": "Modifiziere das Symbol",
    "card/target-this-card": "Ziele auf diese Karte",
    "card/show-for-turns": "Zeige für {{turns}} Züge",
    "card/hide-for-turns": "Verstecke für {{turns}} Züge",
    "card/locked-for-turns": "Gesperrt für {{turns}} Züge",

    // Spells
    "spells/tail-1-light": "Erhalte einen Punkt",
    "spells/tail-2-light": "Erhöhe eine Kartennummer um 3",
    "spells/tail-3-light":
      "Wenn du eine Karte aktivierst, wirkst du zu 33% einen Zauber",
    "spells/tail-4-light": "Füge ein Symbol zur gewählten Karte hinzu",
    "spells/tail-5-light":
      "Wenn X Blumegaben platziert werden, besteht eine Chance von X/4 einen Zauber zu wirken",
    "spells/tail-6-light": `Verstecke alle deine Karten für ${Tail6LightHidePlayerKitsuneCardsTurns} Züge`,
    "spells/tail-9-light": `Platziere eine weitere Kitsune-Karte für ${Tail9LightSpellExtraKitsuneCardsInPlayTurns} Züge`,
    "spells/tail-8-light": "Erhalte 3 Punkte",
    "spells/tail-7-light": `Zieh ${Tail7LightSpellExtraOfferingCardsToDraw} Gaben, handle erneut, tue sie in beliebiger Reihenfolge zurück ins Deck`,
    "spells/tail-1-dark": "Der Gegner verliert 1 Punkt",
    "spells/tail-2-dark": "Verringere eine Kartennummer um 3",
    "spells/tail-3-dark":
      "Wenn dein Gegner eine Karte aktiviert, wirkst du zu 33% einen Zauber",
    "spells/tail-4-dark": "Entferne alle Symbole von der Zielkarte",
    "spells/tail-5-dark":
      "Wenn X Kopfgelder platziert wurden,  besteht eine Chance von X/4 einen Zauber zu wirken",
    "spells/tail-6-dark": `Zeige alle gegnerischen Karten für ${Tail6DarkShowEnemyKitsuneCardsTurns} Züge`,
    "spells/tail-9-dark": `Gib dir Zielkarte auf die Hand ihres Besitzers zurück und sperre sie für ${Tail9DarkLockEnemyKitsuneCardsturns} Züge`,
    "spells/tail-8-dark": "Der Gegner verliert 3 Punkte",
    "spells/tail-7-dark": `Hindert deinen Gegner an ${Tail7DarkLockedOfferingCardsNum} Gaben für ${Tail7DarkLockedOfferingCardsTurns} Züge`,

    // Settings
    "kitsune-card-font": "Kitsune-Karten Schriftart",

    // Private match
    Room: "Raum",
    "Room name": "Raumname",
    "Leave room": "Raum verlassen",
    None: "Keiner",
    Spectators: "Zuschauer",
    "Back to match": "Zurück zum Spiel",
    "Watch match": "Spiel beobachten",
    "Start match": "Spiel starten",
    "match/waiting_for_players":
      "Warte auf weitere Spieler, um das Spiel zu starten",
    "match/waiting_for_host_to_start":
      "Warte auf den Host, um das Spiel zu starten",
    Join: "Beitreten",
    Joining: "Beitreten",
  },
};
