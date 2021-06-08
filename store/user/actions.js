export default {
  async signIn({ commit, dispatch }, payload) {
    const response = await this.$axios.$post('/v1/auth/login', payload);
    commit('setNewTokens', response.result);
    await dispatch('getUserData');
    return response;
  },
  async signUp({ commit }, payload) {
    const response = await this.$axios.$post('/v1/auth/register', payload);
    commit('setNewTokens', response.result);
    return response;
  },
  async confirm({ commit }, payload) {
    commit('setOldTokens', { access: this.$cookies.get('access'), refresh: this.$cookies.get('refresh') });
    this.$cookies.set('role', payload.role);
    const response = await this.$axios.$post('/v1/auth/confirm-email', payload);
    return response;
  },
  async getUserData({ commit }) {
    const response = await this.$axios.$get('/v1/profile/me');
    commit('setUserData', response.result);
    return response;
  },
  async logout({ commit }) {
    commit('logOut');
  },
  async refreshTokens({ commit }) {
    const response = await this.$axios.$post('/v1/auth/refresh-tokens');
    commit('setNewTokens', response.result);
    return response;
  },
  async setCurrentPosition({ commit }, payload) {
    commit('setCurrentUserPosition', payload);
  },
};
