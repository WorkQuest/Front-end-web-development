<template>
  <ctm-modal-box
    class="messageSend"
    :title="$t('pension.changePercent')"
  >
    <div class="ctm-modal__content">
      <div class="ctm-modal__desc_left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor
      </div>
      <div class="ctm-modal__content-field">
        <label
          for="currPerc_input"
          class="ctm-modal__label"
        >{{ $t('modals.currentPercent') }}</label>
        <input
          id="currPerc_input"
          class="input_grey"
          placeholder="3 500"
        >
      </div>
      <div class="ctm-modal__content-btns">
        <div class="btn-group">
          <base-btn
            class="btn"
            @click="hide()"
          >
            {{ $t('meta.cancel') }}
          </base-btn>
          <base-btn
            class="btn_bl"
            @click="showPensionIsRegisteredModal()"
          >
            {{ $t('meta.submit') }}
          </base-btn>
        </div>
      </div>
    </div>
  </ctm-modal-box>
</template>

<script>
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';

export default {
  name: 'ModalApplyForAPension',
  data() {
    return {};
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
    showPensionIsRegisteredModal() {
    },
  },
};
</script>

<style lang="scss" scoped>

.ctm-modal {
  @include modalKit;
  &__content-field {
    margin: 15px 0 0 0;
  }

  &__desc {
    &_left {
      text-align: left;
      font-size: 16px;
      font-weight: 400;
      line-height: 21px;
      color: #4C5767;
    }
  }

  &__content-btns {
    .btn-group {
      display: grid;
      grid-template-columns: repeat(2, calc(50% - 10px));
      grid-gap: 20px;
      gap: 20px;
      margin-top: 25px;

      .btn {
        box-sizing: border-box;
        font-weight: 400;
        font-size: 16px;
        color: #0083C7;
        border: 1px solid #0083C71A;
        border-radius: 6px;
        transition: .3s;
        background-color: #fff;

        &:hover {
          background-color: #0083C71A;
          border: 0px;
        }

        &_bl {
          @extend .btn;
          background-color: #0083C7;
          border: unset;
          color: #fff;

          &:hover {
            background-color: #103d7c;
          }
        }
      }
    }
  }

  &__label {
    margin-bottom: 5px;
  }
}

.input {
  &_grey {
    border-radius: 6px;
    padding: 11px 20px 11px 15px;
    height: 46px;
    width: 100%;
    border: 0;
    background-color: $black0;
    resize: none;
    &::placeholder {
      color: $black200;
    }
  }
}

.messageSend {
  max-width: 495px !important;
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
