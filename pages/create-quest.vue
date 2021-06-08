<template>
  <div class="main-white">
    <div class="main__body">
      <h2 class="page__title">
        {{ $t('quests.createANewQuest') }}
      </h2>
      <div class="page__category">
        <div class="page__dd">
          <label for="proposal_input">{{ $t('priority.title') }}</label>
          <base-dd
            id="proposal_input"
            v-model="priorityIndex"
            type="gray"
            :items="priority"
          />
        </div>
        <div class="page__dd">
          <label for="category_input">{{ $t('quests.category') }}</label>
          <base-dd
            id="category_input"
            v-model="categoryIndex"
            type="gray"
            :items="categories"
          />
        </div>
      </div>
      <div class="page__address">
        <div>
          <label for="address__input">{{ $t('quests.address') }}</label>
          <base-field
            id="address__input"
            v-model="address"
            placeholder="Russia, Moscow, Lenina street, 3"
            mode="icon"
            :selector="true"
            @selector="getAddressInfo(address)"
          >
            <template v-slot:left>
              <span class="icon-map" />
            </template>
            <template v-slot:selector>
              <div
                v-if="addresses.length"
                class="selector"
              >
                <div class="selector__items">
                  <div
                    v-for="(item, i) in addresses"
                    :key="i"
                    class="selector__item"
                    @click="selectAddress(item)"
                  >
                    {{ item.formatted }}
                  </div>
                </div>
              </div>
            </template>
          </base-field>
        </div>
        <div>
          <label for="runtime__picker">{{ $t('quests.runtime') }}</label>
          <div
            id="runtime__picker"
            class="picker"
          >
            <div class="btn__container btn__left">
              <button
                class="picker__btn"
                @click="decrementNumber()"
              >
                <span class="icon-caret_left" />
              </button>
            </div>
            <div class="picker__body">
              <div class="picker__number">
                {{ pickerValue }}
              </div>
            </div>
            <div class="btn__container btn__right">
              <button
                class="picker__btn"
                @click="incrementNumber()"
              >
                <span class="icon-caret_right" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <base-field
          v-model="questTitle"
          placeholder="Quest title"
        />
      </div>
      <div>
        <textarea
          id="textarea"
          v-model="textarea"
          class="page__textarea"
          placeholder="Description..."
        />
      </div>
      <div class="upload__container">
        <div class="upload__title">
          {{ $t('quests.uploadQuestMaterials') }}
        </div>
        <div>
          <dropzone
            id="uploader"
            ref="el"
            :options="optionsModal"
            :include-styling="true"
          />
        </div>
      </div>
      <div class="price__container">
        <label for="price__input">{{ $t('quests.price') }}</label>
        <base-field
          id="price__input"
          v-model="price"
          placeholder="200 WUSD"
        />
      </div>
      <div class="ads__container">
        <div>{{ $t('quests.typeOfAd') }}</div>
        <div class="btn__container btn__container_left">
          <div class="btn__ads">
            <button
              class="base-btn"
              :class="{'base-btn__passive': adMode1 === true}"
              @click="setAd()"
            >
              {{ $t('quests.free') }}
            </button>
          </div>
          <div class="btn__ads">
            <button
              class="base-btn"
              :class="{'base-btn__passive': adMode2 === true}"
              @click="setAd()"
            >
              {{ $t('quests.paid') }}
            </button>
          </div>
        </div>
        <div
          v-if="adMode1 === true"
          class="ads__paid"
        >
          <div class="price__container">
            <label for="priceOfClick">{{ $t('quests.priceOfAClick') }}</label>
            <base-field
              id="priceOfClick"
              v-model="priceOfClick"
              placeholder="200 WUSD"
            />
          </div>
          <div class="price__container">
            <label for="city__input">{{ $t('quests.city') }}</label>
            <base-field
              id="city__input"
              v-model="city"
              placeholder="Moscow"
            />
          </div>
          <div class="price__container">
            <label for="period__input">{{ $t('quests.period') }}</label>
            <base-dd
              id="period__input"
              v-model="periodIndex"
              mode="top"
              type="gray"
              :items="periods"
            />
          </div>
          <div class="payment__container">
            <div class="payment__title">
              {{ $t('quests.EstimatedPayment') }}
            </div>
            <div class="payment__cost">
              {{ estimatedPayment }} WUSD
            </div>
          </div>
        </div>
      </div>
      <div class="btn__container btn__container_right">
        <div class="btn">
          <base-btn @click="showQuestCreatedModal()">
            {{ $t('quests.createAQuest') }}
          </base-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone';
import 'nuxt-dropzone/dropzone.css';
import '~/assets/scss/vue2Dropzone.min.css';
import '~/assets/scss/dropzone.scss';
import modals from '~/store/modals/modals';

const { GeoCode } = require('geo-coder');

