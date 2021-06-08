<template>
  <div
    v-click-outside="hideDd"
    class="dd"
    :class="[{'dd__top': mode === 'top' }]"
  >
    <button
      class="dd__btn"
      :class="ddClass"
      @click="isShown = !isShown"
    >
      <div
        v-if="isIcon"
        class="dd__icon"
      >
        <img
          :src="items[value].icon"
          :alt="items[value].title"
        >
        <span
          class="dd__title"
        >
          {{ items[value].title }}
        </span>
      </div>
      <span
        v-else
        class="dd__title"
      >
        {{ items[value] }}
      </span>
      <span
        v-if="type === 'sort'"
        class="dd__caret dd__caret_dark icon-Sorting_descending"
      />
      <span
        v-else
        class="dd__caret icon-caret_down"
      />
    </button>
    <transition name="fade">
      <div
        v-if="isShown && isIcon"
        class="dd__items"
      >
        <button
          v-for="(item, i) in items"
          :key="`dd__item-${i}`"
          class="dd__item dd__item_icon"
          @click="selectItem(i)"
        >
          <img
            :src="item.icon"
            :alt="item.title"
          >
          {{ item.title }}
        </button>
      </div>
      <div
        v-if="isShown && !isIcon"
        class="dd__items"
      >
        <button
          v-for="(item, i) in items"
          :key="`dd__item-${i}`"
          class="dd__item"
          @click="selectItem(i)"
        >
          {{ item }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'Dd',
  directives: {
    ClickOutside,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: 'default',
    },
    isIcon: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    isShown: false,
  }),
  computed: {
    ddClass() {
      const { type } = this;
      return [
        { dd__btn_dark: type === 'dark' },
        { dd__btn_gray: type === 'gray' },
      ];
    },
  },
  methods: {
    hideDd() {
      this.isShown = false;
    },
    selectItem(i) {
      this.isShown = false;
      this.$emit('input', i);
    },
  },
};
</script>

<style scoped lang="scss">
.dd {
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 130%;
  color: $black800;
  min-width: 131px;
  position: relative;
  text-align: left;
  &__top {
    align-items: flex-start;
  }
  &__items {
    @include box;
    width: 100%;
    position: absolute;
    background: #FFFFFF;
    top: calc(100% + 4px);
    display: grid;
    align-items: center;
    justify-content: flex-start;
    grid-gap: 15px;
    padding: 15px 20px;
    z-index: 1;
  }
  &__item {
    text-align: left;
    width: 100%;
    color: $black500;
    min-height: 21px;
    &:hover {
      color: $black800;
    }
    &_icon {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        margin-right: 5px;
      }
    }
  }
  &__icon {
    display: flex;
    align-items: center;
    img {
      margin-right: 5px;
    }
    span {
      margin-right: 5px;
    }
  }
  &__caret {
    &::before {
      padding-left: 10px;
      color: $black400;
      font-size: 24px;

    }
    &_dark::before {
      color: $black700;
    }
  }
  &__btn {
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    width: 100%;
    background: #FFFFFF;
    border-radius: 6px;
    &_dark {
      background: #151552;
    }
    &_gray {
      background-color: $black0;
    }
  }
}
</style>
