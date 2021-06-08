<template>
  <ctm-modal-box
    class="messageSend"
    :title="$t('modals.invitation')"
  >
    <div class="ctm-modal__content">
      <validation-observer tag="div">
        <div class="grid__field grid__field_top">
          <div class="ctm-modal__content-field">
            <div class="avatar__container">
              <div>
                <img
                  alt=""
                  class="ctm-modal__img"
                  src="~/assets/img/temp/avatar.jpg"
                >
              </div>
              <div>
                {{ user.name }}
              </div>
              <div>
                <div
                  class="card__level"
                  :class="{'card__level_disabled': card.level.code === '0'}"
                >
                  <span
                    class="card__level_higher"
                    :class="cardsLevels()"
                  >{{ card.level.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid__field">
          <div class="ctm-modal__content-field">
            <label for="chooseQuest_input">{{ $t('modals.chooseQuest') }}</label>
            <base-dd
              v-model="questIndex"
              type="gray"
              :items="quests"
            />
          </div>
        </div>
        <div class="ctm-modal__content-field grid__field">
          <label for="message_input">{{ $t('modals.message') }}</label>
          <textarea
            id="message_input"
            v-model="message_input"
            class="message__textarea"
            placeholder="Hello..."
          />
        </div>
        <div class="btn__container">
          <div class="btn__wrapper">
            <base-btn
              class="message__action"
              @click="showTransactionSendModal()"
            >
              {{ $t('meta.send') }}
            </base-btn>
          </div>
          <div class="btn__wrapper">
            <base-btn
              class="message__action"
              :mode="'outline'"
              @click="hide()"
            >
              {{ $t('meta.cancel') }}
            </base-btn>
          </div>
        </div>
      </validation-observer>
    </div>
  </ctm-modal-box>
</template>

<script>
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';

export default {
  name: 'ModalInvitation',
  data() {
    return {
      questIndex: 0,
      quests: [
        'Quest one',
        'Quest two',
        'Quest three',
      ],
      message_input: '',
      chooseQuest_input: '',
      user: {
        name: 'Rosalia Vance',
      },
      card: {
        level: {
          title: 'HIGHER LEVEL',
          code: '1',
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
    cardLevelClass() {
      const { card } = this;
      return [
        { card__level_reliable: card.level.code === '2' },
        { card__level_checked: card.level.code === '3' },
      ];
    },
  },
  methods: {
    cardsLevels() {
      const { card, disabled } = this;
      return [
        { card__level_reliable: card.level.code === '2' },
        { card__level_checked: card.level.code === '3' },
        { card__level_disabled: card.level.code === '0' },
      ];
    },
    hide() {
      this.CloseModal();
    },
    showTransactionSendModal() {
      this.ShowModal({
        key: modals.inviteSend,
      });
    },
  },
};
</script>

<style lang="scss" scoped>

.card {
  &__level {
    margin: 0 0 0 15px;
    font-size: 12px;
    justify-content: center;
    align-items: center;
    display: flex;
    &_higher {
      display: block;
      margin: 0 0 0 7px;
      padding: 2px 4px 2px 4px;
      background-color: #F6CF00;
      border-radius: 3px;
      color: $white;
    }
    &_reliable {
      display: block;
      margin: 0 0 0 7px;
      padding: 2px 4px 2px 4px;
      background-color: #BBC0C7;
      border-radius: 3px;
      color: $white;
    }
    &_checked {
      display: block;
      margin: 0 0 0 7px;
      padding: 2px 4px 2px 4px;
      background-color: #B79768;
      border-radius: 3px;
      color: $white;
    }
    &_disabled {
      display: none;
    }
  }
}

.avatar {
  &__container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

.message {
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

.ctm-modal {
  @include modalKit;
  &__content-field {
    display: grid;
  }
  &__img {
    width: 61px;
    height: 61px;
    border-radius:73px;
    margin: 0 10px 0 0;
  }
}

.input {
  &_white {
    border-radius: 6px;
    border: 1px solid $black0;
    padding: 11px 20px 11px 15px;
    height: 46px;
    width: 100%;
    background-color: $white;
    resize: none;
    &::placeholder {
      color: $black800;
    }
  }
}
.grid {
  &__field {
    display: grid;
    margin-top: 25px;
    &_top {
      margin: 0;
    }
  }
}
.btn {
  &__container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 25px;
  }
  &__wrapper {
    width: 45%;
  }
}

.messageSend {
  max-width: 680px !important;
  &__content {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    grid-gap: 20px;
  }
  &__action {
    margin-top: 10px;
  }
}
</style>
