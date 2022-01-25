export default {
  getChatInfoInviteOnQuest: (state) => state.chatInfoInviteOnQuest,
  getQuestListForInvitation: (state) => state.questListForInvitation || {},
  getEmployeeList: (state) => state.employeeList,
  getEmployeeCount: (state) => state.employeeCount,
  getCurrentWorker: (state) => state.currentWorker,
  getUserSpecializations: (state) => state.currentWorker?.userSpecializations,
  getQuestsStatistic: (state) => state.currentWorker?.questsStatistic,
  getRatingStatistic: (state) => state.currentWorker?.ratingStatistic,
  getInfoDataMode: (state) => state.infoDataMode,
  getUserInfoQuests: (state) => state.userInfoQuests.quests,
  getUserInfoQuestsCount: (state) => state.userInfoQuests.count,
  getAllQuests: (state) => state.allQuests.quests,
  getAllQuestsCount: (state) => state.allQuests.count,
  getQuest: (state) => state.quest,
  getQuestUser: (state) => state.quest?.user || '',
  getQuestUserAvatar: (state) => state.quest?.user?.avatar?.url || null,
  getQuestUserCompany: (state) => state.quest?.user?.additionalInfo?.company || '',
  getQuestsLocation: (state) => state.questsLocation || '',
  getCurrentStepEditQuest: (state) => state.currentStepEditQuest || '',
  getCurrentStepCreateQuest: (state) => state.currentStepCreateQuest || '',
  getMapBounds: (state) => state.mapBounds,
  getMapCenter: (state) => state.mapCenter || '',
  getResponded: (state) => state.responded,
  getInvited: (state) => state.invited,
  getResponsesMy: (state) => state.responsesMy || '',
  getRespondOnQuest: (state) => state.respondOnQuest,
  getFilters: (state) => state.filters,
  getSelectedSpecializationsFilters: (state) => state.selectedSpecializationsFilters,
  getSelectedPriceFilter: (state) => state.selectedPriceFilter,
  getAssignedWorker: (state) => state.quest.assignedWorker,
};
