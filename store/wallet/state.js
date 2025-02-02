import { Chains, TokenSymbols } from '~/utils/enums';

export default () => ({
  transactions: [],
  transactionsCount: 0,
  isWalletConnected: false,
  callbackLayout: 'default',
  isOnlyConfirm: false, // for confirm password layout
  selectedToken: TokenSymbols.WQT,
  balance: {
    WQT: { balance: 0, fullBalance: 0, decimals: 18 },
    WUSD: { balance: 0, fullBalance: 0, decimals: 18 },
    BNB: { balance: 0, fullBalance: 0, decimals: 18 },
    ETH: { balance: 0, fullBalance: 0, decimals: 18 },
    USDT: { balance: 0, fullBalance: 0, decimals: 6 },
    USDC: { balance: 0, fullBalance: 0, decimals: 6 },
    MATIC: { balance: 0, fullBalance: 0, decimals: 18 },
    'CAKE-LP': { balance: 0, fullBalance: 0, decimals: 18 },
    'UNI-V2': { balance: 0, fullBalance: 0, decimals: 18 },
  },
  frozenBalance: 0,
  pensionWallet: null,
  pensionHistory: {
    Update: { txs: [], count: 0 },
    Receive: { txs: [], count: 0 },
    Withdraw: { txs: [], count: 0 },
  },
  stakingPoolsData: { WQT: {}, WUSD: {} },
  stakingUserData: { WQT: {}, WUSD: {} },

  selectedNetwork: Chains.WORKNET,

  pendingHashLink: null,
});
