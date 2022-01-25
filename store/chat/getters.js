export default {
  getMessages: (state) => state.messages,
  getCurrChatInfo: (state) => state.currChat || null,
  currChatIsUnread: (state) => state.currChat?.isUnread || false,
  getChats: (state) => state.chats,
  getCurrChatId: (state) => (state.currChat?.id || ''),
  getLastMessageId: (state) => (!state.messagesFilter.canLoadToBottom && state.messages.list.length ? state.messages.list[state.messages.list.length - 1].id : null),
  getMessagesFilter: (state) => state.messagesFilter,
  getGroupChatUsers: (state) => state.groupChatUsers,
  getChatMembers: (state) => state.currChat?.members || [],
  isChatOpened: (state) => state.isChatOpened,
};
