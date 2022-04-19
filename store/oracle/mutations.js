export default {
  setCurrentPrices(state, {
    prices, symbols, v, r, s, nonce,
  }) {
    state.currentPrices = {
      nonce, v, r, s,
    };
    state.prices = prices;
    state.symbols = symbols;
  },
  setSecurityRatio(state, data) {
    state.securityRatio = data;
  },
  setDesiredSecurityRatio(state, data) {
    state.desiredSecurityRatio = data;
  },
};