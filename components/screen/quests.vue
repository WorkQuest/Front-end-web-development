<template>
  <div class="quests__cards">
    <div
      v-for="item in filteredCards(selectedTab, isShowFavourite)"
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
          <div class="block__locate">
            <span class="icon-location" />
            <span class="block__text block__text_locate">200m {{ $t('meta.fromYou') }}</span>
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
              >
                <div class="block__text block__text_details">
                  {{ $t('meta.details') }}
                </div>
                <span class="icon-short_right" />
              </button>
              <div
                v-else
                class="block__rating"
              >
                <div class="block__rating block__rating_star">
                  <b-form-rating
                    v-model="value"
                  />
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

export default {
  name: 'My',
  data() {
    return {
      selectedTab: 0,
      isShowFavourite: false,
      cards: [
        {
          type: 4,
          title: 'Samantha Sparks',
          favourite: false,
          isFavourite: false,
          sub: '',
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: 'Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 0,
          amount: 1500,
          symbol: 'wusd',
        },
        {
          type: 4,
          title: 'Samantha Sparks',
          favourite: false,
          isFavourite: false,
          sub: '',
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: 'Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 0,
          amount: 1500,
          symbol: 'wusd',
        },
        {
          type: 5,
          title: 'Samantha Sparks',
          favourite: false,
          isFavourite: true,
          sub: '',
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: 'Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 0,
          amount: 1500,
          symbol: 'wusd',
        },
        {
          type: 2,
          title: 'Samantha Sparks',
          favourite: false,
          isFavourite: true,
          sub: '',
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: 'Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 0,
          amount: 1500,
          symbol: 'wusd',
        },
        {
          type: 3,
          title: 'Samantha Sparks',
          favourite: false,
          isRating: false,
          sub: '',
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: 'Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 0,
          amount: 1500,
          symbol: 'wusd',
          value: null,
        },
        {
          type: 3,
          title: 'Samantha Sparks',
          favourite: false,
          isRating: false,
          sub: '',
          background: require('~/assets/img/temp/fake-card.svg'),
          theme: 'Paint the garage quickly',
          desc: 'Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...',
          priority: 0,
          amount: 1500,
          symbol: 'wusd',
          value: null,
        },
      ],
    };
  },
  computed: {},
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
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
.quests {
  &__container {
    display: flex;
    justify-content: center;
  }

  &__body {
    max-width: 1180px;
    width: 100%;
    height: 100%;
  }

  &__content {
    width: 80%;
    display: grid;
    align-items: center;
    grid-template-columns: 114px 110px 181px 176px 143px 147px;
    grid-gap: 10px;
    padding: 20px 0;

    &__btn {
      padding: 10px 20px;
      width: max-content;
      height: 41px;
    }
  }

  &__cards {
    border-radius: 6px;
    width: 100%;
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr;
    grid-gap: 20px;

    &__all {
      height: 255px;

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
      height: 255px;
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

    &__details {
      width: 120px;
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

</style>
