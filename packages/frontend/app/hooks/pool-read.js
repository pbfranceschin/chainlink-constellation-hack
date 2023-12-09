import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import pool  from "../../blockchain/contracts/artifacts/Pool.json";
import controllerArtifact  from "../../blockchain/contracts/artifacts/IResultController.json";
import api from "../../blockchain/contracts/mumbai/AaveAPI.json";
import { convertToAssets, getApiAddress } from "../utils";
import { hexToString } from 'viem'
import IERC4626 from "../../blockchain/interfaces/IERC4626.json"
import { formatBigInt } from "../utils";

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

export function useVaultAPI (poolAddress) {
  const { data, isError, isLoading } = useContractRead({
    address: poolAddress,
    abi: pool.abi,
    functionName: 'vaultAPI',
    args: [],
    chainId: 80001,
    watch: true
  });
  return { data, isError, isLoading };
}

export function useConvertToAssets (vaultAddress, shares) {
  const { data, isError, isLoading } = useContractRead({
    address: vaultAddress,
    abi: IERC4626.abi,
    functionName: 'convertToAssets',
    args: [shares || 0],
    chainId: 80001,
    watch: true
  });
  return { data, isError, isLoading };
}

export function useIndividualYield(account, outcome, poolAddress) {
  const { data: stake } = useStake(account, outcome, poolAddress);
  const { data: shares } = useShares(account, outcome, poolAddress);
  const { data: vaultAddress } = useVaultAPI(poolAddress);
  const { data: assets } = useConvertToAssets(vaultAddress, shares);
  if (
    stake !== undefined &&
    shares !== undefined &&
    vaultAddress !== undefined &&
    assets !== undefined
  ) {
    return assets - stake;
  } else {
    return undefined;
  }
}

export function useYieldByOutcome(outcome, poolAddress) {
  const { data: stake } = useStakeByOutcome(outcome, poolAddress);
  const { data: shares } = useSharesByOutcome(outcome, poolAddress);
  const { data: vaultAddress } = useVaultAPI(poolAddress);
  const { data: assets } = useConvertToAssets(vaultAddress, shares);
  if (
    stake !== undefined &&
    shares !== undefined &&
    vaultAddress !== undefined &&
    assets !== undefined
  ) {
    return assets - stake;
  } else {
    return undefined;
  }
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

export function useYieldMultiplier (poolAddress, row) {
  const totalOutcomeYield = useYieldByOutcome(fixRow(row), poolAddress);
  const { data: totalPoolYield } = useTotalYield(poolAddress);
  if (
    totalOutcomeYield === undefined ||
    totalPoolYield === undefined ||
    totalOutcomeYield == 0
  ) {
    return undefined;
  }
  return totalPoolYield / totalOutcomeYield;
}

function getTeamTableRow (poolAddress, userAddress, row) {
  const teamName = useTeamName(poolAddress, row);
  const { data: teamTotalDeposited } = useStakeByOutcome(fixRow(row), poolAddress);
  const yieldMultiplier = useYieldMultiplier(poolAddress, row);
  const account = userAddress || "0x0000000000000000000000000000000000000000";
  const { data: userDeposit } = useStake(account, fixRow(row), poolAddress);
  const userYield = useIndividualYield(account, fixRow(row), poolAddress);
  return { 
    col1: teamName || '-',
    col2: formatBigInt(teamTotalDeposited),
    col3: yieldMultiplier !== undefined ? yieldMultiplier.toString() : '-',
    col4: formatBigInt(userDeposit),
    col5: formatBigInt(userYield), 
    originalIndex: row,
  };
}

export function useTeamTableData (poolAddress, userAddress) {
  const {teamCount, isError, isLoading} = useTeamCount(poolAddress);
  const ret = [];
  for (let i = 0; i < (teamCount || 0); i++) {
    const teamRow = getTeamTableRow(poolAddress, userAddress, i);
    ret.push(teamRow);
  }
  // Sort the table by col1
  ret.sort((a, b) => a.col1.localeCompare(b.col1));
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
