export default {
  setUserWalletAddressInBech32(state, address) {
    state.userWalletAddressInBech32 = address;
  },
  setTransactions(state, transactions) {
    state.transactions = transactions;
  },
  setTransactionsCount(state, count) {
    state.transactionsCount = count;
  },
  setIsWalletConnected(state, isWalletConnected) {
    state.isWalletConnected = isWalletConnected;
  },
  setCallbackLayout(state, layout) {
    state.callbackLayout = layout;
  },
  setIsOnlyConfirm(state, value) {
    state.isOnlyConfirm = value;
  },
  setBalance(state, { symbol, balance, fullBalance }) {
    state.balance[symbol].balance = balance;
    state.balance[symbol].fullBalance = fullBalance;
  },
  setSelectedToken(state, token) {
    state.selectedToken = token;
  },
  setPensionWallet(state, pensionWallet) {
    state.pensionWallet = pensionWallet;
  },
  setPensionHistory(state, pensionHistory) {
    state.pensionHistory = pensionHistory.sort((a, b) => b.timestamp - a.timestamp);
  },
  setPensionHistoryData(state, { method, txs, count }) {
    state.pensionHistory[method].txs = txs;
    state.pensionHistory[method].count = count;
  },
  setStakingPoolData(state, { pool, data }) {
    state.stakingPoolsData[pool] = data;
  },
  setStakingUserData(state, { pool, data }) {
    state.stakingUserData[pool] = data;
  },
};
