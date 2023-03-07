export default {
  BASE_URL: 'https://testnet-app.workquest.co/api/',
  SUMSUB_URL: 'https://cockpit.sumsub.com',
  // GMAPKEY: process.env.GMAPKEY,
  // SECRET_SUMSUB: process.env.SECRET_SUMSUB,

  WQ_PROVIDER: 'https://testnet-gate.workquest.co',
  ETH_PROVIDER: 'https://purple-newest-replica.rinkeby.quiknode.pro/c6df441ce132d1593e56f9b29f3eec92ec666709',
  BSC_PROVIDER: 'https://falling-solemn-tab.bsc-testnet.quiknode.pro/f9994103eaa58d8a21af4e462e9dc21009e2ee8c',
  POLYGON_PROVIDER: 'https://thrumming-broken-crater.matic-testnet.quiknode.pro/c63d640e4507796d4278309bfbaa707f6c276cac',

  WQ_WS_PROVIDER: 'wss://testnet-gate-01.workquest.co/tendermint-rpc/websocket',
  ETH_WS_PROVIDER: 'wss://purple-newest-replica.rinkeby.quiknode.pro/c6df441ce132d1593e56f9b29f3eec92ec666709',
  BSC_WS_PROVIDER: 'wss://falling-solemn-tab.bsc-testnet.quiknode.pro/f9994103eaa58d8a21af4e462e9dc21009e2ee8c',
  POLYGON_WS_PROVIDER: 'wss://thrumming-broken-crater.matic-testnet.quiknode.pro/c63d640e4507796d4278309bfbaa707f6c276cac',

  WQ_EXPLORER: 'https://testnet-explorer-api.workquest.co/api/v1',
  WQ_ORACLE_URL: 'https://testnet-oracle.workquest.co/api/v1',
  WQ_LIQUIDATOR_URL: 'https://testnet-liquidator.workquest.co/api/v1',
  NOTIFS_URL: 'https://testnet-notification.workquest.co/api/',

  WS_NOTIFS_URL: 'wss://testnet-notification.workquest.co/api/v1/notifications',
  WS_CHAT_ACTIONS_URL: 'wss://testnet-app.workquest.co/api/v1/notifications/chat',

  ETHERSCAN_API_URL: 'https://api-rinkeby.etherscan.io/api',
  BSCSCAN_API_URL: 'https://api-testnet.bscscan.com/api',
  POLYGONSCAN_API_URL: 'https://api-testnet.polygonscan.com/api',

  ETHEREUM_BRIDGE: '0x03883AE9F07D71a1b67b89fD4af83B9A81e3f8C4',
  ETHEREUM_STABLE_BRIDGE: '0x9870a749Ae5CdbC4F96E3D0C067eB212779a8FA1',
  ETHEREUM_USDC_TOKEN: '0xeb8f08a975Ab53E34D8a0330E0D34de942C95926',
  ETHEREUM_USDT_TOKEN: '0xD92E713d051C37EbB2561803a3b5FBAbc4962431',
  ETHEREUM_LP_TOKEN: '0x6dc948fF7AC50B60ecFd208974aE79f9A444Fe18',
  ETHEREUM_MINING: '0x917dc1a9E858deB0A5bDCb44C7601F655F728DfE',
  ETHEREUM_WQT_TOKEN: '0xe21D8B17CF2550DE4bC80779486BDC68Cb3a379E',
  // ETHEREUM_RPC_URL: process.env.ETHEREUM_RPC_URL,

  BSC_BRIDGE: '0xd24ae80b2b1d6338d141979C223Ef6EBDD46dF01',
  BSC_STABLE_BRIDGE: '0x833d71EF0b51Aa9Fb69b1f986381132628ED10F3',
  BSC_USDT_TOKEN: '0xbF09428BDEdD21f8698C44e3B327Ec405B1Ba64d', // decimals 18
  BSC_USDC_TOKEN: '0x4BA51Fe3779F4ed687221B07b335c22a9e4dcB2c', // decimals 18
  BSC_LP_TOKEN: '0x64326F459a5a0135FD95B50c07916faF101f9F29',
  BSC_MINING: '0xd919F27c74C1873986Fe97a482Fe71228CeDa40A',
  BSC_OLD_WQT_TOKEN: '0x75349C3f2C3CFD94488A71a350Ba841C14309c5b',
  BSC_WQT_EXCHANGE: '0x4F78EC055f079D68341eCB0e2cC4BeC5b10334C4',
  BSC_WQT_TOKEN: '0x8a62Ee790900Df4349B3c57a0FeBbf71f1f729Db',
  BSC_RPC_URL: 'https://bsc-dataseed.binance.org/',

  POLYGON_USDT_TOKEN: '0x631E327EA88C37D4238B5c559A715332266e7Ec1',
  POLYGON_STABLE_BRIDGE: '0xE2e7518080a0097492087E652E8dEB1f6b96B62b',

  WORKNET_ETH_AUCTION: '0x09083640347Ed569A58dfa5F862E26456827E3c0',
  WORKNET_BNB_AUCTION: '0x05C07481441795f4B6a6a455cde45139062693A6',
  WORKNET_USDT_AUCTION: '0x779ed11983B3daA43a55E2c01dD3EA89A227e5D7',
  WORKNET_USDC_AUCTION: '0x9a02C7Cde2d83556870F91c78c58052D0D330e37',
  WORKNET_BORROWING: '0xAD10a2538a3FCC3748eD8eC53e586dDf3EA56344',
  WORKNET_BRIDGE: '0x19Bf5800c95c2cBdf990a050d645be00C1A2f48D',
  WORKNET_LENDING: '0xEB604754C4A7cd0771278aC0c335739187Ca4900',
  WORKNET_ORACLE: '0x64111bDFf2176CfdFDd2863804f9f6c4F4536AEf',
  WORKNET_PENSION_FUND: '0x760cFBa449e6897FD4fcF370cdAc37E978198252',
  WORKNET_PROMOTION: '0x23918c4cC7001fB4e2BF28c8283b02BcD6975bf0',
  WORKNET_REFERRAL: '0x778D0208F8BEc40CA262AAd598a9D8Ba3229Ea5d',
  WORKNET_ROUTER: '0xCa38f5061E68924D0c00cf331dBc87eFE60fC5e3',
  WORKNET_SAVING_PRODUCT: '0xaFbadED10D19032f4Df676002DB0956F2FBE6437',
  WORKNET_STAKING_WQT: '0xd64b62d4F571173c3E27A6aE1cBadaf21d09189C',
  WORKNET_STAKING_WUSD: '0x89F4ef98E10dC9b907Ba0e6cd3D37376D304F5CD',
  WORKNET_WBNB_TOKEN: '0xe550018bC9cF68fed303dFB5f225bB0e6B1e201F',
  WORKNET_WETH_TOKEN: '0x4bde754e6Fd830cFBCe49b609Aa4d218dA5205fC',
  WORKNET_WUSD_TOKEN: '0x5d062Ecf00Bbd7D592780a1EAc313F01820C7b64',
  WORKNET_USDT_TOKEN: '0xa8D82fE8c94610645ea3A09aC35739f2d33a8D7a',
  WORKNET_USDC_TOKEN: '0xc2E305033Ca1FFA1488E3e9C52769b1156336196',
  WORKNET_WQ_FACTORY: '0x99C35B5C3BA2351CEE222B7eB9315a546Fb8Fb96',
  WORKNET_VOTING: '0x4B4a9201384BB7756B2d7ab73b0697cA90A9191E',
};
