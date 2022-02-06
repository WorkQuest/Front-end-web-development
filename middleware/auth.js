// eslint-disable-next-line func-names
import { Path } from '~/utils/enums';

export default async function ({ app, redirect, store }) {
  try {
    const access = app.$cookies.get('access');
    const refresh = app.$cookies.get('refresh');
    const userStatus = app.$cookies.get('userStatus');
    const social = app.$cookies.get('socialNetwork');
    const userData = store.getters['user/getUserData'];
    const payload = {
      access,
      refresh,
      userData,
      social,
    };

    if (access && refresh) {
      store.commit('user/setTokens', payload);
    }
    if (!access || !refresh || !app.$cookies.get('userLogin')) {
      return redirect('/sign-in');
    }
    if (userData.id === '') {
      await store.dispatch('user/getUserData');
      await store.dispatch('user/getStatistic');
      await store.dispatch('user/getNotifications');
    }
    if (userStatus === 2) {
      return redirect(Path.ROLE);
    }
    return true;
  } catch (e) {
    console.log(e);
    await store.dispatch('user/logout');
    return redirect('/sign-in');
  }
}
