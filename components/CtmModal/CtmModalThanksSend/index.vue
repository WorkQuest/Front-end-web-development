<template>
  <ctm-modal-box
    class="messageSend"
    :is-header="false"
  >
    <div class="ctm-modal__content">
      <div class="messageSend">
        <div class="messageSend__content">
          <img
            src="~assets/img/ui/messageStar.svg"
            alt="Thanks"
          >
          <div class="ctm-modal__title">
            {{ $t('modals.thanks') }}
          </div>
          <div class="ctm-modal__desc">
            {{ modal.modalBody }}
          </div>
          <base-btn
            class="email__action"
            @click="hide()"
          >
            {{ $t('meta.ok') }}
          </base-btn>
        </div>
      </div>
    </div>
  </ctm-modal-box>
</template>

<script>
import modals from '~/store/modals/modals';

export default {
  name: 'ModalThanksSend',
  data() {
    return {
      modal: {
        modalBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,',
      },
    };
  },
  computed: {},
  methods: {
    hide() {
      this.CloseModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.ctm-modal {
  @include modalKit;
}

.messageSend {
  max-width: 337px !important;
  &__content {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    grid-gap: 20px;
  }
  &__action {
    margin-top: 10px;
  }
}
</style>
