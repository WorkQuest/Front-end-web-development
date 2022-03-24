export default {
  getStatusKYC: (state) => state.userData.statusKYC,
  getCurrentLang: (state) => state.currentLang,
  isAuth: (state) => !!(state.tokens.access && state.tokens.refresh),
  accessToken: (state) => state.tokens.access,
  refreshToken: (state) => state.tokens.refresh,
  getUserData: (state) => state.userData,
  getTwoFACode: (state) => state.twoFACode,
  getVerificationCode: (state) => state.verificationCode,
  getUserWalletAddress: (state) => state.userData?.wallet?.address,
  getStatus2FA: (state) => state.userData.statusKYC,
  getStatusTotp: (state) => state.userData.totpIsActive,
  getAnotherUserData: (state) => state.anotherUserData,
  editUserData: (state) => state.userData,
  getAdditionalInfo: (state) => state.userData.additionalInfo.socialNetwork,
  getAdditionalInfoInstagram: (state) => state.userData.additionalInfo.socialNetwork.instagram,
  getUserRole: (state) => state.userData.role,
  getUserCurrentPosition: (state) => state.currentUserPosition,
  getImageData: (state) => state.userData.avatar?.url,
  getFirstName: (state) => state.userData.firstName,
  getLastName: (state) => state.userData.lastName,
  getUserCompany: (state) => state.userData.additionalInfo.company,
  getUserDesc: (state) => state.userData.additionalInfo.description,
  getUserEducations: (state) => state.userData.additionalInfo.educations,
  getUserWorkExp: (state) => state.userData.additionalInfo.workExperiences,
  getUserAddress: (state) => state.userData.additionalInfo.address,
  getUserFirstMobileNumber: (state) => state.userData.additionalInfo.firstMobileNumber,
  getUserSecondMobileNumber: (state) => state.userData.additionalInfo.secondMobileNumber,
  getUserEmail: (state) => state.userData.email,
  getUserCEO: (state) => state.userData.additionalInfo.CEO,
  getUserWebsite: (state) => state.userData.additionalInfo.website,
  getUserInstagram: (state) => state.userData.additionalInfo.socialNetwork.instagram,
  getUserTwitter: (state) => state.userData.additionalInfo.socialNetwork.twitter,
  getUserLinkedin: (state) => state.userData.additionalInfo.socialNetwork.linkedin,
  getUserFacebook: (state) => state.userData.additionalInfo.socialNetwork.facebook,
  getUserPortfolios: (state) => state.portfolios,
  getUserPortfolio: (state) => state.medias,
  getAllUserReviews: (state) => state.userReviews,
  getUser2FA: (state) => state.userEnable2FA,
  getUnreadChatsCount: (state) => state.unreadChatsCount,
  getUnreadNotifsCount: (state) => state.unreadNotifsCount,
  getNotificationsList: (state) => state.notifications.list,
  getNotificationsCount: (state) => state.notifications.count,
  getReducedNotifications: (state) => state.reducedNotifications,
};
