/* eslint-disable no-param-reassign */

export default {
  setTags(state, value) {
    state.tags.push(value);
  },
  deleteTag(state, value) {
    state.tags.splice(value, 1);
  },
  clearTags(state, value) {
    state.tags = [];
  },
};
