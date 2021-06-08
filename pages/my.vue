<template>
  <div class="main__body">
    <section class="pc">
      <div class="quests">
        <div class="quests__container">
          <div class="quests__body">
            <div class="quests__title">
              {{ $t('quests.MyQuests') }}
            </div>
            <div class="quests__content">
              <base-btn
                v-for="item in tabs"
                :key="item.id"
                :mode="btnMode(item.id)"
                class="quests__btn"
                @click="filterCards(item.id)"
              >
                {{ item.title }}
              </base-btn>
            </div>
            <div class="quests__cards">
              <div
                v-for="(item, i) in filteredCards(selectedTab, isShowFavourite)"
                :key="item.id"
                class="quests__cards__all"
              >
                <div
                  class="quests__block block"
                >
                  <div class="block__left">
                    <div class="block__img">
                      <img
                        src="~/assets/img/temp/fake-card.svg"
                        class="quests__img image"
                        alt=""
                      >
                    </div>
                    <div
                      class="quests__cards__state"
                      :class="getStatusClass(item.type)"
                    >
                      {{ getStatusCard(item.type) }}
                    </div>
                  </div>
                  <div class="block__right">
                    <div class="block__head">
                      <div class="block__title">
                        <div
                          class="block__avatar"
                        >
                          <img
                            class="avatar"
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
                        v-if="isHideStar(item.type)"
                        class="block__icon block__icon_fav star"
                        @click="item.isFavourite = !item.isFavourite"
                      >
                        <img
                          class="star__hover"
                          src="~assets/img/ui/star_hover.svg"
                          alt=""
                        >
                        <img
                          v-if="!item.isFavourite"
                          class="star__default"
                          src="~assets/img/ui/star_simple.svg"
                          alt=""
                        >
                        <img
                          v-if="item.isFavourite"
                          class="star__checked"
                          src="~assets/img/ui/star_checked.svg"
                          alt=""
                        >
                      </div>
                    </div>
                    <div
                      v-if="item.inProgress.work === true"
                      class="block__progress"
                    >
                      <div class="container__title">
                        In progress by:
                      </div>
                      <div class="limit__container">
                        <div class="avatar__container">
                          <div class="avatar">
                            <img
                              src="~/assets/img/temp/avatar.jpg"
                              alt=""
                            >
                          </div>
                          <div>
                            {{ item.inProgress.name }}
                          </div>
                          <div class="">
                            <span
                              v-if="item.level.code !== 0"
                              class="card__level_higher"
                              :class="cardsLevels(i)"
                            >
                              <span v-if="item.level.code === 1">
                                HIGHER LEVEL
                              </span>
                              <span v-if="item.level.code === 2">
                                RELIABLE EMP.
                              </span>
                              <span v-if="item.level.code === 3">
                                CHECKED BY TIME
                              </span>
                            </span>
                          </div>
                        </div>
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
                      <div
                        v-if="isHideStatus(item.type)"
                        class="block__status"
                      >
                        <div
                          class="block__priority"
                          :class="getPriorityClass(item.priority)"
                        >
                          {{ getPriority(item.priority) }}
                        </div>
                        <div class="block__amount_green">
                          {{ item.amount }} {{ item.symbol }}
                        </div>
                      </div>
                      <div
                        v-else
                        class="block__amount_gray"
                      >
                        {{ item.amount }} {{ item.symbol }}
                      </div>
                      <div class="block__details">
                        <button
                          v-if="item.type !== 3"
                          class="block__btn"
                          @click="showDetails()"
                        >
                          <span
                            class="block__text block__text_details"
                          >
                            {{ $t('meta.details') }}
                          </span>
                          <span class="icon-short_right" />
                        </button>
                        <div
                          v-else
                          class="block__rating"
                        >
                          <div class="block__rating block__rating_star">
                            <button
                              @click="showReviewModal(item.rating)"
                            >
                              <b-form-rating
                                v-model="item.rating"
                              />
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
        </div>
      </div>
    </section>

    <section class="mobile">
      <div class="mobile__header">
        <h2 class="mobile__title">
          {{ $t('mobile.myQuests') }}
        </h2>
        <div class="mobile__menu">
          <base-btn
            v-for="item in tabsMobile"
            :key="item.id"
            class="btn__deactive"
            :mode="btnMode(item.id)"
            @click="filterCards(item.id)"
          >
            {{ item.name }}
          </base-btn>
        </div>
      </div>
      <div class="mobile__body">
        <div class="cards__container">
          <span
            v-for="item in filteredCards(selectedTab, isShowFavourite)"
            :key="item.id"
          >
            <div class="quest">
              <div
                class="quest__level"
                :class="[
                  {'quest__level_invited': item.type === 5},
                  {'quest__level_active': item.type === 4},
                  {'quest__level_performed': item.type === 3},
                  {'quest__level_requested': item.type === 2},
                ]"
              >
                <div
                  class="level__title"
                  :class="[{'level__title_black': item.type === 2}]"
                >
                  <span v-if="item.type === 5">{{ $t('mobile.youInvited') }}</span>
                  <span v-if="item.type === 4">{{ $t('mobile.active') }}</span>
                  <span v-if="item.type === 3">{{ $t('mobile.performed') }}</span>
                  <span v-if="item.type === 2">{{ $t('mobile.youRequested') }}</span>
                </div>
                <div class="runtime__container">
                  <div class="runtime__status">
                    <span v-if="item.type === 5" />
                    <span v-if="item.type === 4">{{ $t('mobile.runtime') }}</span>
                    <span v-if="item.type === 3" />
                    <span v-if="item.type === 2" />
                  </div>
                  <div class="runtime__time">
                    <span v-if="item.type === 5" />
                    <span v-if="item.type === 4">14:23:23</span>
                    <span v-if="item.type === 3" />
                    <span v-if="item.type === 2" />
                  </div>
                </div>
              </div>
              <div class="user">
                <div class="user__avatar">
                  <img
                    :alt="item.title"
                    src="~assets/img/temp/photo.jpg"
                    class="avatar"
                  >
                </div>
                <div class="user__name">
                  {{ item.title }}
                </div>
              </div>
              <div class="location">
                <div class="icon__container">
                  <span class="icon-location" />
                </div>
                <div class="location__distance">
                  {{ item.distance }} {{ $t('mobile.mFromYou') }}
                </div>
              </div>
              <div class="cards__title">
                {{ item.theme }}
              </div>
              <div class="cards__body">
                {{ item.desc }}
              </div>
              <div class="cards__bottom">
                <span v-if="item.type !== 3">
                  <div
                    v-if="item.level.code === 1"
                    class="cards__priority_low"
                  >
                    {{ $t('mobile.priority.low') }}
                  </div>
                  <div
                    v-if="item.level.code === 2"
                    class="cards__priority_urgent"
                  >
                    {{ $t('mobile.priority.urgent') }}
                  </div>
                  <div
                    v-if="item.level.code === 3"
                    class="cards__priority_normal"
                  >
                    {{ $t('mobile.priority.normal') }}
                  </div>
                </span>
                <span
                  v-if="item.type === 3"
                  class="cards__stars"
                >
                  <div class="block__details">
                    <button
                      v-if="item.type !== 3"
                      class="block__btn"
                      @click="showDetails()"
                    >
                      <span
                        class="block__text block__text_details"
                      >
                        {{ $t('meta.details') }}
                      </span>
                      <span class="icon-short_right" />
                    </button>
                    <div
                      v-else
                      class="block__rating"
                    >
                      <div class="block__rating block__rating_star">
                        <button
                          @click="showReviewModal(item.rating)"
                        >
                          <b-form-rating
                            v-model="item.rating"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </span>
                <div
                  class="cards__price"
                  :class="[{'cards__price_gray': item.type === 3}]"
                >
                  {{ item.amount }} {{ $t('mobile.wusd') }}
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// TODO: Need Bugfix
import Vue from 'vue';
import modals from '~/store/modals/modals';

