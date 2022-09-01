import * as develop from './develop';
import * as testnet from './testnet';
import * as stage from './stage';
import * as master from './master';

const keysByBranch = {
  master: master.default,
  testnet: testnet.default,
  stage: stage.default,
  develop: develop.default,
}[process.env.BRANCH];

export const IS_PROD = ['master', 'stage'].includes(process.env.BRANCH);

/**
 * @property BRANCH - ENV
 * @property WQ_EXPLORER
 * @property BASE_URL
 * @property G_ANALYTIC - use process.env on project,
 * @property GMAPKEY - use process.env on project,
 * @property SUMSUB_URL - use process.env on project

 * @property ETH_PROVIDER
 * @property BSC_PROVIDER
 * @property POLYGON_PROVIDER

 * @property WQ_WS_PROVIDER
 * @property ETH_WS_PROVIDER
 * @property WQ_WS_PROVIDER
 * @property POLYGON_WS_PROVIDER

 * @property WQ_PROVIDER
 * @property WQ_EXPLORER
 * @property WQ_ORACLE_URL
 * @property NOTIFS_URL
 *
 * @property WS_NOTIFS_URL
 * @property WS_CHAT_ACTIONS_URL
 *
 * @property ETHERSCAN_API_URL
 * @property BSCSCAN_API_URL
 * @property POLYGONSCAN_API_URL

 * @property ETHEREUM_BRIDGE
 * @property ETHEREUM_STABLE_BRIDGE - Bridge for buy WQT
 * @property ETHEREUM_USDT_TOKEN
 * @property ETHEREUM_USDC_TOKEN
 * @property ETHEREUM_LP_TOKEN
 * @property ETHEREUM_MINING
 * @property ETHEREUM_WQT_TOKEN
 * @property ETHEREUM_RPC_URL - use process.env on project

 * @property BSC_BRIDGE
 * @property BSC_STABLE_BRIDGE - Bridge for buy WQT
 * @property BSC_USDT_TOKEN
 * @property BSC_USDС_TOKEN
 * @property BSC_LP_TOKEN
 * @property BSC_MINING
 * @property BSC_OLD_WQT_TOKEN
 * @property BSC_WQT_EXCHANGE
 * @property BSC_WQT_TOKEN
 * @property BSC_RPC_URL

 * @property POLYGON_USDT_TOKEN
 * @property POLYGON_STABLE_BRIDGE

 * @property WORKNET_ETH_AUCTION
 * @property WORKNET_BNB_AUCTION
 * @property WORKNET_USDT_AUCTION
 * @property WORKNET_USDC_AUCTION
 * @property WORKNET_BORROWING
 * @property WORKNET_BRIDGE
 * @property WORKNET_LENDING
 * @property WORKNET_ORACLE
 * @property WORKNET_PENSION_FUND
 * @property WORKNET_PROMOTION
 * @property WORKNET_REFERRAL
 * @property WORKNET_ROUTER
 * @property WORKNET_SAVING_PRODUCT
 * @property WORKNET_STAKING_WQT
 * @property WORKNET_STAKING_WUSD
 * @property WORKNET_WBNB_TOKEN
 * @property WORKNET_WETH_TOKEN
 * @property WORKNET_WUSD_TOKEN
 * @property WORKNET_USDT_TOKEN
 * @property WORKNET_USDC_TOKEN
 * @property WORKNET_WQ_FACTORY
 * @property WORKNET_VOTING
 */
export default keysByBranch;
