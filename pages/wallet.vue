<template>
  <div class="wallet">
    <div class="wallet__container">
      <div class="wallet__body">
        <div class="wallet__nav">
          <span class="wallet__title">{{ $t('wallet.wallet') }}</span>
          <div class="wallet__address">
            <span>{{ userWallet }}</span>
            <button
              v-clipboard:copy="userWallet"
              v-clipboard:success="ClipboardSuccessHandler"
              v-clipboard:error="ClipboardErrorHandler"
              type="button"
            >
              <span class="icon-copy wallet__icon" />
            </button>
          </div>
        </div>
        <div
          class="wallet__info"
          :class="{'wallet__info_full' : cardClosed }"
        >
          <div class="wallet__balance balance">
            <div class="balance__left">
              <span class="balance__title">{{ $t('wallet.balance') }}</span>
              <span class="balance__currency">{{ `${userBalance} ${currency}` }}</span>
              <span class="balance__usd">{{ `$ ${usd}` }}</span>
            </div>
            <div class="balance__right">
              <base-button
                mode="outline"
                class="balance__btn"
                @click="showDepositModal()"
              >
                {{ $t('wallet.deposit') }}
              </base-button>
              <base-button
                class="balance__btn"
                @click="showWidthrawModal()"
              >
                {{ $t('wallet.withdraw') }}
              </base-button>
            </div>
          </div>
          <div
            v-if="!cardClosed"
            class="wallet__card card"
          >
            <span class="card__title">{{ $t('wallet.addCardProposal') }}</span>
            <span
              class="icon-close_big card__icon"
              @click="closeCard()"
            />
            <!--        <img-->
            <!--          src="/img/app/card.svg"-->
            <!--          alt="card"-->
            <!--          class="card__img"-->
            <!--        >-->
            <base-button
              class="card__btn"
              mode="outline"
              @click="showAddCardModal()"
            >
              {{ $t('wallet.addCard') }}
            </base-button>
          </div>
        </div>
        <div class="wallet__table">
          <base-table
            :title="$t('wallet.table.trx')"
            :items="items"
            :fields="testFields"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';

export default {
  data() {
    return {
      cardClosed: false,
      userWallet: '0xnf8o29837hrvbn42o37hsho3b74thb3',
      items: [
        {
          tx_hash: 'sd535sd66sdsd',
          status: 'Success',
          block: '5267575474',
          timestamp: 'Feb 1, 2021, 21:34',
          transferred: 'To 2381hkjk123',
          value: '120 WUSD',
          transaction_fee: '5 WUSD',
        },
        {
          tx_hash: 'sd535sd66sdsd',
          status: 'Success',
          block: '5267575474',
          timestamp: 'Feb 1, 2021, 21:34',
          transferred: 'To 2381hkjk123',
          value: '120 WUSD',
          transaction_fee: '5 WUSD',
        },
        {
          tx_hash: 'sd535sd66sdsd',
          status: 'Success',
          block: '5267575474',
          timestamp: 'Feb 1, 2021, 21:34',
          transferred: 'To 2381hkjk123',
          value: '120 WUSD',
          transaction_fee: '5 WUSD',
        },
        {
          tx_hash: 'sd535sd66sdsd',
          status: 'Success',
          block: '5267575474',
          timestamp: 'Feb 1, 2021, 21:34',
          transferred: 'To 2381hkjk123',
          value: '120 WUSD',
          transaction_fee: '5 WUSD',
        },
        {
          tx_hash: 'sd535sd66sdsd',
          status: 'Success',
          block: '5267575474',
          timestamp: 'Feb 1, 2021, 21:34',
          transferred: 'To 2381hkjk123',
          value: '120 WUSD',
          transaction_fee: '5 WUSD',
        },
        {
          tx_hash: 'sd535sd66sdsd',
          status: 'Success',
          block: '5267575474',
          timestamp: 'Feb 1, 2021, 21:34',
          transferred: 'To 2381hkjk123',
          value: '120 WUSD',
          transaction_fee: '5 WUSD',
        },
      ],
      testFields: [
        {
          key: 'tx_hash', label: this.$t('wallet.table.txHash'), sortable: false,
        },
        {
          key: 'status', label: this.$t('wallet.table.status'), sortable: false,
        },
        {
          key: 'block', label: this.$t('wallet.table.block'), sortable: false,
        },
        {
          key: 'timestamp', label: this.$t('wallet.table.timestamp'), sortable: false,
        },
        {
          key: 'transferred', label: this.$t('wallet.table.transferred'), sortable: false,
        },
        {
          key: 'value', label: this.$t('wallet.table.value'), sortable: false,
        },
        {
          key: 'transaction_fee', label: this.$t('wallet.table.trxFee'), sortable: false,
        },
      ],
      userBalance: '1500',
      currency: 'WUSD',
      usd: '120.34',
    };
  },
  computed: {
    ...mapGetters({
      tags: 'ui/getTags',
      userRole: 'user/getUserRole',
      userData: 'user/getUserData',
    }),
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    closeCard() {
      this.cardClosed = true;
    },
    showDepositModal() {
      this.ShowModal({
        key: modals.deposit,
      });
    },
    showWidthrawModal() {
      this.ShowModal({
        key: modals.widthraw,
      });
    },
    showAddCardModal() {
      this.ShowModal({
        key: modals.addCard,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wallet {
  &__container {
    display: flex;
    justify-content: center;
  }
  &__body {
    max-width: 1180px;
    width: 100%;
  }
  &__nav {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }
  &__address {
    @include text-simple;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
  }

  &__icon {
    margin-left: 22px;
    font-size: 24px;
    &::before {
      color: $blue;

    }
  }

  &__title {
    @include text-simple;
    font-size: 25px;
    font-weight: 500;
  }

  &__info {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 479px;
    grid-gap: 20px;
    &_full {
      grid-template-columns: 1fr;
    }
  }
  &__table {
    margin-top: 20px;
  }
}

.balance {
  display: flex;
  background: $white;
  justify-content: space-between;
  border-radius: 6px;
  width: 100%;
  min-width: 660px;
  padding: 20px;
  height: 154px;

  &__left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__right {
    width: 220px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }

  &__title {
    @include text-simple;
    color: #4C5767;
  }

  &__currency {
    @include text-simple;
    color: $black800;
    font-weight: 600;
    font-size: 35px;
    line-height: 130%;
  }

  &__usd {
    @include text-simple;
    color: $blue;
  }
}

.card {
  width: 100%;
  height: 154px;
  padding: 20px;
  display: grid;
  grid-template-rows: auto 43px;
  grid-gap: 10px;
  grid-template-columns: 230px 1fr;
  @include text-simple;
  background: $blue url('/img/app/card.svg') no-repeat right center;
  color: $white;
  position: relative;
  overflow: hidden;
  border: none !important;

  &__title {
    @include text-simple;
    color: $white;
    font-weight: 500;
    font-size: 20px;
    line-height: 130%;
  }

  &__btn {
    grid-column-start: 2;
    z-index: 2;
  }

  &__img {
    position: absolute;
    left: 144px;
    top: -43px;
    width: 355px;
    height: 250px;
    z-index: 1;
    object-fit: cover;
  }

  &__icon {
    display: flex;
    justify-content: flex-end;
    z-index: 2;
    &:before {
      cursor: pointer;
      font-size: 20px;
      color: $white;
    }
  }
}
</style>
