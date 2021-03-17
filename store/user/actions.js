export default {
  async signIn({ commit }, payload) {
    try {
      const response = await this.$axios.post('/v1/auth/login', payload);
      // if (response?.ok) {
      //   commit('setNewTokens', response.result);
      // }
      return response;
    } catch (err) {
      return err;
    }
  },
  async signUp({ commit }, payload) {
    try {
      const response = await this.$axios.post('/v1/auth/register', payload);
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  },
  async confirm({ commit }, payload) {
    try {
      const response = await this.$axios.post('/v1/auth/confirm-email', payload);
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  },
};
