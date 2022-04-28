export default {
  getFrozenBalance: (state) => state.balance.WQT.frozenBalance,
  getTransactions: (state) => state.transactions,
  getTransactionsCount: (state) => state.transactionsCount,
  getIsWalletConnected: (state) => state.isWalletConnected,
  getCallbackLayout: (state) => state.callbackLayout,
  getIsOnlyConfirm: (state) => state.isOnlyConfirm,
  getBalanceData: (state) => state.balance,
  getSelectedToken: (state) => state.selectedToken,
  getStakingPoolsData: (state) => state.stakingPoolsData,
  getStakingUserData: (state) => state.stakingUserData,
};
