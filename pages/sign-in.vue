<template>
  <ValidationObserver
    v-slot="{ handleSubmit }"
    class="auth"
    tag="div"
  >
    <div class="auth__container">
      <div class="auth__text auth__text_title">
        <span>{{ $t('signIn.title') }}</span>
      </div>
      <div class="auth__text auth__text_simple">
        <span>{{ $t('signIn.account') }}</span>
        <n-link
          class="auth__text auth__text_link"
          to="/sign-up"
        >
          {{ $t('signIn.regs') }}
        </n-link>
      </div>
      <form
        class="auth__fields"
        action=""
        @submit.prevent="handleSubmit(signIn)"
      >
        <base-field
          v-model="model.email"
          rules="required|email"
          :name="$t('signUp.email')"
          :placeholder="$t('signUp.email')"
          :mode="'icon'"
          autocomplete="username"
        >
          <template v-slot:left>
            <img
              src="~assets/img/icons/email.svg"
              alt=""
            >
          </template>
        </base-field>
        <base-field
          v-model="model.password"
          :placeholder="$t('signUp.password')"
          :mode="'icon'"
          :name="$t('signUp.password')"
          autocomplete="current-password"
          rules="required_if|min:8"
          type="password"
          vid="confirmation"
        >
          <template v-slot:left>
            <img
              src="~assets/img/icons/password.svg"
              alt=""
            >
          </template>
        </base-field>
        <div class="auth__tools">
          <base-checkbox
            v-model="remember"
            name="remember"
            :label="$t('signIn.remember')"
          />
          <div
            class="auth__text auth__text_link"
            @click="showRestoreModal()"
          >
            {{ $t('signIn.forgot') }}
          </div>
        </div>
        <div class="auth__action">
          <base-btn>
            {{ $t('signIn.login') }}
          </base-btn>
        </div>
        <div class="auth__text auth__text_wrap">
          {{ $t('signIn.or') }}
        </div>
      </form>
      <div class="auth__social">
        <div class="auth__text auth__text_dark">
          {{ $t('signIn.loginWith') }}
        </div>
        <div class="auth__icons">
          <button class="auth__btn auth__btn_google">
            <span class="icon-google" />
          </button>
          <button class="auth__btn auth__btn_instagram">
            <span class="icon-instagram" />
          </button>
          <button class="auth__btn auth__btn_twitter">
            <span class="icon-twitter" />
          </button>
          <button class="auth__btn auth__btn_facebook">
            <span class="icon-facebook" />
          </button>
          <button class="auth__btn auth__btn_LinkedIn">
            <span class="icon-LinkedIn" />
          </button>
        </div>
      </div>
      <div class="mobile__links">
        <div class="auth__mobile">
          <div class="auth__link">
            <span>{{ $t('signIn.dontHaveAnAccount') }}</span>
            <nuxt-link to="/sign-up">
              {{ $t('signIn.signUp') }}
            </nuxt-link>
          </div>
        </div>
        <div class="auth__link">
          <nuxt-link to="/restore">
            {{ $t('signIn.forgotYourPass') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';

export default {
  name: 'SignIn',
  layout: 'auth',
  data: () => ({
    model: {
      email: '',
      password: '',
    },
    remember: false,
  }),
  computed: {
    ...mapGetters({
      userData: 'user/getUserData',
    }),
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    async signIn() {
      try {
        const { email, password } = this.model;
        const response = await this.$store.dispatch('user/signIn', {
          email,
          password,
        });
        if (response?.ok) {
          if (this.userData.role === 'employer') {
            this.$router.push('/workers');
          } else if (this.userData.role === 'worker') {
            this.$router.push('/quests');
          }
        }
        // if (response?.ok) {
        //   const response =
        //   if (response?.ok) {
        //     this.$cookies.set('role', profile.role, { path: '/' });
        //     this.$router.push('/quests');
        //   }
        // }
      } catch (e) {
        console.log(e);
      }
    },
    showRestoreModal() {
      this.ShowModal({
        key: modals.restore,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width:575px) {
  .auth {
    &__mobile {
      display: none;
    }
    &__link {
      display: none;
    }
  }
}
.auth {
  &__container {
    display: grid;
    grid-template-rows: auto;
  }
  &__text {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    line-height: 130%;
    &_title {
      font-weight: 600;
      font-size: 34px;
      color: $black800;
    }
    &_simple {
      color: #000000;
      font-weight: 300;
      font-size: 16px;
      padding-top: 15px;
    }
    &_link {
      padding-left: 5px;
      font-weight: 300;
      font-size: 16px;
      color: #0083C7;
      text-decoration: underline;
      cursor: pointer;
    }
    &_wrap {
      font-weight: normal;
      color: $black400;
      font-size: 16px;
      line-height: 130%;
      padding: 15px 0;
    }
    &_dark {
      color: $black700;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 130%;
    }
  }
  &__social {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__fields {
    padding-top: 40px;
    display: grid;
    grid-template-columns: 1fr;
  }
  &__action {
    padding-top: 40px;
  }
  &__icons {
    display: grid;
    grid-template-columns: repeat(5, 40px);
    grid-gap: 30px;
  }
  &__tools {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__btn {
    transition: .5s;
    width: 40px;
    height: 40px;
    background: #F7F8FA;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: #0083C7;
    }
    &:hover {
      span:before {
        background: white;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    &_instagram {
      span:before {
        font-size: 18px;
        background: linear-gradient(180deg, #C540F3 0%, #FF8C05 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    &_twitter {
      span:before {
        font-size: 18px;
        color: #24CAFF;
      }
    }
    &_google {
      span:before {
        font-size: 18px;
        color: #094EFF;
      }
    }
    &_facebook {
      span:before {
        font-size: 18px;
        color: #3B67D7;
      }
    }
    &_LinkedIn {
      span:before {
        font-size: 18px;
        color: #0A7EEA;
      }
    }
  }
}

@include _1199 {
  .auth {
    &__icons {
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 42px;
    }
    &__fields {
      padding-top: 0;
    }
    &__text {
      &_title {
        display: none;
      }
      &_simple {
        display: none;
      }
      &_wrap {
        text-align: center;
      }
      &_dark {
        display: none;
      }
    }
  }
}

@include _767 {
  .mobile {
    &__links {
      margin: 0 0 10px 0;
    }
  }
  .auth {
    &__text {}
  }
  .template {
    &__right {
      display: none;
    }
  }
}

@include _575 {
  .auth {
    &__tools {
      display: none;
    }
    &__action {
      padding-top: 10px;
    }
    &__mobile {
      display: grid;
      margin: 20px 0 10px 0;
    }
  }
}

@include _380 {
  .auth {
    &__icons {
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 28px;
    }
    &__mobile {
      margin: 20px 0 10px 0;
    }
    &__links {
      margin: 0 0 20px 0;
    }
    &__links {
      padding: 0 0 20px 0;
    }
  }
  .template {
    &__left {
      max-width: 367px;
    }
  }
}

</style>
