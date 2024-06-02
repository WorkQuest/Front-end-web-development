<template>
  <div
    class="main main-white"
    data-selector="PAGE-CREATE-QUEST"
  >
    <validation-observer
      ref="validate"
      v-slot="{ handleSubmit }"
      class="main__body page"
    >
      <h2 class="page__title">
        {{ $t('meta.createAQuest') }}
      </h2>
      <div class="page__category">
        <div class="page runtime">
          <div class="runtime__container">
            <div class="runtime page__dd">
              <base-dd
                v-model="runtimeIndex"
                :items="runtime"
                type="gray"
                :label="$tc('quests.runtime')"
                :name="$t('quests.runtime')"
                data-selector="RUNTIME"
                rules="required"
              />
            </div>
          </div>
        </div>
        <div class="page__input">
          <base-field
            v-model="price"
            type="number"
            data-selector="PRICE-FIELD"
            :label="$tc('meta.price')"
            placeholder="0 USDT"
            rules="required|decimal|decimalPlaces:16|min_value:1"
            :name="$tc('meta.price').toLowerCase()"
            :currency-dd="true"
          />
        </div>
        <div class="page__dd">
          <base-dd
            v-model="employmentIndex"
            :label="$tc('quests.employment.employment')"
            type="gray"
            :items="employment"
            rules="required"
            :name="$t('quests.employment.employment')"
            data-selector="EMPLOYMENT"
          />
        </div>
        <div class="page__dd">
          <base-dd
            v-model="workplaceIndex"
            :label="$tc('quests.distantWork.distantWork')"
            type="gray"
            :items="distantWork"
            rules="required"
            :name="$t('quests.distantWork.distantWork')"
            data-selector="DISTANT"
          />
        </div>
        <div class="page__dd">
          <base-dd
            v-model="payPeriodsIndex"
            :label="$tc('quests.payPeriods.title')"
            type="gray"
            :items="payPeriods"
            rules="required"
            :name="$t('quests.payPeriods.title')"
            data-selector="DISTANT"
          />
        </div>
      </div>
      <validation-provider
        v-slot="{ errors }"
        rules="required|notEmptyArray"
        :name="$t('settings.specialization').toLowerCase()"
      >
        <specializations-selector
          v-model="selectedSpecAndSkills"
          :skills="selectedSpecAndSkills"
          :is-clear-data="isClearData"
          @changeSkills="updateSelectedSkills"
        />
        <p class="page__error">
          {{ errors[0] }}
        </p>
      </validation-provider>
      <div class="page__address">
        <base-field
          v-model="address"
          :label="$tc('quests.address')"
          :placeholder="$t('quests.address')"
          data-selector="ADDRESS-FIELD"
          mode="icon"
          :selector="true"
          :rules="{
            required: true,
            geo_is_address: { addresses: addressesBuffer },
          }"
          :name="$tc('quests.address').toLowerCase()"
          @selector="debouncedAddressSearch(address)"
        >
          <template v-slot:left>
            <span class="icon-map" />
          </template>
          <template v-slot:selector>
            <div
              v-if="addresses.length"
              data-selector="ADDRESS-SELECTOR"
              class="selector"
            >
              <div class="selector__items">
                <div
                  v-for="(item, i) in addresses"
                  :key="i"
                  class="selector__item"
                  :data-selector="`ACTION-BTN-SELECT-ADDRESS-${item.id}`"
                  @click="selectAddress(item)"
                >
                  {{ item.formatted }}
                </div>
              </div>
            </div>
          </template>
        </base-field>
      </div>
      <div class="page__input">
        <base-field
          v-model="questTitle"
          data-selector="QUEST-TITLE-FIELD"
          rules="required|min:2|max:250"
          :name="$tc('quests.questTitle').toLowerCase()"
          :placeholder="$t('quests.questTitle')"
        />
      </div>
      <div class="page__input">
        <base-textarea
          id="textarea"
          v-model="textarea"
          rules="required|min:6|max:2000"
          data-selector="QUEST-DESC-TEXTAREA"
          class="page__textarea"
          :placeholder="$t('quests.questDesc')"
          :name="$t('modals.description').toLowerCase()"
        />
      </div>
      <validation-provider
        v-slot="{ errors }"
        rules="conditionCheckbox"
        class="page__edit-check"
        tag="div"
        name=" "
      >
        <div class="edit-check">
          <input
            id="understand"
            v-model="isCheckedEditAfter"
            class="edit-check__box"
            data-selector="I_UNDERSTAND"
            type="checkbox"
          >
          <label
            class="edit-check__text"
            for="understand"
          >
            {{ $t('quests.impossibleEditAfterCreation') }}
          </label>
        </div>
        <div class="page__error">
          {{ errors[0] }}
        </div>
      </validation-provider>
      <div class="page upload__container">
        <div class="upload__title">
          {{ $t('quests.uploadMaterials') }}
        </div>
        <files-uploader
          :multiple="true"
          :limit="10"
          :limit-bytes="10485760"
          :limit-bytes-video="10485760"
          accept="image/png, image/jpg, image/jpeg, video/mp4, image/heic"
          :preloaded-files="files"
          :is-clear-data="isClearData"
          @change="updateFiles"
        />
      </div>
      <div class="upload btn btn__container btn__container_right">
        <div class="btn__create">
          <base-btn
            selector="CREATE-A-QUEST"
            @click="checkValid(handleSubmit(toCreateQuest))"
          >
            {{ $t('meta.createAQuest') }}
          </base-btn>
        </div>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BigNumber from 'bignumber.js';
