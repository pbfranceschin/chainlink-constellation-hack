import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from "ethers";

const routerAddress = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C";
const donIdBytes32 = ethers.encodeBytes32String("fun-polygon-mumbai-1");
const subscriptionId = 927;
  
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  
  await deploy('MockControllerFunction', {
    from: deployer,
    args: [routerAddress, donIdBytes32, subscriptionId],
    log: true,
  });

};
export default func;