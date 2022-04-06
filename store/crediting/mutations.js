export default {
  setFunds(state, res) {
    state.funds = res;
  },
  setCreditData(state, res) {
    state.creditData = res;
  },
  setCurrentFee(state, res) {
    state.currentFee = res;
  },
  setRewards(state, res) {
    state.rewardsData = res;
  },
  setWalletsData(state, res) {
    state.walletData = res;
  },
};
