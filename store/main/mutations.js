export default {
  setLoading(state, value) {
    state.isLoading = value;
  },
  setStatusText(state, value) {
    state.loaderStatusText = value;
  },
  setLoaderMode(state, value) {
    state.loaderMode = value;
  },
  setLoaderProgress(state, value) {
    state.loaderProgress = value;
  },
  setProjects(state, value) {
    state.projects = value;
  },
  setIsLoaderBackgroundHider(state, value) {
    state.isLoaderBackgroundHider = value;
  },
};
