export default {
  async getChatsList({ commit }, params) {
    const { result } = await this.$axios.$get('/v1/user/me/chats', { params });

    commit('setChatsList', result);
  },
  async getMessagesList({ commit, rootState }, { params, chatId }) {
    const { result } = await this.$axios.$get(`/v1/user/me/chat/${chatId}/messages`, { params });

    commit('setMessagesList', result);
  },
  handleCreateChat({ commit }, { config, userId }) {
    this.$axios.$post(`/v1/user/${userId}/send-message`, config);
  },
  async handleSendMessage({ commit }, { chatId, config }) {
    const response = await this.$axios.$post(`/v1/chat/${chatId}/send-message`, config);
    return response;
  },
};