const value = new Vue();

export default {
  name: 'My',
  data() {
    return {
      selectedTab: 0,
      isShowFavourite: false,
      selected: false,
      tabsMobile: [
        {
          id: 4,
          name: 'Active',
        },
        {
          id: 5,
          name: 'Invited',
        },
        {
          id: 3,
          name: 'Performed',
        },
        {
          id: 1,
          name: 'Starred',
        },
      ],
      tabs: [
        {
          title: 'All quests',
          id: 0,
        },
        {

          title: 'Favorite',
          id: 1,
        },
        {
          title: 'Requested',
          id: 2,
        },
        {
          title: 'Performed quests',
          id: 3,
        },
        {
          title: 'Active quests',
          id: 4,
        },
        {
          title: 'Invited quests',
          id: 5,
        },
      ],
      cards: [
        {
          type: 4,
          title: 'Samantha Sparks',
          level: {
            code: 1,
          },
          inProgress: {
            work: false,
            name: 'Roselia Vance',
          },
          favourite: false,
          isFavourite: false,
          sub: 'from Amazon',
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: '1 Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 0,
          amount: 1500,
          symbol: 'wusd',
          distance: '200',
        },
        {
          type: 4,
          title: 'Samantha Sparks',
          level: {
            code: 2,
          },
          inProgress: {
            work: true,
            name: 'Roselia Vance',
          },
          favourite: false,
          isFavourite: false,
          sub: '',
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: '2 Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 0,
          amount: 1500,
          symbol: 'wusd',
          distance: '200',
        },
        {
          type: 5,
          title: 'Samantha Sparks',
          level: {
            code: 3,
          },
          inProgress: {
            work: true,
            name: 'Roselia Vance',
          },
          favourite: true,
          isFavourite: true,
          sub: 'from Amazon',
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: '3 Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 0,
          amount: 1500,
          symbol: 'wusd',
          distance: '200',
        },
        {
          type: 2,
          title: 'Samantha Sparks',
          level: {
            code: 1,
          },
          inProgress: {
            work: true,
            name: 'Roselia Vance',
          },
          favourite: false,
          isFavourite: true,
          sub: 'from Amazon',
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: '4 Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 0,
          amount: 1500,
          symbol: 'wusd',
          distance: '300',
        },
        {
          type: 5,
          title: 'Samantha Sparks',
          level: {
            code: 2,
          },
          inProgress: {
            work: true,
            name: 'Roselia Vance',
          },
          favourite: false,
          isRating: false,
          sub: '',
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: '5 Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 0,
          amount: 1500,
          symbol: 'wusd',
          rating: '',
          distance: '400',
        },
        {
          type: 3,
          title: 'Samantha Sparks',
          level: {
            code: 3,
          },
          inProgress: {
            work: false,
            name: '',
          },
          favourite: false,
          isRating: false,
          sub: 'from Amazon',
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: '6 Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 0,
          amount: 1500,
          symbol: 'wusd',
          rating: '',
          distance: '100',
        },
      ],
    };
  },
  computed: {
    cardLevelClass(idx) {
      const { cards } = this;
      return [
        { card__level_reliable: cards[idx].level.code === 2 },
        { card__level_checked: cards[idx].level.code === 3 },
      ];
    },
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    cardsLevels(idx) {
      const { cards } = this;
      return [
        { card__level_checked: cards[idx].level.code === 3 },
        { card__level_reliable: cards[idx].level.code === 2 },
        { card__level_higher: cards[idx].level.code === 1 },
      ];
    },
    showDetails() {
      this.$router.push('/quests/1');
    },
    showReviewModal(rating) {
      this.ShowModal({
        key: modals.review,
        rating,
      });
    },
    isHideStar(type) {
      return !(type === 4 || type === 3);
    },
    isRating(type) {
      return (type === 3);
    },
    isHideStatus(type) {
      return !(type === 3);
    },
    filterCards(id) {
      this.selectedTab = id;
      this.isShowFavourite = id === 1;
    },
    filteredCards(type, isFavorite) {
      if (type === 0) {
        return this.cards;
      }
      if (isFavorite) {
        return this.cards.filter((x) => x.isFavourite);
      }
      return this.cards.filter((x) => x.type === type);
    },
    btnMode(id) {
      if (this.selectedTab === id) {
        return ' ';
      }
      return 'light';
    },
    getStatusCard(index) {
      const status = {
        0: '',
        1: '',
        2: this.$t('Requested'),
        3: this.$t('Performed'),
        4: this.$t('Active'),
        5: this.$t('Invited'),
      };
      return status[index] || '';
    },
    getStatusClass(index) {
      const status = {
        0: '',
        1: '',
        2: this.$t('quests__cards__state_req'),
        3: this.$t('quests__cards__state_per'),
        4: this.$t('quests__cards__state_act'),
        5: this.$t('quests__cards__state_inv'),
      };
      return status[index] || '';
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
        0: this.$t('block__priority_low'),
        1: this.$t('block__priority_normal'),
        2: this.$t('block__priority_urgent'),
      };
      return priority[index] || '';
    },
  },
};
</script>

