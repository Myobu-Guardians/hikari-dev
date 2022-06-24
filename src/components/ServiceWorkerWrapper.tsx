import React, { FC, useCallback, useEffect } from "react";
import * as serviceWorker from "../serviceWorker";

const ServiceWorkerWrapper: FC = () => {
  const [showReload, setShowReload] = React.useState(false);
  const [waitingWorker, setWaitingWorker] =
    React.useState<ServiceWorker | null>(null);

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = useCallback(() => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
    window.location.reload();
  }, [waitingWorker]);

  return (
    <div>
      {showReload && (
        <div className="alert alert-info shadow-lg fixed top-0 left-1/2 -translate-x-1/2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info flex-shrink-0 w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>New version of Hikari is available</span>
          </div>
          <div className="flex-none">
            <button className="btn btn-sm btn-ghost" onClick={reloadPage}>
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceWorkerWrapper;
