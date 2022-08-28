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

export const zhCN = {
  translation: {
    Menu: "菜单",
    "Game rules": "游戏规则",
    "Play with friends": "与好友玩游戏",
    "Card library": "卡牌库",
    Settings: "设置",
    Close: "关闭",
    Cancel: "取消",
    "Send message": "发送消息",
    "Connect Wallet": "连接钱包",
    "Disconnect Wallet": "断开钱包",
    "Wrong Network": "请切换到 Ropsten 测试网络",
    "Change Profile": "更改个人资料",
    "Private Match": "私人比赛",
    "Public Match": "公开比赛",
    "Coming Soon": "即将开放",

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
    "board/wallet-not-connected": "钱包未连接",
    "board/local-game": "本地游戏",
    "board/playing-against": "正在对战",
    "board/remote-player": "远程玩家",
    "board/empty-shrine": "空的神社",
    "board/draw-a-card": "抽一张卡牌",
    "board/draw-kitsune-card": "抽一张妖狐卡 ^",
    "board/click-here-to-discard": "点击这里丢弃",
    "board/used-offerings": "已使用的贡品",
    "board/passive-spell-triggered": "被动法术触发。请选择一张妖狐卡施放法术",
    "board/select-kitsune-card-to-replace-with": "请选择要替换的妖狐卡",

    // Card
    "card/cast-spell": "施放法术",
    "card/point": "分",
    "card/points": "分",
    "card/replace-this-card": "替换这张卡牌",
    "card/modify-symbol": "修改符号",
    "card/target-this-card": "选择这张卡牌",
    "card/show-for-turns": "显示 {{turns}} 回合",
    "card/hide-for-turns": "隐藏 {{turns}} 回合",
    "card/locked-for-turns": "锁定 {{turns}} 回合",

    // Spells
    "spells/tail-1-light": "获得 1 分",
    "spells/tail-2-light": "增加任何卡牌数字 3 个",
    "spells/tail-3-light": "当你激活任何卡牌时，你有 33% 的概率施放任何法术",
    "spells/tail-4-light": "将任何符号添加到目标卡牌",
    "spells/tail-5-light":
      "当 X 个花朵贡品卡被放置时，你有 X/4 的概率施放任何法术",
    "spells/tail-6-light": `隐藏你的所有卡牌 ${Tail6LightHidePlayerKitsuneCardsTurns} 个回合`,
    "spells/tail-9-light": `再接下来的 ${Tail9LightSpellExtraKitsuneCardsInPlayTurns} 回合内，可以放置 1 张额外的妖狐卡`,
    "spells/tail-8-light": "获得 3 分",
    "spells/tail-7-light": `抽取 ${Tail7LightSpellExtraOfferingCardsToDraw} 张贡品卡， 然后行动，最后将这些贡品卡随机放回卡库`,
    "spells/tail-1-dark": `敌人失去 1 分`,
    "spells/tail-2-dark": "减少任何卡牌数字 3 个",
    "spells/tail-3-dark": "当敌人激活任何卡牌时，你有 33% 的概率施放任何法术",
    "spells/tail-4-dark": "将任何符号从目标卡牌移除",
    "spells/tail-5-dark": `当 X 个财宝贡品卡被放置时，你有 X/4 的概率施放任何法术`,
    "spells/tail-6-dark": `显示敌人的所有卡牌 ${Tail6DarkShowEnemyKitsuneCardsTurns} 个回合`,
    "spells/tail-9-dark": `返回目标卡牌到所有者的手牌里，并且锁住 ${Tail9DarkLockEnemyKitsuneCardsturns} 个回合`,
    "spells/tail-8-dark": "敌人失去 3 分",
    "spells/tail-7-dark": `阻止敌人在 ${Tail7DarkLockedOfferingCardsTurns} 个回合内使用 ${Tail7DarkLockedOfferingCardsNum} 张贡品卡`,

    // Settings
    "kitsune-card-font": "妖狐卡字体",

    // Private match
    Room: "房间",
    "Room name": "房间名称",
    "Leave room": "离开房间",
    None: "无",
    Spectators: "观看者",
    "Back to match": "返回比赛",
    "Watch match": "观看比赛",
    "Start match": "开始比赛",
    "match/waiting_for_players": "等待玩家加入比赛，请稍候...",
    "match/waiting_for_host_to_start": "等待主机开始比赛，请稍候...",
    Join: "加入",
    Joining: "加入中",
  },
};
