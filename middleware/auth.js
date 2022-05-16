// eslint-disable-next-line func-names
import { Path, UserStatuses } from '~/utils/enums';

// eslint-disable-next-line func-names
export default async function ({
  app, redirect, store, route,
}) {
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

    if (access || refresh) {
      store.commit('user/setTokens', payload);
    }
    if (!access || !app.$cookies.get('userLogin')) {
      await store.dispatch('user/logout', false);
      return redirect(Path.SIGN_IN);
    }
    if (!userData.id && +userStatus === UserStatuses.Confirmed) {
      await store.dispatch('user/getMainData');
    }
    if ((+userStatus === UserStatuses.NeedSetRole || !store.getters['user/getUserWalletAddress']) && route.path !== Path.ROLE) {
      return redirect(Path.ROLE);
    }

    return true;
  } catch (e) {
    console.error(e);
    await store.dispatch('user/logout', false);
    return redirect(Path.SIGN_IN);
  }
}