export default {
  name: 'CreateQuest',
  components: {
    Dropzone,
  },
  data() {
    return {
      priorityIndex: 1,
      questIndex: 0,
      categoryIndex: 0,
      periodIndex: 0,
      pickerValue: 1,
      adMode1: true,
      adMode2: false,
      questTitle: '',
      address: '',
      textarea: '',
      price: '',
      priceOfClick: '',
      city: '',
      estimatedPayment: 120,
      categories: [
        'Retail',
      ],
      periods: [
        '1 Day',
        '1 Week',
        '1 Month',
        '1 Year',
      ],
      addresses: [],
      optionsModal: {
        url: 'http://httpbin.org/anything',
        addRemoveLinks: true,
        dictRemoveFile: '<span class="icon-close_big"></span>',
        dictCancelUpload: '<span class="icon-close_big"></span>',
        dictCancelUploadConfirmation: '',
        maxFiles: '3',
        dictDefaultMessage:
          '<div class="uploader__message_container">'
          + '<div class="uploader__message">Upload a images or videos</div><'
          + "span class='icon-add_to_queue'></span>"
          + '</div>',
      },
      file1: null,
      file2: null,
    };
  },
  computed: {
    priority() {
      return [
        this.$t('priority.all'),
        this.$t('priority.low'),
        this.$t('priority.normal'),
        this.$t('priority.urgent'),
      ];
    },
  },
  async mounted() {
    this.SetLoader(true);
    const instance = this.$refs.el.dropzone;
    this.SetLoader(false);
  },
  methods: {
    selectAddress(address) {
      this.addresses = [];
      this.address = address.formatted;
    },
    async getAddressInfo(address) {
      const geoCode = new GeoCode('google', { key: 'AIzaSyD32Aorm6CU9xUIrUznzYyw2d_0NTqt3Zw' });
      try {
        if (address.length) {
          const response = await geoCode.geolookup(address);
          this.addresses = JSON.parse(JSON.stringify(response));
        }
      } catch (e) {
        console.log(e);
      }
    },
    setAd() {
      this.adMode1 = !this.adMode1;
      this.adMode2 = !this.adMode2;
    },
    incrementNumber() {
      this.pickerValue += 1;
    },
    decrementNumber() {
      this.pickerValue -= 1;
    },
    showQuestCreatedModal() {
      this.ShowModal({
        key: modals.questCreated,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.selector {
  @include box;
  width: 100%;
  z-index: 140;
  &__items {
    background: #FFFFFF;
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
  }
  &__item {
    @include text-simple;
    padding: 15px 20px;
    background: #FFFFFF;
    font-weight: 500;
    font-size: 16px;
    color: $black800;
    cursor: pointer;
    transition: .3s;
    &:hover {
      background: #F3F7FA;
    }
  }
}

.page {
  &__title {
    @include text-simple;
    margin: 30px 0 0 0;
  }
}

.upload {
  &__title {
    @include text-simple;
    font-weight: 500;
    color: $black800;
    font-size: 18px;
    padding: 0 0 20px 0;
  }
}

.icon-map::before {
  content: "\ea28";
  color: $blue;
  font-size: 20px;
}

.payment {
  &__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  &__title {
    @include text-simple;
    color: $black500;
    font-weight:400;
    font-size: 16px;
  }
  &__cost {
    @include text-simple;
    color: $blue;
    font-weight: 500;
    font-size: 16px;
    padding: 0 0 0 5px;
  }
}

.ads {
  &__paid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
}

.base-btn {
  @include text-simple;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 43px;
  color: #ffffff;
  font-size: 16px;
  line-height: 130%;
  text-align: center;
  transition: .3s;
  background: #0083C7;
  border-radius: 6px;

  &:hover {
    background: #103D7C;
  }
  &__passive {
    border: 1px solid rgba(0, 131, 199, 0.1);
    background: #FFFFFF;
    color: $blue;
    &:hover {
      background: #F7F8FA;
      color: $blue;
    }
  }
}

.price {
  &__container {
    margin: 20px 0 0 0;
    width: 100%;
    max-width: 400px;
  }
}

.upload {
  &__container {
    margin: 20px 0 0 0;
    width: 100%;
  }
}

.btn {
  width: 220px;
  &__ads {
    padding: 0 20px 0 0;
    width: 100%;
    max-width: 220px;
  }
  &_left {
    justify-content: flex-start;
  }
  &_left:hover {
    box-shadow: 0px 3px 15px 0px rgba(34, 60, 80, 0.08);
  }
  &_right {
    justify-content: flex-end;
  }
  &_right:hover {
    box-shadow: 0px 3px 15px 0px rgba(34, 60, 80, 0.08);
  }
  &__container {
    width: 100%;
    align-items: center;
    display: flex;
    &_left {
      margin: 20px 0 0 0;
      justify-content: flex-start;
      width: 100%;
    }
    &_right {
      justify-content: flex-end;
      width: 100%;
      margin: 0 0 20px 0;
    }
  }
}

.picker {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  color: #353C47;
  background: #F3F7FA;
  border-radius: 6px;
  border: 1px solid transparent;
  height: 100%;
  max-height: 46px;

  &__btn {
    width: 100%;
    height: 100%;
  }
  &__body {
    @include text-simple;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__number {
    @include text-simple;
    font-weight: 400;
    font-size: 16px;
    color: $black800;
  }
}

.dd {
  &__{
    background: $black0;
  }
}

.page {
  &__page {
    font-weight: 500;
    font-size: 25px;
    color: $black800;
  }
  &__dd {
    min-width: 160px;
  }
  &__category {
    margin: 20px 0 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    grid-gap: 20px;
  }
  &__address {
    margin: 20px 0 0 0;
    display: grid;
    grid-template-columns: 7fr 1fr;
    grid-gap: 20px;
  }
  &__textarea {
    @include text-simple;
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
.main {
  @include main;
  &-white {
    border: 1px solid $black0;
    @include main-white;
  }
}
</style>
