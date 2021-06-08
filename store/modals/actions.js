export default {
  show({ commit }, value) {
    commit('setIsShow', true);
    commit('setCurrentModalKey', value.key);
    commit('setOptions', value);
  },
  hide({ commit }) {
    commit('setIsShow', false);
    commit('setCurrentModalKey', '');
    commit('setOptions', {});
  },
  setUnclicable({ commit }) {
    commit('setUnclicable');
  },
};
