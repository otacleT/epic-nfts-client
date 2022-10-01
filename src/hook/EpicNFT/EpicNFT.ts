import { utils } from "ethers";
import myEpicNFTABI from "../../lib/MyEpicNFT.json";

export const myEpicNftInterface = new utils.Interface(myEpicNFTABI.abi);
// export const contract = new Contract(
//   contractAddress,
//   myEpicNftInterface
// ) as MyEpicNFT;
