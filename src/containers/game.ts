import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { BoardHeight, BoardWidth } from "../lib/constants";
import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletConnectMethod } from "../lib/wallet";

export const GameContainer = createContainer(() => {
  const [zoom, setZoom] = useState<number>(1);
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >(undefined);
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);
  const [signerAddress, setSignerAddress] = useState<string | undefined>(
    undefined
  );
  const [connectedWalletMethod, setConnectedWalletMethod] = useState<
    WalletConnectMethod | undefined
  >(
    (localStorage.getItem("wallet/connected_method") as WalletConnectMethod) ||
      undefined
  );
  const [walletConnectProvider, setWalletConnectProvider] = useState<
    WalletConnectProvider | undefined
  >(undefined);

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

  const setConnectedWalletMethod_ = useCallback(
    (connectedWalletMethod: WalletConnectMethod | undefined) => {
      setConnectedWalletMethod(connectedWalletMethod);
      if (connectedWalletMethod) {
        localStorage.setItem("wallet/connected_method", connectedWalletMethod);
      } else {
        localStorage.removeItem("wallet/connected_method");
      }
    },
    []
  );

  const connectToMetaMask = useCallback(async () => {
    const ethereum = (window as any)["ethereum"];
    if (ethereum) {
      try {
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

        setConnectedWalletMethod_(WalletConnectMethod.MetaMask);
      } catch (error) {
        setConnectedWalletMethod_(undefined);
      }
    } else {
      setConnectedWalletMethod_(undefined);
    }
  }, [setConnectedWalletMethod_]);

  const connectToWalletConnect = useCallback(async () => {
    try {
      // Create WalletConnect Provider
      const walletConnectProvider = new WalletConnectProvider({
        infuraId: process.env.REACT_APP_INFURA_API_KEY,
      });

      // Enable session (triggers QR Code Modal)
      await walletConnectProvider.enable();

      const provider = new providers.Web3Provider(walletConnectProvider);

      const signer = provider.getSigner();
      setSigner(signer);

      const signerAddress = await signer.getAddress();
      setSignerAddress(signerAddress);

      setConnectedWalletMethod_(WalletConnectMethod.WalletConnect);
      setWalletConnectProvider(walletConnectProvider);

      provider.on("accountsChanged", () => {
        console.log("accountsChanged");
        // TODO:
      });

      provider.on("chainChanged", () => {
        console.log("chainChanged");
        // TODO:
      });
    } catch (error) {
      setConnectedWalletMethod_(undefined);
    }
  }, [setConnectedWalletMethod_]);

  const disconnectWallet = useCallback(async () => {
    setConnectedWalletMethod_(undefined);
    setProvider(undefined);
    setSigner(undefined);
    setSignerAddress(undefined);
  }, [setConnectedWalletMethod_]);

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  useEffect(() => {
    (async () => {
      const connectedWalletMethod = localStorage.getItem(
        "wallet/connected_method"
      ) as WalletConnectMethod;
      if (connectedWalletMethod) {
        switch (connectedWalletMethod) {
          case WalletConnectMethod.MetaMask:
            connectToMetaMask();
            break;
          case WalletConnectMethod.WalletConnect:
            connectToWalletConnect();
            break;
          default:
            setProvider(undefined);
            setSigner(undefined);
            setSignerAddress(undefined);
        }
      }
    })();
  }, [connectToMetaMask, connectToWalletConnect]);

  useEffect(() => {
    if (
      connectedWalletMethod !== WalletConnectMethod.WalletConnect &&
      walletConnectProvider
    ) {
      walletConnectProvider.disconnect();
      setWalletConnectProvider(undefined);
    }
  }, [connectedWalletMethod, walletConnectProvider]);

  return {
    zoom,
    resize,
    provider,
    signer,
    signerAddress,
    connectToMetaMask,
    connectToWalletConnect,
    disconnectWallet,
    connectedWalletMethod,
  };
});
