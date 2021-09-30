export default {
  getLocations: (state) => state.locations,
  getDistance: (state) => state.distance,
  getReviews: (state) => state.reviews,
  getPortfolios: (state) => state.portfolios,
  getQuest: (state) => state.quest,
  getUserInfo: (state) => state.userInfo,
  getTabs: (state) => state.tabs,
  getCards: (state) => state.cards,
  getCard: (state) => state.card,
  getBadgeList: (state) => state.badgeList,
  getSocials: (state) => state.socials,
  getDisputes: (state) => state.disputes,
  getMessages: (state) => state.messages,
  getTransactions: (state) => state.transactions,
  getTransactionsData: (state) => state.transactionsData,
  getRespondedList: (state) => state.respondedList,
  getName: (state) => state.userInfo?.name || '',
  getCompany: (state) => state.userInfo?.company || '',
  getLocation: (state) => state.userInfo?.location || '',
  getPhone: (state) => state.userInfo?.tel || '',
  getEmail: (state) => state.userInfo?.email || '',
  getSkills: (state) => state.userInfo?.skills || '',
  getEducations: (state) => state.userInfo?.educations,
  getWorkExp: (state) => state.userInfo?.workExp,
  getUserDesc: (state) => state.userInfo?.desc,
  getChats: (state) => state.chats,
  notificationsConnectionStatus: (state) => state.connections,
  getCurrChatId: (state) => state.messages.chatId,
  getLastMessageId: (state) => (state.messages.count ? state.messages.list[state.messages.list.length - 1].id : ''),
};
