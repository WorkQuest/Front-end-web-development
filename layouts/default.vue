<template>
  <div
    ref="templateScroll"
    class="primary"
  >
    <div
      class="primary__template template"
    >
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
                <span class="header__text">WorkQuest</span>
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
                  {{ $t('ui.jobQuestors') }}
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
                  {{ $t('ui.profile.DeFi') }}
                  <span class="icon-caret_down" />
                  <transition name="fade">
                    <div
                      v-if="isShowAdditionalMenu"
                      class="menu"
                    >
                      <div class="menu__items">
                        <n-link
                          v-for="(item,i) in additionalMenuLinks"
                          :key="`item-${i}`"
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
                                {{ kitcutDescription(item.desc) }}
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
                  {{ $t('ui.profile.DeFi') }}
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
                                {{ kitcutDescription(item.desc) }}
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
                <span v-if="currentLocale">
                  {{ currentLocale }}
                </span>
                <span v-else>
                  {{ $t('ui.locals.en') }}
                </span>
                <span class="icon-caret_down" />
                <transition name="fade">
                  <div
                    v-if="isShowLocale"
                    class="locale"
                  >
                    <div
                      v-for="(item, i) in locales"
                      :key="i"
                      class="locale__container"
                    >
                      <div
                        class="locale__items"
                        @click="setLocale(item)"
                      >
                        <img
                          :src="item.localeSrc"
                          :alt="item.localeText"
                          class="locale__icon"
                        >
                        <div class="locale__text">
                          {{ item.localeText }}
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
                                    src="~assets/img/app/fakeavatar.svg"
                                    alt=""
                                  >
                                </div>
                                <div class="notify__info">
                                  <div class="notify__text notify__text_name">
                                    Edward Cooper
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
                              <button
                                class="notify__btn"
                                @click="showNotifications"
                              >
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
                              <button
                                class="notify__btn"
                                @click="showNotifications"
                              >
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
              <div
                class="ctm-menu__toggle"
                @click="toggleMobileMenu()"
              >
                <button
                  class="header__button header__button_menu"
                >
                  <span
                    v-if="!isMobileMenu"
                    class="icon-hamburger"
                  />
                  <span
                    v-if="isMobileMenu"
                    class="icon-close_big"
                  />
                </button>
              </div>
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
                          v-if="imageData"
                          id="userAvatarThree"
                          class="profile__img"
                          :src="imageData"
                          alt=""
                        >
                        <img
                          v-if="!imageData"
                          id="userAvatarTwo"
                          class="profile__img"
                          src="~/assets/img/app/avatar_empty.png"
                          alt=""
                        >
                      </div>
                      <div class="profile__info">
                        <div class="profile__text">
                          {{ userData.firstName }} {{ userData.lastName }}
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
                @click="createNewQuest('pc')"
              >
                {{ $t('layout.create') }}
              </base-btn>
            </div>
          </div>
        </div>
        <div
          :class="[{'ctm-open': isMobileMenu},
                   {'ctm-open': isNotFlexContainer}]"
        >
          <transition name="fade-fast">
            <div
              class="ctm-menu"
              :class="{'ctm-menu_opened': isMobileMenu}"
            >
              <div class="ctm-menu__content">
                <div
                  v-if="isMobileMenu"
                  class="user"
                  @click="toggleUserDD()"
                >
                  <div class="user__container">
                    <div class="user-container__avatar">
                      <img
                        v-if="imageData"
                        id="userAvatarOne"
                        class="profile__img"
                        :src="imageData"
                        alt=""
                      >
                      <img
                        v-if="!imageData"
                        id="userAvatar"
                        class="profile__img"
                        src="~/assets/img/app/avatar_empty.png"
                        alt=""
                      >
                    </div>
                    <div class="user-container__user">
                      <div class="user__name">
                        {{ userData.firstName }} {{ userData.lastName }}
                      </div>
                      <div
                        v-if="userRole === 'employer'"
                        class="user__role"
                      >
                        {{ $t('role.employer') }}
                      </div>
                      <div
                        v-if="userRole === 'worker'"
                        class="user__role"
                      >
                        {{ $t('role.worker') }}
                      </div>
                    </div>
                  </div>
                  <div class="user-container__dropdown">
                    <div class="user__container">
                      <div
                        class="user__dropdown"
                      >
                        <span
                          v-if="!isUserDDOpened"
                          class="icon-caret_down"
                        />
                        <span
                          v-if="isUserDDOpened"
                          class="icon-caret_up"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="isUserDDOpened === true"
                  class="user-dropdown__container"
                >
                  <div
                    v-for="(item, i) in userDDLinks"
                    :key="i"
                  >
                    <div
                      class="user-dropdown__link"
                      :class="item.title === 'Logout' ? 'user-dropdown__link_logout' : ''"
                      @click="toRoute(item.link)"
                    >
                      {{ item.title }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="isMobileMenu"
                  class="mobile__links"
                >
                  <div
                    v-for="(item, i) in mobileMenuLinks"
                    :key="i"
                  >
                    <div
                      class="mobile__link"
                      @click="toRoute(item.path)"
                    >
                      {{ item.title }}
                    </div>
                  </div>
                </div>
                <div
                  class="mobile-dropdown"
                  @click="toggleInstrumentDD()"
                >
                  <div
                    v-if="isMobileMenu"
                    class="mobile-dropdown__btn"
                  >
                    <div class="mobile-dropdown__title">
                      {{ $t('ui.menu.instruments') }}
                    </div>
                    <div class="mobile-dropdown__arrow">
                      <span
                        v-if="!isInstrumentDropdownOpened"
                        class="icon-caret_down"
                      />
                      <span
                        v-if="isInstrumentDropdownOpened"
                        class="icon-caret_up"
                      />
                    </div>
                  </div>
                </div>
                <div
                  v-if="isInstrumentDropdownOpened"
                  class="mobile-dropdown__container"
                >
                  <div
                    v-for="(item, i) in instrumentDDLinks"
                    :key="i"
                  >
                    <div
                      v-if="isMobileMenu"
                      class="instrument-dropdown__link"
                      @click="toRoute(item.link)"
                    >
                      {{ item.title }}
                    </div>
                  </div>
                </div>
                <div class="ctm__actions">
                  <base-btn
                    v-if="userRole === 'employer'"
                    class="ctm__btn"
                    @click="createNewQuest('mobile')"
                  >
                    {{ $t('layout.create') }}
                  </base-btn>
                </div>
              </div>
            </div>
          </transition>
          <div class="template__main">
            <nuxt />
          </div>
        </div>
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
                  <div class="footer__links links footer__links_pc">
                    <div class="links__block">
                      <div class="links__title">
                        {{ $t('footer.download') }}
                      </div>
                      <div class="links__big">
                        <n-link
                          class="links__store links__store_app-store"
                          to="#"
                        />
                        <n-link
                          class="links__store links__store_play-market"
                          to="#"
                        />
                      </div>
                    </div>
                    <div class="links__block">
                      <div class="links__title">
                        {{ $t('footer.follow') }}
                      </div>
                      <div class="links__small">
                        <a
                          class="links__social links__social_twitter"
                          href="#"
                        />
                        <a
                          class="links__social links__social_youtube"
                          href="#"
                        />
                        <a
                          class="links__social links__social_reddit"
                          href="#"
                        />
                        <a
                          class="links__social links__social_facebook"
                          href="#"
                        />
                        <a
                          class="links__social links__social_linkedin"
                          href="#"
                        />
                        <a
                          class="links__social links__social_instagram"
                          href="#"
                        />
                        <a
                          class="links__social links__social_telegram"
                          href="#"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="footer__right">
                  <div class="footer__menus">
                    <div class="footer__items footer__items_main">
                      <div class="footer__block">
                        <div class="footer__item">
                          <div class="footer__text footer__text_black">
                            {{ $t('footer.company.title') }}
                          </div>
                          <div class="footer__items footer__items_links">
                            <n-link
                              v-for="(item,key) in companyLinks"
                              :key="key"
                              :to="item.path"
                              class="footer__text footer__text_grey"
                            >
                              {{ item.title }}
                            </n-link>
                          </div>
                        </div>
                        <div class="footer__item">
                          <div class="footer__text footer__text_black">
                            {{ $t('footer.legalInfo.title') }}
                          </div>
                          <div class="footer__items footer__items_links">
                            <n-link
                              v-for="(item,key) in legalInfoLinks"
                              :key="key"
                              :to="item.path"
                              class="footer__text footer__text_grey"
                            >
                              {{ item.title }}
                            </n-link>
                          </div>
                        </div>
                      </div>
                      <div class="footer__block">
                        <div class="footer__item">
                          <div class="footer__text footer__text_black">
                            {{ $t('footer.DeFi.title') }}
                          </div>
                          <div class="footer__items footer__items_links">
                            <n-link
                              v-for="(item,key) in DeFiLinks[0].firstColumn"
                              :key="key"
                              :to="item.path"
                              class="footer__text footer__text_grey"
                            >
                              {{ item.title }}
                            </n-link>
                          </div>
                        </div>
                        <div class="footer__item">
                          <div class="footer__text footer__text_black" />
                          <div class="footer__items footer__items_links">
                            <n-link
                              v-for="(item,key) in DeFiLinks[0].secondColumn"
                              :key="key"
                              :to="item.path"
                              class="footer__text footer__text_grey"
                            >
                              {{ item.title }}
                            </n-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="footer__links links footer__links_mobile">
                    <div class="links__block">
                      <div class="links__title">
                        {{ $t('footer.download') }}
                      </div>
                      <div class="links__big">
                        <n-link
                          class="links__store links__store_app-store"
                          to="#"
                        />
                        <n-link
                          class="links__store links__store_play-market"
                          to="#"
                        />
                      </div>
                    </div>
                    <div class="links__block">
                      <div class="links__title">
                        {{ $t('footer.follow') }}
                      </div>
                      <div class="links__small">
                        <a
                          class="links__social links__social_twitter"
                          href="#"
                        />
                        <a
                          class="links__social links__social_youtube"
                          href="#"
                        />
                        <a
                          class="links__social links__social_reddit"
                          href="#"
                        />
                        <a
                          class="links__social links__social_facebook"
                          href="#"
                        />
                        <a
                          class="links__social links__social_linkedin"
                          href="#"
                        />
                        <a
                          class="links__social links__social_instagram"
                          href="#"
                        />
                        <a
                          class="links__social links__social_telegram"
                          href="#"
                        />
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

export default {
  scrollToTop: true,
  name: 'DefaultLayout',
  middleware: 'auth',
  components: {},
  directives: {
    ClickOutside,
  },
  data() {
    return {
      localUserData: {},
      isInstrumentDropdownOpened: false,
      isUserDDOpened: false,
      isShowProfile: false,
      isShowNotify: false,
      isShowAdditionalMenu: false,
      isShowLocale: false,
      isMobileMenu: false,
      isNotFlexContainer: true,
      notification: 1,
      currentLocale: '',
    };
  },
  computed: {
    ...mapGetters({
      isLoading: 'main/getIsLoading',
      userData: 'user/getUserData',
      imageData: 'user/getImageData',
      userRole: 'user/getUserRole',
      token: 'user/accessToken',
      connections: 'data/notificationsConnectionStatus',
    }),
    locales() {
      return [
        {
          localeSrc: '/img/app/en.svg',
          localeText: this.$t('ui.locals.en'),
        },
        {
          localeSrc: '/img/app/ru.svg',
          localeText: this.$t('ui.locals.ru'),
        },
        {
          localeSrc: '/img/app/ba.svg',
          localeText: this.$t('ui.locals.ba'),
        },
        {
          localeSrc: '/img/app/zh.svg',
          localeText: this.$t('ui.locals.zh'),
        },
        {
          localeSrc: '/img/app/fr.svg',
          localeText: this.$t('ui.locals.fr'),
        },
        {
          localeSrc: '/img/app/hi.svg',
          localeText: this.$t('ui.locals.hi'),
        },
        {
          localeSrc: '/img/app/in.svg',
          localeText: this.$t('ui.locals.in'),
        },
        {
          localeSrc: '/img/app/po.svg',
          localeText: this.$t('ui.locals.po'),
        },
        {
          localeSrc: '/img/app/sp.svg',
          localeText: this.$t('ui.locals.sp'),
        },
        {
          localeSrc: '/img/app/ae.svg',
          localeText: this.$t('ui.locals.ae'),
        },
      ];
    },
    instrumentDDLinks() {
      return [
        {
          link: '/pension',
          title: this.$t('ui.menu.pension.title'),
        },
        {
          link: '/referral',
          title: this.$t('ui.menu.referral.title'),
        },
        {
          link: '/insuring',
          title: this.$t('ui.menu.p2p.title'),
        },
        {
          link: '/savings',
          title: this.$t('ui.menu.savings.title'),
        },
        {
          link: '/crediting',
          title: this.$t('ui.menu.crediting.title'),
        },
        {
          link: '/mining',
          title: this.$t('ui.menu.mining.title'),
        },
        {
          link: '/crosschain',
          title: this.$t('ui.menu.crosschain.title'),
        },
        {
          link: '/staking',
          title: this.$t('ui.menu.staking.title'),
        },
      ];
    },
    mobileMenuLinks() {
      return [
        {
          path: '/quests',
          title: this.$t('ui.quests'),
        },
        {
          path: '/my',
          title: this.$t('ui.myQuests'),
        },
        {
          path: '/wallet',
          title: this.$t('ui.wallet'),
        },
      ];
    },
    userDDLinks() {
      return [
        {
          link: `/profile/${this.userData.id}`,
          title: this.$t('ui.profile.myProfile'),
        },
        {
          link: '/settings',
          title: this.$t('ui.profile.settings'),
        },
        {
          link: '/disputes',
          title: this.$t('ui.profile.disputes'),
        },
        {
          link: '/',
          title: this.$t('ui.profile.logout'),
        },
      ];
    },
    profileLinks() {
      return [
        {
          title: this.$t('ui.profile.myProfile'),
          path: `/profile/${this.userData.id}`,
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
          title: this.$t('ui.menu.pension.title'),
          desc: this.$t('ui.menu.pension.desc'),
          path: '/pension',
        },
        {
          title: this.$t('ui.menu.referral.title'),
          desc: this.$t('ui.menu.referral.desc'),
          path: '/referral',
        },
        {
          title: this.$t('ui.menu.p2p.title'),
          desc: this.$t('ui.menu.p2p.desc'),
          path: '/insuring',
        },
        {
          title: this.$t('ui.menu.savings.title'),
          desc: this.$t('ui.menu.savings.desc'),
          path: '/savings',
        },
        {
          title: this.$t('ui.menu.crediting.title'),
          desc: this.$t('ui.menu.crediting.desc'),
          path: '/crediting',
        },
        {
          title: this.$t('ui.menu.mining.title'),
          desc: this.$t('ui.menu.mining.desc'),
          path: '/mining',
        },
        {
          title: this.$t('ui.menu.crosschain.title'),
          desc: this.$t('ui.menu.crosschain.desc'),
          path: '/crosschain',
        },
        {
          title: this.$t('ui.menu.staking.title'),
          desc: this.$t('ui.menu.staking.desc'),
          path: '/staking',
        },
      ];
    },
    companyLinks() {
      return [
        {
          title: this.$t('footer.company.wqWiki'),
          path: '#',
        },
        {
          title: this.$t('footer.company.aboutUs'),
          path: '#',
        },
        {
          title: this.$t('footer.company.leadership'),
          path: '#',
        },
        {
          title: this.$t('footer.company.contactUs'),
          path: '#',
        },
        {
          title: this.$t('footer.company.support'),
          path: '#',
        },
      ];
    },
    legalInfoLinks() {
      return [
        {
          title: this.$t('footer.legalInfo.risks'),
          path: '#',
        },
        {
          title: this.$t('footer.legalInfo.privacyPolicy'),
          path: '#',
        },
        {
          title: this.$t('footer.legalInfo.terms'),
          path: '#',
        },
        {
          title: this.$t('footer.legalInfo.aml'),
          path: '#',
        },
        {
          title: this.$t('footer.legalInfo.cookiePolicy'),
          path: '#',
        },
      ];
    },
    DeFiLinks() {
      return [
        {
          firstColumn: {
            0: {
              title: this.$t('footer.DeFi.retirement'),
              path: '/pension',
            },
            1: {
              title: this.$t('footer.DeFi.referral'),
              path: '/referral',
            },
            2: {
              title: this.$t('footer.DeFi.P2P'),
              path: '/insuring',
            },
            3: {
              title: this.$t('footer.DeFi.savingsProduct'),
              path: '/savings',
            },
            4: {
              title: this.$t('footer.DeFi.lending'),
              path: '/crediting',
            },
          },
          secondColumn: {
            0: {
              title: this.$t('footer.DeFi.liquidityMining'),
              path: '/mining',
            },
            1: {
              title: this.$t('footer.DeFi.wqBridge'),
              path: '/crosschain',
            },
            2: {
              title: this.$t('footer.DeFi.staking'),
              path: '/staking',
            },
            3: {
              title: this.$t('footer.DeFi.wqDAO'),
              path: '#',
            },
          },
        },
      ];
    },
  },
  watch: {
    $route() {
      this.$refs.templateScroll.scrollTop = 0;
      this.closeAll();
    },
  },
  async mounted() {
    await this.GetLocation();
    await this.initWSListeners();
    this.localUserData = JSON.parse(JSON.stringify(this.userData));
  },
  created() {
    window.addEventListener('resize', this.userWindowChange);
  },
  destroyed() {
    window.removeEventListener('resize', this.userWindowChange);
  },
  methods: {
    async initWSListeners() {
      const { chatConnection, notifsConnection } = this.connections;
      if (!chatConnection) {
        await this.$wsChat.connect(this.token);
        this.$wsChat.subscribe('/notifications/chat', async (chatEv) => {
          console.log(chatEv);
        });
      }
    },
    setLocale(item) {
      this.currentLocale = item.localeText;
    },
    kitcutDescription(text) {
      text = text.trim();
      if (text.length <= 120) return text;

      text = text.slice(0, 120);

      return `${text.trim()}...`;
    },
    userWindowChange() {
      this.isMobileMenu = false;
      this.isNotFlexContainer = false;
      this.closeAnother('mobile');
    },
    toRoute(path) {
      this.$router.push(path);
      this.toggleMobileMenu();
    },
    toggleUserDD() {
      this.isUserDDOpened = !this.isUserDDOpened;
    },
    toggleInstrumentDD() {
      this.isInstrumentDropdownOpened = !this.isInstrumentDropdownOpened;
    },
    closeMenu() {
      this.isMobileMenu = false;
      this.closeAnother('mobile');
    },
    toggleMobileMenu() {
      this.isMobileMenu = !this.isMobileMenu;
      this.isNotFlexContainer = !this.isNotFlexContainer;
      this.closeAnother('mobile');
    },
    toMain() {
      if (this.userData.role === 'worker') {
        this.$router.push('/quests');
      }
      if (this.userData.role === 'employer') {
        this.$router.push('/workers');
      }
    },
    createNewQuest(platform) {
      this.$router.push('/create-quest');
      if (platform === 'mobile') {
        this.toggleMobileMenu();
      }
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
    showNotifications() {
      this.$router.push('/notifications');
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
        case 'mobile':
          this.isShowProfile = false;
          this.isShowNotify = false;
          this.isShowLocale = false;
          this.isShowAdditionalMenu = false;
          break;
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

.profile {
  &__img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
}

.hidden {
  display: none;
}
.mobile {
  &-dropdown {
    border-bottom: 1px solid $black0;
    &__btn {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
    &__title {
      padding: 16px 0 20px 20px;
    }
    &__arrow {
      justify-self: flex-end;
      padding: 16px 20px 0 0;
    }
    &__container {}
  }
  &__links {
    display: flex;
    flex-direction: column;
  }
  &__link {
    padding: 16px 20px 16px 20px;
    font-weight: 400;
    font-size: 16px;
    color: $black800;
    border-bottom: 1px solid $black0;
    transition: 1s;
    text-decoration: none;
    &:hover {
      @extend .mobile__link;
      background: $blue;
      color: $white;
      font-weight: 600;
    }
  }
}
.instrument-dropdown {
  &__link {
    @extend .mobile__link;
    display: flex;
    flex-direction: column;
    color: $black600;
    padding: 16px 0 20px 35px;
  }
}
.user {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &-dropdown {
    &__link {
      @extend .mobile__link;
      display: flex;
      flex-direction: column;
      background: $black0;
      padding: 16px 0 20px 20px;
      &_logout {
        color: $red;
      }
    }
  }
  &-container {
    &__avatar {
      padding: 15px;
    }
    &__user {
      padding: 15px 0 0 0;
      display: grid;
    }
  }
  &__dropdown {
    align-self: center;
  }
  &__container {
    display: flex;
    flex-direction: row;
    background: $black0;
    max-height: 70px;
    height: 100%;
    max-width: 100%;
    width: 100%;
    padding: 0 20px 0 0;
  }
  &__avatar {
    max-height: 40px;
    max-width: 40px;
    height: 100%;
    width: 100%;
    border-radius: 137px;
  }
  &__name {
    font-weight: 500;
    font-size: 16px;
    color: $black800;
  }
  &__role {
    font-weight: 400;
    font-size: 12px;
    color: $blue;
    padding: 0 0 11px 0;
  }
}
.icon {
  font-size: 20px;
  &-caret_down:before {
    @extend .icon;
    content: "\ea48";
    color: #2e3a59;
  }
  &-caret_up:before {
    @extend .icon;
    content: "\ea4b";
    color: #2e3a59;
  }
  &-close_big:before {
    @extend .icon;
    content: "\e948";
    color: #2e3a59;
  }
}
.ctm {
  &-open {
    display: flex;
    width: 100%;
  }
  &__actions {
    padding: 20px;
  }
  &-menu {
    display: none;
    transition: .2s;
    &_opened {
      box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
      overflow-y: auto;
      background: $white;
      display: flex;
      width: 100%;
      position: fixed;
      top: 73px;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 9999;
    }
    &__content {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      background: $white;
      border-radius: 0 0 5px 5px;
      &_hide {
        width: 0;
      }
    }
  }
}
.primary {
  height: 100vh;
  overflow-y: auto;
}
.template {
  min-height: 100vh;
  background: #F7F8FA;
  &__content {
    display: grid;
    grid-template-rows: 72px 1fr auto;
    min-height: 100vh;
  }
  &__main {
    display: grid;
    padding-bottom: 80px;
    transition: 1s;
    width: 100%;
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
    transition: .5s;
    span:before {
      color: #0083C7;
      font-size: 24px;
    }
    &:hover {
      background: #dadade;
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
  position: sticky;
  top: 0;
  z-index: 99999;
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
    &_menu {
      position: relative;
      display: none;
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
  left: -100%;
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
    justify-content: flex-start;
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
  overflow: scroll;
  max-height: 172px;
  min-width: 86px;
  z-index: 10000000;
  &__container {
    width: 100%;
  }
  &__items {
    padding: 10px 15px;
    display: flex;
    gap: 15px;
  }
  &__item {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
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
    grid-template-columns: repeat(2, minmax(170px, auto));
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
    height: 72px;
    align-items: center;
  }
  &__links {
    display: flex;
    grid-gap: 20px;
    flex-direction: column;
    &_mobile {
      display: none;
    }
  }
  &__link {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    color: $blue;
    cursor: pointer;
    text-decoration: none;
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
      height: 24px;
      font-weight: 500;
      font-size: 16px;
      line-height: 130%;
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
  &__right {
    display: flex;
    align-items: flex-end;
  }
  &__left {
    display: flex;
    grid-gap: 20px;
    flex-direction: column;
  }
  &__block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    &_links {
      display: flex;
      grid-gap: 25px;
    }
  }
  .links {
    &__block {
      display: flex;
      flex-direction: column;
      grid-gap: 10px;
    }
    &__title {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
    }
    &__big {
      display: flex;
      grid-gap: 10px;
    }
    &__small {
      display: flex;
      justify-content: space-between;
    }
    &__store {
      width: 170px;
      height: 56px;
      &_app-store {
        background-image: url('/img/app/app_store_button.svg');
      }
      &_play-market {
        background-image: url('/img/app/play_market_button.svg');
      }
    }
    &__social {
      width: 40px;
      height: 40px;
      transition: all 0.5s;
      &_twitter {
        background-image: url('~assets/img/social/footer_twitter.svg')
      }
      &_twitter:hover {
        background-image: url('~assets/img/social/footer_twitter_active.svg')
      }
      &_youtube {
        background-image: url('~assets/img/social/footer_youtube.svg')
      }
      &_youtube:hover {
        background-image: url('~assets/img/social/footer_youtube_active.svg')
      }
      &_reddit {
        background-image: url('~assets/img/social/footer_reddit.svg')
      }
      &_reddit:hover {
        background-image: url('~assets/img/social/footer_reddit_active.svg')
      }
      &_facebook {
        background-image: url('~assets/img/social/footer_facebook.svg')
      }
      &_facebook:hover {
        background-image: url('~assets/img/social/footer_facebook_active.svg')
      }
      &_linkedin {
        background-image: url('~assets/img/social/footer_linkedin.svg')
      }
      &_linkedin:hover {
        background-image: url('~assets/img/social/footer_linkedin_active.svg')
      }
      &_instagram {
        background-image: url('~assets/img/social/footer_instagram.svg')
      }
      &_instagram:hover {
        background-image: url('~assets/img/social/footer_instagram_active.svg')
      }
      &_telegram {
        background-image: url('~assets/img/social/footer_telegram.svg');
        border-radius: 4px;
      }
      &_telegram:hover {
        background-image: url('~assets/img/social/footer_telegram_active.svg')
      }
    }
  }
}
.ctm-menu {
  &__toggle {
    display: none;
  }
}
@include _1700 {}
@include _1600 {}
@include _1500 {}
@include _1300 {}
@include _1199 {
  .ctm-menu {
    &__toggle {
      display: flex;
    }
  }
  .header {
    &__button_menu {
      display: flex;
    }
    &__body {
      margin: 0 20px 0 20px;
    }
    &__links {
      display: none;
    }
    &__right {}
    &__button {
      &_profile {
        display: none;
      }
    }
    &__btn {
      display: none !important;
    }
  }
  .footer {
    padding: 0 20px;
    &__menus {
      width: 100%;
      margin: 20px 0;
    }
    &__top {
      flex-direction: column;
    }
    &__right {
      flex-direction: column;
      align-items: flex-start;
    }
    &__links {
      &_pc {
        display: none;
      }
      &_mobile {
        display: flex;
        width: 80%;
        flex-direction: row;
        justify-content: space-between;
      }
    }
    &__items {
      &_main {
        grid-template-columns: auto auto;
        width: 82%;
        display: flex;
        justify-content: space-between;
      }
    }
    .links {
      &__small {
        grid-gap: 10px;
      }
    }
  }
}
@include _991 {
  .template {
    &__content {
      grid-template-rows: 72px 1fr auto;
    }
  }
  .footer {
    &__links {
      &_mobile {
        width: auto;
        flex-direction: column;
      }
      width: auto;
    }
  }
}
@include _767 {
  .footer {
    &__items {
      &_main {
        width: 100%;
      }
    }
  }
}
@include _575 {
  .header {
    &__logo {
      span {
        display: none;
      }
    }
    &__btn {
      display: none !important;
    }
    &__left {
      grid-gap: 15px;
    }
    &__right {
      grid-gap: 2px;
    }
  }
  .notify {
    min-width: 350px;
  }
  .footer {
    &__bottom {
      display: grid;
    }
    &__left {
      grid-column: 1/2;
    }
    &__rights {
      grid-column: 1/2;
    }
    &__rights {
      display: flex;
    }
    &__top {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 30px;
    }
    &__items {
      flex-direction: column;
      &_links {
        grid-template-columns: 1fr;
      }
    }
  }
}

@include _480 {
  .footer {
    &__links {
      &_mobile {
        width: 100%;
        flex-direction: column;
      }
    }
    .links {
      &__block {
        width: 100%;
      }
      &__big {
        flex-direction: column;
        align-items: flex-start;
      }
      &__small {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
    }
  }
}

@include _380 {
  .notify {
    min-width: 250px;
  }
}
</style>
