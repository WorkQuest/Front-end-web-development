<template>
  <ValidationObserver
    v-slot="{ handleSubmit }"
    class="auth"
    tag="div"
  >
    <div class="auth__container">
      <div
        class="auth__text auth__text_title"
      >
        <span>{{ $t('signUp.title') }}</span>
      </div>
      <div class="auth__text auth__text_simple">
        <span>{{ $t('signUp.haveAccount') }}</span>
        <n-link
          class="auth__text auth__text_link"
          to="/sign-in"
        >
          {{ $t('signUp.auth') }}
        </n-link>
      </div>
      <form
        class="auth__fields"
        action=""
        @submit.prevent="handleSubmit(signUp)"
      >
        <base-field
          v-model="model.firstName"
          :placeholder="$t('signUp.firstName')"
          :mode="'icon'"
          autocomplete="off"
          :name="$t('signUp.firstName')"
          rules="required_if|alpha_spaces"
        >
          <template v-slot:left>
            <img
              src="~assets/img/icons/user.svg"
              alt=""
            >
          </template>
        </base-field>
        <base-field
          v-model="model.lastName"
          :placeholder="$t('signUp.lastName')"
          :mode="'icon'"
          :name="$t('signUp.lastName')"
          rules="required_if|alpha_spaces"
        >
          <template v-slot:left>
            <img
              src="~assets/img/icons/user.svg"
              alt=""
            >
          </template>
        </base-field>
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
        <base-field
          v-model="model.passwordConfirm"
          :placeholder="$t('signUp.confirmPassword')"
          :mode="'icon'"
          type="password"
          :name="$t('signUp.confirmPassword')"
          rules="required_if|min:8|confirmed:confirmation"
        >
          <template v-slot:left>
            <img
              src="~assets/img/icons/password.svg"
              alt=""
            >
          </template>
        </base-field>
        <div class="auth__action">
          <base-btn>
            {{ $t('signUp.create') }}
          </base-btn>
        </div>
      </form>
    </div>
  </ValidationObserver>
</template>

<script>
import modals from '~/store/modals/modals';

export default {
  name: 'SignUp',
  layout: 'auth',
  data() {
    return {
      model: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
    };
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    async signUp() {
      try {
        const payload = {
          firstName: this.model.firstName,
          lastName: this.model.lastName,
          email: this.model.email,
          password: this.model.password,
        };
        const response = await this.$store.dispatch('user/signUp', payload);
        if (response?.ok) {
          this.showConfirmEmailModal();
        }
      } catch (e) {
        console.log(e);
      }
    },
    showConfirmEmailModal() {
      this.ShowModal({
        key: modals.emailConfirm,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
    }
  }
  &__fields {
    padding-top: 40px;
    display: grid;
    grid-template-columns: 1fr;
  }
  &__action {
    padding-top: 30px;
  }
}
</style>
