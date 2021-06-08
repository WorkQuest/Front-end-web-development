<template>
  <!-- Quest page_User -->
  <div>
    <Info
      :info="infoData"
    />
    <div class="main-white">
      <div class="main__body">
        <div class="user__top">
          <div class="user__container">
            <div class="user__head">
              <div
                class="user__left"
                @click="showProfile()"
              >
                <img
                  class="user__img"
                  src="~/assets/img/app/fake_profile.png"
                  alt=""
                >
                <span class="user__username">
                  {{ payload.username }}
                </span>
                <span
                  v-if="userRole === 'employer'"
                  class="user__company"
                >
                  {{ $t('company.from') }} {{ payload.company }}
                </span>
              </div>
              <div class="user__right">
                <span class="user__date">
                  {{ payload.date }}
                </span>
                <span class="icon-share_outline icon_fs-20" />
              </div>
            </div>
            <div class="location__container">
              <div class="quest__location">
                <span
                  class="icon-location icon_fs-20"
                />
                <span>{{ payload.location }}</span>
              </div>
              <span
                class="user__distance"
              >
                {{ payload.distance }} {{ $t('meta.fromYou') }}
              </span>
              <div
                v-if="userRole === 'worker'"
                class="runtime__container"
              >
                <span class="icon-clock icon_fs-16" />
                <span class="runtime__title">{{ $t('quests.runtime') }}</span>
                <span
                  class="runtime__link"
                >
                  {{ payload.runtime }}
                </span>
              </div>
              <div
                v-if="userRole === 'employer'"
                class="runtime__container"
              >
                <span class="icon-clock icon_fs-16" />
                <span class="runtime__title">
                  {{ $t('quests.performanceTimer') }}
                </span>
                <span
                  class="runtime__link"
                >
                  {{ payload.performanceTimer }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="badge__container">
          <ul class="badge-list">
            <li
              v-for="item in badgeList"
              :key="`item-${item.id}`"
              class="badge__item badge__item_blue"
            >
              {{ item.text }}
            </li>
          </ul>
        </div>
        <div class="quest__container">
          <h2 class="quest__title">
            {{ payload.title }}
          </h2>
          <span class="quest__description">
            {{ payload.body }}
          </span>
        </div>
        <div class="divider" />
        <div class="quest_materials__container">
          <h2 class="quest_materials__title">
            {{ $t('quests.questMaterials') }}
          </h2>
          <div class="img__container">
            <img
              v-for="n in 4"
              :key="n"
              class="img__item"
              src="https://3dnews.ru/assets/external/illustrations/2020/09/14/1020548/03.jpg"
              alt=""
            >
          </div>
          <div class="divider" />
          <span v-if="userRole === 'employer'">
            <div v-if="infoData.mode === 2">
              <div class="worker__title">{{ $t('quests.worker') }}</div>
              <div class="worker__container">
                <div>
                  <img
                    class="worker__avatar"
                    src="~/assets/img/temp/avatar.jpg"
                    alt=""
                  >
                </div>
                <div class="worker__name">
                  Rosalia Vans
                </div>
                <div>
                  <div
                    v-if="badge.code !== 0"
                    class="card__level_higher"
                    :class="[
                      {'card__level_higher': badge.code === 1},
                      {'card__level_reliable': badge.code === 2},
                      {'card__level_checked': badge.code === 3}
                    ]"
                  >
                    <span v-if="badge.code === 1">
                      {{ $t('levels.higher') }}
                    </span>
                    <span v-if="badge.code === 2">
                      {{ $t('levels.reliableEmp') }}
                    </span>
                    <span v-if="badge.code === 3">
                      {{ $t('levels.checkedByTime') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="infoData.mode === 3">
              <div class="worker__title">{{ $t('response.title') }}</div>
              <span
                v-for="(item, i) in respondedList"
                :key="i"
              >
                <div class="worker__container">
                  <!-- TODO: Добавить радиокнопки -->
                  <div>
                    <img
                      class="worker__avatar"
                      src="~/assets/img/temp/avatar.jpg"
                      alt=""
                    >
                  </div>
                  <div class="worker__name">
                    {{ item.name }}
                  </div>
                  <div>
                    <div
                      v-if="item.badge.code !== 0"
                      class="card__level_higher"
                      :class="[
                        {'card__level_higher': item.badge.code === 1},
                        {'card__level_reliable': item.badge.code === 2},
                        {'card__level_checked': item.badge.code === 3}
                      ]"
                    >
                      <span v-if="item.badge.code === 1">
                        {{ $t('levels.higher') }}
                      </span>
                      <span v-if="item.badge.code === 2">
                        {{ $t('levels.reliableEmp') }}
                      </span>
                      <span v-if="item.badge.code === 3">
                        {{ $t('levels.checkedByTime') }}
                      </span>
                    </div>
                  </div>
                </div>
              </span>
              <div class="worker__title">You Invited</div>
              <div class="worker__container">
                <div>
                  <img
                    class="worker__avatar"
                    src="~/assets/img/temp/avatar.jpg"
                    alt=""
                  >
                </div>
                <div class="worker__name">
                  Rosalia Vans
                </div>
                <div>
                  <div
                    v-if="badge.code !== 0"
                    class="card__level_higher"
                    :class="[
                      {'card__level_higher': badge.code === 1},
                      {'card__level_reliable': badge.code === 2},
                      {'card__level_checked': badge.code === 3}
                    ]"
                  >
                    <span v-if="badge.code === 1">
                      {{ $t('levels.higher') }}
                    </span>
                    <span v-if="badge.code === 2">
                      {{ $t('levels.reliableEmp') }}
                    </span>
                    <span v-if="badge.code === 3">
                      {{ $t('levels.checkedByTime') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="infoData.mode === 4">
              <div class="worker__title">{{ $t('quests.worker') }}</div>
              <div class="worker__container">
                <div>
                  <img
                    class="worker__avatar"
                    src="~/assets/img/temp/avatar.jpg"
                    alt=""
                  >
                </div>
                <div class="worker__name">
                  Rosalia Vans
                </div>
                <div>
                  <div
                    v-if="badge.code !== 0"
                    class="card__level_higher"
                    :class="[
                      {'card__level_higher': badge.code === 1},
                      {'card__level_reliable': badge.code === 2},
                      {'card__level_checked': badge.code === 3}
                    ]"
                  >
                    <span v-if="badge.code === 1">
                      {{ $t('levels.higher') }}
                    </span>
                    <span v-if="badge.code === 2">
                      {{ $t('levels.reliableEmp') }}
                    </span>
                    <span v-if="badge.code === 3">
                      {{ $t('levels.checkedByTime') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </span>
          <div class="btns__container">
            <div>
              <!-- inviteUser -->
              <span v-if="userRole === 'worker'">
                <div
                  v-if="infoData.mode === 1"
                  class="buttons__wrapper"
                >
                  <div class="btn__wrapper">
                    <base-btn
                      class="base-btn_agree"
                    >
                      {{ $t('btn.agree') }}
                    </base-btn>
                  </div>
                  <div class="btn__wrapper">
                    <base-btn
                      class="base-btn_goToChat"
                    >
                      {{ $t('btn.goToChat') }}
                      <span class="icon-chat icon_fs-20" />
                    </base-btn>
                  </div>
                </div>
              </span>
              <span v-if="userRole === 'employer'">
                <div
                  v-if="infoData.mode === 1"
                  class="buttons__wrapper"
                >
                  <div class="btn__wrapper">
                    <base-btn>
                      {{ $t('quests.raiseViews') }}
                    </base-btn>
                  </div>
                  <div class="btn__wrapper">
                    <base-btn mode="delete">
                      {{ $t('quests.deleteQuest') }}
                    </base-btn>
                  </div>
                </div>
              </span>
              <!-- send a request -->
              <span v-if="userRole === 'worker'">
                <div
                  v-if="infoData.mode === 5"
                  class="buttons__wrapper"
                >
                  <div class="btn__wrapper">
                    <base-btn @click="showMessageModal()">
                      {{ $t('btn.sendARequest') }}
                    </base-btn>
                  </div>
                </div>
              </span>
              <!-- activeQuest -->
              <span v-if="userRole === 'worker'">
                <div
                  v-if="infoData.mode === 2"
                  class="buttons__wrapper"
                >
                  <div class="btn__wrapper">
                    <base-btn
                      class="base-btn_dispute"
                    >
                      {{ $t('btn.dispute') }}
                    </base-btn>
                  </div>
                  <div class="btn__wrapper">
                    <base-btn
                      class="base-btn_goToChat"
                    >
                      {{ $t('btn.goToChat') }}
                      <span class="icon-chat icon_fs-20" />
                    </base-btn>
                  </div>
                </div>
              </span>
              <span v-if="userRole === 'employer'">
                <div
                  v-if="infoData.mode === 2"
                  class="buttons__wrapper"
                >
                  <div class="btn__wrapper">
                    <base-btn mode="approve">
                      {{ $t('quests.approve') }}
                    </base-btn>
                  </div>
                </div>
              </span>
              <!-- responded -->
              <span v-if="userRole === 'worker'">
                <div
                  v-if="infoData.mode === 3"
                  class="buttons__wrapper"
                >
                  <div class="btn__wrapper">
                    <base-btn
                      :disabled="infoData.mode === 3"
                    >
                      {{ $t('btn.responded') }}
                    </base-btn>
                  </div>
                </div>
              </span>
              <span v-if="userRole === 'employer'">
                <div
                  v-if="infoData.mode === 3"
                  class="buttons__wrapper"
                >
                  <div class="btn__wrapper">
                    <base-btn>
                      {{ $t('quests.startQuest') }}
                    </base-btn>
                  </div>
                </div>
              </span>
              <!-- performed -->
              <span v-if="userRole === 'employer'" />
            </div>
            <span v-if="infoData.mode !== 4">
              <div class="price__container">
                <span class="price__value">
                  {{ payload.price }}
                </span>
                <div class="badge__wrapper">
                  <span class="badge__item_green">{{ payload.badgeGreen }}</span>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="map__container">
      <transition name="fade-fast">
        <GMap
          v-if="isShowMap"
          ref="gMap"
          class="quests__map"
          language="en"
          :center="{lat: locations[0].lat, lng: locations[0].lng}"
          :zoom="6"
        />
      </transition>
    </div>
    <div class="main">
      <div class="spec__container">
        <div class="quest__group">
          <h2 class="quest__spec">
            {{ $t('quests.otherQuestsSpec') }}
            <nuxt-link
              to="#"
              class="spec__link"
            >
              "{{ payload.spec }}"
            </nuxt-link>
          </h2>
        </div>
        <p class="quest__count">
          {{ payload.amount }} {{ $t('quests.questAmount') }}
        </p>
        <div class="quest__card">
          <!-- Cards -->
          <div class="quests__cards">
            <div
              v-for="(item, i) in payload.cards"
              :key="i"
              class="quests__block block"
            >
              <div class="block__left">
                <div class="block__img">
                  <img
                    src="~assets/img/temp/fake-card.svg"
                    alt=""
                  >
                </div>
              </div>
              <div class="block__right">
                <div class="block__head">
                  <div class="block__title">
                    <div class="block__avatar">
                      <img
                        :src="item.background"
                        alt=""
                      >
                    </div>
                    <div class="block__text block__text_title">
                      {{ item.title }}
                      <span
                        v-if="item.sub"
                        class="block__text block__text_grey"
                      >{{ item.sub }}</span>
                    </div>
                  </div>
                  <div
                    class="block__icon block__icon_fav star"
                    @click="item.favourite = !item.favourite"
                  >
                    <img
                      class="star__hover"
                      src="~assets/img/ui/star_hover.svg"
                      alt=""
                    >
                    <img
                      v-if="!item.favourite"
                      class="star__default"
                      src="~assets/img/ui/star_simple.svg"
                      alt=""
                    >
                    <img
                      v-if="item.favourite"
                      class="star__checked"
                      src="~assets/img/ui/star_checked.svg"
                      alt=""
                    >
                  </div>
                </div>
                <div class="block__locate">
                  <span class="icon-location" />
                  <span class="block__text block__text_locate">{{ payload.distance }}m {{ $t('meta.fromYou') }}</span>
                </div>
                <div class="block__text block__text_blue">
                  {{ item.theme }}
                </div>
                <div class="block__text block__text_desc">
                  {{ item.desc }}
                </div>
                <div class="block__actions">
                  <div class="block__status">
                    <div
                      class="block__priority"
                      :class="getPriorityClass(item.priority)"
                    >
                      {{ getPriority(item.priority) }}
                    </div>
                    <div class="block__amount">
                      {{ item.amount }} {{ item.symbol }}
                    </div>
                  </div>
                  <div class="block__details">
                    <button class="block__btn">
                      <div class="block__text block__text_details">
                        {{ $t('meta.details') }}
                      </div>
                      <span class="icon-short_right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';
import Info from '~/components/app/Info/index.vue';

export default {
  name: 'Quests',
  components: {
    Info,
  },
  data() {
    return {
      respondedList: [
        {
          name: 'Marvin McKinney',
          badge: {
            code: 2,
          },
        },
        {
          name: 'Marvin McKinney',
          badge: {
            code: 1,
          },
        },
        {
          name: 'Marvin McKinney',
          badge: {
            code: 3,
          },
        },
        {
          name: 'Marvin McKinney',
          badge: {
            code: 2,
          },
        },
      ],
      badge: {
        code: 1,
      },
      infoData: {
        mode: 5,
        date: '15:30:20',
        hasRequest: 'false',
      },
      payload: {
        type: 'active',
        cards: [
          {
            title: 'Samantha Sparks',
            favourite: true,
            sub: '',
            background: require('~/assets/img/temp/fake-card.svg'),
            theme: 'Paint the garage quickly',
            desc: 'Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
            priority: 0,
            amount: 1500,
            symbol: 'wusd',
          },
        ],
        company: 'Amazon',
        avatar: require('~/assets/img/app/fake_profile.png'),
        username: 'Samantha Sparcs',
        date: '12 January 2021,14:45',
        distance: '200',
        distanceLink: '/',
        id: '1',
        performanceTimer: '14:45:23',
        location: 'Moscow, Lenina street, 3',
        runtime: '14:45:23',
        runtimeLink: '#',
        title: 'Paint the garage quickly',
        body: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, '
          + 'lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, '
          + 'vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum '
          + 'dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum '
          + 'lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae congue eu, consequat ac '
          + 'felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus Lorem ipsum dolor sit amet, '
          + 'consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus '
          + 'non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis '
          + 'scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor '
          + 'condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae congue eu, '
          + 'consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus',
        price: '1500  WUSD',
        badgeGreen: 'Low priority',
        spec: 'Painting works',
        amount: '26',
        questImgList: [
          {
            src: 'https://3dnews.ru/assets/external/illustrations/2020/09/14/1020548/03.jpg',
          },
          {
            src: 'https://3dnews.ru/assets/external/illustrations/2020/09/14/1020548/03.jpg',
          },
          {
            src: 'https://3dnews.ru/assets/external/illustrations/2020/09/14/1020548/03.jpg',
          },
          {
            src: 'https://3dnews.ru/assets/external/illustrations/2020/09/14/1020548/03.jpg',
          },
        ],
      },
      isShowMap: true,
      distance: [
        '+ 100 m',
        '+ 500 m',
        '+ 1000 m',
      ],
      locations: [
        {
          lat: 56.475565,
          lng: 84.967270,
        },
      ],
      priority: [
        this.$t('quests.priority.all'),
        this.$t('quests.priority.low'),
        this.$t('quests.priority.normal'),
        this.$t('quests.priority.urgent'),
      ],
      priorityIndex: 0,
      distanceIndex: 0,
      priceSort: 'desc',
      timeSort: 'desc',
      badgeList: [
        {
          id: 1,
          text: 'Painting Works',
        },
        {
          id: 2,
          text: 'Art',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      tags: 'ui/getTags',
      userRole: 'user/getUserRole',
      userData: 'user/getUserData',
    }),
    // TODO: Написать вычисляемые методы isInviteUser, isActiveQuest, isResponded, isPerformed
  },

  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    // TODO: НАписать методы inviteUser, activeQuest, responseSend, performedSend
    cardsLevels(idx) {
      const { cards } = this;
      return [
        { card__level_checked: cards[idx].level.code === 3 },
        { card__level_reliable: cards[idx].level.code === 2 },
        { card__level_higher: cards[idx].level.code === 1 },
      ];
    },
    toggleMap() {
      this.isInvite = !this.isShowMap;
    },
    showProfile() {
      this.$router.push('/show-profile');
    },
    getPriority(index) {
      const priority = {
        0: this.$t('priority.low'),
        1: this.$t('priority.normal'),
        2: this.$t('priority.urgent'),
      };
      return priority[index] || 'None';
    },
    getPriorityClass(index) {
      const priority = {
        0: 'block__priority_low',
        1: 'block__priority_normal',
        2: 'block__priority_urgent',
      };
      return priority[index] || '';
    },
    showMessageModal() {
      this.ShowModal({
        key: modals.sendARequest,
      });
    },
  },
};
</script>

<style lang="scss">

.runtime {
  &__container {
    margin: 0 0 0 30px;
  }
  &__title {
    margin: 0 5px 0 5px;
  }
}

.worker {
  font-size: 16px;
  font-weight: 500;
  color: $black800;
  &__container {
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    margin: 20px 0 20px 0;
  }
  &__avatar {
    max-width: 40px;
    max-height: 40px;
    width: 100%;
    height: 100%;
  }
  &__name {
    @extend .worker;
    margin: 0 10px 0 10px;
  }
  &__title {
    @extend .worker;
    font-size: 18px;
  }
}

.card {
  padding: 2px 8px;
  align-items: center;
  border-radius: 3px;
  color: $white;
  &__level {
    display: grid;
    grid-template-columns: 20px auto;
    grid-gap: 7px;
    font-size: 12px;
    justify-content: flex-start;
    align-items: center;
    height: 20px;
    &_higher {
      @extend .card;
      background-color: #F6CF00;

    }
    &_reliable {
      @extend .card;
      background-color: #BBC0C7;
    }
    &_checked {
      background-color: #B79768;
    }
    &_disabled {
      display: none;
    }
  }
}

.btns {
  &__container {
    display: grid;
    grid-template-columns: 8fr 4fr;
  }
}

.icon {
  color:$black500;
  font-size: 20px;
  &-chat::before {
    @extend .icon;
    color:$green;
  }
  &-location::before {
    @extend .icon;
  }
  &-clock::before {
    @extend .icon;
  }
  &-share_outline {
    @extend .icon;
    margin-left: 5px;
  }
}
.divider{
  margin: 20px 0 20px 0;
  background-color: $black0;
  width:100%;
  height: 1px;
}
.main {
  @include main;
  &-white {
    @include main-white;
  }
}
.btn {
  &__wrapper {
    width: 220px;
    margin: 0 20px 0 0;
  }
}
.buttons {
  &__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

.badge-list{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.user {
  @include text-simple;
  color: $black800;
  font-weight: 500;
  font-size: 16px;
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__container {
    padding: 34.5px 0 25.5px 0;
  }
  &__wrapper{
    display: flex;
    flex-direction: row;
  }
  &__date{
    @include text-simple;
    color: $black500;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    margin: auto;
  }
  &__img{
    width:30px;
    height: 30px;
    border-radius: 50%;
  }
  &__username{
    @extend .user;
    padding-left: 10px;
  }
  &__distance{
    @extend .user;
    margin: 0 0.5%;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: $blue;
  }
  &__left {
    @extend .user;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &__right {
    display: flex;
    flex-direction: row;
  }
  &__company {
    @extend .user;
    margin: 0 0 0 10px;
    color: $black500;
  }
}
.spec {
  @include text-simple;
  font-weight: 500;
  font-size: 25px;
  &__link{
    @extend .spec;
    color: $blue;
  }
  &__container{
    margin: 40px 0;
  }
}

.quest{
  @include text-simple;
  font-style: normal;
  font-weight: 500;
  color: $black800;
  &__spec {
    @extend .quest;
    font-size: 25px;
    margin: 0 0 0 0;
  }
  &__title {
    @extend .quest;
    font-size: 30px;
    margin: 0 0 10px 0;
  }
  &__description {
    @extend .quest;
    color: $black700;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
  }
  &__location {
    @extend .quest;
    color: $black700;
    font-weight: normal;
    font-size: 14px;
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  &__count {
    @extend .quest;
    font-weight: normal;
    font-size: 16px;
    color: $black400;
  }
  &__group {
    @extend .quest;
    font-weight: 400;
    display: flex;
    flex-direction: row;
  }
  &__card {
    color:$black800;
  }
}

.quest_materials {
  &__title{
    @include text-simple;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: $black800;
    padding: 10px 0 20px 0;
  }
}
.runtime {
  @include text-simple;
  display: flex;
  font-style: normal;
  font-weight: normal;
  align-items: center;
  font-size: 14px;
  &__container {
    @extend .runtime;
    justify-items: center;
    color: $black700;
  }
  &__link {
    @extend .runtime;
    margin: 0 5px;
    font-weight: 500;
    color: $blue;
  }
}
.map {
  &__container {
    background-color: $white;
    padding:30px 0 0 0;
  }
}

.price {
  display: flex;
  flex-direction: row;
  align-items: center;
  &__value {
    @include text-simple;
    color: $green;
    font-weight: bold;
    font-size: 25px;
  }
  &__container {
    @extend .price;
    justify-content: flex-end;
  }
  &__wrapper {
    @extend .price;
    margin:0 0 30px 0;
    justify-content: space-between;
  }
}

.badge {
  &__container {
    padding: 0 0 20px 0;
  }
  &__item {
    @include text-simple;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: normal;
    padding: 0 5px;
    &_green {
      @extend .badge__item;
      background-color: rgba(34, 204, 20, 0.1);
      color:$green;
      margin: 0 0 0 15px;
      border-radius: 5px;
    }
    &_blue {
      @extend .badge__item;
      background-color: rgba(0, 131, 199, 0.1);
      margin: 0 9px 0 0;
      border-radius: 44px;
      font-size: 16px;
      color: $blue;
      height: 31px;
    }
  }
  &__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

.location {
  &__container{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 25.5px 0 0 0;
  }
}
.img {
  transition: 0.5s;
  &__container{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    margin: 0 0 20px 0;
  }
  &__item{
    @extend .img;
    border-radius: 6px;
    max-width: 280px;
    max-height: 210px;
    &:hover {
      @extend .img;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }
  }
}

.star {
  &__default {
    display: flex;
  }
  &__hover {
    display: none;
  }
  &:hover {
    .star {
      &__hover {
        display: flex;
      }
      &__default {
        display: none;
      }
      &__checked {
        display: none;
      }
    }
  }
}
.block {
  background: $white;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 230px;
  &__img {
    max-width: 240px;
  }
  &__locate {
    display: grid;
    grid-template-columns: 20px 1fr;
    grid-gap: 5px;
    align-items: center;
    span::before {
      font-size: 20px;
      color: $black500;
    }
  }
  &__status {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 15px;
  }
  &__amount {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 130%;
    color: #00AA5B;
    text-transform: uppercase;
  }
  &__priority {
    @include text-simple;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    font-size: 12px;
    line-height: 130%;
    height: 24px;
    padding: 0 5px;
    &_low {
      background: rgba(34, 204, 20, 0.1);
      color: #22CC14;
    }
    &_urgent {
      background: rgba(223, 51, 51, 0.1);
      color: #DF3333;
    }
    &_normal {
      background: rgba(232, 210, 13, 0.1);
      color: #E8D20D;
    }
  }
  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__right {
    padding: 20px 20px 20px 30px;
    display: grid;
    grid-template-columns: auto;
    grid-gap: 10px;
  }
  &__head {
    @extend .block__actions;
  }
  &__icon {
    &_fav {
      cursor: pointer;
    }
  }
  &__btn {
    @extend .block__actions;
    padding: 0 10px;
    min-width: 146px;
    height: 34px;
    background: transparent;
    span::before {
      font-size: 24px;
      color: $blue;
    }
  }
  &__text {
    @include text-simple;
    font-size: 16px;
    line-height: 130%;
    &_details {
      @extend .block__text;
      color: $blue;
    }
    &_desc {
      @extend .block__text;
      color: $black700;
    }
    &_blue {
      @extend .block__text;
      font-weight: 500;
      font-size: 18px;
      color: $blue;
    }
    &_title {
      @extend .block__text;
      font-weight: 500;
      color: $black800;
    }
    &_locate {
      @extend .block__text;
      font-size: 14px;
      color: #7C838D;
    }
    &_grey {
      @extend .block__text;
      color: #7C838D;
    }
  }
  &__avatar {
    max-width: 30px;
    max-height: 30px;
    img {
      border-radius: 100%;
    }
  }
  &__title {
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-gap: 10px;
    align-items: center;
  }
}
.quests {
  &__cards {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    padding-top: 20px;
  }
  &__top {
    position: relative;
    min-height: 160px;
  }
  &__search {
    position: absolute;
    max-width: 1180px;
    height: 83px;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1200;
    @include box;
  }
  &__content {
    display: flex;
    justify-content: center;
  }
  &__body {
    padding-top: 30px;
    max-width: 1180px;
    width: 100%;
    height: 100%;
    &_wrap {
      padding-top: 10px;
    }
  }
  &__text {
    @include text-simple;
    font-style: normal;
    &_title  {
      font-weight: 500;
      font-size: 25px;
      line-height: 130%;
      color: $black800;
    }
  }
  &__tags {
    padding-top: 30px;
    max-width: 1180px;
  }
  &__tools {
    padding-top:  20px;
  }
}
.tags {
  display: flex;
  &__btn {
    span::before {
      color: $blue;
      font-size: 24px;
      padding-left: 3px;
    }
  }
  &__item {
    min-width: 135px;
    max-width: 150px;
    &:not(:first-child) {
      margin-left: 20px;
    }
  }
}
.tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__left {
    display: grid;
    grid-template-columns: 103px 152px minmax(141px, auto);
    grid-gap: 20px;
    span::before {
      padding-left: 10px;
      margin-right: -10px;
      color: $black400;
      font-size: 24px;
    }
  }
  &__text {
    @include text-simple;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    color: $black800;
  }
  &__right {
    min-width: 149px;
    span::before {
      padding-left: 10px;
      margin-right: -10px;
      color: $black400;
      font-size: 24px;
    }
  }
}
.quests::v-deep {
  .GMap__Wrapper {
    height: 435px;
  }
  .ctm-field__left {
    padding-top: 6px;
  }
}
.uploader {
  &__message {
    @include text-simple;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    color: $black800;
  }
}
.icon {
  &-chat_green:before {
    content: "\e9ba";
    color: #00AA5B;
    font-size: 20px;
  }
  &-caret_down_blue:before {
    content: "\ea48";
    color: #0083C7;
  }
}

</style>
