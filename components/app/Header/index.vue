<template>
  <div class="header">
    <div class="header__container">
      <div class="header__body">
        <n-link
          tag="div"
          class="header__logo"
          to="/about"
        >
          <img
            src="~assets/img/app/logo.svg"
            alt=""
          >
        </n-link>
        <div class="header__info">
          <div
            class="header__route"
            :class="{'header__route_avatar': avatar}"
          >
            <div
              v-if="avatar"
              class="header__avatar"
            >
              <img
                :src="avatar"
                alt=""
              >
            </div>
            <div class="header__route">
              <div class="header__title">
                {{ title }}
              </div>
              <div class="header__sub">
                {{ subTitle }}
              </div>
            </div>
          </div>
        </div>
        <div class="header__links">
          <n-link
            v-for="(item, i) in headerLinks"
            :key="`link-${i}`"
            class="header__link"
            exact-active-class="header__link_active"
            :to="item.path"
          >
            <div class="header__icon">
              <img
                :src="item.icon"
                alt=""
              >
            </div>
          </n-link>
        </div>
      </div>
    </div>
    <div class="header__bottom">
      <n-link
        v-for="(item, i) in headerLinks"
        :key="`link-${i}`"
        class="header__link"
        exact-active-class="header__link_active"
        :to="item.path"
      >
        <div class="header__icon">
          <img
            :src="item.icon"
            alt=""
          >
        </div>
      </n-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  computed: {
    headerLinks() {
      return [
        {
          icon: require('~/assets/img/ui/home.svg'),
          path: '/about',
        },
        {
          icon: require('~/assets/img/ui/notification.svg'),
          path: '/temp',
        },
        {
          icon: require('~/assets/img/ui/settings.svg'),
          path: '/profile',
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background: #FFFFFF;
  width: 100%;
  height: 124px;
  box-shadow: 0 0 4px rgba(0, 7, 5, 0.3);
  border-radius: 0 0 50px 50px;
  &__container {
    height: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }
  &__body {
    height: 100%;
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
  }
  &__logo {
    background-color: #20253b;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 200px;
    border-radius: 0 0 30px 30px;
    cursor: pointer;
  }
  &__title {
    font-family: 'GothamProMedium', sans-serif;
    color: #000000;
    font-size: 27px;
    font-weight: 500;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: left;
  }
  &__sub {
    color: #27a860;
    font-family: 'GothamProMedium', sans-serif;
    font-size: 15px;
    font-weight: 500;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: left;
  }
  &__info {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 20px;
  }
  &__route {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    &_avatar {
      display: grid;
      grid-template-columns: 50px 1fr;
    }
  }
  &__links {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  &__link {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    width: 80px;
    padding-bottom: 20px;
    border-radius: 0 0 30px 30px;
    &_active {
      background: #0c82c3;
      .header {
        &__icon {
          filter: invert(1);
        }
      }
    }
  }
  &__bottom {
    display: none;
  }
}
@include _575 {
  .header {
    height: 100px;
    &__body {
      grid-template-columns: 140px 1fr;
      padding-left: 20px;
    }
    &__router {
      &_avatar {
        grid-gap: 10px;
      }
    }
    &__links {
      display: none;
    }
    &__link {
      border-radius: 40px 40px 0 0;
      width: 100px;
    }
    &__logo {
      border-radius: 0 0 50px 50px;
    }
    &__container {
      background: #FFFFFF;
      width: 100%;
      box-shadow: 0 0 4px rgba(0, 7, 5, 0.3);
      border-radius: 0 0 50px 50px;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      height: 100px;
    }
    &__title {
      font-size: 22px;
    }
    &__bottom {
      padding-left: 20px;
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #FFFFFF;
      width: 100%;
      height: 100px;
      z-index: 1000;
      box-shadow: 0 0 7px rgba(0, 7, 5, 0.3);
      border-radius: 40px 40px 0 0;
    }
  }
}
</style>
