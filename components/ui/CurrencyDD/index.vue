<template>
  <div
    v-click-outside="hideDd"
    class="dd-container"
    data-selector="COMPONENT-CURRENCY-DD"
    @click="isShown = !isShown"
  >
    <button class="dd__btn">
      <img
        class="token-icon"
        :src="images[selectedToken]"
        :alt="selectedToken"
      >
      <span
        :class="[isShown ? 'icon-caret_up' : 'icon-caret_down', 'dd__caret']"
      />
    </button>
    <div
      v-if="isShown"
      class="dd__items"
    >
      <button
        v-for="(item, i) in tokens"
        :key="`dd__item-${i}`"
        @click="selectToken(item.name)"
      >
        <img
          class="token-icon"
          :src="images[item.name]"
          :alt="item.name"
        >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'CurrencyDd',
  directives: {
    ClickOutside,
  },
  props: {
    selectedToken: {
      type: String,
      default: 'USDC',
    },
  },
  data: () => ({
    isShown: false,
    tokens: [{ name: 'USDC' }, { name: 'USDT' }],
    images: {
      USDC: require('~/assets/img/ui/USD-Coin-icon.svg'),
      USDT: require('~/assets/img/ui/tether-usdt.svg'),
    },
  }),
  methods: {
    hideDd() {
      this.isShown = false;
    },
    selectToken(tokenName) {
      this.$emit('selectingToken', tokenName);
    },
  },
};
</script>

<style scoped lang="scss">
.token-icon {
  width: 24px;
  height: 24px;
}
.dd-container {
  width: 83px;
  height: 46px;
  display: flex;
  gap: 10px;
  position: absolute;
  align-items: center;
  z-index: 1;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  cursor: pointer;

  &::before {
    content: '';
    width: 1px;
    height: 24px;
    background-color: #aab0b9;
  }
}

.dd {
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 130%;
  color: $black500;
  text-align: left;

  &__items {
    animation-duration: 4s;
    @include box;
    width: 120px;
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    background: #ffffff;
    display: flex;
    gap: 15px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 15px 20px;

    button {
      display: flex;
      gap: 10px;
      font-weight: 500;
      font-size: 16px;
      line-height: 130%;
      color: $black500;
      &:hover {
        color: $black800;
      }
    }
  }
  &__caret {
    &::before {
      color: $blue;
      font-size: 24px;
    }
  }
  &__btn {
    width: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
