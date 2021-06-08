export default {
  setIsShow(state, value) {
    state.isShow = value;
  },
  setCurrentModalKey(state, value) {
    state.currentModalKey = value;
  },
  setOptions(state, value) {
    state.options = value;
  },
  setUnclicable(state, value) {
    state.options = {
      ...state.options,
      isUnclosable: true,
    };
  },
};
