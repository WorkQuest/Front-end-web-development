export default () => ({
  respondOnQuest: null,
  questListForInvitation: {},
  chatInfoInviteOnQuest: {},
  currentWorker: null,
  workersList: {},
  allQuests: {},
  quest: {},
  infoDataMode: '',
  userInfoQuests: {},
  questsLocation: {},
  starredQuests: {},
  responses: {},
  currentStepCreateQuest: 1,
  currentStepEditQuest: 1,
  mapBounds: {},
  mapCenter: {},
  filters: null,
  selectedSpecializationsFilters: {
    query: '', selected: {}, visible: {}, selectedAll: {},
  },
  selectedPriceFilter: { from: null, to: null },
});
