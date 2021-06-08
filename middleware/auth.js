// eslint-disable-next-line func-names
export default async function ({ app, redirect, store }) {
  try {
    const access = app.$cookies.get('access');
    const refresh = app.$cookies.get('refresh');
    const userData = store.getters['user/getUserData'];
    if (access && refresh) {
      store.commit('user/setOldTokens', { access, refresh });
    }
    if (!access || !refresh) {
      return redirect('/sign-in');
    }
    if (!Object.keys(userData).length) {
      await store.dispatch('user/getUserData');
    }
    return true;
  } catch (e) {
    console.log(e);
    await store.dispatch('user/logout');
    return redirect('/sign-in');
  }
}
