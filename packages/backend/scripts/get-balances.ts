import { ethers } from "ethers";
import mumbaiAaveApi from "../deployments/mumbai/AaveAPI.json";
import mockAsset from "../artifacts/contracts/test/MockAsset.sol/MockAsset.json";
import { mumbaiTestUSDC, mumbaiUSDCPool } from "../test/addresses";
import dotenv from "dotenv";
dotenv.config();

const INFURA_API_KEY = process.env.INFURA_API_KEY
const provider = new ethers.InfuraProvider(80001, INFURA_API_KEY);
const API_ADDRESS = mumbaiAaveApi.address;
const ABI = mumbaiAaveApi.abi;
const ASSET = mumbaiTestUSDC;

const pool = async() => {
  if(!provider) throw new Error('missing env');
  const api = new ethers.Contract(API_ADDRESS, ABI, provider);
  const tvl = await api.totalAssets();
  console.log('tvl:', tvl);
}

pool().catch(error => {
  console.log(error);
  process.exitCode = 1;
});

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const account = async() => {
  if(!PRIVATE_KEY) throw new Error('missing env');
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const token = new ethers.Contract(ASSET, mockAsset.abi, provider);
  let bal = await token.balanceOf(signer.address);
  const allowance = await token.allowance(signer.address, mumbaiUSDCPool );
  console.log(`token balance: ${bal}`);
  console.log('allowance', allowance);
}

account().catch(error => {
  console.log(error);
  process.exitCode = 1;
});
