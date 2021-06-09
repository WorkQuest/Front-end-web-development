<template>
  <div class="template">
    <div class="template__container">
      <span
        v-if="$route.path === '/sign-in'"
        class="mobile__wrapper"
      >
        <div class="mobile__container">
          <div class="mobile__header">
            <div>
              <h2 class="mobile__title">
                {{ $t('signIn.welcomeToWorkQuest') }}
              </h2>
            </div>
            <div>
              <h3 class="mobile__subtitle">
                {{ $t('signIn.pleaseSignIn') }}
              </h3>
            </div>
          </div>
        </div>
      </span>
      <div class="template__left">
        <span
          v-for="(item, i) in links"
          :key="i"
          style="display: none"
        >
          <div
            v-if="$route.path === item.url"
            class="btn__container"
          >
            <div class="btn__back">
              <base-btn
                mode="back"
                @click="$router.go(-1)"
              >
                <template v-slot:left>
                  <span class="icon-chevron_big_left" />
                </template>
                {{ $t('signUp.back') }}
              </base-btn>
            </div>
          </div>
        </span>
        <div
          v-if="$route.path !== '/sign-in'"
          class="btn__container"
        >
          <div class="btn__back">
            <base-btn
              mode="back"
              @click="$router.go(-1)"
            >
              <template v-slot:left>
                <span class="icon-chevron_big_left" />
              </template>
              {{ $t('signUp.back') }}
            </base-btn>
          </div>
        </div>
        <div
          class="template__logo"
          @click="toMain()"
        >
          <img
            src="~assets/img/app/logo.svg"
            alt="WorkQuest"
          >
          <span>{{ $t('signIn.workQuest') }}</span>
        </div>
        <div class="template__content">
          <nuxt />
        </div>
      </div>
      <div class="template__right">
        <div class="template__slogan">
          <span>{{ $t('signIn.makingMoneyIsFast') }}</span>
        </div>
        <img
          class="template__long"
          src="~assets/img/app/logo_long.svg"
          alt=""
        >
      </div>
    </div>
    <transition name="fade">
      <loader v-if="isLoading" />
    </transition>
    <ctm-modal />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AuthLayout',
  data() {
    return {
      links: [
        { url: '/sign-up' },
        { url: '/restore' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      isLoading: 'main/getIsLoading',
    }),
  },
  methods: {
    toMain() {
      this.$router.push('/sign-in');
    },
  },
};
</script>

<style lang="scss" scoped>
.template {
  &__content {
    padding: 200px 0 0 0;
  }
}

.mobile {
  &__wrapper {
    display: none;
  }
}

.title {
  &__container {
    max-width: 200px;
    width: 100%
  }
}
.btn {
  &__container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    align-items: flex-end;
  }
  &__back {
    padding: 10px 0 0 0;
    width: 100%;
    max-width: 60px;
  }
}
.icon-chevron_big_left:before {
  content: "\ea4d";
  color: $black500;
  font-size: 25px;
}
.template {
  &__container {
    min-height: 100vh;
    width: 100%;
    background: #FFFFFF;
    display: grid;
    grid-auto-rows: auto 1fr;
    grid-template-columns: repeat(2, 1fr);
  }
  &__left {
    display: grid;
    grid-template-rows: 0fr 0fr;
    max-width: 470px;
    width: 100%;
    justify-self: flex-end;
    margin-right: 130px;
    padding-top: 21px;
  }
  &__logo {
    display: grid;
    align-items: center;
    grid-template-columns: 40px 1fr;
    grid-template-rows: 40px;
    grid-gap: 5px;
    cursor: pointer;
    span {
      font-family: 'Inter', sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 23px;
      line-height: 130%;
      color: $black700;
    }
  }
  &__content {
    display: grid;
    align-items: center;
  }
  &__right {
    background:  url("~assets/img/app/auth_bg.svg") center center no-repeat;
    background-size: cover;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 53px;
  }
  &__long {
    justify-self: flex-end;
  }
  &__slogan {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 55px;
    line-height: 130%;
    color: #FFFFFF;
    padding: 100px 0 0 100px;
    white-space: pre-line;
  }
}

@include _1700 {
  .links {
    display: none;
  }
  .btn {
    &__back {
      display: none;
    }
    &__container {
      display: none;
    }
  }
  .template {
    &__slogan {
      padding: 50px 0 0 50px;
    }
    &__left {
      grid-template-rows: 0fr 0fr;
    }
    &__right {
      display: none;
    }
    &__right {
      display: block;
    }
  }
}

@include _1300 {
  .mobile {
    &__wrapper {
      display: none;
    }
  }
  .links {
    display: none;
  }
  .template {
    &__content {
      padding: 200px 0 0 0;
    }
    &__slogan {
      padding: 50px 0 0 50px;
    }
    &__left {
      grid-template-rows: 0fr 0fr;
    }
    &__right {
      display: none;
    }
    &__right {
      display: block;
    }
  }
}

@include _1199 {
  .btn {
    &__back {
      padding: 0;
      display: flex;
    }
  }
  .links {
    display: none;
  }
  .btn__container {
    display: flex;
  }
  .mobile {
    display: flex;
    color: black;
    width: 100%;
    &__container {
      background: url(/_nuxt/assets/img/app/auth_bg.svg) center center no-repeat;
      display: grid;
      max-height: 100%;
      height: 354px;
      justify-items: center;
      align-content: flex-end;
      width: 100%;
      color: $black800;
    }
    &__title {
      color: $white;
      font-weight: 700;
      font-size: 34px;
      padding: 0 0 10px 0;
    }
    &__subtitle {
      color: $white;
      font-weight: 400;
      font-size: 16px;
      padding: 0 0 30px 0;
    }
    &__header {
      display: grid;
      grid-template-rows: auto 1fr;
      justify-content: flex-start;
      max-width: 367px;
      width: 100%;
    }
    &__wrapper {
      display: block;
    }
  }
  .template {
    &__logo {
      display: none;
    }
    &__container {
      grid-template-columns: 1fr;
      grid-auto-rows: 0fr;
    }
    &__content {
      padding: 0;
    }
    &__left {
     justify-self: center;
      margin-right: 0;
      grid-template-rows: 1fr;
      max-width: 367px;
      align-self: flex-start;
    }
    &__right {
      display: none;
    }
  }
}

@include _767 {
  .template {
    &__container {
      grid-template-columns: 1fr;
    }
    &__right {
      display: none;
    }
  }
  .links {
    display: flex;
  }
  .mobile {
    &__wrapper {
      display: block;
    }
  }
  .btn {
    &__back {
      padding: 0;
      display: flex;
    }
    &__container {
      display: flex;
    }
  }
}

@include _380 {
  .links {
    display: flex;
  }
  .title {
    &__container {
      max-width: 220px;
    }
  }
  .btn {
    &__back {
      padding: 0;
      display: flex;
    }
    &__container {
      display: flex;
    }
  }
  .btn {
    &__back {
      padding: 0;
      height: 100%;
    }
  }
  .mobile {
    &__container {
      height: 354px;
    }
    &__wrapper {
      display: block;
    }
    &__title {
      padding: 0 0 10px 30px;
    }
    &__subtitle {
      padding: 0 0 30px 30px;
    }
  }
  .template {
    &__left {
      max-width: 290px;
    }
  }
}

</style>