import modals from '~/store/modals/modals';
import debounce from '~/utils/debounce';
import {
  PriorityFilter,
  TokenMap,
  TokenSymbols,
  TypeOfEmployments,
  PayPeriodsIndex,
  WorkplaceIndex,
} from '~/utils/enums';
import { LocalNotificationAction } from '~/utils/notifications';
import { CommissionForCreatingAQuest } from '~/utils/сonstants/commission';
import { ERC20 } from '~/abi';

const { GeoCode } = require('geo-coder');

export default {
  name: 'CreateQuest',
  middleware: 'employer-role',
  data() {
    return {
      period: 1,
      selectedSpecAndSkills: [],
      employmentIndex: 0,
      workplaceIndex: 0,
      payPeriodsIndex: 0,
      runtimeIndex: 0,
      questTitle: '',
      address: '',
      textarea: '',
      price: '',
      coordinates: {},
      addresses: [],
      addressesBuffer: [], // for vee validate
      files: [],
      geoCode: null,
      isClearData: false,
      isCheckedEditAfter: false,
      debouncedAddressSearch: null,
    };
  },
  computed: {
    ...mapGetters({
      isWalletConnected: 'wallet/getIsWalletConnected',
      balanceData: 'wallet/getBalanceData',
      userData: 'user/getUserData',
      userWalletAddress: 'user/getUserWalletAddress',

      filters: 'quests/getFilters',
    }),
    runtime() {
      return [
        this.$t('meta.priority.urgent'),
        this.$t('meta.priority.shortTerm'),
        this.$t('meta.priority.fixedDelivery'),
      ];
    },
    employment() {
      return TypeOfEmployments.map((item) => this.$t(`quests.employment.${item}`));
    },
    distantWork() {
      return [
        this.$t('quests.distantWork.distantWork'),
        this.$t('quests.distantWork.workInOffice'),
        this.$t('quests.distantWork.bothVariant'),
      ];
    },
    payPeriods() {
      return PayPeriodsIndex.map((item) => this.$t(`quests.payPeriods.${item}`));
    },
    depositAmount() {
      if (!this.price) return '0';
      return new BigNumber(this.price)
        .multipliedBy(1 + CommissionForCreatingAQuest)
        .toFixed(6)
        .toString();
    },
  },
  async beforeCreate() {
    await this.$store.dispatch('wallet/checkWalletConnected', {
      nuxt: this.$nuxt,
    });
  },
  async beforeMount() {
    const questDraft = this.$cookies.get('questDraft');
    await this.fillQuestFromQuestDraft(questDraft);
    if (questDraft) {
      this.ShowModal({
        key: modals.areYouSure,
        text: this.$t('modals.draft.youHaveAQuestDraft'),
        okBtnTitle: this.$t('meta.btns.delete'),
        okBtnFunc: this.clearData,
      });
    }
  },
  async mounted() {
    if (!this.isWalletConnected) return;
    this.SetLoader(true);
    this.geoCode = new GeoCode('google', {
      key: process.env.GMAPKEY,
      lang: this.$i18n?.localeProperties?.code || 'en-US',
    });
    this.debouncedAddressSearch = debounce(this.getAddressInfo, 300);
    this.SetLoader(false);

    // correctly address on loadpage
    this.addressesBuffer = [{ formatted: this.address }];
  },
  async beforeDestroy() {
    await this.setQuestDraft();
    this.debouncedAddressSearch = null;
  },
  methods: {
    async clearData() {
      this.$cookies.remove('questDraft');
      this.isClearData = true;
      this.selectedSpecAndSkills = [];
      this.questTitle = '';
      this.textarea = '';
      this.price = '';
      this.employmentIndex = 0;
      this.workplaceIndex = 0;
      this.payPeriodsIndex = 0;
      this.runtimeIndex = 0;
      this.address = '';
      this.coordinates = { lng: 0, lat: 0 };
    },
    async setQuestDraft() {
      this.SetLoader(true);
      const {
        workplaceIndex,
        payPeriodsIndex,
        runtimeIndex,
        employmentIndex,
        questTitle,
        textarea,
        price,
        selectedSpecAndSkills,
        address,
        coordinates: { lng, lat },
        clearData,
      } = this;
      if (!questTitle && !textarea && !price && !address) await clearData();
      else {
        this.$cookies.set('questDraft', {
          workplace: WorkplaceIndex[workplaceIndex],
          payPeriod: PayPeriodsIndex[payPeriodsIndex],
          priority: PriorityFilter[runtimeIndex + 1].value,
          typeOfEmployment: TypeOfEmployments[employmentIndex],
          title: questTitle,
          description: textarea,
          price,
          specializationKeys: selectedSpecAndSkills,
          locationFull: {
            location: {
              longitude: lng,
              latitude: lat,
            },
            locationPlaceName: address,
          },
        });
        await this.$store.dispatch('notifications/createLocalNotification', {
          action: LocalNotificationAction.QUEST_DRAFT,
          message: this.$t('localNotifications.messages.questDraft'),
          actionBtn: this.$t('localNotifications.btns.questDraft'),
        });
      }
      this.SetLoader(false);
    },
    async fillQuestFromQuestDraft(questDraft) {
      this.SetLoader(true);
      if (questDraft) {
        this.selectedSpecAndSkills = questDraft?.specializationKeys || [];
        this.questTitle = questDraft?.title || '';
        this.textarea = questDraft?.description || '';
        this.price = questDraft?.price || '';
        this.employmentIndex = TypeOfEmployments.indexOf(questDraft?.typeOfEmployment) || 0;
        this.workplaceIndex = WorkplaceIndex.indexOf(questDraft?.workplace) || 0;
        this.payPeriodsIndex = PayPeriodsIndex.indexOf(questDraft?.payPeriod) || 0;
        this.runtimeIndex = PriorityFilter[questDraft?.priority + 1]?.value || 0;
        this.address = questDraft?.locationFull.locationPlaceName ?? '';
        this.coordinates = {
          lng: questDraft?.locationFull.location.longitude,
          lat: questDraft?.locationFull.location.latitude,
        };
      }
    },
    updateFiles(files) {
      this.files = files;
    },
    updateSelectedSkills(specAndSkills) {
      this.selectedSpecAndSkills = specAndSkills;
    },
    periods(period) {
      if (period === 1) return this.days;
      if (period === 2) return this.weeks;
      if (period === 3) return this.months;
      return '';
    },
    selectAddress(address) {
      this.addresses = [];
      this.address = address.formatted;
    },
    async getAddressInfo(address) {
      try {
        if (address.length) {
          this.addresses = await this.geoCode.geolookup(address);
          this.addressesBuffer = this.addresses;
          this.coordinates = {
            lng: this.addresses[0].lng,
            lat: this.addresses[0].lat,
          };
        } else this.addresses = [];
      } catch (e) {
        this.addresses = [];
        this.addressesBuffer = [];
        console.error('Geo look up is failed', e);
      }
    },
    checkValid() {
      if (this.$refs.validate.flags.invalid) {
        this.ScrollToTop();
        this.SetLoader(false);
      }
    },
    async toCreateQuest() {
      this.SetLoader(true);
      const tokenAddress = TokenMap[TokenSymbols.USDT];
      const spenderAddress = this.ENV.WORKNET_WQ_FACTORY;
      const [allowance] = await Promise.all([
        this.$store.dispatch('wallet/getAllowance', {
          tokenAddress,
          spenderAddress,
        }),
        this.$store.dispatch('wallet/fetchWalletData', {
          address: this.userWalletAddress,
          token: tokenAddress,
          symbol: TokenSymbols.USDT,
        }),
        this.$store.dispatch('wallet/getBalance'),
      ]);
      // Not enough USDT
      if (
        new BigNumber(this.depositAmount).isGreaterThan(
          this.balanceData.USDT.fullBalance,
        )
      ) {
        this.ShowToast(
          `${this.$t('errors.transaction.notEnoughFunds')} (${
            TokenSymbols.USDT
          })`,
        );
        this.SetLoader(false);
        return;
      }
      if (new BigNumber(allowance).isLessThanOrEqualTo(this.depositAmount)) {
        const approveFee = await this.$store.dispatch(
          'wallet/getContractFeeData',
          {
            method: 'approve',
            abi: ERC20,
            contractAddress: tokenAddress,
            data: [
              tokenAddress,
              new BigNumber(this.depositAmount).shiftedBy(6).toString(),
            ],
          },
        );
        if (!approveFee.ok) {
          this.ShowToast(approveFee.msg);
          this.SetLoader(false);
          return;
        }
        this.SetLoader(false);
        this.ShowModal({
          key: modals.transactionReceipt,
          title: this.$t('meta.approve'),
          fields: {
            from: {
              name: this.$t('meta.fromBig'),
              value: this.userWalletAddress,
            },
            to: {
              name: this.$t('meta.toBig'),
              value: this.ENV.WORKNET_WQ_FACTORY,
            },
            amount: {
              name: this.$t('modals.amount'),
              value: this.depositAmount,
              symbol: TokenSymbols.USDT,
            },
            fee: {
              name: this.$t('wallet.table.trxFee'),
              value: approveFee.result.fee,
              symbol: TokenSymbols.WQT,
            },
          },
          submitMethod: async () => {
            this.ShowToast('In progress…', 'Confirmation');
            const approveOk = await this.$store.dispatch('wallet/approve', {
              tokenAddress,
              spenderAddress,
              amount: this.depositAmount,
            });
            if (!approveOk) {
              this.ShowToast('Approve error');
              this.SetLoader(false);
              return;
            }
            this.ShowToast('Success!', 'Confirmation');
            await this.createQuest();
          },
        });
      } else {
        await this.createQuest();
      }
    },
    async createQuest() {
      const description = this.textarea.replace(/\s\s/g, '').trim();

      // Check balance before send data to backend
      const [feeRes] = await Promise.all([
        this.$store.dispatch('quests/getCreateQuestFeeData', {
          cost: this.price,
          description,
          nonce: '123',
        }),
        this.$store.dispatch('wallet/fetchWalletData', {
          address: this.userWalletAddress,
          token: TokenMap[TokenSymbols.USDT],
          symbol: TokenSymbols.USDT,
        }),
        this.$store.dispatch('wallet/getBalance'),
      ]);

      // Check: not enough funds to create quest
      if (!feeRes.ok) {
        this.ShowToast(feeRes.msg);
        this.SetLoader(false);
        return;
      }

      this.SetLoader(false);
      this.ShowModal({
        key: modals.transactionReceipt,
        fields: {
          from: {
            name: this.$t('meta.fromBig'),
            value: this.userWalletAddress,
          },
          to: {
            name: this.$t('meta.toBig'),
            value: this.ENV.WORKNET_WQ_FACTORY,
          },
          amount: {
            name: this.$t('modals.amount'),
            value: this.depositAmount,
            symbol: TokenSymbols.USDT,
          },
          fee: {
            name: this.$t('wallet.table.trxFee'),
            value: feeRes.result.fee,
            symbol: TokenSymbols.WQT,
          },
        },
        submitMethod: async () => {
          this.SetLoader(true);
          const medias = await this.uploadFiles(this.files);
          const payload = {
            workplace: WorkplaceIndex[this.workplaceIndex],
            payPeriod: PayPeriodsIndex[this.payPeriodsIndex],
            priority: PriorityFilter[this.runtimeIndex + 1].value,
            typeOfEmployment: TypeOfEmployments[this.employmentIndex],
            title: this.questTitle.trim(),
            description,
            price: new BigNumber(this.price).shiftedBy(6).toString(),
            medias,
            specializationKeys: this.selectedSpecAndSkills,
            locationFull: {
              location: {
                longitude: this.coordinates.lng,
                latitude: this.coordinates.lat,
              },
              locationPlaceName: this.address,
            },
          };
          const questRes = await this.$store.dispatch(
            'quests/questCreate',
            payload,
          );
          if (questRes.ok) {
            const txRes = await this.$store.dispatch('quests/createQuest', {
              cost: this.price,
              description: this.textarea,
              nonce: questRes.result.nonce,
            });
            if (txRes?.ok === false) {
              this.ShowToast(txRes.msg);
              this.SetLoader(false);
              return;
            }
            await this.clearData();
            this.ShowModal({
              key: modals.status,
              img: require('assets/img/ui/questCreated.svg'),
              title: this.$t('modals.questCreated'),
            });
            this.ShowToast(
              this.$t('toasts.questCreated'),
              this.$t('toasts.questCreated'),
            );
            await this.$router.push(`/quests/${questRes.result.id}`);
          }
          this.SetLoader(false);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 20px 0 0 0;

  &__left {
    justify-content: flex-start;
    margin: 30px 0 0 0;
  }

  &__btn {
    width: 200px;
    margin: 0 10px 0 0;

    &_back {
      display: flex;
      justify-content: left;
      align-items: center;

      & .icon-chevron_big_left {
        font-weight: 800;
        color: $black600;
        font-size: 24px;
      }
    }

    &:last-child {
      margin: 0;
    }
  }
}

.edit-check {
  display: inline-flex;
  align-items: center;
  &__box {
    cursor: pointer;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
  &__text {
    margin: 0 0 0 10px;
  }
}

.cost__container {
  display: flex;
  align-self: center;
}

.card {
  border: none;

  &__level {
    @include text-simple;
    font-weight: 500;
    font-size: 12px;
    color: $white;
    background: #f7cf00;
    border-radius: 3px;
    width: 120px;
    padding: 2px 5px;
    text-align: center;

    &_reliable {
      background: $grey200;
    }

    &_checked {
      background: $brown;
    }
  }

  &__desc {
    @include text-simple;
    font-weight: 400;
    font-size: 16px;
    color: $black500;
    margin-top: 12px;
  }

  &__cost {
    @include text-simple;
    color: $black800;
    font-weight: 500;
    font-size: 20px;
    display: flex;
    justify-content: center;
  }
}

.level {
  &__title {
    @extend .period__title;
  }

  &__card {
    background: $white;
    border-radius: 6px;
    padding: 20px 0;
    display: grid;
    grid-template-columns: 1fr 15fr 1fr;
    margin: 20px 0 0 0;
    transition: 0.5s;

    &:hover {
      cursor: pointer;
      box-shadow: 0 0 10px 2px rgba(34, 60, 80, 0.09);
    }

    &_gold {
      border: 1px solid #f7cf00;
    }
  }

  &__option {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.radio {
  &__input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    border: 1px solid $blue;
    cursor: pointer;

    &:checked {
      background: radial-gradient($blue 50%, rgba(255, 0, 0, 0) 55%);
    }
  }
}

.period {
  &__choose {
    @extend .period__title;
    margin: 20px 0 0 0;
  }

  &__title {
    @include text-simple;
    font-weight: 400;
    font-size: 16px;
    color: $black800;

    &_active {
      color: $white;
    }
  }

  &__container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    max-width: 1180px;
    width: 100%;
    margin: 10px 0 20px 0;
  }

  &__period {
    color: $black800;
    background: $white;
    padding: 12px 88px;
    border-radius: 6px;
    transition: 0.5s;
    text-align: center;
    width: inherit;
    margin: 0 20px 0 0;

    &:last-child {
      margin: 0;
    }

    &:hover {
      cursor: pointer;
      box-shadow: 0 0 10px 2px rgba(34, 60, 80, 0.09);
    }

    &_active {
      background: $blue;
      color: $white;

      &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px 2px rgba(34, 60, 80, 0.09);
      }
    }

    &:last-child {
      margin: 0;
    }

    &__title {
      color: $black800;
      font-weight: 500;
      font-size: 16px;
    }
  }
}

.main {
  @include main;

  &-white {
    @include main;
    background: $white;
    background: #ffffff;
    margin: 0 0 20px 0;
    border-radius: 6px;
    justify-content: center;
  }

  &__body {
    max-width: 1180px;
    width: 100%;
    height: 100%;
  }
}

.runtime {
  &__container {
    display: grid;
    grid-gap: 10px;
    align-items: flex-start;
  }

  &__dd {
    display: flex;
    align-items: flex-start;
  }
}

.icon {
  &-close_small:before {
    content: '\e949';
    color: $red;
    font-size: 20px;
    cursor: pointer;
  }

  &-check_big:before {
    content: '\ea02';
    color: $white;
    font-size: 20px;
  }

  &-off_outline_close::before {
    content: '\ea2a';
    color: $red;
    font-size: 20px;
  }

  &-map::before {
    content: '\ea28';
    color: $blue;
    font-size: 20px;
  }
}

.selector {
  @include box;
  width: 100%;
  z-index: 140;

  &__items {
    background: #ffffff;
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
  }

  &__item {
    @include text-simple;
    padding: 15px 20px;
    background: #ffffff;
    font-weight: 500;
    font-size: 16px;
    color: $black800;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: $black0;
    }
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
  transition: 0.3s;
  background: #0083c7;
  border-radius: 6px;

  &:hover {
    background: #103d7c;
  }

  &__passive {
    border: 1px solid rgba(0, 131, 199, 0.1);
    background: #ffffff;
    color: $blue;

    &:hover {
      background: $black0;
      color: $blue;
    }
  }
}

.upload {
  &__container {
    margin: 20px 0 0 0;
    width: 100%;
  }

  &__title {
    @include text-simple;
    font-weight: 500;
    color: $black800;
    font-size: 18px;
    padding: 0 0 20px 0;
  }
}

.btn {
  padding: 0;

  &__delete {
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }

  &__create {
    width: 220px;
  }

  &__spec {
    width: 100%;
    padding: 6px 4px 6px 12px;
  }

  &__add {
    width: 100%;
    margin: 12px 0 0 0;
    padding: 6px 5px;
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
      margin: 20px 0 20px 0;
    }
  }
}

.half {
  width: 100%;
  max-width: 49%;
}

.skills {
  &__category {
    display: grid;
    margin: 20px 0 0 0;
    grid-template-columns: 7fr 1fr;
    grid-gap: 10px;
    align-items: center;
    @extend .half;
  }

  &__badges {
    margin: 16px 0 16px 0;
    display: flex;
  }

  &__badge {
    @include text-simple;
    display: flex;
    flex-direction: row;
    margin-right: 10px;
    background-color: rgba(0, 131, 199, 0.1);
    padding: 6px 10px;
    color: $blue;
    font-weight: 400;
    font-size: 14px;
    border: none;
    border-radius: 44px;
    align-items: center;
  }

  &__alert {
    @include text-simple;
    margin: 5px 0 0 0;
    font-weight: 400;
    font-size: 16px;
    color: $red;
    @extend .half;
  }
}

.spec {
  &__category {
    display: grid;
    grid-template-columns: 7fr 1fr;
    grid-gap: 10px;
    margin: 20px 0 0 0;
    align-items: center;
    @extend .half;
  }

  &__subcategory {
    margin: 20px 0 0 0;
    @extend .half;
  }
}

.page {
  &__error {
    color: $errorText;
    font-size: 12px;
    min-height: 23px;
  }
  &__title {
    @include text-simple;
    margin: 30px 0 0 0;
  }
  &__page {
    font-weight: 500;
    font-size: 25px;
    color: $black800;
  }

  &__dd {
    min-width: 160px;
  }

  &__category {
    align-items: flex-start;
    margin: 20px 0 0 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
  }

  &__address {
    margin: 20px 0 0 0;
    display: grid;
    grid-gap: 20px;
  }

  &__textarea {
    @include text-simple;
    border-radius: 6px;
    width: 100%;
    border: 0;
    resize: none;

    &::placeholder {
      color: $black300;
    }
  }
}

.main {
  @include main;

  &-white {
    @include main-white;
  }
}

@include _1199 {
  .main__body {
    padding: 10px;
  }
}

@include _991 {
  .page {
    &__category {
      grid-template-columns: repeat(2, 1fr);
      margin-bottom: 25px;
      grid-gap: 5px 20px;
    }
  }
}

@include _767 {
  .spec {
    &__category {
      max-width: 100%;
    }
  }
  .skills {
    &__category {
      max-width: 100%;
      grid-template-columns: 1fr;
    }
  }
  .page {
    &__skills {
      .block {
        &__skill-spec {
          width: 100%;
        }

        &__specialization {
          display: flex;
          flex-direction: row;
        }
      }
    }
  }
  .specialization {
    &__btn {
      &_remove {
        margin-top: 0;
        width: 100%;
      }
    }
  }
  .skills {
    &__btn-add {
      width: 100%;
      margin-top: 0;
    }

    &__block {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-bottom: 50px;
    }

    &__add-info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
  .btn {
    margin-top: 20px;
    width: 100%;

    &__create {
      width: 100%;
    }
  }
}

@include _575 {
  .page {
    &__skill {
      padding: 40px 0;
    }

    &__skills {
      padding: 50px 0 20px 0;

      .block {
        margin-top: 0;
        grid-gap: 0;
        margin-bottom: 15px;

        &__specialization {
          grid-gap: 0;
          flex-direction: column;
        }
      }
    }
  }
  .page__category {
    grid-template-columns: auto;
  }
}
</style>
