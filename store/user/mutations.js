/* eslint-disable no-param-reassign */

export default {
  setOldTokens(state, { access, refresh }) {
    state.tokens.access = access;
    state.tokens.refresh = refresh;
    this.$cookies.set('access', access, { path: '/' });
    this.$cookies.set('refresh', refresh, { path: '/' });
  },
  setNewTokens(state, { access, refresh }) {
    state.tokens.access = access;
    state.tokens.refresh = refresh;
    this.$cookies.set('access', access, { path: '/' });
    this.$cookies.set('refresh', refresh, { path: '/' });
  },
  setUserData(state, data) {
    state.userData = data;
  },
  logOut(state) {
    this.$cookies.remove('access');
    this.$cookies.remove('refresh');
    this.$cookies.remove('status');
    this.$cookies.remove('role');
    state.userData = {};
  },
  setCurrentUserPosition(state, data) {
    state.currentUserPosition = data;
  },
};
