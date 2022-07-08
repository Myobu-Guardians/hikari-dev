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

export const jaJP = {
  translation: {
    Menu: "メニュー",
    "Game rules": "ゲームルール",
    "Play with friends": "友達と遊ぶ",
    "Card library": "カードライブラリ",
    Settings: "設定",
    Close: "閉じる",
    Cancel: "キャンセル",
    "Send message": "メッセージを送る",

    "menu/invite-success": `邀請リンクをクリップボードにコピーしました！友達にシェアしてください！`,
    "menu/invite-fail-title": "Myobu 元宇宙に接続できませんでした",
    "menu/invite-fail-message": "ページをリフレッシュしてください",

    // Game rules
    "Code version": "コードバージョン",
    "game-rules/subtitle":
      "あなたのターンで行うことができること (1ターンに1つのアクション)",
    "game-rules/action-1": "狐カードを引く",
    "game-rules/action-2": "狐カードを置くときにアクティブにする",
    "game-rules/action-3": "狐カードをアクティブにする",
    "game-rules/action-4": "狐の魔法を使う",
    "game-rules/action-5": "任意のオファーを消す",
    "game-rules/subtitle-2":
      "空のスペースにカードを置くか、すでに置いてあるカードを置き換える (それはあなたの手札に移動します)",
    "game-rules/win-requirements": `${WinPoints}点を越えるプレイヤーが勝ちです。`,

    // Card library
    Light: "光",
    Dark: "闇",

    // Board
    "board/your-id": "あなたのID",
    "board/connecting": "Myobu 元宇宙に接続しています",
    "board/local-game": "ローカルゲーム",
    "board/playing-against": "プレイヤーと対戦中",
    "board/empty-shrine": "空の神社",
    "board/draw-a-card": "カードを引く",
    "board/draw-kitsune-card": "狐カードを引く",
    "board/click-here-to-discard": "ここをクリックして捨てる",
    "board/used-offerings": "使用済みのオファー",

    // Cards
    "card/cast-spell": "魔法を発動する",
    "card/point": "点",
    "card/points": "点",
    "card/replace-this-card": "このカードを置き換える",
    "card/modify-symbol": "シンボルを変更する",
    "card/target-this-card": "このカードを対象にする",
    "card/show-for-turns": "このカードを{{turns}}ターン表示する",
    "card/hide-for-turns": "このカードを{{turns}}ターン隠す",
    "card/locked-for-turns": "このカードを{{turns}}ターンロックする",

    // Spells
    "spells/tail-1-light": "1ポイント獲得",
    "spells/tail-2-light": "任意のカード番号を3点増やす",
    "spells/tail-3-light":
      "カードを発動すると、33％の確率で呪文を唱えることができます。",
    "spells/tail-4-light": "対象のカードに任意のシンボルを追加する",
    "spells/tail-5-light":
      "Xフローラオファリングが配置されると、X/4の確率で任意の呪文を唱えることができます",
    "spells/tail-6-light": `${Tail6LightHidePlayerKitsuneCardsTurns}ターンの間すべてのカードを非表示にします`,
    "spells/tail-7-light": `${Tail7LightSpellExtraOfferingCardsToDraw}オファリングを描画し、再度行動してから、任意の順序でデッキに戻します。`,
    "spells/tail-8-light": "3ポイント獲得",
    "spells/tail-9-light": `${Tail9LightSpellExtraKitsuneCardsInPlayTurns}ターンでさらに1枚のキツネカードを置くことができます`,
    "spells/tail-1-dark": "敵は1ポイントを失います",
    "spells/tail-2-dark": "カード番号を3つ減らします",
    "spells/tail-3-dark":
      "敵が自分のカードを発動したとき、あなたは33％の確率で呪文を唱えることができます。",
    "spells/tail-4-dark": "ターゲットカードからシンボルを削除します",
    "spells/tail-5-dark":
      "Xバウンティオファリングが配置されると、X/4の確率で任意の呪文を唱えることができます",
    "spells/tail-6-dark": `${Tail6DarkShowEnemyKitsuneCardsTurns}ターンですべての敵のカードを表示する`,
    "spells/tail-7-dark": `敵が${Tail7DarkLockedOfferingCardsNum}オファリングを${Tail7DarkLockedOfferingCardsTurns}ターンに使用するのを防ぎます`,
    "spells/tail-8-dark": "敵は3ポイントを失います",
    "spells/tail-9-dark": `対象のカードをオーナーの手札に戻し、${Tail9DarkLockEnemyKitsuneCardsturns}ターンの間ロックする`,
  },
};
