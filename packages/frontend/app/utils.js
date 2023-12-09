import pool from "../blockchain/contracts/artifacts/Pool.json";
import IERC4626 from "../blockchain/interfaces/IERC4626.json"
import { polygonMumbai } from "viem/chains";
import { 
  createPublicClient,
  http,
  formatUnits,
  parseUnits,
} from 'viem'

export const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http()
});

export async function convertToAssets(shares, apiAddress) {
  const ret = await publicClient.readContract({
    address: apiAddress,
    abi: IERC4626.abi,
    functionName: 'convertToAssets',
    args: [shares]
  });
  return ret;
}

export async function getApiAddress(poolAddress) {
  const ret = await publicClient.readContract({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'vaultAPI',
  });
  return ret;    
}

export function formatBigInt (n, decimalPlaces) {
  if (n === undefined) {
    return '-';
  }
  const formated = formatUnits(n, 6);
  return formated;
}

export function convertToBigInt (n) {
  return parseUnits(n.toString(), 6);
}