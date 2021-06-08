<template>
  <ctm-modal-box
    class="message"
    :title="'Review on employer'"
  >
    <div class="body">
      <div class="btn-rating">
        <button>
          <b-form-rating
            v-model="localRating"
          />
        </button>
      </div>
      <!-- Передать заголовок из локацизации -->
      <div class="ctm-modal__content">
        <div class="message">
          <div class="message__content">
            <div class="modal__desc">
              <div class="message__wrapper">
                <p class="modal__labelMessage">
                  {{ $t('modals.couple') }}
                </p>
                <div>
                  <textarea
                    class="message__textarea"
                    placeholder="Hello..."
                  />
                </div>
              </div>
              <div class="btn__container">
                <div class="btn__wrapper">
                  <base-btn
                    class="message__action"
                    @click="showThanksModal() "
                  >
                    {{ $t('meta.send') }}
                  </base-btn>
                </div>
                <div class="btn__wrapper">
                  <base-btn
                    class="message__action"
                    @click="hide()"
                  >
                    {{ $t('meta.cancel') }}
                  </base-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ctm-modal-box>
</template>

<script>
/* eslint-disable object-shorthand,no-var */
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';
import 'nuxt-dropzone/dropzone.css';

export default {
  name: 'ModalSendARequest',
  components: {},
  data() {
    return {
      rating: '',
      localRating: 0,
    };
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
  },
  mounted() {
    this.localRating = JSON.parse(JSON.stringify(this.options.rating));
  },
  methods: {
    hide() {
      this.CloseModal();
    },
    showThanksModal() {
      this.ShowModal({
        key: modals.thanks,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ctm-modal {
  @include modalKit;

  &__content {
    padding: 0 !important;
  }

  &__box {
    max-width: 679px !important;
  }

  &__message {
    max-width: 679px;
  }

  input {
    width: 623px;
    height: 214px;
  }
}

.body {
  padding: 0 28px 28px 25px;
}

.modal {
  &__title {
    @include text-simple;
    justify-self: left;
    font-weight: 500;
    font-size: 23px;
  }

  &__desc {
    @include text-simple;
    width: 100%;
  }

  &__labelMessage {
    @include text-simple;
    font-size: 16px;
    color: $black800;
    padding: 0 0 5px 0;
  }
}

.file {
  &__wrapper {
    margin: 0 0 25px 0;
  }
}

.message {
  &__wrapper {
    margin: 0 0 25px 0;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    grid-gap: 20px;
  }

  &__action {
    margin-top: 10px;
  }

  &__textarea {
    border-radius: 6px;
    padding: 11px 20px 11px 15px;
    height: 214px;
    width: 100%;
    border: 0;
    background-color: $black0;
    resize: none;

    &::placeholder {
      color: $black200;
    }
  }
}

.btn {
  &__container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 15px 0 0 0;
  }

  &__wrapper {
    width: 45%;
  }
}

.ctm-modal {
  &__box {
    max-width: 679px !important;
  }

  &__title {
    margin: 0 0 0 9% !important;
  }
}

.btn-rating {
  padding: 25px 0;
}

.uploader__message_container {
  margin: 0 0 0 10% !important;
}

.form-control {
  padding: 0;
  height: 0 !important;
}
</style>
