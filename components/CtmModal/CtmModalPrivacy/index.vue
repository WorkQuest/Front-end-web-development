<template>
  <ctm-modal-box
    class="privacy"
    :title="$t('privacy.title')"
  >
    <div class="ctm-modal__content">
      <div class="ctm-modal__desc">
        {{ $t('privacy.desc') }}
      </div>
      <div class="privacy__forms">
        <base-checkbox
          v-model="privacy"
          name="privacy"
          :label="$t('privacy.agree')"
        >
          <template v-slot:sub>
            <span class="privacy__link">{{ $t('privacy.privacyLink') }}</span>
          </template>
        </base-checkbox>
        <base-checkbox
          v-model="terms"
          name="terms"
          :label="$t('privacy.agree')"
        >
          <template v-slot:sub>
            <span class="privacy__link">{{ $t('privacy.termsLink') }}</span>
          </template>
        </base-checkbox>
        <base-checkbox
          v-model="aml"
          name="aml"
          :label="$t('privacy.agree')"
        >
          <template v-slot:sub>
            <span class="privacy__link">{{ $t('privacy.amlLink') }}</span>
          </template>
        </base-checkbox>
        <base-btn
          class="privacy__action"
          :disabled="!isAllChecked"
          @click="hide()"
        >
          {{ $t('meta.ok') }}
        </base-btn>
      </div>
    </div>
  </ctm-modal-box>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PrivacyModal',
  data() {
    return {
      privacy: false,
      terms: false,
      aml: false,
    };
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
    isAllChecked() {
      return this.privacy && this.terms && this.aml;
    },
  },
  methods: {
    async hide() {
      try {
        const payload = {
          confirmCode: this.options.confirmCode,
          role: this.options.role,
        };
        const response = await this.$store.dispatch('user/confirm', payload);
        if (response?.ok) {
          await this.$store.dispatch('main/showToast', {
            title: 'Success',
            text: 'Your account has been successfully verified',
          });
          if (this.$cookies.get('role') === 'employer') {
            this.$router.push('/workers');
          } else if (this.$cookies.get('role') === 'worker') {
            this.$router.push('/quests');
          }
        }
        this.CloseModal();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ctm-modal {
  @include modalKit;
  &__desc {
    text-align: left;
  }
}
.privacy {
  max-width: 382px !important;
  &__forms {
    padding-top: 25px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px;
  }
  &__link {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    text-decoration-line: underline;
    color: $blue;
  }
  &__action {
    margin-top: 20px;
  }
}
</style>
