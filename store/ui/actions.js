export default {
  setTags({ commit }, payload) {
    commit('setTags', payload);
  },
  deleteTags({ commit }, payload) {
    commit('deleteTag', payload);
  },
  clearTags({ commit }) {
    commit('clearTags');
  },
};
