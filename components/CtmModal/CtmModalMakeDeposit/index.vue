<template>
  <ctm-modal-box
    class="messageSend"
    :title="$t('modals.deposit')"
  >
    <div class="ctm-modal__content">
      <div class="ctm-modal__content-field">
        <label for="cardNumber_input">{{$t('modals.depositAmount')}}</label>
        <input
          id="cardNumber_input"
          class="input_grey"
          placeholder="3 500"
        >
      </div>
      <div class="btn__container">
        <div class="btn__wrapper">
          <base-btn
            class="message__action"
            @click="showPensionIsRegisteredModal()"
          >
            {{ $t('meta.submit') }}
          </base-btn>
        </div>
        <div class="btn__wrapper">
          <base-btn
            class="message__action"
            @click="hide()"
          >
            {{ $t('meta.cancel') }}
          </base-btn>
        </div>
      </div>
    </div>
  </ctm-modal-box>
</template>

<script>
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';

export default {
  name: 'ModalApplyForAPension',
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
  },
  methods: {
    hide() {
      this.CloseModal();
    },
    showPensionIsRegisteredModal() {
    },
  },
};
</script>

<style lang="scss" scoped>
.ctm-modal {
  &__content-field {
    margin: 15px 0 0 0;
  }
}

.ctm-modal {
  @include modalKit;
}

.input {
  &_grey {
    border-radius: 6px;
    padding: 11px 20px 11px 15px;
    height: 46px;
    width: 100%;
    border: 0;
    background-color: $black0;
    resize: none;
    &::placeholder {
      color: $black200;
    }
  }
}
.grid {
  &__2col {
    display: grid;
    grid-template-columns: 49% 49%;
    justify-content: space-between;
    align-items: flex-end;
  }
}
.btn {
  &__container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 15px 0 0 0;
  }
  &__wrapper {
    width: 45%;
  }
}

.messageSend {
  max-width: 495px !important;
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
