import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import pool  from "../../blockchain/contracts/artifacts/Pool.json";
import api from "../../blockchain/contracts/mumbai/AaveAPI.json";
import { convertToAssets, getApiAddress } from "../utils";

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

export function useSharesByOutcome(outcome, poolAddress) {
  const { data, isError, isLoading } = useContractRead({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'getSharesByOutcome',
    args: [outcome],
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

export function useIndividualYield(account, outcome, poolAddress) {
  const [ret, setRet] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { data: stake } = useStake(account, outcome, poolAddress);
  const { data: shares } = useShares(account, outcome, poolAddress);
  
  useEffect(() => {
    setIsLoading(true);
    const resolveYield = async() => {
      let api;
      let sh2ass;
      try {
        api = await getApiAddress(poolAddress);
        sh2ass = await convertToAssets(shares, api);
        setRet(sh2ass - stake);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    resolveYield();
  }, [poolAddress, stake, shares]);
  return { ret, isLoading, error }
}

export function useYieldByOutcome(outcome, poolAddress) {
  const [ret, setRet] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { data: stake } = useStakeByOutcome(outcome, poolAddress);
  const { data: shares } = useSharesByOutcome(outcome, poolAddress);
  
  useEffect(() => {
    setIsLoading(true);
    const resolveYield = async() => {
      let api;
      let sh2ass;
      try {
        api = await getApiAddress(poolAddress);
        sh2ass = await convertToAssets(shares, api);
        setRet(sh2ass - stake);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    resolveYield();
  }, [poolAddress, stake, shares]);
  return { ret, isLoading, error }
}