<style lang="scss" scoped>

.location {
  display: flex;
  flex-direction: row;
  margin: 16px 20px 0 20px;
  &__distance {
    color: $black500;
    font-weight: 400;
  }
}

.icon {
  &__container {}
  &-location:before {
    content: "\ea23";
    color: $black500;
    font-size: 25px;
  }
}

.user {
  display: flex;
  margin: 20px 20px 0 20px;
  &__avatar {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
    border-radius: 55px;
  }
  &__name {
    font-size: 16px;
    font-weight: 500;
    color: $black800;
    margin: 0 0 0 10px;
  }
}

.runtime {
  &__status {
    font-weight: 400;
    font-size: 14px;
    color: $white;
  }
  &__time {
    font-weight: 600;
    font-size: 16px;
    color: $white;
  }
  &__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-content: center;
  }
}

.level {
  &__title {
    font-weight: 500;
    font-size: 14px;
    color: $white;
    padding: 7px 0 7px 14px;
    &_black {
      @extend .level__title;
      color: $black300;
    }
  }
}

.quest {
  width: 100%;
  height: 100%;
  max-width: 1180px;
  background: $white;
  border-color: $white;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  &__level {
    display: flex;
    flex-direction: row;
    border-radius: 6px;
    padding: 0 10px 0 0;
    justify-content: space-between;
    align-content: center;
    height: 100%;
    margin: 16px 16px 0 16px;
    &_active {
      @extend .quest__level;
      background: $green;
    }
    &_performed {
      @extend .quest__level;
      background: #0083C7
    }
    &_requested {
      @extend .quest__level;
      background: #F7F8FA;
    }
    &_invited {
      @extend .quest__level;
      background: #E8D20D;
    }
  }
}

