<template>
  <div class="quests">
    <section class="pc">
      <div class="quests__top">
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
        <div class="quests__search">
          <div class="search">
            <div class="search__toggle">
              <base-checkbox
                v-model="isShowMap"
                name="map"
                :label="$t('quests.ui.showMap')"
              />
            </div>
            <div class="search__inputs">
              <base-field
                v-model="search"
                is-search
                class="search__input"
                :placeholder="$t('quests.ui.search')"
                :mode="'icon'"
              />
            </div>
            <div class="search__dd">
              <base-dd
                v-model="distanceIndex"
                :items="distance"
              />
            </div>
            <div class="search__actions">
              <base-btn class="search__btn">
                Search quests
              </base-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="quests__content">
        <div
          class="quests__body"
          :class="{'quests__body_wrap': !isShowMap}"
        >
          <div class="quests__title">
            <div class="quests__text quests__text_title">
              {{ $t('quests.searchResults') }}
            </div>
          </div>
          <div class="quests__tools tools">
            <div class="tools__left">
              <base-btn
                :mode="'light'"
                @click="changeSorting('price')"
              >
                <span class="tools__text">
                  {{ $t('quests.price') }}
                </span>
                <span
                  v-if="priceSort === 'desc'"
                  class="icon-Sorting_descending"
                />
                <span
                  v-if="priceSort === 'asc'"
                  class="icon-Sorting_ascending"
                />
              </base-btn>
              <base-btn
                :mode="'light'"
                @click="changeSorting('time')"
              >
                <span class="tools__text">
                  {{ $t('quests.time') }}
                </span>
                <span
                  v-if="timeSort === 'desc'"
                  class="icon-Sorting_descending"
                />
                <span
                  v-if="timeSort === 'asc'"
                  class="icon-Sorting_ascending"
                />
              </base-btn>
              <!--            <base-btn :mode="'light'">-->
              <!--              <span class="tools__text">-->
              <!--                {{ $t('quests.priority') }}-->
              <!--              </span>-->
              <!--              <span class="icon-caret_right" />-->
              <!--            </base-btn>-->
              <base-dd
                v-model="priorityIndex"
                :items="priority"
              />
            </div>
            <div class="tools__right">
              <base-btn
                :mode="'light'"
                @click="showSkillsModal()"
              >
                <span class="tools__text">
                  {{ $t('quests.type') }}
                </span>
                <span class="icon-caret_right" />
              </base-btn>
            </div>
          </div>
          <div
            v-if="tags.length"
            class="quests__tags tags"
          >
            <div
              v-for="(item, i) in tags"
              :key="i"
              class="tags__item"
            >
              <base-btn
                class="tags__btn"
                mode="tag"
              >
                {{ item }}
                <span
                  class="icon-close_small"
                  @click="deleteTag(item)"
                />
              </base-btn>
            </div>
          </div>
          <div class="quests__cards">
            <div
              v-for="(item, i) in cards"
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
                      <nuxt-link
                        class="link"
                        :to="item.url"
                      >
                        <img
                          :src="item.background"
                          alt=""
                        >
                      </nuxt-link>
                    </div>
                    <nuxt-link
                      class="link"
                      :to="item.url"
                    >
                      <div class="block__text block__text_title">
                        {{ item.title }}
                        <span
                          v-if="item.sub"
                          class="block__text block__text_grey"
                        >{{ item.sub }}</span>
                      </div>
                    </nuxt-link>
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
                  <span class="block__text block__text_locate">{{ item.distance }}{{ $t('distance.m') }} {{ $t('meta.fromYou') }}</span>
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
                    <button
                      class="block__btn"
                      @click="showDetails()"
                    >
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
    </section>
    <section class="mobile">
      <span class="bg_white">
        <div class="mobile__header">
          <div class="mobile__title">
            Quests
          </div>
          <div @click="toNotifications()">
            <span class="icon-notification_outline" />
          </div>
        </div>
        <div class="mobile__search">
          <base-field
            v-model="search"
            is-search
            class="search__input"
            :placeholder="$t('quests.ui.search')"
            :mode="'icon'"
          />
        </div>
      </span>
      <span
        v-for="(card, i) in cards"
        :key="i"
      >
        <div class="quest-cards">
          <div class="quest-cards__header">
            <div class="avatar__container">
              <img
                alt=""
                src="~assets/img/temp/photo.jpg"
                class="user__avatar"
              >
            </div>
            <div class="user__name">{{ card.title }}</div>
            <div class="block__container">
              <div
                class="block__icon block__icon_fav star"
                @click="card.favourite = !card.favourite"
              >
                <img
                  class="star__hover"
                  src="~assets/img/ui/star_hover.svg"
                  alt=""
                >
                <img
                  v-if="!card.favourite"
                  class="star__default"
                  src="~assets/img/ui/star_simple.svg"
                  alt=""
                >
                <img
                  v-if="card.favourite"
                  class="star__checked"
                  src="~assets/img/ui/star_checked.svg"
                  alt=""
                >
              </div>
            </div>
          </div>
          <div class="distance__container">
            <div>
              <span class="icon-location" />
            </div>
            <div class="distance__distance">{{ card.distance }}m from you</div>
          </div>
          <div class="quest-cards__text">
            <div class="quest-cards__title">{{ card.theme }}</div>
            <div class="quest-cards__description"> {{ card.desc }}</div>
          </div>
          <div class="quest-cards__bottom">
            <div class="quest-cards__priority_low">
              <span>Low priority</span>
            </div>
            <div class="quest-cards__value">
              {{ card.amount }} WUSD
            </div>
          </div>
        </div>
      </span>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';

