import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-transparent font-extrabold text-8xl bg-clip-text bg-gradient-to-r from-[#b7f2e7] to-[#96a7f1]">
        My NFT Collection
      </h1>
      <p className="text-3xl text-white mt-10">
        あなただけの特別なNFTをMintしよう
      </p>
      <button className="flex items-center justify-center mt-10 text-xl font-bold text-white py-4 px-8 rounded-md bg-gradient-to-r from-[#b7f2e7] to-[#96a7f1]">
        Connect to Wallet
      </button>
    </div>
  );
};

export default Home;
