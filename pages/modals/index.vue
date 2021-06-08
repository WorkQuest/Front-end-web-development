<template>
  <div>
    <base-btn
      @click="showMessageSendModal()"
    >
      showMessageSendModal
    </base-btn>
    <base-btn
      @click="showQuestAgreedModal()"
    >
      showQuestAgreedModal
    </base-btn>
    <base-btn
      @click="showRequestSendModal()"
    >
      showRequestSendModal
    </base-btn>
    <base-btn
      @click="showSendARequestModal()"
    >
      showSendARequestModal
    </base-btn>
    <base-btn
      @click="showAreYouSureModal()"
    >
      showAreYouSureModal
    </base-btn>
    <!-- New -->
    <base-btn
      @click="showTransactionSendModal()"
    >
      showTransactionSendModal
    </base-btn>
    <base-btn
      @click="showCardHasBeenAddedModal()"
    >
      showCardHasBeenAddedModal
    </base-btn>
    <base-btn
      @click="showDepositModal()"
    >
      showDepositModal
    </base-btn>
    <base-btn
      @click="showAddCardModal()"
    >
      showAddCardModal
    </base-btn>
    <base-btn
      @click="showWidthrawModal()"
    >
      showWidthrawModal
    </base-btn>
    <base-btn
      @click="showThanksModal()"
    >
      showThanksModal
    </base-btn>
    <base-btn
      @click="showInviteSendModal()"
    >
      showInviteSendModal
    </base-btn>
    <base-btn
      @click="showQuestCreatedModal()"
    >
      showQuestCreatedModal
    </base-btn>
    <base-btn
      @click="showInvitationModal()"
    >
      showInvitationModal
    </base-btn>
    <base-btn
      @click="showRaiseViewsModal()"
    >
      showRaiseViewsModal
    </base-btn>
    <base-btn
      @click="showApplyForAPensionModal()"
    >
      showApplyForAPensionModal
    </base-btn>
    <base-btn
      @click="showPensionIsRegisteredModal()"
    >
      showPensionIsRegisteredModal
    </base-btn>
    <base-btn
      @click="showMakeDeposit()"
    >
      showMakeDeposit
    </base-btn>
    <base-btn
      @click="showChangePercent()"
    >
      showChangePercent
    </base-btn>
  </div>
</template>

<script>
import modals from '~/store/modals/modals';

export default {
  data() {
    return {};
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    showRaiseViewsModal() {
      this.ShowModal({
        key: modals.raiseViews,
      });
    },
    showTransactionSendModal() {
      this.ShowModal({
        key: modals.transactionSend,
      });
    },
    showCardHasBeenAddedModal() {
      this.ShowModal({
        key: modals.cardHasBeenAdded,
      });
    },
    showDepositModal() {
      this.ShowModal({
        key: modals.deposit,
      });
    },
    showAddCardModal() {
      this.ShowModal({
        key: modals.addCard,
      });
    },
    showWidthrawModal() {
      this.ShowModal({
        key: modals.widthraw,
      });
    },
    showInvitationModal() {
      this.ShowModal({
        key: modals.invitation,
      });
    },
    showQuestCreatedModal() {
      this.ShowModal({
        key: modals.questCreated,
      });
    },
    showInviteSendModal() {
      this.ShowModal({
        key: modals.inviteSend,
      });
    },
    showQuestAgreedModal() {
      this.ShowModal({
        key: modals.questAgreed,
      });
    },
    showMessageSendModal() {
      this.ShowModal({
        key: modals.messageSend,
      });
    },
    showRequestSendModal() {
      this.ShowModal({
        key: modals.requestSend,
      });
    },
    showSendARequestModal() {
      this.ShowModal({
        key: modals.sendARequest,
      });
    },
    showAreYouSureModal() {
      this.ShowModal({
        key: modals.areYouSure,
      });
    },
    showThanksModal() {
      this.ShowModal({
        key: modals.thanks,
      });
    },
    showApplyForAPensionModal() {
      this.ShowModal({
        key: modals.applyForAPension,
      });
    },
    showPensionIsRegisteredModal() {
      this.ShowModal({
        key: modals.pensionIsRegistered,
      });
    },
    showMakeDeposit() {
      this.ShowModal({
        key: modals.makeDeposit,
      });
    },
    showChangePercent() {
      this.ShowModal({
        key: modals.changePercent,
      });
    },
  },
};
</script>
