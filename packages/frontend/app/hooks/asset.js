import { erc20ABI, useContractWrite, useContractRead } from "wagmi";

const zeroAddress = "0x0000000000000000000000000000000000000000";
const uint256Max = BigInt(2)**BigInt(256) - BigInt(1);
/**reads */
export function useAllowance(account, assetAddress, poolAddress) {
  const { data, isError, isLoading } = useContractRead({
    address: assetAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [account || zeroAddress, poolAddress],
    chainId: 80001,
    watch: true
  });
  return { data, isError, isLoading };
}


/** writes */
export function useApprove(assetAddress, poolAddress) {
  const { data, isLoading, isSuccess, error, write } = useContractWrite({
    address: assetAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args:[poolAddress, uint256Max]
  });
  return { data, isLoading, isSuccess, error, write };
}
