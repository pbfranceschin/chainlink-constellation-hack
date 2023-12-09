import { ethers } from "ethers";
import poolData from "../artifacts/contracts/Pool.sol/Pool.json";
import mockAsset from "../artifacts/contracts/test/MockAsset.sol/MockAsset.json";
import { mumbaiTestUSDC, mumbaiUSDCPool } from "../test/addresses";
import dotenv from "dotenv";
dotenv.config();

const INFURA_API_KEY = process.env.INFURA_API_KEY
const provider = new ethers.InfuraProvider(80001, INFURA_API_KEY);
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const POOL_ADDRESS = mumbaiUSDCPool;
const ABI = poolData.abi;
const ASSET = mumbaiTestUSDC;
const OUTCOME = 10;

const stake = async() => {
    if(!PRIVATE_KEY) throw new Error('missing env');
    const pool = new ethers.Contract(POOL_ADDRESS, ABI, provider);
    const account = new ethers.Wallet(PRIVATE_KEY, provider );
    const _stake = await pool.getStake(account.address, OUTCOME);
    console.log(`stake: ${_stake}`);
}

stake();