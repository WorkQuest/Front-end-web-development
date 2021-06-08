<template>
  <div class="mobile-menu">
    <nuxt-link
      class="mobile-menu__link"
      to="/quests"
    >
      <div class="mobile-menu__item">
        <span class="icon-list_check" />
        <span class="item__text">{{ $t('mobile.quests') }}</span>
      </div>
    </nuxt-link>
    <nuxt-link
      class="mobile-menu__link"
      to="/my"
    >
      <div class="mobile-menu__item">
        <span class="icon-list_ul" />
        <span class="item__text">{{ $t('mobile.myQuests') }}</span>
      </div>
    </nuxt-link>
    <nuxt-link
      class="mobile-menu__link"
      to="/messages"
    >
      <div class="mobile-menu__item">
        <span class="icon-message" />
        <span class="item__text">{{ $t('mobile.chat') }}</span>
      </div>
    </nuxt-link>
    <nuxt-link
      class="mobile-menu__link"
      to="/wallet"
    >
      <div class="mobile-menu__item">
        <span class="icon-credit_card" />
        <span class="item__text">{{ $t('mobile.wallet') }}</span>
      </div>
    </nuxt-link>
    <nuxt-link
      class="mobile-menu__link"
      to="/"
    >
      <div class="mobile-menu__item">
        <span class="icon-more_horizontal" />
        <span class="item__text">{{ $t('mobile.more') }}</span>
      </div>
    </nuxt-link>
    <!--    TODO: NEED ADD FUNC FOR COMPONENT-->
  </div>
</template>

<script>
export default {
  name: 'MobileMenu',
};
</script>

<style lang="scss" scoped>

.item {
  &__text {
    font-size: 16px;
  }
}

.icon {
  color: $black200;
  font-size: 25px;
  &-list_check:before {
    @extend .icon;
    content: "\e999";
  }
  &-list_ul:before {
    @extend .icon;
    content: "\e99d";
  }
  &-message:before {
    @extend .icon;
    content: "\e9c3";
  }
  &-credit_card:before {
    @extend .icon;
    content: "\ea0e";
  }
  &-more_horizontal::before {
    @extend .icon;
    content: "\e951";
  }
}
  .mobile-menu {
    padding: 10px 0 0 0;
    margin-top: 66px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    max-height: 66px;
    background: $white;
    position: fixed;
    bottom: 0;
    &__link {
      color: $black400;
      text-decoration: none;
      &:hover {
        color: $black600;
      }
    }
    &__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
}
@include _380 {
  .item {
    &__text {
      font-size: 13px;
    }
  }
}
</style>
