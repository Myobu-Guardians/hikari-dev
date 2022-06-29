import React from "react";
import { gitCommit } from "../git_commit";
import { WinPoints } from "../lib/constants";

export default function HelpModal() {
  return (
    <>
      <input type="checkbox" id="help-modal" className="modal-toggle" />

      <label htmlFor="help-modal" className="modal font-sans">
        <label className="modal-box relative" htmlFor="">
          <div className="flex flex-row items-center justify-between text-xl font-bold">
            <h3 className="mb-2">Game rules</h3>
            <label
              htmlFor="help-modal"
              className="btn btn-circle btn-sm btn-ghost border-0"
            >
              {"✖"}
            </label>
          </div>
          <p className="text-sm mt-4">
            Code version:{" "}
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
          <p className="py-4">
            What you can do on your turn (only one action per turn):
          </p>
          <ul>
            <li>* Draw a Kitsune card</li>
            <li>* Place and activate Kitsune card</li>
            <li>* Activate Kitsune card</li>
            <li>* Cast Kitsune spell</li>
            <li>* Remove any Offering</li>
          </ul>
          <p className="py-4">
            You can plase a Kitsune card on empty space OR replace with an
            already placed Kitsune card (that then goes into your hand).
          </p>
          <p>{`First player that scores ${WinPoints} points wins.`}</p>
          <div className="modal-action">
            <label htmlFor="help-modal" className="btn">
              Close
            </label>
          </div>
        </label>
      </label>
    </>
  );
}
