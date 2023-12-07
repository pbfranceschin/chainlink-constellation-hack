import { useState } from "react";
import { useContractRead } from "wagmi";
import pool  from "../../blockchain/contracts/artifacts/Pool.json";
import api from "../../blockchain/contracts/mumbai/AaveAPI.json";

export function useTVL() {
  const { data, isError, isLoading } = useContractRead({
    address: api.address,
    abi: api.abi,
    functionName: 'totalAssets',
    chainId: 80001,
    watch: true
  });
  return { data, isError, isLoading };
}

export function useTotalYield(poolAddress) {
  const { data, isError, isLoading } = useContractRead({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'getYield',
    chainId: 80001,
    watch: true
  });
  return { data, isError, isLoading };
}

export function useStake(account, outcome, poolAddress) {
  const { data, isError, isLoading } = useContractRead({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'getStake',
    args: [account, outcome],
    chainId: 80001,
    watch: true
  });
  return { data, isError, isLoading };
}

export function useStakeByOutcome(outcome, poolAddress) {
  const { data, isError, isLoading } = useContractRead({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'getStakeByOutcome',
    args: [outcome],
    chainId: 80001,
    watch: true
  });
  return { data, isError, isLoading };
}

export function useShares(account, outcome, poolAddress) {
  const { data, isError, isLoading } = useContractRead({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'getShares',
    args: [account, outcome],
    chainId: 80001,
    watch: true
  });
  return { data, isError, isLoading };
}

export function useSponsorship(account, poolAddress) {
  const { data, isError, isLoading } = useContractRead({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'getStake',
    args: [account, 0],
    chainId: 80001,
    watch: true
  });
  return { data, isError, isLoading };  
}

export function useTotalSponsorship(poolAddress) {
  const { data, isError, isLoading } = useContractRead({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'getStakeByOutcome',
    args: [0],
    chainId: 80001,
    watch: true
  });
  return { data, isError, isLoading };  
}