export default {
  name: 'Quests',
  data() {
    return {
      isShowMap: true,
      search: '',
      locations: [
        {
          lat: 56.475565,
          lng: 84.967270,
        },
      ],
      distance: [
        '+ 100 m',
        '+ 500 m',
        '+ 1000 m',
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
          url: '/show-profile',
          distance: '300',
        },
        {
          title: 'Samantha Sparks',
          sub: 'from Amazon',
          favourite: false,
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: 'Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 1,
          amount: 1100,
          symbol: 'wusd',
          url: '/company',
          distance: '400',
        },
        {
          title: 'Samantha Sparks',
          sub: 'from Amazon',
          favourite: false,
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: 'Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 2,
          amount: 1700,
          symbol: 'wusd',
          url: '/company',
          distance: '100',
        },
        {
          title: 'Samantha Sparks',
          sub: 'from Amazon',
          favourite: false,
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: 'Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 2,
          amount: 1700,
          symbol: 'wusd',
          url: '/company',
          distance: '100',
        },
        {
          title: 'Samantha Sparks',
          sub: 'from Amazon',
          favourite: false,
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: 'Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 2,
          amount: 1700,
          symbol: 'wusd',
          url: '/company',
          distance: '100',
        },
        {
          title: 'Samantha Sparks',
          sub: 'from Amazon',
          favourite: false,
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: 'Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 2,
          amount: 1700,
          symbol: 'wusd',
          url: '/company',
          distance: '100',
        },
        {
          title: 'Samantha Sparks',
          sub: 'from Amazon',
          favourite: false,
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: 'Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 2,
          amount: 1700,
          symbol: 'wusd',
          url: '/company',
          distance: '100',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      tags: 'ui/getTags',
    }),
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    toNotifications() {
      this.$router.push('/notification');
    },
    toggleMap() {
      this.isShowMap = !this.isShowMap;
    },
    showDetails() {
      this.$router.push('/quests/1');
    },
    changeSorting(type) {
      if (type === 'price') {
        // eslint-disable-next-line no-unused-expressions
        this.priceSort === 'desc' ? this.priceSort = 'asc' : this.priceSort = 'desc';
      }
      if (type === 'time') {
        // eslint-disable-next-line no-unused-expressions
        this.timeSort === 'desc' ? this.timeSort = 'asc' : this.timeSort = 'desc';
      }
    },
    deleteTag(tag) {
      this.$store.dispatch('ui/deleteTags', tag);
    },
    showSkillsModal() {
      this.ShowModal({
        key: modals.skills,
      });
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
  },
};
</script>
<style lang="scss" scoped>

.block {
  &__container {
    display: flex;
    align-self: center;
    justify-content: flex-end;
  }
}

.bg {
  &_white {
    background-color: $white;
  }
}

.avatar {
  &__container {}
}
.distance {
  &__container {
    display: flex;
    flex-direction: row;
    justify-items: flex-start;
    align-items: center;
    margin: 20px 20px 0 20px;
  }
  &__distance {
    justify-self: flex-start;
    align-self: center;
    font-weight: 400;
    font-size: 14px;
    color: $black500;
  }
}
.user {
  &__avatar {
    border-radius: 37px;
    max-width: 30px;
    max-height: 30px;
    width: 100%;
    height: 100%;
  }

  &__name {
    justify-self: flex-start;
  }
}

.quest-cards {
  padding: 20px 0 0 0;
  margin: 10px 0 0 0;
  @extend .bg_white;
  &__title {
    font-weight: 500;
    font-size: 18px;
    color: $black800;
  }
  &__value {
    font-weight: 700;
    font-size: 18px;
    color: rgba(0, 170, 91, 1);
  }
  &__description {
    margin: 10px 0 0 0;
    font-weight: 400;
    font-size: 14px;
    color: $black600;
  }
  &__header {
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    margin: 0 20px 0 20px;
  }
  &__bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 15px 20px 0 20px;
    padding: 0 0 16px 0;
  }
  &__priority {
    font-weight: 400;
    font-size: 12px;
    padding: 4px 5px;
    border-radius: 3px;
    &_low {
      @extend .quest-cards__priority;
      color: #22CC14;
      background: rgba(34, 204, 20, 0.1);
    }
  }
  &__text {
    margin: 10px 20px 0 20px;
  }
}

