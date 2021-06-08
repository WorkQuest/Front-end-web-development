<template>
  <div class="primary">
    <div class="primary__template template">
      <div class="template__content">
        <div
          v-click-outside="closeAll"
          class="template__header header"
        >
          <div class="header__body">
            <div class="header__left">
              <div
                class="header__logo"
                @click="toMain()"
              >
                <img
                  src="~assets/img/app/logo.svg"
                  alt="WorkQuest"
                >
                <span>WorkQuest</span>
              </div>
              <div
                v-if="userRole === 'employer'"
                class="header__links"
              >
                <nuxt-link
                  to="/workers"
                  class="header__link"
                  :exact-active-class="'header__link_active'"
                >
                  {{ $t('ui.workers') }}
                </nuxt-link>
                <nuxt-link
                  to="/my"
                  class="header__link"
                  :exact-active-class="'header__link_active'"
                >
                  {{ $t('quests.MyQuests') }}
                </nuxt-link>
                <nuxt-link
                  to="/wallet"
                  class="header__link"
                  :exact-active-class="'header__link_active'"
                >
                  {{ $t('ui.wallet') }}
                </nuxt-link>
                <button
                  class="header__link header__link_menu"
                  :class="{'header__link_active': isShowAdditionalMenu}"
                  @click="showAdditionalMenu()"
                >
                  {{ $t('ui.profile.instruments') }}
                  <span class="icon-caret_down" />
                  <transition name="fade">
                    <div
                      v-if="isShowAdditionalMenu"
                      class="menu"
                    >
                      <div class="menu__items">
                        <n-link
                          v-for="item in additionalMenuLinks"
                          :key="`item-${item.title}`"
                          :to="item.path"
                          tag="div"
                          class="menu__item"
                        >
                          <div class="menu__top">
                            <div class="menu__text menu__text_header">
                              {{ item.title }}
                            </div>
                            <span class="icon-chevron_right" />
                          </div>
                          <div class="menu__bottom">
                            <div class="menu__text menu__text_grey">
                              <span>
                                Lorem ipsum dolor sit amet, consectetur adipiscing ...
                              </span>
                            </div>
                          </div>
                        </n-link>
                      </div>
                    </div>
                  </transition>
                </button>
              </div>
              <div
                v-if="userRole === 'worker'"
                class="header__links"
              >
                <nuxt-link
                  to="/quests"
                  class="header__link"
                  :exact-active-class="'header__link_active'"
                >
                  {{ $t('ui.quests') }}
                </nuxt-link>
                <nuxt-link
                  to="/my"
                  class="header__link"
                  :exact-active-class="'header__link_active'"
                >
                  {{ $t('ui.myQuests') }}
                </nuxt-link>
                <nuxt-link
                  to="/wallet"
                  class="header__link"
                  :exact-active-class="'header__link_active'"
                >
                  {{ $t('ui.wallet') }}
                </nuxt-link>
                <button
                  class="header__link header__link_menu"
                  :class="{'header__link_active': isShowAdditionalMenu}"
                  @click="showAdditionalMenu()"
                >
                  {{ $t('ui.profile.instruments') }}
                  <span class="icon-caret_down" />
                  <transition name="fade">
                    <div
                      v-if="isShowAdditionalMenu"
                      class="menu"
                    >
                      <div class="menu__items">
                        <n-link
                          v-for="item in additionalMenuLinks"
                          :key="`item-${item.title}`"
                          :to="item.path"
                          tag="div"
                          class="menu__item"
                        >
                          <div class="menu__top">
                            <div class="menu__text menu__text_header">
                              {{ item.title }}
                            </div>
                            <span class="icon-chevron_right" />
                          </div>
                          <div class="menu__bottom">
                            <div class="menu__text menu__text_grey">
                              <span>
                                Lorem ipsum dolor sit amet, consectetur adipiscing ...
                              </span>
                            </div>
                          </div>
                        </n-link>
                      </div>
                    </div>
                  </transition>
                </button>
              </div>
            </div>
            <div class="header__right">
              <button
                class="header__button header__button_locale"
                @click="showLocale()"
              >
                {{ $t('ui.locals.en') }}
                <span class="icon-caret_down" />
                <transition name="fade">
                  <div
                    v-if="isShowLocale"
                    class="locale"
                  >
                    <div class="locale__items">
                      <div class="locale__item">
                        <img
                          src="/img/app/en.svg"
                          alt="EN"
                          class="locale__icon"
                        >
                        <div class="locale__text">
                          {{ $t('ui.locals.en') }}
                        </div>
                      </div>
                      <div class="locale__item">
                        <img
                          src="/img/app/ru.svg"
                          alt="RU"
                          class="locale__icon"
                        >
                        <div class="locale__text">
                          {{ $t('ui.locals.ru') }}
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </button>
              <button
                class="header__button"
                @click="goToMessages()"
              >
                <span class="icon-message" />
              </button>
              <button class="header__button header__button_notify">
                <span
                  v-if="notification"
                  class="icon-notification_outline_dot"
                  @click="showNotification()"
                />
                <span
                  v-else
                  class="icon-notification_outline"
                />
                <transition name="fade">
                  <div
                    v-if="isShowNotify"
                    class="notify"
                  >
                    <div class="notify__header">
                      <div class="notify__title">
                        {{ $t('ui.notifications.title') }}
                      </div>
                      <span
                        class="icon-close_small"
                        @click="showNotification()"
                      />
                    </div>
                    <div class="notify__body">
                      <div class="notify__items">
                        <div class="notify__item">
                          <div class="notify__content">
                            <div class="notify__top">
                              <div class="notify__user">
                                <div class="notify__avatar">
                                  <img
                                    src="~assets/img/app/fakeavatarcomp.svg"
                                    alt=""
                                  >
                                </div>
                                <div class="notify__info">
                                  <div class="notify__text notify__text_name">
                                    Edward cooper
                                  </div>
                                  <div class="notify__text notify__text_grey">
                                    CEO from Amazon
                                  </div>
                                </div>
                              </div>
                              <div class="notify__text notify__text_date">
                                14 January 2021, 14:54
                              </div>
                            </div>
                            <div class="notify__reason">
                              <div class="notify__text notify__text_blue">
                                {{ $t('ui.notifications.invite') }}:
                              </div>
                            </div>
                            <div class="notify__action">
                              <button class="notify__btn">
                                <span class="notify__text notify__text_btn">
                                  Paint the garage quickly
                                </span>
                                <span class="icon-chevron_right" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="notify__item">
                          <div class="notify__content">
                            <div class="notify__top">
                              <div class="notify__user">
                                <div class="notify__avatar">
                                  <img
                                    src="~assets/img/app/fakeavatar.svg"
                                    alt=""
                                  >
                                </div>
                                <div class="notify__info">
                                  <div class="notify__text notify__text_name">
                                    Samantha Sparks
                                  </div>
                                </div>
                              </div>
                              <div class="notify__text notify__text_date">
                                14 January 2021, 14:54
                              </div>
                            </div>
                            <div class="notify__reason">
                              <div class="notify__text notify__text_blue">
                                {{ $t('ui.notifications.invite') }}:
                              </div>
                            </div>
                            <div class="notify__action">
                              <button class="notify__btn">
                                <span class="notify__text notify__text_btn">
                                  Paint the garage quickly
                                </span>
                                <span class="icon-chevron_right" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </button>
              <button
                class="header__button header__button_profile"
                @click="showProfile()"
              >
                <span class="icon-hamburger" />
                <transition name="fade">
                  <div
                    v-if="isShowProfile"
                    class="profile"
                  >
                    <div class="profile__header">
                      <div class="profile__avatar">
                        <img
                          src="~assets/img/app/fakeavatar.svg"
                          alt=""
                        >
                      </div>
                      <div class="profile__info">
                        <div class="profile__text">
                          Samantha Sparks
                        </div>
                        <div
                          v-if="userRole === 'employer'"
                          class="profile__text profile__text_blue"
                        >
                          {{ $t('role.employer') }}
                        </div>
                        <div
                          v-if="userRole === 'worker'"
                          class="profile__text profile__text_green"
                        >
                          {{ $t('role.worker') }}
                        </div>
                      </div>
                    </div>
                    <div class="profile__items">
                      <nuxt-link
                        v-for="item in profileLinks"
                        :key="`item-${item.title}`"
                        tag="button"
                        class="profile__item"
                        :to="item.path"
                      >
                        {{ item.title }}
                      </nuxt-link>
                      <button
                        class="profile__item profile__item_red"
                        @click="logout()"
                      >
                        {{ $t('ui.profile.logout') }}
                      </button>
                    </div>
                  </div>
                </transition>
              </button>
              <base-btn
                v-if="userRole === 'employer'"
                class="header__btn"
                @click="createNewQuest()"
              >
                {{ $t('layout.create') }}
              </base-btn>
            </div>
          </div>
        </div>
        <div class="template__main">
          <nuxt />
        </div>
        <section class="mobile">
          <MobileMenu />
        </section>
        <div class="template__footer">
          <div class="footer">
            <div class="footer__body">
              <div class="footer__top">
                <div class="footer__left">
                  <div
                    class="footer__logo"
                    @click="toMain()"
                  >
                    <img
                      src="/img/app/logo_gray.svg"
                      alt="Logo"
                    >
                    <span>WorkQuest</span>
                  </div>
                </div>
                <div class="footer__right">
                  <div class="footer__menus">
                    <div class="footer__items">
                      <div class="footer__item">
                        <div class="footer__text footer__text_black">
                          Menu
                        </div>
                        <div class="footer__items footer__items_links">
                          <div class="footer__text footer__text_grey">
                            First page
                          </div>
                          <div class="footer__text footer__text_grey">
                            Second page
                          </div>
                          <div class="footer__text footer__text_grey">
                            Third page
                          </div>
                        </div>
                      </div>
                      <div class="footer__item">
                        <div class="footer__text footer__text_black">
                          Menu
                        </div>
                        <div class="footer__items footer__items_links">
                          <div class="footer__text footer__text_grey">
                            First page
                          </div>
                          <div class="footer__text footer__text_grey">
                            Second page
                          </div>
                          <div class="footer__text footer__text_grey">
                            Third page
                          </div>
                        </div>
                      </div>
                      <div class="footer__item">
                        <div class="footer__text footer__text_black">
                          Menu
                        </div>
                        <div class="footer__items footer__items_links">
                          <div class="footer__text footer__text_grey">
                            First page
                          </div>
                          <div class="footer__text footer__text_grey">
                            Second page
                          </div>
                          <div class="footer__text footer__text_grey">
                            Third page
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="footer__bottom">
                <div class="footer__left">
                  <div class="footer__rights">
                    <div class="footer__text footer__text_rights">
                      © WorkQuest {{ new Date().getFullYear() }}
                    </div>
                    <div class="footer__text footer__text_rights">
                      {{ $t('ui.footer.rights') }}
                    </div>
                  </div>
                </div>
                <div class="footer__right">
                  <div class="footer__links">
                    <div class="footer__link">
                      {{ $t('layout.links.terms') }}
                    </div>
                    <div class="footer__link">
                      {{ $t('layout.links.privacy') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
import ClickOutside from 'vue-click-outside';
import MobileMenu from '../components/app/MobileMenu/index.vue';

export default {
  name: 'DefaultLayout',
  middleware: 'auth',
  components: {
    MobileMenu,
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      isShowProfile: false,
      isShowNotify: false,
      isShowAdditionalMenu: false,
      isShowLocale: false,
      notification: 1,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: 'main/getIsLoading',
      userData: 'user/getUserData',
      userRole: 'user/getUserRole',
    }),
    profileLinks() {
      return [
        {
          title: this.$t('ui.profile.myProfile'),
          path: '/profile',
        },
        {
          title: this.$t('ui.profile.settings'),
          path: '/settings',
        },
        {
          title: this.$t('ui.profile.disputes'),
          path: '/disputes',
        },
      ];
    },
    additionalMenuLinks() {
      return [
        {
          title: this.$t('ui.menu.pension'),
          path: '/pension',
        },
        {
          title: this.$t('ui.menu.referral'),
          path: '/referral',
        },
        {
          title: this.$t('ui.menu.p2p'),
          path: '/wallet',
        },
        {
          title: this.$t('ui.menu.savings'),
          path: '/savings',
        },
        {
          title: this.$t('ui.menu.crediting'),
          path: '/wallet',
        },
        {
          title: this.$t('ui.menu.mining'),
          path: '/wallet',
        },
      ];
    },
  },
  mounted() {
    this.GetLocation();
  },
  methods: {
    toMain() {
      if (this.userData.role === 'worker') {
        this.$router.push('/quests');
      }
      if (this.userData.role === 'employer') {
        this.$router.push('/workers');
      }
    },
    createNewQuest() {
      this.$router.push('/create-quest');
    },
    goToMessages() {
      this.$router.push('/messages');
      this.closeAll();
    },
    showProfile() {
      this.closeAnother('profile');
      this.isShowProfile = !this.isShowProfile;
    },
    showNotification() {
      this.closeAnother('notify');
      this.isShowNotify = !this.isShowNotify;
    },
    showAdditionalMenu() {
      this.closeAnother('instruments');
      this.isShowAdditionalMenu = !this.isShowAdditionalMenu;
    },
    showLocale() {
      this.closeAnother('locale');
      this.isShowLocale = !this.isShowLocale;
    },
    closeAnother(value) {
      switch (value) {
        case 'instruments':
          this.isShowProfile = false;
          this.isShowNotify = false;
          this.isShowLocale = false;
          break;
        case 'profile':
          this.isShowAdditionalMenu = false;
          this.isShowNotify = false;
          this.isShowLocale = false;
          break;
        case 'locale':
          this.isShowAdditionalMenu = false;
          this.isShowNotify = false;
          this.isShowProfile = false;
          break;
        case 'notify':
          this.isShowAdditionalMenu = false;
          this.isShowProfile = false;
          this.isShowLocale = false;
          break;
        default:
          break;
      }
    },
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push('/');
    },
    closeAll() {
      this.isShowProfile = false;
      this.isShowNotify = false;
      this.isShowAdditionalMenu = false;
      this.isShowLocale = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.primary {
  height: 100vh;
  overflow-y: auto;
}
.template {
  min-height: 100vh;
  overflow: hidden;
  background: #F7F8FA;
  &__content {
    display: grid;
    grid-template-rows: 72px 1fr 256px;
    min-height: 100vh;
  }
  &__main {
    padding-bottom: 80px;
  }
}
.notify {
  position: absolute;
  top: calc(72px + 5px);
  right: calc(100% - 43px);
  background: #FFFFFF;
  box-shadow: 0 17px 17px rgba(0, 0, 0, 0.05), 0 5.125px 5.125px rgba(0, 0, 0, 0.0325794), 0 2.12866px 2.12866px rgba(0, 0, 0, 0.025), 0 0.769896px 0.769896px rgba(0, 0, 0, 0.0174206);
  border-radius: 6px;
  min-width: 441px;
  z-index: 10000000;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 64px;
    border-bottom: 1px solid #F7F8FA;
    span:before {
      color: $shade700 !important;
      font-size: 24px;
    }
  }
  &__title {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 130%;
    color: $black800;
  }
  &__btn {
    background: #F7F8FA;
    border-radius: 3px;
    height: 44px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    span:before {
      color: #0083C7;
      font-size: 24px;
    }
  }
  &__action {
    padding-top: 12px;
  }
  &__content {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  &__reason {
    padding-top: 12px;
  }
  &__text {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 130%;
    &_date {
      font-size: 12px;
      text-align: right;
      color: $black300;
    }
    &_name {
      font-size: 16px;
      color: $black800;
    }
    &_grey {
      font-size: 12px;
      color: $black500;
    }
    &_blue {
      font-size: 16px;
      color: $blue;
      text-align: left;
    }
    &_btn {
      font-size: 16px;
      color: $black800;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: 1fr;
  }
  &__user {
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-gap: 10px;
  }
  &__info {
    //grid-template-rows: repeat(2, auto);
    grid-gap: 5px;
    display: grid;
    text-align: left;
    align-items: center;
  }
  &__avatar {
    max-height: 40px;
    max-width: 40px;
    border-radius: 100%;
  }
  &__top {
    display: flex;
    justify-content: space-between;
  }
  &__item {
    min-height: 167px;
    border-bottom: 1px solid #F7F8FA;
    width: 100%;
    display: flex;
    justify-items: flex-start;
    align-items: center;
  }
}
.profile {
  position: absolute;
  top: calc(72px + 5px);
  right: calc(100% - 43px);
  background: #FFFFFF;
  box-shadow: 0 17px 17px rgba(0, 0, 0, 0.05), 0 5.125px 5.125px rgba(0, 0, 0, 0.03), 0 2.12866px 2.12866px rgba(0, 0, 0, 0.025), 0 0.769896px 0.769896px rgba(0, 0, 0, 0.0174206);
  border-radius: 6px;
  min-width: 223px;
  width: 100%;
  min-height: 235px;
  z-index: 10000000;
  &__header {
    border-bottom: 1px solid #F7F8FA;
    display: grid;
    grid-template-columns: 40px 1fr;
    padding: 15px;
    grid-gap: 10px;
  }
  &__avatar {
    max-width: 40px;
    max-height: 40px;
    border-radius: 100%;
  }
  &__items {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: flex-start;
  }
  &__item {
    height: 41px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    color: $black800;
    width: 100%;
    transition: .3s;
    &_red {
      color: $red;
    }
    &:hover {
      background: #F7F8FA;
    }
  }
  &__text {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    color: $black800;
    &_blue {
      font-weight: normal;
      font-size: 12px;
      color: $blue;
    }
    &_green {
      font-weight: normal;
      font-size: 12px;
      color: $green;
    }
  }
  &__info {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px;
    text-align: left;
  }
}
.header {
  min-height: 72px;
  background: #FFFFFF;
  box-shadow: 0 1px 0 #E6E9EC;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &__body {
    max-width: 1180px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__left {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr;
    grid-gap: 35px;
  }
  &__link {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    color: $black400;
    text-decoration: none;
    &_active {
      color: $black800;
    }
    &_menu {
      display: flex;
      align-items: center;
      position: relative;
      span::before {
        color: $black400;
        font-size: 24px;
        padding-left: 5px;
      }
    }
  }
  &__button {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    color: $black600;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    width: 43px;
    height: 43px;
    border: 1px solid transparent;
    &:hover {
      border: 1px solid $black100;
    }
    span:before {
      color: $black400;
      font-size: 24px;
    }
    &_profile {
      position: relative;
    }
    &_notify {
      position: relative;
    }
    &_locale {
      width: 86px;
      height: 46px;
      span {
        padding-left: 10px;
      }
    }
  }
  &__links {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(4, auto);
    grid-gap: 25px;
  }
  &__right {
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-gap: 10px;
    align-items: center;
  }
  &__btn {
    min-width: 163px;
  }
  &__logo {
    display: grid;
    align-items: center;
    grid-template-columns: 40px 1fr;
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
}
.menu {
  position: absolute;
  top: 72px;
  background: #FFFFFF;
  box-shadow: 0 17px 17px rgba(0, 0, 0, 0.05), 0 5.125px 5.125px rgba(0, 0, 0, 0.03), 0 2.12866px 2.12866px rgba(0, 0, 0, 0.025), 0 0.769896px 0.769896px rgba(0, 0, 0, 0.0174206);
  border-radius: 6px;
  min-width: 790px;
  width: 100%;
  min-height: 230px;
  z-index: 10000000;
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    span::before {
      transition: .1s;
      visibility: hidden;
      font-size: 24px;
      color: #2E3A59;
    }
  }
  &__text {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    &_header {
      font-size: 16px;
      line-height: 130%;
      color: $black800;
    }
    &_grey {
      font-size: 14px;
      line-height: 130%;
      color: $black500;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 20px;
    grid-gap: 10px;
  }
  &__item {
    transition: .3s;
    background: #FFFFFF;
    border-radius: 6px;
    border: 1px solid transparent;
    min-height: 90px;
    display: flex;
    align-items: flex-start;
    text-align: left;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    &:hover {
      border: 1px solid $black100;
      .menu {
        &__top {
          span::before {
            visibility: initial;
          }
        }
      }
    }
  }
}
.locale {
  position: absolute;
  top: calc(72px + 5px);
  background: #FFFFFF;
  box-shadow: 0 17px 17px rgba(0, 0, 0, 0.05), 0 5.125px 5.125px rgba(0, 0, 0, 0.03), 0 2.12866px 2.12866px rgba(0, 0, 0, 0.025), 0 0.769896px 0.769896px rgba(0, 0, 0, 0.0174206);
  border-radius: 6px;
  min-width: 86px;
  z-index: 10000000;
  &__items {
    padding: 10px 15px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px;
  }
  &__item {
    display: grid;
    grid-template-columns: 15px 1fr;
    grid-gap: 10px;
    align-items: center;
    min-height: 20px;
  }
  &__icon {
    border-radius: 100%;
  }
  &__text {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    color: $black500;
  }
}
.footer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  &__items {
    display: grid;
    grid-template-columns: repeat(3, minmax(170px, auto));
    grid-gap: 50px;
    &_links {
      grid-template-columns: 1fr;
      grid-gap: 10px;
    }
  }
  &__item {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 15px;
  }
  &__body {
    max-width: 1180px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }
  &__top {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  &__bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid $black100;
    height: 72px;
    align-items: center;
  }
  &__links {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 20px;
  }
  &__link {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    color: $blue;
    cursor: pointer;
  }
  &__logo {
    display: grid;
    align-items: center;
    grid-template-columns: 40px 1fr;
    grid-gap: 5px;
    cursor: pointer;
    span {
      font-family: 'Inter', sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 23px;
      line-height: 130%;
      color: $black400;
    }
  }
  &__text {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    &_grey {
      font-weight: normal;
      font-size: 16px;
      color: $black500;
    }
    &_black {
      font-weight: 500;
      font-size: 16px;
      color: $black700;
    }
    &_rights {
      font-size: 14px;
      line-height: 130%;
      color: $black500;
    }
  }
  &__rights {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 20px;
  }
}
@include _2560 {
  .mobile {
    display: none;
  }
}
@include _1700 {
  .mobile {
    display: none;
  }
}
@include _1600 {
  .mobile {
    display: none;
  }
}
@include _1500 {
  .mobile {
    display: none;
  }
}
@include _1300 {
  .mobile {
    display: none;
  }
}
@include _1199 {
  .header {
    display: flex;
    &__body {
      margin: 0 20px 0 20px;
    }
  }
  .mobile {
    display: none;
  }
  .footer {
    &__body {
      max-width: 1180px;
      margin: 0 20px 0 20px;
    }
    &__bottom {
      max-width: 1020px;
    }
  }
}
@include _991 {
  .header {
      display: none;
  }
  .mobile {
    padding: 50px 0 0 0;
    display: grid;
  }
  .footer {
      display: none;
  }
}
</style>
