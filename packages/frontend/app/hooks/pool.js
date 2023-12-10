import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import pool  from "../../blockchain/contracts/artifacts/Pool.json";
import controllerArtifact  from "../../blockchain/contracts/artifacts/IResultController.json";
import api from "../../blockchain/contracts/mumbai/AaveAPI.json";
import { convertToAssets, getApiAddress } from "../utils";
import { hexToString } from 'viem'

export function useTVL(poolAddress) {
  const { data, isError, isLoading } = useContractRead({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'getTVL',
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

export function usePoolController (poolAddress) {
  const { data, isError, isLoading } = useContractRead({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'resultController',
    args: [],
    chainId: 80001,
    watch: true
  });
  return { data, isError, isLoading };
}

function controllerRead (controllerAddress, methodName, args) {
  const { 
    data, 
    isError, 
    isLoading 
  } = useContractRead({
    address: controllerAddress || "0x0",
    abi: controllerArtifact.abi,
    functionName: methodName,
    args: args || [],
    chainId: 80001,
    watch: true
  });

  return { data, isError, isLoading };
}

export function useTeamCount (poolAddress) {
  const { 
    data: controllerAddress, 
    isError: isErrorController,
    isLoading: isLoadingController 
  } = usePoolController(poolAddress);
  
  const { 
    data, 
    isError: isErrorTeamCount, 
    isLoading: isLoadingTeamCount 
  } = controllerRead(controllerAddress, 'getOutcomesCount', []);

  let teamCount = undefined;
  if (data) {
    teamCount = Number(data) - 1;
  }

  const isLoading = isLoadingController || isLoadingTeamCount;
  const isError = !isLoading || (isErrorController || isErrorTeamCount);
  return { teamCount, isError, isLoading };
}

function fixRow (row) {
  return row + 1;
}

function useTeamName (poolAddress, row) {
  const fixedRow = fixRow(row);
  const { data: controllerAddress } = usePoolController(poolAddress);
  const { data: encodedTeamName} = controllerRead(controllerAddress, 'getOutcomeName', [fixedRow]);
  return encodedTeamName ? hexToString(encodedTeamName) : '-';
}

function getTeamTableRow (poolAddress, userAddress, row) {
  const teamName = useTeamName(poolAddress, row);
  const { data: teamTotalDeposited } = useStakeByOutcome(fixRow(row), poolAddress);
  const { ret: totalYield } = useYieldByOutcome(fixRow(row), poolAddress);
  const account = userAddress || "0x0000000000000000000000000000000000000000";
  const { data: userDeposit } = useStake(account, fixRow(row), poolAddress);
  const { ret: userYield } = useIndividualYield(account, fixRow(row), poolAddress);
  return { 
    col1: teamName || '-',
    col2: teamTotalDeposited !== undefined ? teamTotalDeposited.toString() : '-',
    col3: totalYield !== undefined ? totalYield.toString() : '-',
    col4: userDeposit !== undefined ? userDeposit.toString() : '-',
    col5: userYield !== undefined ? userYield.toString() : '-', 
  };
}

export function useTeamTableData (poolAddress, userAddress) {
  const {teamCount, isError, isLoading} = useTeamCount(poolAddress);
  const ret = [];
  for (let i = 0; i < (teamCount || 0); i++) {
    const teamRow = getTeamTableRow(poolAddress, userAddress, i);
    ret.push(teamRow);
  }
  return ret;
}

export function useHasResult(poolAddress) {
 const { data, isError, isLoading } = useContractRead({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'hasResult',
    chainId: 80001,
    watch: true
  });
  return { data, isError, isLoading };   
}

