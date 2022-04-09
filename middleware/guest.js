// eslint-disable-next-line func-names
export default async function ({ app, store }) {
  try {
    const access = app.$cookies.get('access');
    const refresh = app.$cookies.get('refresh');
    const userLogin = app.$cookies.get('userLogin');
    const userStatus = app.$cookies.get('userStatus');
    const userData = store.getters['user/getUserData'];
    const social = app.$cookies.get('socialNetwork');
    const payload = {
      social,
      access,
      refresh,
      userData,
      userStatus,
    };

    if (!access || !refresh || !userLogin) return;

    if ((access || refresh) && userLogin) {
      store.commit('user/setTokens', payload);
    }

    if (userData.id === '') {
      await store.dispatch('user/getUserData');
      await store.dispatch('user/getStatistic');
      await store.dispatch('notifications/getNotifications', { root: true });
    }
  } catch (e) {
    console.error('Middleware guest', e);
  }
}
