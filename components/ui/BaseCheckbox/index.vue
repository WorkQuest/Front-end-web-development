<template>
  <div
    :class="checkboxClass"
  >
    <label
      :for="name"
      class="checkbox solid-blue"
    >
      <input
        :id="name"
        v-model="model"
        type="checkbox"
        class="checkbox-input"
      >
      <span class="checkmark" />
    </label>
    <div
      class="checkbox__label"
      @click="model = !model"
    >
      {{ label }}
      <slot
        name="sub"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    label: {
      type: String,
      default: 'Label',
    },
    value: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: 'checkbox',
    },
  },
  computed: {
    checkboxClass() {
      // checkbox types: default, toggle
      const { type } = this;

      if (type === 'default') {
        return 'checkbox-field';
      }

      return type;
    },
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  flex-shrink: 0;
  &__label {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    color: $black600;
    cursor: pointer;
  }
}
.checkbox-field {
  position: relative;
  display: flex;
  align-items: center;
  .checkbox {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }
  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    transition: .3s;
    position: absolute;
    width: 24px;
    height: 24px;
    background: #F7F8FA;
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid transparent;
    &:hover {
      border: 1px solid $black100;
    }
  }
  .checkmark::after {
    content: "";
    transition: all 300ms;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background: $blue url('~assets/img/ui/checked.svg') no-repeat 50% 50%;
    opacity: 0;
  }
  input:checked ~ .checkmark::after {
    opacity: 1;
  }
  .checkbox_label {
    font-size: inherit;
  }
}
.toggle {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
  label {
    position: relative;
    display: inline-block;
    width: 34px;
    height: 14px;
    margin: 0 0 0 15px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
      &:checked + span {
        background-color: $blue;
        &::before {
          background-color: white;
        }
      }
      &:focus + span {
        box-shadow: 0 0 1px $blue;
      }
      &:checked + span:before {
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
      }
    }
    span {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 7px;
      &::before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: -4px;
        bottom: -4px;
        border-radius: 10px;
        background-color: $blue;
        box-shadow: 0 0 8px 4px rgba(20, 16, 41, 0.12);
        -webkit-transition: .4s;
        transition: .4s;
      }
    }
  }
}

@media (max-width: 768px) {
  .toggle{
    .checkbox_label {
      font-size: 14px;
    }
  }
}

@media (max-width: 576px) {
  .toggle{
    .checkbox_label {
      font-size: 12px;
    }
  }
}
</style>
