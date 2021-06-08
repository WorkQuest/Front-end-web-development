<template>
  <ctm-modal-box
    class="restore"
    :title="$t('forgot.title')"
  >
    <div class="ctm-modal__content">
      <ValidationObserver
        v-slot="{ handleSubmit }"
        class="restore"
        tag="div"
      >
        <form
          class="restore__content"
          action=""
          @submit.prevent="handleSubmit(restore)"
        >
          <div class="ctm-modal__desc">
            {{ $t('forgot.desc') }}
          </div>
          <base-field
            v-model="model.email"
            :name="$t('placeholders.email')"
            :placeholder="$t('placeholders.email')"
            rules="required|email"
          />
          <base-btn
            class="restore__action"
          >
            {{ $t('meta.send') }}
          </base-btn>
        </form>
      </ValidationObserver>
    </div>
  </ctm-modal-box>
</template>

<script>
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';

export default {
  name: 'ModalRestore',
  data() {
    return {
      model: {
        email: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
  },
  methods: {
    hide() {
      this.CloseModal();
    },
    restore() {
      this.hide();
      this.ShowModal({
        key: modals.emailConfirm,
      });
      // this.$router.push('/restore');
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
.restore {
  max-width: 382px !important;
  &__content {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  &__action {
    margin-top: 5px;
  }
}
</style>
