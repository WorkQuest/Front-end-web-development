<template>
  <div class="saving-page">
    <div class="saving-page__container">
      <div class="saving-page__header">
        <div class="title">
          {{ $t('saving.workQuestSavings') }}<br>{{ $t('saving.lendAndEarn') }}
        </div>
        <div class="title_sub">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus
          magna fringilla urna, porttitor rhoncus dolor purus non enim
        </div>
      </div>
      <div class="saving-page__content">
        <template v-if="!depositIsOpened">
          <div class="info-block__square">
            <div
              v-for="(item, i) in cards"
              :key="i"
              class="info-block__quarter"
            >
              <div class="info-block__circle" />
              <div class="info-block__subtitle">
                {{ item.text }}
              </div>
            </div>
          </div>
          <div class="info-block">
            <div class="info-block__name_bold">
              {{ $t("saving.conditions") }}
            </div>
            <div class="info-block__triple">
              <div class="info-block__small_inline">
                <div class="text">
                  {{ $t("saving.maxMinSum") }}
                </div>
                <div class="text_blue">
                  ??
                </div>
              </div>
              <div class="info-block__small_inline">
                <div class="text">
                  {{ $t("saving.depositsAndWithdrawal") }}
                </div>
                <div class="text_blue">
                  Possible
                </div>
              </div>
              <div class="info-block__small_inline">
                <div class="text">
                  {{ $t("saving.term") }}
                </div>
                <div class="text_blue">
                  1 year
                </div>
              </div>
            </div>
            <div class="info-block__small_line">
              <div class="text">
                {{ $t("saving.annualizedInterestRate") }}
              </div>
              <div
                v-for="(item, i) in interestRate"
                :key="i"
                class="text-block"
              >
                <div class="text_blue">
                  {{ item.perc }}
                </div>
                <div class="text_small">
                  {{ item.date }}
                </div>
              </div>
            </div>
            <div class="btn-group__third">
              <base-btn
                class="btn_bl"
                @click="openOpenADepositModal()"
              >
                {{ $t("saving.openADeposit") }}
              </base-btn>
            </div>
          </div>
          <div
            v-if="FAQs.length"
            class="info-block"
          >
            <div class="info-block__name_bold">
              {{ $t("saving.faq") }}
            </div>
            <div class="info-block__faqs">
              <button
                v-for="(item, i) in FAQs"
                :key="i"
                class="info-block__faq"
                @click="handleClickFAQ(item)"
              >
                <div class="text__faq">
                  {{ item.name }}
                </div>
                <img
                  class="select-img"
                  :class="{'select-img_rotate' : item.isOpen}"
                  src="~/assets/img/ui/arrow-down.svg"
                  alt=""
                >
                <div
                  class="text__faq_gray"
                  :class="{'text__faq_opened' : item.isOpen}"
                >
                  {{ item.about }}
                </div>
              </button>
            </div>
          </div>
          <div
            v-if="documents.length"
            class="info-block"
          >
            <div class="info-block__name_bold">
              {{ $t("saving.information") }}
            </div>
            <div class="info-block__documents">
              <div
                v-for="(item, i) in documents"
                :key="i"
                class="document"
              >
                <img
                  class="document__img"
                  src="~/assets/img/ui/pdf.svg"
                  alt=""
                >
                <div class="document__title">
                  <div class="document__name">
                    {{ item.name }}
                  </div>
                  <div class="document__size">
                    {{ item.size }}
                  </div>
                </div>
                <button class="btn__doc">
                  {{ $t('pension.download') }}
                  <img
                    class="download"
                    src="~/assets/img/ui/download.svg"
                    alt=""
                  >
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-if="depositIsOpened">
          <div class="info-block__grid">
            <div>
              <div class="info-block__name">
                {{ $t('pension.depositAmount') }}
              </div>
              <div class="info-block__tokens">
                4 562 WUSD
              </div>
            </div>
            <div class="info-block__small_right">
              <div class="info-block__perc">
                +6.5%
              </div>
              <div class="info-block__period">
                {{ $t('pension.everyYear') }}
              </div>
            </div>
            <div>
              <div class="info-block__title_gray">
                {{ $t('pension.timeRemainsUntilTheEndOfThePeriod') }}
              </div>
              <div class="info-block__subtitle_black">
                2 years 52 days
              </div>
            </div>
            <div class="btn-group_exp">
              <base-btn class="btn_bl">
                {{ $t('pension.withdraw') }}
              </base-btn>
              <base-btn
                class="btn_bl"
              >
                {{ $t('pension.prolong') }}
              </base-btn>
            </div>
          </div>
          <div class="info-block">
            <div class="info-block__name">
              {{ $t("saving.historyOfDeposits") }}
            </div>
            <div class="saving-page__table">
              <b-table
                :items="items"
                :fields="testFields"
                borderless
                caption-top
                thead-class="table__header"
                tbody-tr-class="table__row"
              >
                <template #cell(userName)="el">
                  <div class="user__info">
                    <img
                      class="ava"
                      :src="el.item.avaUrl"
                      alt=""
                    >
                    <div class="user__name">
                      {{ el.item.userName }}
                    </div>
                  </div>
                </template>
                <template #cell(userID)="el">
                  <div class="user__value_gray">
                    {{ el.item.userID }}
                  </div>
                </template>
                <template #cell(txHash)="el">
                  <div class="user__value_gray">
                    {{ el.item.txHash }}
                  </div>
                </template>
                <template #cell(time)="el">
                  <div class="user__value_gray">
                    {{ el.item.time }}
                  </div>
                </template>
                <template #cell(status)="el">
                  <div class="user__value_green">
                    {{ el.item.status }}
                  </div>
                </template>
              </b-table>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';

