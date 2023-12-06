import { useState } from "react";
import { useContractRead } from "wagmi";
import pool  from "../../contracts/artifacts/Pool.json";
import api from "../../contracts/mumbai/AaveAPI.json";

export const useTVL = async() => {
  const { data, isError, isLoading} = useContractRead({
    address: api.address,
    abi: api.abi,
    functionName: 'totalAssets',
    watch: true
  });
  return { data, isError, isLoading };
}