.icon {
  font-size: 25px;
  &-notification_outline:before {
    @extend .icon;
    content: "\e93a";
    color: $blue;
  }
  &-location:before {
    font-size: 20px;
    content: "\ea23";
    color: $black500;
  }
}
.mobile {
  width: 100%;
  height: 100%;
  max-height: 900px;
  &__search {}
  &__title {
    @include text-simple;
    font-weight: 700;
    font-size: 30px;
    color: $black800;
  }
  &__header {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 18px 18px;
  }
}

.link {
  cursor: pointer;
  &:hover {
    cursor: pointer;
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
  background: #FFFFFF;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__icon {
    &_fav {
      cursor: pointer;
    }
  }
  &__btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    &_details {
      font-size: 16px;
      line-height: 130%;
      color: $blue;
    }
    &_desc {
      font-size: 16px;
      line-height: 130%;
      color: $black700;
    }
    &_blue {
      font-weight: 500;
      font-size: 18px;
      line-height: 130%;
      color: $blue;
    }
    &_title {
      font-weight: 500;
      font-size: 16px;
      line-height: 130%;
      color: $black800;
    }
    &_locate {
      font-size: 14px;
      line-height: 130%;
      color: #7C838D;
    }
    &_grey {
      font-size: 16px;
      line-height: 130%;
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
    font-family: 'Inter', sans-serif;
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
    font-family: 'Inter', sans-serif;
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
.search {
  display: grid;
  grid-template-columns: 154px 1fr 143px 260px;
  align-items: center;
  height: 100%;
  justify-items: center;
  &__dd {
    border-left: 1px solid #F7F8FA;
    height: 100%;
    display: flex;
  }
  &__icon {
    margin-bottom: -10px;
    &::before {
      font-size: 24px;
      color: $blue;
    }
  }
  &__inputs {
    padding: 0 20px;
    width: 100%;
    display: grid;
    align-items: center;
  }
  &__input {
    display: flex;
    align-items: center;
  }
  &__btn {
    max-width: 220px;
  }
  &__toggle {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #F7F8FA;
  }
  &__actions {
    height: 100%;
    border-left: 1px solid #F7F8FA;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
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
@include _1400 {
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

  .quests {
    &__body {
      max-width: 980px;
    }
    &__search {
      max-width: 890px;
    }
  }

  .mobile {
    display: none;
  }
  .wallet {
    margin: 0 20px 0 20px;
  }
}
@include _991 {
  .pc {
    display: none;
  }
  .mobile {
    overflow-y: auto;
    display: grid;
    height: 100%;
    width: 100%;
    max-height: 775px;
  }
}

@include _575 {
  .user {
    &__name {
      margin: 0 0 0 10px;
    }
  }
}
</style>
