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

export const zhCN = {
  translation: {
    Menu: "菜单",
    "Game rules": "游戏规则",
    "Play with friends": "与好友玩游戏",
    "Card library": "卡牌库",
    Close: "关闭",

    "menu/invite-success": `邀请链接已复制到剪贴板，分享给好友吧！`,
    "menu/invite-fail-title": "无法连接到 Myobu 元宇宙",
    "menu/invite-fail-message": "请重新刷新页面",

    // Game rules
    "Code version": "代码版本",
    "game-rules/subtitle": "你可以在你的回合做什么（每回合只能做一个动作）",
    "game-rules/action-1": "抽一张妖狐卡",
    "game-rules/action-2": "放置并激活妖狐卡",
    "game-rules/action-3": "激活妖狐卡",
    "game-rules/action-4": "施放妖狐法术",
    "game-rules/action-5": "移除任意一张贡品卡",
    "game-rules/subtitle-2":
      "你可以放置妖狐卡在空白处，或者替换已经放置的妖狐卡（那么它就会进入你的手牌）。",
    "game-rules/win-requirements": `第一个获得 ${WinPoints} 分的玩家获胜。`,

    // Card library
    Light: "光",
    Dark: "暗",

    // Board
    "board/your-id": "你的 ID",
    "board/connecting": "正在连接到 Myobu 元宇宙",
    "board/local-game": "本地游戏",
    "board/playing-against": "正在对战",

    // Spells
    "spells/tail-1-light": "获得 1 分",
    "spells/tail-2-light": "增加任何卡牌数字 3 个",
    "spells/tail-3-light": "当你激活任何卡牌时，你有 33% 的概率施放任何法术",
    "spells/tail-4-light": "将任何符号添加到目标卡牌",
    "spells/tail-5-light":
      "当 X 个花朵贡品卡被放置时，你有 X/4 的概率施放任何法术",
    "spells/tail-6-light": `隐藏你的所有卡牌 ${Tail6LightHidePlayerKitsuneCardsTurns} 个回合`,
    "spells/tail-7-light": `再接下来的 ${Tail7LightSpellExtraKitsuneCardsInPlayTurns} 回合内，可以放置 1 张额外的妖狐卡`,
    "spells/tail-8-light": "获得 3 分",
    "spells/tail-9-light": `抽取 ${Tail9LightSpellExtraOfferingCardsToDraw} 张贡品卡， 然后行动，最后将这些贡品卡随机放回卡库`,
    "spells/tail-1-dark": `敌人失去 1 分`,
    "spells/tail-2-dark": "减少任何卡牌数字 3 个",
    "spells/tail-3-dark": "当敌人激活任何卡牌时，你有 33% 的概率施放任何法术",
    "spells/tail-4-dark": "将任何符号从目标卡牌移除",
    "spells/tail-5-dark": `当 X 个财宝贡品卡被放置时，你有 X/4 的概率施放任何法术`,
    "spells/tail-6-dark": `显示敌人的所有卡牌 ${Tail6DarkShowEnemyKitsuneCardsTurns} 个回合`,
    "spells/tail-7-dark": `返回目标卡牌到所有者的手牌里，并且锁住 ${Tail7DarkLockEnemyKitsuneCardsturns} 个回合`,
    "spells/tail-8-dark": "敌人失去 3 分",
    "spells/tail-9-dark": `阻止敌人在 ${Tail9DarkLockedOfferingCardsTurns} 个回合内使用 ${Tail9DarkLockedOfferingCardsNum} 张贡品卡`,
  },
};
