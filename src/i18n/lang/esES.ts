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

export const esES = {
  translation: {
    Menu: "Menu",
    "Game rules": "Reglas del juego",
    "Play with friends": "juego con amigos",
    "Card library": "librería de cartas",
    Settings: "Ajustes",
    Close: "Cierra",
    Cancel: "Cancela",
    "Send message": "Envía mensaje",
    "Connect Wallet": "Conecta tu monedero",
    "Disconnect Wallet": "Desconecta tu monedero",
    "Wrong Network": "Por favor, cambia a la red de pruebas de Ropsten",
    "Change Profile": "Cambia tu perfil",
    "Private Match": "Partida privada",
    "Public Match": "Partida pública",
    "Coming Soon": "Próximamente",

    "menu/invite-success": `link de invitación copiado en portapapeles. Compartelo con tus amigos!`,
    "menu/invite-fail-title": "Fallo de conexión al Metaverso de MYOBU",
    "menu/invite-fail-message": "Trata de recargar la página web",

    // Game rules
    "Code version": "Versión de Codigo",
    "game-rules/subtitle":
      "Que puedes hacer en tu turno (Solo una acción por turno)",
    "game-rules/action-1": "Extrae una carta Kitsune",
    "game-rules/action-2": "Colocar y activar una carta Kitsune",
    "game-rules/action-3": "Activa una carta Kitsune",
    "game-rules/action-4": "Lanza un hechizo Kitsune",
    "game-rules/action-5": "Retira cualquier Ofrenda",
    "game-rules/subtitle-2":
      "Tu puedes colocar una carta Kitsune en espacio vacío O sustituir una carta Kitsune ya colocada (esta entonces vuelve a mano de cartas).",
    "game-rules/win-requirements": `Primer jugador que consiga  ${WinPoints} puntos gana`,

    // Card library
    Light: "light",
    Dark: "Dark",

    // Board
    "board/your-id": "tu ID",
    "board/connecting": "Conectando al Metaverso de Myobu",
    "board/wallet-not-connected": "Billetera no conectada",
    "board/local-game": "Juego local",
    "board/playing-against": "Jugando contra",
    "board/remote-player": "Jugador remoto",
    "board/empty-shrine": "Santuario Vacío",
    "board/draw-a-card": "extrae una carta",
    "board/draw-kitsune-card": "Extrae una carta Kitsune ^",
    "board/click-here-to-discard": "Click aquí para descartar",
    "board/used-offerings": "Ofrendas Usadas",
    "board/passive-spell-triggered":
      "Hechizo pasivo activado. Selecciona una carta Kitsune para lanzar el hechizo",
    "board/select-kitsune-card-to-replace-with":
      "Selecciona una carta Kitsune para reemplazar",
    "board/you-wins": "Ganas!",
    "board/you-loses": "Pierdes!",

    // Card
    "card/cast-spell": "lanza hechizo",
    "card/point": "punto",
    "card/points": "puntos",
    "card/replace-this-card": "Sutituye esta carta",
    "card/modify-symbol": "Modifica símbolo",
    "card/target-this-card": "Selecciona esta carta",
    "card/show-for-turns": "Enseña para {{turns}} turnos",
    "card/hide-for-turns": "Esconde para {{turns}} turnos",
    "card/locked-for-turns": "Bloqueado {{turns}} turnos",

    // Spells
    "spells/tail-1-light": "Gana 1 punto",
    "spells/tail-2-light": "Incrementa en 3 cualquier número de carta",
    "spells/tail-3-light":
      "Cuando tu activas cualquier carta , tu tienes 33% de posibilidad de lanzar cualquier hechizo",
    "spells/tail-4-light": "Añade cualquier símbolo a la carta seleccionada",
    "spells/tail-5-light":
      "Cuando la ofrenda  X Flora es colocada, tu tienes X/4 posibilidades de lanzar cualquier hechizo",
    "spells/tail-6-light": `Esconde todas tus cartas por ${Tail6LightHidePlayerKitsuneCardsTurns} turnos`,
    "spells/tail-9-light": `Puede colocar 1 carta Kitsune mas por  ${Tail9LightSpellExtraKitsuneCardsInPlayTurns} turnos`,
    "spells/tail-8-light": "Gana 3 puntos",
    "spells/tail-7-light": `Extrae ${Tail7LightSpellExtraOfferingCardsToDraw} ofrendas, actua otra vez, entonce ponla de nuevo en la baraja de cartas en cualquier orden`,
    "spells/tail-1-dark": "Enemigo pierde 1 punto",
    "spells/tail-2-dark": "Reduce el número de cualquier carta en 3",
    "spells/tail-3-dark":
      "Cuando el enemigo activa su carta, tu tienes 33% de posibilidades de lanzar cualquier hechizo",
    "spells/tail-4-dark": "Retira cualquier símbolo de la carta seleccionada",
    "spells/tail-5-dark":
      "Cuando X Ofrendas de generosidad son colocadas, tu tienes  X/4 posibilidades de lanzar cualquier hechizo",
    "spells/tail-6-dark": `Enseña todas las cartas enemigas por ${Tail6DarkShowEnemyKitsuneCardsTurns} turnos`,
    "spells/tail-9-dark": `Devuelve la carta seleccionada a sus Propietarios y bloquea por  ${Tail9DarkLockEnemyKitsuneCardsturns} turnos`,
    "spells/tail-8-dark": "Enemigo pierde 3 puntos",
    "spells/tail-7-dark": `Evita que el enemigo use ${Tail7DarkLockedOfferingCardsNum} ofrendas por ${Tail7DarkLockedOfferingCardsTurns} turnos`,

    // Settings
    "kitsune-card-font": "Fuente de cartas Kitsune",

    // Private match
    Room: "Sala",
    "Room name": "Nombre de la sala",
    "Leave room": "Salir de la sala",
    None: "Ninguno",
    Spectators: "Espectadores",
    "Back to match": "Volver a la partida",
    "Watch match": "Ver partida",
    "Start match": "Iniciar partida",
    "match/waiting_for_players": "Esperando a que los jugadores se conecten",
    "match/waiting_for_host_to_start": "Esperando al host para iniciar",
    Join: "Unirse",
    Joining: "Uniéndose",
  },
};
