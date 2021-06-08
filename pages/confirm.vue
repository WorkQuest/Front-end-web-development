<template>
  <div class="role">
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
    <div class="role__title">
      {{ $t('role.choose') }}
    </div>
    <div class="role__cards">
      <div
        id="left_card"
        class="role__card role__card_left"
        @mouseenter="showLeftChoose = true"
        @mouseleave="showLeftChoose = false"
        @click="showPrivacy('employer')"
      >
        <div class="role__content">
          <div class="role__top">
            <div class="role__text role__text_title">
              {{ $t('role.employer') }}
            </div>
            <div class="role__text role__text_desc">
              {{ $t('role.employerWant') }}
            </div>
          </div>
          <div
            :class="[{'role__bottom_show': showLeftChoose === true}]"
            class="role__bottom role__bottom_left"
          >
            <div class="role__text role__text_desc">
              {{ $t('role.chooseThis') }}
            </div>
            <div class="role__arrow role__arrow_left">
              <span class="icon-short_right" />
            </div>
          </div>
        </div>
        <img
          class="role__image"
          src="~assets/img/app/role_employer.svg"
          alt=""
        >
      </div>
      <div
        id="right_card"
        class="role__card role__card_right"
        @mouseenter="showRightChoose = true"
        @mouseleave="showRightChoose = false"
        @click="showPrivacy('worker')"
      >
        <div class="role__content">
          <div class="role__top">
            <div class="role__text role__text_title role__text_light">
              {{ $t('role.worker') }}
            </div>
            <div class="role__text role__text_desc role__text_light">
              {{ $t('role.workerWant') }}
            </div>
          </div>
          <div
            class="role__bottom role__bottom_right"
            :class="[{'role__bottom_show': showRightChoose === true}]"
          >
            <div class="role__text role__text_desc role__text_light">
              {{ $t('role.chooseThis') }}
            </div>
            <div class="role__arrow role__arrow_right">
              <span class="icon-short_right" />
            </div>
          </div>
        </div>
        <img
          class="role__image"
          src="~assets/img/app/role_worker.svg"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
import modals from '~/store/modals/modals';

export default {
  name: 'Role',
  layout: 'role',
  data() {
    return {
      showLeftChoose: false,
      showRightChoose: false,
      confirmCode: '',
    };
  },
  // TODO: Починить анимацию для мобильного режима
  async mounted() {
    this.SetLoader(true);
    document.getElementById('left_card').addEventListener('mouseover', (_) => document.getElementById('right_card').classList.add('role__card_minimized'));
    document.getElementById('left_card').addEventListener('mouseleave', (_) => document.getElementById('right_card').classList.remove('role__card_minimized'));
    document.getElementById('right_card').addEventListener('mouseover', (_) => document.getElementById('left_card').classList.add('role__card_minimized'));
    document.getElementById('right_card').addEventListener('mouseleave', (_) => document.getElementById('left_card').classList.remove('role__card_minimized'));
    const { token } = this.$route.query;
    if (!token) {
      this.$router.push('/sign-in');
    } else {
      this.confirmCode = token;
    }
    this.SetLoader(false);
  },
  methods: {
    showPrivacy(role) {
      this.ShowModal({
        key: modals.privacy,
        role,
        confirmCode: this.confirmCode,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width:1199px) {
  .btn {
    &__back {
      display: none;
    }
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
    padding: 10px 0 0 33px;
    width: 100%;
    max-width: 60px;
  }
}
.icon-chevron_big_left:before {
  content: "\ea4d";
  color: $black500;
  font-size: 25px;
}
.role {
  width: 100%;
  &__title {
    padding-bottom: 30px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 34px;
    line-height: 130%;
    color: #FFFFFF;
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }
  &__image {
    transition: .2s;
    will-change: transform;
    position: absolute;
    top: 0;
    right: -90px;
    bottom: 0;
    height: 100%;
  }
  &__card {
    transition: .2s;
    will-change: transform;
    min-height: 400px;
    cursor: pointer;
    filter: drop-shadow(0px 47.1676px 61.4131px rgba(10, 27, 61, 0.078707))
    drop-shadow(0px 26.7219px 32.8344px rgba(10, 27, 61, 0.0629546))
    drop-shadow(0px 14.4955px 18.4067px rgba(10, 27, 61, 0.0598272))
    drop-shadow(0px 6.96225px 9.77565px rgba(10, 27, 61, 0.0584222))
    drop-shadow(0px 2.43911px 4.06787px rgba(10, 27, 61, 0.0492837));
    -webkit-filter: drop-shadow(0px 47.1676px 61.4131px rgba(10, 27, 61, 0.078707))
    drop-shadow(0px 26.7219px 32.8344px rgba(10, 27, 61, 0.0629546))
    drop-shadow(0px 14.4955px 18.4067px rgba(10, 27, 61, 0.0598272))
    drop-shadow(0px 6.96225px 9.77565px rgba(10, 27, 61, 0.0584222))
    drop-shadow(0px 2.43911px 4.06787px rgba(10, 27, 61, 0.0492837));
    border-radius: 6px;
    background-size: cover;
    overflow: hidden;
    position: relative;
    &_minimized {
      width: 75% !important;
    }
    &_right {
      width: 100%;
      background-image: url("~assets/img/app/role_dots.svg");
      background-color: $green;
      justify-self: flex-end;
      &:hover {
        width: 125% !important;
        .role {
          &__image {
            right: 0;
          }
        }
      }
    }
    &_left {
      width: 100%;
      background-image: url("~assets/img/app/role_dots_light.svg");
      background-color: $black100;
      justify-self: flex-start;
      &:hover {
        width: 125% !important;
        .role {
          &__image {
            right: 0;
          }
        }
      }
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 30px 10px 40px 30px;
  }
  &__bottom {
    display: flex;
    &_show {
      opacity: 1 !important;
    }
    &_left {
      display: flex;
      opacity: 0;
    }
    &_right {
      display: flex;
      opacity: 0;
    }
  }
  &__arrow {
    padding-left: 10px;
    &_left {
      span:before {
        color: $black800;
      }
    }
    &_right {
      span:before {
        color: #FFFFFF;
      }
    }
  }
  &__text {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    &_title {
      font-weight: 600;
      font-size: 45px;
      line-height: 130%;
      color: $black800;
      padding-bottom: 8px;
    }
    &_desc {
      font-weight: normal;
      font-size: 16px;
      line-height: 145%;
      color: $black800;
      max-width: 210px;
    }
    &_light {
      color: #FFFFFF;
    }
  }
}
@include _1199 {
  .role {
    &__title {
      color: $black800;
      margin: 0 20px;
    }
    &__cards {
      margin: 0 20px;
    }
  }
}
@include _767 {
  .role {
    &__text_title {
      font-size: 20px;
    }
    &__text_desc {
      font-size: 16px;
      max-width: 140px;
    }
    &__cards {
      grid-template-columns: 1fr;
      grid-gap: 20px;
    }
    &__image {
      right: -122px;
    }
    &__card {
      &_minimized {
        width: 100% !important;
      }
      &_right:hover {
        width: 100% !important;
        .role {
          &__image {
            right: -140px;
          }
        }
      }
      &_left:hover {
        width: 100% !important;
        .role {
          &__image {
            right: -84px;
          }
        }
      }
    }
  }
}
</style>
