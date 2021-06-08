<template>
  <ctm-modal-box
    class="skills"
    :title="$t('skills.title')"
  >
    <div class="ctm-modal__content">
      <div class="skills__body">
        <div
          v-if="tags.length"
          class="skills__tags tags"
        >
          <div
            v-for="(item, i) in tags"
            :key="i"
            class="tags__item"
          >
            <base-btn
              class="tags__btn"
              mode="tag"
            >
              {{ item }}
              <span
                class="icon-close_small"
                @click="deleteTag(item)"
              />
            </base-btn>
          </div>
        </div>
        <div class="skills__items">
          <div class="skills__item">
            <div
              v-b-toggle.tags-1
              class="skills__drop"
            >
              <div class="skills__text skills__text_title">
                Type 1
              </div>
              <span class="icon-chevron_down" />
            </div>
            <b-collapse
              id="tags-1"
              role="tabpanel"
            >
              <div class="skills__selects">
                <div
                  v-for="item in typeItems"
                  :key="item.id"
                  class="skills__select"
                  @click="addTag(item.title)"
                >
                  <div class="skills__text skills__text_grey">
                    {{ item.title }}
                  </div>
                  <div
                    class="skills__checkbox"
                    :class="{'skills__checkbox_checked': isInclude(item.title)}"
                  />
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
        <div class="skills__actions">
          <base-btn
            mode="outline"
            @click="clearTags()"
          >
            {{ $t('meta.reset') }}
          </base-btn>
          <base-btn @click="hide()">
            {{ $t('meta.ok') }}
          </base-btn>
        </div>
      </div>
    </div>
  </ctm-modal-box>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ModalSkills',
  data() {
    return {
      typeItems: [
        {
          id: 0,
          title: 'Select 1',
        },
        {
          id: 1,
          title: 'Select 2',
        },
        {
          id: 2,
          title: 'Select 3',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      tags: 'ui/getTags',
    }),
  },
  methods: {
    deleteTag(tag) {
      this.$store.dispatch('ui/deleteTags', tag);
    },
    addTag(item) {
      // eslint-disable-next-line no-unused-expressions
      this.tags.includes(item) ? this.deleteTag(item) : this.$store.dispatch('ui/setTags', item);
    },
    isInclude(item) {
      return !!this.tags.includes(item);
    },
    clearTags() {
      this.$store.dispatch('ui/clearTags');
    },
    hide() {
      this.CloseModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.skills {
  &__body {
    display: grid;
    grid-gap: 25px;
  }
  &__actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
  &__tags {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  &__drop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    &.not-collapsed {
      span {
        transition: .3s;
        transform: rotate(-180deg);
      }
    }
    span::before {
      color: #2E3A59;
      font-size: 24px;
    }
  }
  &__selects {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px;
  }
  &__checkbox {
    height: 24px;
    width: 24px;
    background: #F7F8FA;
    border-radius: 3px;
    &_checked {
      background: $blue url('~assets/img/ui/checked.svg') no-repeat 50% 50%;
    }
  }
  &__text {
    @include text-simple;
    font-size: 16px;
    &_title {
      line-height: 130%;
    }
    &_grey {
      color: $black500;
      line-height: 130%;
    }
  }
  &__select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    cursor: pointer;
    padding-left: 20px;
  }
  &__items {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px;
  }
}
.ctm-modal {
  @include modalKit;
}
.tags {
  &__btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span::before {
      color: $blue;
      font-size: 24px;
      padding-left: 3px;
    }
  }
  &__item {
    min-width: 135px;
    max-width: 150px;
  }
}
</style>
