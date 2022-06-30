import React from "react";
import { useTranslation } from "react-i18next";
import { gitCommit } from "../git_commit";
import { WinPoints } from "../lib/constants";

export default function HelpModal() {
  const { t } = useTranslation();

  return (
    <>
      <input type="checkbox" id="help-modal" className="modal-toggle" />

      <label htmlFor="help-modal" className="modal font-sans">
        <label className="modal-box relative" htmlFor="">
          <div className="flex flex-row items-center justify-between text-xl font-bold">
            <h3 className="mb-2">{t("Game rules")}</h3>
            <label
              htmlFor="help-modal"
              className="btn btn-circle btn-sm btn-ghost border-0"
            >
              {"✖"}
            </label>
          </div>
          <p className="text-sm mt-4">
            {t("Code version")}:{" "}
            <strong className="text-blue-400">
              <a
                href={`https://github.com/Myobu-Guardians/hikari-dev/commit/${gitCommit.hash}`}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                {gitCommit.logMessage}
              </a>
            </strong>
          </p>
          <p className="py-4">{t("game-rules/subtitle")}:</p>
          <ul>
            <li>* {t("game-rules/action-1")}</li>
            <li>* {t("game-rules/action-2")}</li>
            <li>* {t("game-rules/action-3")}</li>
            <li>* {t("game-rules/action-4")}</li>
            <li>* {t("game-rules/action-5")}</li>
          </ul>
          <p className="py-4">{t("game-rules/subtitle-2")}</p>
          <p>{t("game-rules/win-requirements")}</p>
          <div className="modal-action">
            <label htmlFor="help-modal" className="btn">
              {t("Close")}
            </label>
          </div>
        </label>
      </label>
    </>
  );
}
