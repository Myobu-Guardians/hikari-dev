import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { BoardHeight, BoardWidth } from "../lib/constants";
import { ethers } from "ethers";

export const GameContainer = createContainer(() => {
  const [zoom, setZoom] = useState<number>(1);
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >(undefined);
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);
  const [signerAddress, setSignerAddress] = useState<string | undefined>(
    undefined
  );

  const resize = useCallback(() => {
    const orientation =
      (window.screen.orientation || {}).type ||
      (window.screen as any).mozOrientation ||
      (window.screen as any).msOrientation ||
      "landscape-primary";

    const width = window.innerWidth;
    const height = window.innerHeight;
    const zoom = orientation.match(/^landscape/)
      ? Math.min(width / BoardWidth, height / BoardHeight)
      : Math.min(width / BoardHeight, height / BoardWidth);
    setZoom(zoom);
  }, []);

  const connectToMetaMask = useCallback(async () => {
    const ethereum = (window as any)["ethereum"];
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      setProvider(provider);

      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      setSigner(signer);

      const setSigner_ = async () => {
        const signer = provider.getSigner();
        setSigner(signer);

        const signerAddress = await signer.getAddress();
        setSignerAddress(signerAddress);
      };

      ethereum.on("accountsChanged", setSigner_);
      setSigner_();

      ethereum.on("chainChanged", async function () {
        window.location.reload();
      });
    } else {
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  useEffect(() => {
    (async () => {
      const ethereum = (window as any)["ethereum"];
      if (ethereum) {
        connectToMetaMask();
      } else {
        setProvider(undefined);
      }
    })();
  }, [connectToMetaMask]);

  return {
    zoom,
    resize,
    provider,
    signer,
    signerAddress,
    connectToMetaMask,
  };
});