.cards {
  &__container {
    margin: 10px 0 20px 0;
  }
  &__title {
    margin: 17px 20px 0 20px;
    font-weight: 500;
    font-size: 18px;
    color: $black600;
  }
  &__body {
    margin: 17px 20px 0 20px;
    font-weight: 400;
    font-size: 16px;
    color: $black600;
  }
  &__bottom {
    margin: 17px 20px 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  &__priority {
    font-weight: 400;
    font-size: 12px;
    padding: 4px 5px;
    border-radius: 6px;
    margin: 0 0 16px 0;
    &_low {
      @extend .cards__priority;
      color: #22CC14;
      background: rgba(34, 204, 20, 0.1);
    }
    &_urgent {
      @extend .cards__priority;
      color: rgba(223, 51, 51, 1);
      background: rgba(223, 51, 51, 0.1);
    }
    &_normal {
      @extend .cards__priority;
      color: rgba(232, 210, 13, 1);
      background: rgba(232, 210, 13, 0.1);
    }
  }
  &__price {
    color: $green;
    font-weight: 700;
    font-size: 18px;
    &_gray {
      @extend .cards__price;
      color: $black300;
    }
  }
}

.btn {
  padding: 10px;
  border-radius: 6px;
  margin: 5px 0 5px 5px;
  width: 100%;
  &__deactive {
    @extend .btn;
    background: $black0;
    color: $black400;
    &:hover {
      @extend .btn;
      background: $white;
      color: $black800;
      box-shadow: 0px 3px 20px rgba(16, 51, 91, 0.1);
    }
  }
}

.mobile {
  &__header {
    padding: 10px 0 10px 0;
    background-color: #FFFFFF;
  }
  &__body {}
  &__menu {
    border-radius: 6px;
    background: $black0;
    padding: 0 10px 0 0;
    margin: 20px 20px 0 20px;
    display: grid;
    grid-gap: 18px;
    grid-template-columns: repeat(4, 1fr);
  }
  &__title {
    @include text-simple;
    color: $black800;
    font-weight: 700;
    font-size: 30px;
    margin: 18px 20px 0 20px;
  }
}

.container {
  &__title {
    font-weight: 400;
    font-size: 12px;
    color: $black500;
  }
}

.limit__container {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr;
}

.avatar {
    width: 100%;
    height: 100%;
    max-height: 30px;
    max-width: 30px;
  border-radius: 50%;
  &__container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 0.2fr 0.6fr 1fr;
    margin: 10px 0 4px 0;
  }
}

