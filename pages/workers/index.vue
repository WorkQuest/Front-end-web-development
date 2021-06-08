<template>
  <div>
    <div class="map__container">
      <div class="quests__top">
        <transition name="fade-fast">
          <GMap
            v-if="isShowMap && userPosition"
            ref="gMap"
            language="en"
            :cluster="{options: {styles: clusterStyle}}"
            :center="{lat: userPosition.latitude, lng: userPosition.longitude}"
            :options="{fullscreenControl: false}"
            :zoom="10"
          >
            <GMapMarker
              v-for="location in locations"
              :key="location.id"
              :position="{lat: location.lat, lng: location.lng}"
              :options="{icon: location === currentLocation ? pins.selected : pins.notSelected}"
              @click="currentLocation = location"
            >
              <GMapInfoWindow :options="{maxWidth: 200}">
                lat: {{ location.lat }},
                lng: {{ location.lng }}
              </GMapInfoWindow>
            </GMapMarker>
          </GMap>
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
                {{ $t('workers.searchQuests') }}
              </base-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main__body">
        <h2 class="main__title">
          {{ $t('workers.topWorkers') }}
        </h2>
        <div class="main__menu menu">
          <div class="menu__left">
            <base-btn
              class="btn_white"
            >
              <template v-slot:right>
                <span class="icon-Sorting_descending" />
              </template>
              {{ $t('workers.price') }}
            </base-btn>
            <base-btn
              class="btn_white"
            >
              <template v-slot:right>
                <span class="icon-Sorting_descending" />
              </template>
              {{ $t('workers.addedTime') }}
            </base-btn>
          </div>
          <div class="menu__right">
            <base-btn
              class="btn_white"
            >
              <template v-slot:right>
                <span class="icon-caret_down" />
              </template>
              {{ $t('workers.quests') }}
            </base-btn>
            <base-btn
              class="btn_white"
            >
              <template v-slot:right>
                <span class="icon-caret_down" />
              </template>
              {{ $t('workers.urgent') }}
            </base-btn>
            <base-btn
              class="btn_white"
            >
              <template v-slot:right>
                <span class="icon-caret_down" />
              </template>
              {{ $t('workers.specialized') }}
            </base-btn>
            <base-btn
              class="btn_white"
            >
              <template v-slot:right>
                <span class="icon-caret_down" />
              </template>
              {{ $t('workers.typeOfJob') }}
            </base-btn>
          </div>
        </div>
        <div class="content">
          <div
            v-for="(card, i) in cards"
            :key="i"
            class="card card_higher"
            :class="cardsLevelsBorder(i)"
            @click="showDetails()"
          >
            <div
              class="card__content"
            >
              <div class="card__header">
                <div class="card__header_top">
                  <div class="card__header_left">
                    <img
                      v-if="card.img"
                      class="card__img"
                      :src="card.img"
                      alt=""
                    >
                  </div>
                  <div class="card__header_right">
                    <span
                      class="card__name"
                      :class="{'card__name_center': card.level.code === '0'}"
                    >
                      {{ card.name }}
                    </span>
                    <div
                      class="card__level"
                      :class="{'card__level_disabled': card.level.code === '0'}"
                    >
                      <span class="icon-circle_up icon_blue" />
                      <span
                        class="card__level_higher"
                        :class="cardsLevels(i)"
                      >{{ card.level.title }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card__spec_title">
                {{ $t('workers.specializations') }}
              </div>
              <span
                v-for="(spec, j) in card.specialization"
                :key="j"
                class="card__spec"
              >
                {{ spec.name }}
              </span>
              <div class="card__title">
                {{ $t('workers.aboutMe') }}
              </div>
              <div class="card__about">
                {{ card.about }}
              </div>
              <div class="card__address">
                {{ card.address }}
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

export default {
  name: 'IndexVue',
  data() {
    return {
      currentLocation: {},
      circleOptions: {},
      locations: [
        {
          lat: 44.933076,
          lng: 15.629058,
        },
        {
          lat: 45.815,
          lng: '15.9819',
        },
        {
          lat: '45.12',
          lng: '16.21',
        },
      ],
      pins: {
        selected: '/img/app/marker_blue.svg',
        notSelected: '/img/app/marker_red.svg',
      },
      clusterStyle: [
        {
          url:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
          width: 56,
          height: 56,
          textColor: '#fff',
        },
      ],
      search: '',
      cards: [
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'HIGHER LEVEL',
            code: 1,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'RELIABLE EMP.',
            code: 2,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'CHECKED BY TIME',
            code: 3,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'DISABLED',
            code: 0,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'DISABLED',
            code: 0,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'HIGHER LEVEL',
            code: 1,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'HIGHER LEVEL',
            code: 1,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'HIGHER LEVEL',
            code: 1,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'HIGHER LEVEL',
            code: 1,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'HIGHER LEVEL',
            code: 1,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'HIGHER LEVEL',
            code: 1,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'HIGHER LEVEL',
            code: 1,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'HIGHER LEVEL',
            code: 1,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'HIGHER LEVEL',
            code: 1,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'HIGHER LEVEL',
            code: 1,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
        {
          name: 'Rosalia Vans',
          img: require('~/assets/img/temp/fake-card.svg'),
          level: {
            title: 'HIGHER LEVEL',
            code: 1,
          },
          specialization: [
            {
              name: 'Programming',
            },
            {
              name: 'design',
            },
          ],
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam adipiscing elit ut elit ut elit utelit ut',
          address: 'Moscos, Lenina street, 3',
        },
      ],
      isShowMap: true,
      distance: [
        '+ 100 m',
        '+ 500 m',
        '+ 1000 m',
      ],
      priorityIndex: 0,
      distanceIndex: 0,
      priceSort: 'desc',
      timeSort: 'desc',
      priority: [
        this.$t('quests.priority.all'),
        this.$t('quests.priority.low'),
        this.$t('quests.priority.normal'),
        this.$t('quests.priority.urgent'),
      ],
    };
  },
  computed: {
    ...mapGetters({
      userPosition: 'user/getUserCurrentPosition',
    }),
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
    showDetails() {
      this.$router.push('/workers/1');
    },
    cardsLevels(idx) {
      const { cards } = this;
      return [
        { card__level_reliable: cards[idx].level.code === 2 },
        { card__level_checked: cards[idx].level.code === 3 },
        { card__level_disabled: cards[idx].level.code === 0 },
      ];
    },
    cardsLevelsBorder(idx) {
      const { cards } = this;
      return [
        { card_lower: cards[idx].level.code === 2 },
        { card_lower: cards[idx].level.code === 3 },
        { card_lower: cards[idx].level.code === 0 },
      ];
    },
    toggleMap(newPosition) {
      this.isShowMap = !this.isShowMap;
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
.search {
  display: grid;
  grid-template-columns: 154px 1fr 143px 260px;
  align-items: center;
  height: 100%;
  justify-items: center;
  &__dd {
    display: flex;
    border-left: 1px solid #F7F8FA;
    justify-items: center;
    height: 100%;
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
.main {
  @include main;
  &-white {
    @include main-white;
  }
  &__title {
    @include text-simple;
    font-weight: 500;
    font-size: 25px;
    line-height: 130%;
    color: $black800;
    margin: 30px 0 25px 0;
  }
}
.menu {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  justify-content: space-between;
  max-width: 1180px;
  width: 100%;
  &__left {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 20px;
    justify-content: flex-start;
  }
  &__right {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-gap: 20px;
    justify-content: flex-end;
  }
}
.map {
  &__container {
    position: relative;
  }
}
.content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 300px;
  grid-gap: 20px;
  margin-top: 20px;
}
.btn_white {
  font-size: 14px;
  background-color: $white;
  color: $black800;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 6px;
  flex-shrink: 0;
  width: 100%;
  transition: .2s;
  &:hover {
    background-color: $white;
    box-shadow: 0 17px 17px rgba(0, 0, 0, 0.05);
  }
}
.icon {
  &_blue::before {
    color: $blue;
    font-size: 24px;
    display: block;
  }
}

.card {
  width: 100%;
  max-height: 300px;
  height: 100%;
  box-sizing: border-box;
  border-radius: 6px;
  align-items: center;
  cursor: pointer;
  box-shadow: none;
  transition: .2s;
  &:hover {
    cursor: pointer;
    box-shadow: 0 17px 17px rgba(0, 0, 0, 0.05), 0 5.125px 5.125px rgba(0, 0, 0, 0.0325794), 0 2.12866px 2.12866px rgba(0, 0, 0, 0.025), 0 0.769896px 0.769896px rgba(0, 0, 0, 0.0174206);
  }
  &_higher {
    border: 1px solid #F6CF00;
  }
  &_lower {
    border: none;
  }
  &__content {
    width: 100%;
    max-width: 240px;
  }
  &__spec {
    font-weight: 400;
    font-size: 14px;
    color: $blue;
    &_title {
      margin: 15px 0 0 0;
      font-size: 14px;
      font-weight: 400;
    }
  }
  &__header {
    display: flex;
    flex-direction: column;
    margin: 20px 0 0 0;
    &_top {
      display: grid;
      grid-template-columns: 61px 1fr;
      grid-gap: 15px;
      align-items: center;
    }
    &_right {
      display: grid;
      grid-template-rows: 20px 1fr;
      grid-gap: 7px;
    }
  }
  &__img {
    width: 61px;
    height: 61px;
    border-radius: 100%;
    object-fit: cover;
  }
  &__name {
    @include text-simple;
    font-size: 18px;
    font-weight: 500;
  }
  &__level {
    display: grid;
    grid-template-columns: 20px auto;
    grid-gap: 7px;
    font-size: 12px;
    justify-content: flex-start;
    align-items: center;
    height: 20px;
    &_higher {
      display: flex;
      padding: 0 4px;
      align-items: center;
      background-color: #F6CF00;
      border-radius: 3px;
      color: $white;
    }
    &_reliable {
      display: flex;
      padding: 0 4px;
      align-items: center;
      background-color: #BBC0C7;
      border-radius: 3px;
      color: $white;
    }
    &_checked {
      display: flex;
      padding: 0 4px;
      align-items: center;
      background-color: #B79768;
      border-radius: 3px;
      color: $white;
    }
    &_disabled {
      display: none;
    }
  }
  &__title {
    margin: 15px 0 0 0;
    font-weight: 400;
    font-size: 14px;
  }
  &__about {
    margin: 0 0 15px 0;
    font-weight: 400;
    font-size: 14px;
    color: $black300;
    white-space: normal;
    overflow: hidden;
    max-height: 65px;
    text-overflow: ellipsis;
  }
  &__address {
    margin: 0 0 15px 0;
    font-weight: 500;
    font-size: 12px;
    color: $black500;
  }
}
.checkbox {
  &__isShowMap {
    margin: 30px 50px 0 10px;
    display: flex;
    flex-direction: row;
    height: 25px;
    align-items: center;
  }
  &-input {
    width: 24px;
    height: 24px;
  }
  &__label {
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    margin: 0 0 0 5px;
    font-size: 16px;
  }
}
.search-bar {
  left: 18%;
  bottom: 30px;
  margin: 10px 0 0 0;
  position: absolute;
  max-width: 1180px;
  width: 100%;
  height: 84px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background-color: $white;
  z-index: 10;
  box-shadow: 0 17px 17px rgba(0, 0, 0, 0.05), 0 5.125px 5.125px rgba(0, 0, 0, 0.0325794), 0 2.12866px 2.12866px rgba(0, 0, 0, 0.025), 0 0.769896px 0.769896px rgba(0, 0, 0, 0.0174206);
  &__body {
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    height: 40px;
  }
  &__input {
    margin: 30px 10px 0 0;
    height: 25px;
    width: 510px;
  }
  &__btn {
    margin: 30px 10px 0 0;
    flex-shrink: 0;
  }
  &__btn-search {
    margin: 30px 10px 0 0;
    width: 220px;
  }
}
</style>
