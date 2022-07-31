import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { BoardHeight, BoardWidth } from "../lib/constants";
import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletConnectMethod } from "../lib/wallet";
import { PlayerProfile } from "../lib/player";
const identicon = require("identicon");

export const GameContainer = createContainer(() => {
  const [zoom, setZoom] = useState<number>(1);
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >(undefined);
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);
  const [signerAddress, setSignerAddress] = useState<string | undefined>(
    undefined
  );
  const [network, setNetwork] = useState<ethers.providers.Network | undefined>(
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
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | undefined>(
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
        setNetwork(await provider.getNetwork());
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
      setProvider(provider);

      const signer = provider.getSigner();
      setSigner(signer);

      const signerAddress = await signer.getAddress();
      setSignerAddress(signerAddress);

      setConnectedWalletMethod_(WalletConnectMethod.WalletConnect);
      setWalletConnectProvider(walletConnectProvider);
      setNetwork(await provider.getNetwork());

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

  const isCorrectNetwork = useCallback(() => {
    // Only allow Ropsten Testnet for now
    return network && network.chainId === 3;
  }, [network]);

  /**
   * Get the player profile from the signer address by ENS (Ethereum Name Service)
   */
  const getPlayerProfileFromWalletAddress = useCallback(
    async (walletAddress: string) => {
      if (!isCorrectNetwork() || !walletAddress || !provider) {
        return;
      } else {
        const username =
          (await provider.lookupAddress(walletAddress)) || "Anonymous";
        const avatar =
          (await provider.getAvatar(walletAddress)) ||
          (await new Promise((resolve, reject) => {
            identicon.generate(
              { id: walletAddress, size: 150 },
              (err: any, buffer: any) => {
                if (err) return resolve("");
                else return resolve(buffer);
              }
            );
          }));
        return {
          username,
          avatar: avatar as any,
          walletAddress: walletAddress,
        };
      }
    },
    [isCorrectNetwork, provider]
  );

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

  useEffect(() => {
    if (signer && signerAddress) {
      (async () => {
        setPlayerProfile(
          await getPlayerProfileFromWalletAddress(signerAddress)
        );
      })();
    } else {
      setPlayerProfile(undefined);
    }
  }, [signer, signerAddress, getPlayerProfileFromWalletAddress]);

  return {
    zoom,
    resize,
    provider,
    signer,
    signerAddress,
    playerProfile,
    network,
    connectToMetaMask,
    connectToWalletConnect,
    disconnectWallet,
    isCorrectNetwork,
    connectedWalletMethod,
  };
});
