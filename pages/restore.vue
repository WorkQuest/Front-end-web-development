<template>
  <ValidationObserver
    v-slot="{ handleSubmit }"
    class="restore"
    tag="div"
  >
    <div class="restore__container">
      <div
        class="restore__text restore__text_title"
      >
        <span>{{ $t('restore.title') }}</span>
      </div>
      <form
        class="restore__fields"
        action=""
        @submit.prevent="handleSubmit(resetPassword)"
      >
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
        <div class="restore__action">
          <base-btn>
            {{ $t('meta.save') }}
          </base-btn>
        </div>
      </form>
    </div>
  </ValidationObserver>
</template>

<script>
import modals from '~/store/modals/modals';

export default {
  name: 'Restore',
  layout: 'auth',
  data() {
    return {
      model: {
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
    async resetPassword() {
      // const payload = {
      //   password: this.model.password,
      // };
      // const response = await this.$store.dispatch('user/signUp', payload);
      // if (response?.ok) {
      //   this.showConfirmEmailModal();
      // }
      this.showChangeModal();
    },
    showChangeModal() {
      this.ShowModal({
        key: modals.changePassword,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.restore {
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
