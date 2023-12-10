import pool from "../../blockchain/contracts/artifacts/Pool.json";
import { useContractWrite } from "wagmi";

export function useSponsor(poolAddress, setIsModalOpen) {
  const { data, isLoading, isSuccess, error, write } = useContractWrite({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'sponsor',
    onSuccess() {
      setIsModalOpen(false);
    }
  });
  return { data, isLoading, isSuccess, error, write };
}

export function useStake(poolAddress, setIsModalOpen) {
  const { data, isLoading, isSuccess, error, write } = useContractWrite({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'stake',
    onSuccess() {
      setIsModalOpen(false);
    }
  });
  return { data, isLoading, isSuccess, error, write };
}