export default {
  name: 'SavingProduct',
  data() {
    return {
      depositIsOpened: false,
      FAQs: [
        {
          name: 'What are Locked Savings? Committed to holding your crypto?',
          about: 'What are Locked Savings? Committed to holding your crypto?',
          isOpen: false,
        },
        {
          name: 'What happens to my funds on the day I subscribe to a Locked Savings product?',
          about: 'On the day of subscription, WorkQuest Savings will deduct the funds for subscription from your WUSD wallet.',
          isOpen: false,
        },
        {
          name: 'What happens to my funds on the value date of a Locked Savings product?',
          about: 'What happens to my funds on the value date of a Locked Savings product?',
          isOpen: false,
        },
        {
          name: 'What happens to my funds on the redemption date of a Locked Savings product?',
          about: 'What happens to my funds on the redemption date of a Locked Savings product?',
          isOpen: false,
        },
        {
          name: 'How is the average annual return (APR) calculated?',
          about: 'How is the average annual return (APR) calculated?',
          isOpen: false,
        },
      ],
      documents: [
        {
          name: 'Some_document.pdf',
          size: '1.2 MB',
          url: '',
        },
        {
          name: 'Some_document2.pdf',
          size: '2.2 MB',
          url: '',
        },
        {
          name: 'Some_document3.pdf',
          size: '34.2 MB',
          url: '',
        },
      ],
      items: [
        {
          userName: 'Edward Cooper',
          avaUrl: '~/assets/img/social/GOOGLE_+_.png',
          userID: '455dad66544ss',
          txHash: 'sf998s...ss877d',
          time: 'Feb 1, 2021',
          amount: this.$tc('referral.wqtCount', 12),
          status: 'Success',
        },
        {
          userName: 'Edward Cooper',
          avaUrl: '~/assets/img/social/GOOGLE_+_.png',
          userID: '455dad66544ss',
          txHash: 'sf998s...ss877d',
          time: 'Feb 1, 2021',
          amount: this.$tc('referral.wqtCount', 12),
          status: 'Success',
        },
      ],
      testFields: [
        {
          key: 'userName',
          label: this.$t('referral.table.name'),
          sortable: false,
          thClass: 'cell_head',
        },
        {
          key: 'userID',
          label: this.$t('referral.table.userID'),
          sortable: false,
          thClass: 'cell_head',
        },
        {
          key: 'txHash',
          label: this.$t('referral.table.txHash'),
          sortable: false,
          thClass: 'cell_head',
        },
        {
          key: 'time',
          label: this.$t('referral.table.time'),
          sortable: false,
          thClass: 'cell_head',
        },
        {
          key: 'amount',
          label: this.$t('referral.table.amount'),
          sortable: false,
          thClass: 'cell_head',
        },
        {
          key: 'status',
          label: this.$t('referral.table.status'),
          sortable: false,
          thClass: 'cell_head',
        },
      ],
      cards: [
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac neque cum posuere in. Semper arcu purus eget faucibus.',
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac neque cum posuere in. Semper arcu purus eget faucibus.',
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac neque cum posuere in. Semper arcu purus eget faucibus.',
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac neque cum posuere in. Semper arcu purus eget faucibus.',
        },
      ],
      interestRate: [
        {
          perc: '5.31%',
          date: '7 days',
        },
        {
          perc: '5.48%',
          date: '14 days',
        },
        {
          perc: '5.66%',
          date: '30 days',
        },
        {
          perc: '6%',
          date: '90 days',
        },
        {
          perc: '6,5%',
          date: '180 days',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    handleClickFAQ(FAQ) {
      FAQ.isOpen = !FAQ.isOpen;
    },
    openOpenADepositModal() {
      window.addEventListener('close-modal', () => {
        this.depositIsOpened = true;
      });
      this.ShowModal({
        key: modals.openADeposit,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.saving-page {
  background: linear-gradient(to bottom, #103D7C 374px, rgba(0, 0, 0, 0) 374px);
  display: flex;
  justify-content: center;

  &__container {
    display: grid;
    grid-template-rows: 233px max-content;
    max-width: 1280px;
    grid-row-gap: 40px;
    width: 100%;
  }

  &__header {
    align-self: flex-end;

    .title {
      font-weight: 500;
      color: #FFF;
      width: 530px;
      font-size: 45px;
      line-height: 110%;
      margin: 0 0 24px;

      &_sub {
        @extend .title;
        font-size: 16px;
        line-height: 100%;
        opacity: 0.5;
      }
    }
  }

  &__content {
    display: grid;
    grid-row-gap: 30px;
    width: 100%;

    .select-img {
      height: 7px;
      position: absolute;
      width: 12px;
      right: 30px;
      top: 30px;
      transition: 300ms;

      &_rotate {
        @extend .select-img;
        transform: rotate(180deg);
      }
    }

    .btn {
      box-sizing: border-box;
      font-weight: 400;
      font-size: 16px;
      color: #0083C7;
      border: 1px solid #0083C71A;
      border-radius: 6px;
      transition: .3s;

      &__time-machine {
        @extend .btn;
        position: absolute;
        top: 100px;
        right: 100px;
        width: 150px;
        color: #fff;
      }

      &__doc {
        @extend .btn;
        width: 220px;
        height: 46px;

        .download {
          display: unset;
          vertical-align: unset;
          margin-left: 5px;
        }
      }

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

    .btn-group {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      padding-bottom: 20px;

      &__third {
        display: grid;
        grid-template-columns: 2fr 1fr;
        align-items: revert;
        margin: 0 20px 20px 20px;
        grid-template-areas: ". sd";
        gap: 40px;

        .btn {
          grid-area: sd;
        }
      }

      &_exp {
        @extend .btn-group;
        width: calc(100% - 20px);
      }
    }

    .text {
      font-size: 16px;
      font-weight: 400;
      color: #8D96A1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &__faq {
        color: #4C5767;
        font-weight: 500;

        &_gray {
          font-size: 16px;
          font-weight: 400;
          color: #8D96A1;
          height: 0;
          transition: height 300ms;
          overflow: hidden;
        }

        &_opened {
          height: auto;
          font-size: 16px;
          font-weight: 400;
          color: #8D96A1;
          transition: height 300ms;
        }
      }

      &_blue {
        @extend .text;
        font-weight: 500;
        font-size: 18px;
        color: #0083C7;
      }

      &_small {
        @extend .text;
        font-size: 14px;
      }
    }

    .info-block {
      background-color: #fff;
      border-radius: 6px;

      &__tokens {
        font-weight: 700;
        font-size: 25px;
        color: #0083C7;
        padding: 0 20px;
      }

      &__grid {
        @extend .info-block;
        display: grid;
        grid-template-columns: 5fr 4fr;
        grid-template-rows: 2fr 1fr;
        position: relative;
      }

      &__perc {
        font-weight: 700;
        font-size: 20px;
        color: #0083C7;
        align-self: flex-end;
      }

      &__period {
        font-weight: 400;
        font-size: 16px;
        color: #0083C7;
        align-self: flex-start;
      }

      &__documents {
        padding: 0 20px 20px 20px;
        display: grid;
        gap: 20px;

        .document {
          border: 1px solid #E1E4ED;
          border-radius: 8px;
          height: 80px;
          padding: 0 20px;
          align-items: center;
          display: grid;
          grid-template-columns: 33px auto 220px;

          &__title {
            padding: 0 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;
          }

          &__name {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 400;
            font-size: 16px;
            padding-right: 10px;
          }

          &__size {
            font-weight: 400;
            font-size: 13px;
            color: #A7AEB9;
          }
        }
      }

      &__faqs {
        margin: 0 20px 20px 20px;
        display: grid;
        gap: 20px;
      }

      &__faq {
        border-radius: 5px;
        padding: 20px 60px 20px 20px;
        background-color: #F7F8FA;
        text-align: left;
        position: relative;
        transition: 300ms;
      }

      &__triple {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        padding: 0 20px;
      }

      &__small {
        background-color: #F7F8FA;
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        width: 115px;
        height: 66px;
        box-sizing: border-box;
        border-radius: 6px;
        margin: 20px 0 0 20px;
        padding-left: 10px;
        align-self: baseline;

        &_right {
          @extend .info-block__small;
          text-align: right;
          padding: 0 10px 0;
          justify-self: flex-end;
          margin: 20px 20px 0;
        }

        &_line {
          background-color: #F7F8FA;
          display: grid;
          border-radius: 6px;
          display: grid;
          box-sizing: border-box;
          padding: 20px;
          margin: 0 20px 20px 20px;
          height: 90px;
          grid-template-columns: 5fr repeat(5, 2fr);

          .text-block {
            padding-left: 20px;
            border-left: 1px solid #E9EDF2;
          }
        }

        &_inline {
          display: grid;
          grid-template-rows: repeat(2, 1fr);
          background-color: #F7F8FA;
          height: 104px;
          padding: 20px;
          gap: 10px;
          margin-bottom: 20px;
          border-radius: 6px;
        }

        &_right {
          @extend .info-block__small;
          text-align: right;
          padding: 0 10px 0;
          justify-self: flex-end;
          margin: 20px 20px 0;
        }
      }

      &__name {
        font-size: 16px;
        color: #1D2127;
        padding: 20px 20px 10px 20px;
        font-weight: 400;

        &_bold {
          font-weight: 500;
          font-size: 25px;
          color: #103D7C;
          line-height: 1;
          padding: 20px;
        }
      }

      &__square {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
      }

      &__quarter {
        @extend .info-block;
        text-align: center;
        display: grid;
        align-content: center;
        gap: 20px;
        padding: 20px;
      }

      &__circle {
        box-sizing: border-box;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        border: 1px solid #000;
        justify-self: center;
      }

      &__title {
        color: #0083C7;
        font-weight: 700;
        font-size: 25px;

        &_gray {
          color: #7C838D;
          font-weight: 400;
          font-size: 16px;
          margin-left: 20px;
        }
      }

      &__subtitle {
        font-weight: 400;
        font-size: 16px;
        color: #7C838D;

        &_black {
          @extend .info-block__title_gray;
          margin-bottom: 20px;
          color: #1D2127;
        }
      }
    }
  }

  .user {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    width: calc(100% - 40px);
    margin: 0 0 0 20px;
    line-height: 33px;

    &__info {
      display: grid;
      grid-template-columns: 33px 1fr;
      align-items: center;
      gap: 10px;
    }

    &__name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
    }

    &__value {
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;

      &_green {
        @extend .user__value;
        color: #00AA5B;
      }

      &_gray {
        @extend .user__value;
        color: #7C838D;
        font-weight: 400;
      }
    }

    &_last-reward {
      display: grid;
      background-color: #F7F8FA;
      border-radius: 5px;
      height: 50px;
      line-height: 50px;
      width: calc(100% - 40px);
      margin-left: 20px;
      padding: 0 10px;
      flex-wrap: wrap;
      gap: 10px;
      grid-template-columns: 5fr auto;
    }
  }

  &__table {
    .table {
      .cell {
        padding: 0;

        &_head {
          @extend .cell;
        }
      }

      &__header {
        height: 27px;
        align-items: center;
        background-color: rgba(0, 131, 199, 0.1);
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        padding: 0 20px;
        margin-bottom: 10px;
        grid-gap: 10px;
        font-size: 12px;
        color: #0083C7;
      }

      &__rows {
        display: grid;
        grid-auto-rows: 33px;
        grid-row-gap: 20px;
        padding-bottom: 20px;
      }
    }
  }
}
</style>
