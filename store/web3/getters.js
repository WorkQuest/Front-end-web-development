export default {
  isConnected: (state) => state.isConnected,
  isHandlingMetamaskStatus: (state) => state.isHandlingMetamaskStatus,
  getTokens: (state) => state.tokens || '',
  getAccount: (state) => state.account,
  getUserBalance: (state) => state.tokensAmount?.balanceTokenAmount || '',
  getUserStake: (state) => state.tokensAmount?.stakeTokenAmount || '',
  getTokenWETH: (state) => state.tokenWETH || '',
  getAccountData: (state) => state.accountData || '',
  getTokensAmount: (state) => state.tokensAmount || '',
  getStatusBusy: (state) => state.busy,
  getPurseData: (state) => state.purseData,
  getBSCTokensData: (state) => state.tokensBSC,
  getCrosschainTokensData: (state) => state.crosschainTokensData,
  getMetaMaskStatus: (state) => state.metamaskStatus,
};
