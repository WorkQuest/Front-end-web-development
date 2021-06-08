<template>
  <div class="main">
    <div class="main__body">
      <h2 class="page__title">
        {{ $t('settings.settings') }}
      </h2>
      <div
        v-if="userRole === 'worker'"
        class="quests__top"
        :class="[{'top-disabled': isShowInfo === false}]"
      >
        <transition name="fade-fast">
          <div class="page__info">
            <div class="page__grid">
              <div
                class="page__info"
              >
                <div class="page__info">
                  <h2 class="page__info page__info-title">
                    {{ $t('settings.addInfo') }}
                  </h2>
                  <div class="page__info page__info-subtitle">
                    {{ $t('settings.alsoRating') }}
                  </div>
                  <div class="info__toggle">
                    <input
                      id="dontShow"
                      v-model="isShowInfo"
                      type="checkbox"
                      class="custom-checkbox"
                    >
                    <label
                      class="label"
                      for="dontShow"
                    >{{ $t('settings.dontShow') }}</label>
                  </div>
                </div>
              </div>
              <div>
                <img
                  class="higher-level__img"
                  src="~/assets/img/ui/settingsHigherLevel.svg"
                >
                <button @click="isCloseInfo()">
                  <span
                    class="icon-close_big icon__close"
                    :class="{'icon_close_closed' : isShowInfo }"
                  />
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="page__profile">
        <div class="profile__title">
          {{ $t('settings.profileInfo') }}
        </div>
        <div class="avatar__row">
          <div>
            <img
              class="profile__img"
              src="~/assets/img/temp/photo.jpg"
            >
          </div>
          <div class="profile__row-3col">
            <base-field
              v-model="name_input"
              :placeholder="$t('settings.nameInput')"
              mode="icon"
            >
              <template v-slot:left>
                <span class="icon-user" />
              </template>
            </base-field>
            <base-field
              v-model="adress1_input"
              :placeholder="$t('settings.addressInput')"
              mode="icon"
            >
              <template v-slot:left>
                <span class="icon-location" />
              </template>
            </base-field>
            <base-field
              v-model="adress2_input"
              :placeholder="$t('settings.addressInput')"
              mode="icon"
            >
              <template v-slot:left>
                <span class="icon-mail" />
              </template>
            </base-field>
            <base-field
              v-model="lastname_input"
              :placeholder="$t('settings.lastNameInput')"
              mode="icon"
            >
              <template v-slot:left>
                <span class="icon-user" />
              </template>
            </base-field>
            <base-field
              v-model="tel1_input"
              :placeholder="$t('settings.telInput')"
              mode="icon"
            >
              <template v-slot:left>
                <span class="icon-phone" />
              </template>
            </base-field>
            <base-field
              v-model="tel2_input"
              :placeholder="$t('settings.telInput')"
              mode="icon"
            >
              <template v-slot:left>
                <span class="icon-phone" />
              </template>
            </base-field>
          </div>
        </div>
        <div
          v-if="userRole === 'employer'"
          class="company__inputs"
        >
          <base-field
            v-model="tel2_input"
            :placeholder="$t('settings.amazon')"
            mode="icon"
          >
            <template v-slot:left>
              <span class="icon-Case" />
            </template>
          </base-field>
          <base-field
            v-model="tel2_input"
            :placeholder="$t('settings.ceo')"
            mode="icon"
          >
            <template v-slot:left>
              <span class="icon-id_card" />
            </template>
          </base-field>
          <base-field
            v-model="tel2_input"
            :placeholder="$t('settings.amazon_com')"
            mode="icon"
          >
            <template v-slot:left>
              <span class="icon-Earth" />
            </template>
          </base-field>
        </div>
        <div
          v-if="userRole === 'worker'"
          class="profile__row-1col"
        >
          <textarea
            id="textarea"
            v-model="bio_input"
            class="profile__textarea"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel"
          />
        </div>
        <div class="profile__row-4col">
          <base-field
            v-model="inst_input"
            :placeholder="$t('settings.socialInput')"
            mode="icon"
          >
            <template v-slot:left>
              <span class="icon-instagram" />
            </template>
          </base-field>
          <base-field
            v-model="twitt_input"
            :placeholder="$t('settings.socialInput')"
            mode="icon"
          >
            <template v-slot:left>
              <span class="icon-twitter" />
            </template>
          </base-field>
          <base-field
            v-model="in_input"
            :placeholder="$t('settings.socialInput')"
            mode="icon"
          >
            <template v-slot:left>
              <span class="icon-LinkedIn" />
            </template>
          </base-field>
          <base-field
            v-model="facebook_input"
            :placeholder="$t('settings.socialInput')"
            mode="icon"
          >
            <template v-slot:left>
              <span class="icon-facebook" />
            </template>
          </base-field>
        </div>
        <div class="btn__container-right">
          <base-btn
            class="btn__save"
          >
            {{ $t('settings.save') }}
          </base-btn>
        </div>
      </div>
      <div
        v-if="userRole === 'worker'"
        class="page__skills"
      >
        <div class="main-white">
          <div class="page__badge-skills">
            {{ $t('settings.skills') }}
          </div>
          <span
            v-for="(item, i) in badges"
            :key="i"
          >
            <div class="page__badge">
              {{ item.name }}
            </div>
          </span>
          <div class="btn__container">
            <div class="btn__plus">
              <span class="icon-plus_circle" />
            </div>
          </div>
        </div>
      </div>
      <div class="settings">
        <div class="settings__left">
          <div>{{ $t('settings.settings') }}</div>
          <div>
            <div class="settings__subtitle">
              {{ $t('settings.whoCanSee') }}
            </div>
            <div class="settings__option">
              <input
                id="allUsers"
                type="radio"
                class="radio__input"
                checked
              >
              <label
                class="label"
                for="allUsers"
              >{{ $t('settings.allUsers') }}</label>
            </div>
            <div class="settings__option">
              <input
                id="allInternet"
                type="radio"
                class="radio__input"
              >
              <label
                class="label"
                for="allInternet"
              >{{ $t('settings.allInternet') }}</label>
            </div>
            <div class="settings__option">
              <input
                id="onlyWhenSubmittedWork"
                type="radio"
                class="radio__input"
              >
              <label
                class="label"
                for="onlyWhenSubmittedWork"
              >{{ $t('settings.onlyWhenSubmittedWork') }}</label>
            </div>
          </div>
          <div>
            <div class="settings__subtitle">
              {{ $t('settings.filterAllWorkProposals') }}
            </div>
            <div class="settings__option">
              <input
                id="urgentProposals"
                type="radio"
                class="radio__input"
              >
              <label
                class="label"
                for="urgentProposals"
              >{{ $t('settings.urgentProposals') }}</label>
            </div>
            <div class="settings__option">
              <input
                id="onlyImplementation"
                type="radio"
                class="radio__input"
                checked
              >
              <label
                class="label"
                for="onlyImplementation"
              >{{ $t('settings.onlyImplementation') }}</label>
            </div>
            <div class="settings__option">
              <input
                id="onlyReady"
                type="radio"
                class="radio__input"
              >
              <label
                class="label"
                for="onlyReady"
              >{{ $t('settings.onlyReady') }}</label>
            </div>
            <div class="settings__option">
              <input
                id="allRegistered"
                type="radio"
                class="radio__input"
              >
              <label
                class="label"
                for="allRegistered"
              >{{ $t('settings.allRegistered') }}</label>
            </div>
          </div>
        </div>
        <div class="settings__right">
          <div>{{ $t('settings.settings') }}</div>
          <div>
            <div class="settings_blue">
              <div>{{ $t('settings.changePass') }}</div>
              <div>
                <base-btn>
                  {{ $t('settings.change') }}
                </base-btn>
              </div>
            </div>
            <div class="settings_blue">
              <div>{{ $t('settings.enableTwoStepAuth') }}</div>
              <div>
                <base-btn>
                  {{ $t('settings.enable') }}
                </base-btn>
              </div>
            </div>
            <div class="settings_blue">
              <div>{{ $t('settings.smsVerification') }}</div>
              <div>
                <base-btn>
                  {{ $t('settings.enable') }}
                </base-btn>
              </div>
            </div>
            <div class="settings_blue">
              <div>{{ $t('settings.changeRole') }}</div>
              <div>
                <base-btn>
                  {{ $t('settings.change') }}
                </base-btn>
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
  name: 'Settings',
  data() {
    return {
      allRegisterUser: false,
      allPeopleInInternet: false,
      onlyWhenSubmitedWork: false,
      onlyUrgentProposals: false,
      onlyInplemention: false,
      onlyReadyForExecution: false,
      allRegisteredUsers: false,
      bio_input: '',
      name_input: '',
      adress1_input: '',
      adress2_input: '',
      lastname_input: '',
      tel1_input: '',
      tel2_input: '',
      inst_input: '',
      twitt_input: '',
      in_input: '',
      facebook_input: '',
      isShowInfo: true,
      badges: [
        {
          name: 'Painting works',
        },
        {
          name: 'Painting works',
        },
        {
          name: 'Painting works',
        },
        {
          name: 'Painting works',
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
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    isCloseInfo() {
      this.isShowInfo = !this.isShowInfo;
    },
  },
};
</script>

<style lang="scss" scoped>

.company {
  &__inputs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px 20px;
    margin: 0 20px 0 20px;
  }
}

.top-disabled {
  display: none;
}

.radio {
  &__input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    border: 1px solid $blue;
    cursor: pointer;

    &:checked {
      background: radial-gradient($blue 50%, rgba(255, 0, 0, 0) 55%);
    }
  }
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.custom-checkbox+label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.custom-checkbox+label::before {
  content: '';
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.custom-checkbox:checked+label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

.custom-checkbox:not(:disabled):not(:checked)+label:hover::before {
  border-color: #b3d7ff;
}

.custom-checkbox:not(:disabled):active+label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}

.custom-checkbox:focus+label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.custom-checkbox:focus:not(:checked)+label::before {
  border-color: #80bdff;
}

.custom-checkbox:disabled+label::before {
  background-color: #e9ecef;
}

.label {
  padding: 0 0 0 10px;
  font-weight: 500;
  font-size: 16px;
  color: $black800;
}

.btn {
  &__container {
    width: 46%;
    align-content: center;
    display: flex;
    justify-content: flex-end;
    margin: 0 24px 0 0;
  }
  &__plus {
    justify-content: flex-end;
    align-items: center;
    display: flex;
  }
}

.icon-plus_circle:before {
  content: "\e9a6";
  font-size: 25px;
  color: $blue;
  align-items: center;
}

.icon-Case:before {
  content: "\e9ff";
  font-size: 25px;
  color: $blue;
  align-items: center;
}

.icon-id_card:before {
  content: "\e902";
  font-size: 25px;
  color: $blue;
  align-items: center;
}

.icon-Earth:before {
  content: "\ea11";
  font-size: 25px;
  color: $blue;
  align-items: center;
}

.icon-facebook:before {
  content: "\e9e5";
  font-size: 25px;
  color: $blue;
  align-items: center;
}

.icon-LinkedIn::before {
  content: "\e9ed";
  font-size: 25px;
  color: $blue;
  align-items: center;
}

.icon-twitter::before {
  content: "\e9fa";
  font-size: 25px;
  color: $blue;
  align-items: center;
}

.icon-instagram::before {
  content: "\e9ea";
  font-size: 25px;
  color: $blue;
  align-items: center;
}

.icon-phone::before {
  content: "\ea2d";
  font-size: 25px;
  color: $blue;
  align-items: center;
}

.icon-mail::before {
  content: "\ea27";
  font-size: 25px;
  color: $blue;
  align-items: center;
}

.icon-location::before {
  content: "\ea23";
  font-size: 25px;
  color: $blue;
  align-items: center;
}

.icon-user::before {
  content: "\e90c";
  font-size: 25px;
  color: $blue;
  align-items: center;
}

.icon__close {
  position: absolute;
  bottom: 155px;
  right: 25px;
  z-index: 2;
  &_closed {
    display: none;
  }
}

.icon-close_big::before {
  content: "\e948";
  color: #2e3a59;
  font-size: 26px;
}

.checkbox {
  &__label::before {
    color: $white;
  }
}

.higher-level {
  &__img {
    z-index: 1;
    height: 100%;
    width: 100%;
    max-height: 207px;
    padding: 0 0 0 30px;
  }
}

.avatar {
  &__row {
    display: flex;
  }
}
.btn {
  &__container-right {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 0 20px 0 -20px;
    padding: 0 0 20px 0;
  }
  &__save {
    width: 100%;
    max-width: 250px;
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

.info {
  &__toggle {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 50px 0 21px 9px;
  }
}

.checkbox {
  &__label {
    color: $white;
  }
}

.main {
  @include main;
  &-white {
    @include main-white;
    justify-content: flex-start;
    border-radius: 6px;
  }
}
.profile {
  &__img {
    width: 100%;
    height: 100%;
    max-height: 115px;
    max-width: 115px;
    border-radius: 6px;
    margin: 20px;
  }
  &__row-1col {
    display: grid;
    grid-template-columns: 1fr;
    margin: 0 20px 0 20px;
    justify-content: space-between;
    width: 100%;
    max-width: 1180px;
  }
  &__row-3col {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0 20px;
    margin: 20px 20px 0 20px;
    justify-content: space-between;
    width: 100%;
    max-width: 1180px;
  }
  &__row-4col {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px 20px;
    margin: 0 20px 0 20px;
    justify-content: space-between;
    max-width: 1180px;
  }
  &__textarea {
    border-radius: 6px;
    padding: 11px 20px 11px 15px;
    height: 114px;
    width: 100%;
    border: 0;
    background-color: $black0;
    resize: none;

    &::placeholder {
      color: $black200;
    }
  }
  &__title {
    margin: 20px 0 0 20px;
    padding: 20px 0 0 0;
  }
}
.settings {
  display: grid;
  grid-template-columns: 5fr 7fr;
  grid-gap: 20px;
  &_blue {
    padding: 10px 20px 10px 20px;
    margin: 20px 0 20px 0;
    background: rgba(0, 131, 199, 0.1);
    border-radius: 6px;
    display: grid;
    grid-template-columns: 3fr 2fr;
    align-items: center;
  }
  &__option {
    padding: 5px 0 0 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &__subtitle {
    margin: 7px 0;
    color: $black500;
    font-size: 16px;
  }
  &__left {
    @include main-white;
    display: flex;
    justify-content: center;
    background-color: #fff;
    border-radius: 6px;
    padding: 0 0 20px 20px;
    flex-direction: column;
  }
  &__right {
    @include main-white;
    justify-content: flex-start;
    border-radius: 6px;
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
}
.page {
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  &__title {
    margin: 20px 0 20px 0;
    font-weight: 500;
    font-size: 25px;
    color: $black800;
  }
  &__profile {
    @include main-white;
    justify-content: flex-start;
    border-radius: 6px;
    margin: 20px 0 20px 0;
    display: inherit;
  }
  &__checkbox {
    margin: 50px 0 20px 20px;
    display: flex;
    flex-direction: row;
  }
  &__part {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    &_left {
      display: grid;
    }
    &_right {
      display: grid;
    }
  }
  &__info {
    background-color: #0083C7;
    border-radius: 6px;
    color: $white;
    max-height: 207px;
    &-title {
      margin: 20px 0 0 20px;
      font-size: 25px;
      font-weight: 500;
    }
    &-subtitle {
      margin: 10px 0 0 20px;
      font-size: 16px;
      font-weight: 400;
    }
  }
  &__badge {
    background: rgba(0, 131, 199, 0.1);
    border-radius: 44px;
    height:34px;
    margin: 10px;
    padding: 5px;
    color: $blue;
    &-skills {
      padding: 15px;
    }
  }
  &__skills {
    height: 64px;
  }
}
</style>
