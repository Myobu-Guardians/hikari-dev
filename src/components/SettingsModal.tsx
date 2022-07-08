import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontOnCard, SettingsContainer } from "../containers/settings";
import LanguageSelector from "./LanguageSelector";

export default function SettingsModal() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const settingsContainer = SettingsContainer.useContainer();

  return (
    <>
      <input
        type="checkbox"
        id="settings-modal"
        className="modal-toggle"
        onChange={(event) => {
          setOpen(event.target.checked);
        }}
      />
      {open && (
        <label htmlFor="settings-modal" className="modal font-sans">
          <label
            className="modal-box relative pb-10"
            htmlFor=""
            style={{
              minHeight: "80%",
            }}
          >
            <div className="flex flex-row items-center justify-between text-xl font-bold">
              <h3 className="mb-2">{t("Settings")}</h3>
              <div>
                <LanguageSelector
                  className="relative dropdown-left"
                  style={{ top: 0, right: 0 }}
                ></LanguageSelector>
                <label
                  htmlFor="settings-modal"
                  className="btn btn-circle btn-sm btn-ghost border-0"
                >
                  {"✖"}
                </label>
              </div>
            </div>
            <div className="mt-4">
              <strong>{t("kitsune-card-font")}</strong>
              <select
                className="select select-bordered max-w-xs ml-4"
                value={settingsContainer.fontOnCard}
                onChange={(event) => {
                  settingsContainer.setFontOnCard(
                    event.target.value as FontOnCard
                  );
                }}
              >
                <option value={FontOnCard.Assasin}>{FontOnCard.Assasin}</option>
                <option value={FontOnCard.Sans}>{FontOnCard.Sans}</option>
              </select>
            </div>
          </label>
        </label>
      )}
    </>
  );
}
