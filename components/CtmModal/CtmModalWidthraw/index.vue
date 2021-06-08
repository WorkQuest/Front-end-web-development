<template>
  <ctm-modal-box
    class="messageSend"
    :title="$t('modals.widthraw')"
  >
    <div class="ctm-modal__content">
      <div class="grid__3col">
        <div class="ctm-modal__content-field">
          <label for="date_input">{{ $t('modals.amount') }}</label>
          <base-field
            id="date_input"
            v-model="date_input"
            :placeholder="'02/24'"
          />
        </div>
        <div class="ctm-modal__equal">
          =
        </div>
        <div class="ctm-modal__content-field">
          <base-field
            v-model="balance_input"
            mode="white"
            :placeholder="'$ 0'"
          />
        </div>
      </div>
      <div class="ctm-modal__content-field">
        <label for="cardNumber_input">{{ $t('modals.numberOfCard') }}</label>
        <base-field
          id="cardNumber_input"
          v-model="cardNumber_input"
          :placeholder="'1234 1234 1234 1234'"
        />
      </div>
      <div class="ctm-modal__content-field link">
        <nuxt-link
          to="#"
        >
          {{ $t('modals.addAnotherCard') }}
        </nuxt-link>
      </div>
      <div class="btn__container">
        <div class="btn__wrapper">
          <base-btn
            class="message__action"
            @click="showTransactionSendModal()"
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
  name: 'ModalWidthraw',
  data() {
    return {
      date_input: '',
      balance_input: '',
      cardNumber_input: '',
    };
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
    showTransactionSendModal() {
      this.ShowModal({
        key: modals.transactionSend,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  text-align: right;
}
.ctm-modal {
  &__content-field {
    margin: 15px 0 0 0;
  }
  &__equal {
    margin: 0 0 35px 10px;
  }
}

.ctm-modal {
  @include modalKit;
}

.input {
  &_white {
    border-radius: 6px;
    border: 1px solid $black0;
    padding: 11px 20px 11px 15px;
    height: 46px;
    width: 100%;
    background-color: $white;
    resize: none;
    &::placeholder {
      color: $black800;
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
.grid {
  &__3col {
    display: grid;
    grid-template-columns: 47% 6% 47%;
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
