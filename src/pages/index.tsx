import { ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { myEpicNftInterface } from "../hook/EpicNFT/EpicNFT";

const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  console.log("currentAccount: ", currentAccount);

  const checkWalletConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have Metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToMintNft = async () => {
    const CONTRACT_ADDRESS = "0x866272dc86cd385b9db41c720587cf512e5067be";
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNftInterface,
          signer
        );
        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.makeAnEpicNFT();
        console.log("Mining...please wait.");
        await nftTxn.wait();
        console.log(
          `Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log("Ethereum abject doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkWalletConnected();
  }, []);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-transparent font-extrabold text-8xl bg-clip-text bg-gradient-to-r from-[#b7f2e7] to-[#96a7f1]">
        My NFT Collection
      </h1>
      <p className="text-3xl text-white mt-10">
        あなただけの特別なNFTをMintしよう
      </p>
      {currentAccount === "" ? (
        <button
          className="flex items-center justify-center mt-10 text-xl font-bold text-white py-4 px-8 rounded-md bg-gradient-to-r from-[#b7f2e7] to-[#96a7f1]"
          onClick={connectWallet}
        >
          Connect to Wallet
        </button>
      ) : (
        <button
          className="flex items-center justify-center mt-10 text-xl font-bold text-white py-4 px-8 rounded-md bg-gradient-to-r from-[#b7f2e7] to-[#96a7f1]"
          onClick={askContractToMintNft}
        >
          Mint NFT
        </button>
      )}
    </div>
  );
};

export default Home;
