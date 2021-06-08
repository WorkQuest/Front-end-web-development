<template>
  <div>
    <span v-if="userRole === 'employer'">
      <span v-if="info.mode !== 1">
        <span v-if="info.mode !== 5">
          <span v-if="info.mode !== 3">
            <div>
              <div
                class="info"
                :class="infoClass"
              >
                <div class="info__body">
                  <div class="info__left">
                    <div
                      class="info__text info__text_white"
                    >
                      <div v-if="info.mode === 2">
                        {{ $t('quests.activeQuest') }}
                      </div>
                      <div v-if="info.mode === 4">
                        {{ $t('performed.title') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </span>
      </span>
    </span>
    <span v-if="userRole === 'worker'">
      <div>
        <div
          v-if="info.mode !== 5"
          class="info"
          :class="infoClass"
        >
          <div class="info__body">
            <div class="info__left">
              <div
                class="info__text info__text_white"
                :class="[{'info__text_black': info.mode === 3}]"
              >
                <div v-if="info.mode === 1">
                  {{ $t('invite.title') }}
                </div>
                <div v-if="info.mode === 2">
                  {{ $t('quests.activeQuest') }}
                </div>
                <div v-if="info.mode === 3">
                  {{ $t('response.title') }}
                </div>
                <div v-if="info.mode === 4">
                  {{ $t('performed.title') }}
                </div>
                <div v-if="info.mode === 5" />
              </div>
            </div>
            <div class="info__right">
              <div
                v-if="info.mode === 3"
              >
                <base-btn mode="showYourMessage">
                  <template v-slot:right>
                    <span class="icon-caret_down" />
                  </template>
                  {{ $t('info.showYourMessage') }}
                </base-btn>
              </div>
              <div
                v-if="info.date"
              >
                <span v-if="info.mode !== 1">
                  <span v-if="info.mode !== 4">
                    <span v-if="info.mode !== 3">
                      <span class="info__text info__text_white info__text_normal">
                        {{ $t('quests.runtime') }}
                      </span>
                      <span class="info__text info__text_white info__text_bold">
                        {{ info.date }}
                      </span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'InfoVue',
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    infoClass() {
      const { mode } = this.info;
      return [
        {
          'info_bg-yellow': mode === 1,
        },
        {
          'info_bg-green': mode === 2,
        },
        {
          'info_bg-grey': mode === 3,
        },
        {
          'info_bg-blue': mode === 4,
        },
      ];
    },
    ...mapGetters({
      tags: 'ui/getTags',
      userRole: 'user/getUserRole',
      userData: 'user/getUserData',
    }),
  },
  methods: {
    infoText(type) {
      const texts = {
        invited: this.$t('invite.title'),
        response: this.$t('response.title'),
        active: this.$t('quests.activeQuest'),
        performed: this.$t('performed.title'),
      };
      return texts[type] || '';
    },
    infoTextStyle() {
      const { mode } = this.info;
      return [
        {
          info_yellow: mode === 1,
        },
      ];
    },
  },
};

</script>

<style lang="scss" scoped>
.icon-caret_down:before {
  content: "\ea48";
  color: $blue;
  font-size: 20px;
}
.info {
  &_bg-green {
    background-color: $green;
  }
  &_bg-yellow {
    background-color: $yellow;
  }
  &_bg-grey {
    background-color: $grey;
  }
  &_bg-blue {
    background-color: $blue;
  }
  min-height: 54px;
  box-shadow: 0 1px 0 #e6e9ec;
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
  &__right {
    display: flex;
    grid-gap: 10px;
    align-items: center;
    justify-content: center;
  }
  &__text{
    @include text-simple;
    font-size: 16px;
    font-weight: 400;
    z-index: 11;
    justify-content: space-between;
    &_white{
      color: $white;
    }
    &_black{
      color: $black600;
    }
    &_bold {
      font-weight: 500;
    }
    &_normal {
      font-weight: 300;
    }
  }
}
</style>
