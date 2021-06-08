<template>
  <ctm-modal-box
    class="change"
    :is-header="false"
  >
    <div class="ctm-modal__content">
      <div class="change">
        <div class="change__content">
          <img
            src="~assets/img/ui/password_changed.svg"
            alt="Email"
          >
          <div class="ctm-modal__title">
            {{ $t('restore.modal') }}
          </div>
          <base-btn
            class="change__action"
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
  name: 'ModalChangePassword',
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

.change {
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
