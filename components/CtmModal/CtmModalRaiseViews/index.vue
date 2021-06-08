<template>
  <ctm-modal-box
    class="messageSend"
    :title="$t('modals.raiseViews')"
  >
    <div class="ctm-modal__content">
      <div class="grid__1col">
        <label for="priceOfAClick_input">{{ $t('modals.priceOfAClick') }}</label>
        <base-field
          id="priceOfAClick_input"
          v-model="priceOfAClick_input"
          :placeholder="'230 WUSD'"
        />
        <label for="city_input">{{ $t('modals.city') }}</label>
        <base-field
          id="city_input"
          v-model="city_input"
          :placeholder="'Moscow'"
        />
        <label for="period_input">{{ $t('modals.period') }}</label>
        <base-field
          id="period_input"
          v-model="period_input"
          :placeholder="'Week'"
        />
      </div>
      <div class="payment__container">
        <div class="payment__title">
          Estimated payment:
        </div>
        <div class="payment__cost">
          120 WUSD
        </div>
      </div>
      <div class="btn__container">
        <div class="btn__wrapper">
          <base-btn
            class="message__action"
            @click="showTransactionSendModal()"
          >
            {{ $t('meta.ok') }}
          </base-btn>
        </div>
        <div class="btn__wrapper">
          <base-btn
            :mode="'outline'"
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
  name: 'ModalRaiseViews',
  data() {
    return {
      priceOfAClick_input: '',
      city_input: '',
      period_input: '',
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
.payment {
  &__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  &__title {
    color: $black500;
    font-weight:400;
    font-size: 16px;
  }
  &__cost {
    color: $blue;
    font-weight: 500;
    font-size: 16px;
    padding: 0 0 0 5px;
  }
}

.btn {
  &__cancel {
    &_white {
      background: $white;
    }
  }
}

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
  max-width: 650px !important;
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
