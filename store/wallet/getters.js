export default {
  getTransactions: (state) => state.transactions,
  getTransactionsCount: (state) => state.transactionsCount,
  getIsWalletConnected: (state) => state.isWalletConnected,
  getCallbackLayout: (state) => state.callbackLayout,
  getIsOnlyConfirm: (state) => state.isOnlyConfirm,
  getBalanceData: (state) => state.balance,
  getSelectedToken: (state) => state.selectedToken,
  getPensionWallet: (state) => state.pensionWallet,
  getPensionHistory: (state) => state.pensionHistory,
  getPensionHistoryData: (state) => state.pensionHistoryData,
  getStakingPoolsData: (state) => state.stakingPoolsData,
  getStakingUserData: (state) => state.stakingUserData,
};