.card {
  &__level {
    display: grid;
    grid-template-columns: 20px auto;
    grid-gap: 7px;
    font-size: 12px;
    justify-content: flex-start;
    align-items: center;
    height: 20px;
    &_higher {
      padding: 2px 8px;
      align-items: center;
      background-color: #F6CF00;
      border-radius: 3px;
      color: $white;
    }
    &_reliable {
      padding: 2px 8px;
      align-items: center;
      background-color: #BBC0C7;
      border-radius: 3px;
      color: $white;
    }
    &_checked {
      padding: 2px 8px;
      align-items: center;
      background-color: #B79768;
      border-radius: 3px;
      color: $white;
    }
    &_disabled {
      display: none;
    }
  }
}

.quests {
  &__container {
    display: flex;
    justify-content: center;
  }

  &__title {
    @include text-simple;
    font-style: normal;
    font-weight: 500;
    font-size: 25px;
    line-height: 130%;
    color: $black800;
    padding: 20px 0;
  }

  &__body {
    max-width: 1180px;
    width: 100%;
    height: 100%;
  }

  &__content {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(6, auto);
    grid-gap: 10px;
    margin-bottom: 20px;
  }

  &__cards {
    border-radius: 6px;
    width: 100%;
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    &__all {
      //height: 255px;

      &_per {
        height: 244px;
      }
    }

    &__state {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 80px;
      padding: 0 20px;
      height: 41px;
      border-radius: 5px 0;
      color: #FFFFFF;
      top: 0;
      left: 0;

      &_req {
        color: $black600;
        background-color: #E9EFF5;
      }

      &_per {
        background-color: #0083C7;
      }

      &_act {
        background-color: #00AA5B;
      }

      &_inv {
        background-color: #E8D20D;
      }
    }

    .image {
      border-radius: 6px 0 0 6px;
      object-fit: cover;
      max-height: 500px;
      height: 100%;
    }
  }

  .block {
    background: #FFFFFF;
    border-radius: 6px;
    display: grid;
    grid-template-columns: 240px 1fr;
    min-height: 100%;

    &__left {
      position: relative;
    }

    &__progress {
      background-color: $black0;
      border-radius: 6px;
      width: 100%;
      padding:10px;
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

      &_green {
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 130%;
        text-transform: uppercase;
        color: #00AA5B;
      }

      &_gray {
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 130%;
        text-transform: uppercase;
        color: #B0B3B9;
      }

      &__performed {
        color: #B0B3B9;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 130%;
        text-transform: uppercase;
      }
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
      grid-template-columns: 20px;
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

      &_perf {
        display: grid;
        grid-template-columns: 25px 25px 25px 25px 25px;
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
      border-radius: 50%;

      &__img {
        border-radius: 100%;
        height: 100%;
      }
    }

    &__img {
      height: 100%;
      max-height: 100%;
    }

    &__title {
      display: grid;
      grid-template-columns: 30px 1fr;
      grid-gap: 10px;
      align-items: center;
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
  .mobile {
    display: none;
  }
  .quests {
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
@include _480 {
  .mobile {
    &__menu {
      grid-gap: 6px;
    }
  }
}

@include _380 {
  .mobile {
    &__menu {
      grid-gap: 2px;
      border-radius: 6px;
      background: #F7F8FA;
      padding: 0;
      margin: 10px 0 0 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
