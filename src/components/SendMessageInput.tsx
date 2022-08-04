import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BoardContainer } from "../containers/board";

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

export default function SendMessageInput(props: Props) {
  const [message, setMessage] = useState<string>("");
  const boardContainer = BoardContainer.useContainer();
  const { t } = useTranslation();

  return (
    <input
      type="text"
      className={
        "input input-bordered input-ghost border-orange-500 text-white font-sans " +
        (props.className || "")
      }
      style={props.style}
      placeholder={t("Send message")}
      value={message}
      onChange={(event) => {
        setMessage(event.target.value);
      }}
      onKeyDown={(event) => {
        if (event.which === 13 && message.length) {
          // Pressed enter key
          boardContainer.sendMessage(message);
          setMessage("");
        }
      }}
    ></input>
  );
}
