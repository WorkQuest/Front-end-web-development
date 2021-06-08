<template>
  <ctm-modal-box
    class="email"
    :is-header="false"
  >
    <div class="ctm-modal__content">
      <div class="email">
        <div class="email__content">
          <img
            src="~assets/img/ui/email.svg"
            alt="Email"
          >
          <div class="ctm-modal__title">
            {{ $t('registration.emailConfirmTitle') }}
          </div>
          <div class="ctm-modal__desc">
            {{ $t('registration.emailConfirm') }}
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
import { mapGetters } from 'vuex';

export default {
  name: 'ModalConfirmEmail',
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
  },
  methods: {
    hide() {
      this.CloseModal();
      this.$router.push('/sign-in');
    },
  },
};
</script>

<style lang="scss" scoped>
.ctm-modal {
  @include modalKit;
}

.email {
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
