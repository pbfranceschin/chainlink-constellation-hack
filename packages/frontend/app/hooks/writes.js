import pool from "../../blockchain/contracts/artifacts/Pool.json";
import { useContractWrite } from "wagmi";

export function useSponsor(poolAddress) {
  const { data, isLoading, isSuccess, error, write } = useContractWrite({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'sponsor',
  });
  return { data, isLoading, isSuccess, error, write };
}