<template>
  <div class="pension-page">
    <div
      class="pension-page__container"
      :class="[{'pension-page__container_registered' : pensionIsReg && !isDeadline}, {'pension-page__container_expired' : isDeadline}]"
    >
      <div class="pension-page__header">
        <div class="title">
          {{ $t('pension.pensionProgram') }}
        </div>
        <div class="title_sub">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus
          magna fringilla urna, porttitor rhoncus dolor purus non enim
        </div>
      </div>
      <div
        class="pension-page__content"
        :class="[{'pension-page__content_registered' : pensionIsReg && !isDeadline }, {'pension-page__content_expired' : isDeadline}]"
      >
        <template v-if="!pensionIsReg && !isDeadline">
          <div class="info-block__square">
            <div class="info-block__quarter">
              <div class="info-block__title">
                6.5%
              </div>
              <div class="info-block__subtitle">
                {{ $t('pension.annualPercent') }}
              </div>
            </div>
            <div class="info-block__quarter">
              <div class="info-block__title">
                {{ $t('pension.optional') }}
              </div>
              <div class="info-block__subtitle">
                {{ $t('pension.optionalFirstDeposit') }}
              </div>
            </div>
            <div class="info-block__quarter">
              <div class="info-block__title">
                3 years
              </div>
              <div class="info-block__subtitle">
                {{ $t('pension.term') }}
              </div>
            </div>
            <div class="info-block__quarter">
              <div class="info-block__title">
                {{ $t('pension.castomizable') }}
              </div>
              <div class="info-block__subtitle">
                {{ $t('pension.depositsFromQuest') }}
              </div>
            </div>
          </div>
          <div class="info-block">
            <div class="info-block__name_bold">
              {{ $t('pension.howToTakePart') }}
            </div>
            <div class="info-block__about">
              <div class="info-block__subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
                nunc ac arcu viverra. Aliquet egestas suspendisse id pellentesque lacus. Ut accumsan posuere viverra
                hendrerit. Lacus volutpat id aliquam accumsan cras. Magna consectetur id sollicitudin sed eget nisl nunc.
                Quis sagittis sodales volutpat sed.
              </div>
              <img
                class="calendar-img"
                src="~/assets/img/ui/calendar.svg"
                alt=""
              >
              <div class="btn-group">
                <base-btn
                  class="btn_bl"
                  @click="openApplyForAPensionModal()"
                >
                  {{ $t('pension.applyForAPension') }}
                </base-btn>
              </div>
            </div>
          </div>
          <div class="info-block">
            <div class="info-block__name_bold">
              {{ $t('pension.information') }}
            </div>
            <div class="document">
              <img
                class="document__img"
                src="~/assets/img/ui/pdf.svg"
                alt=""
              >
              <div class="document__title">
                <div class="document__name">
                  Some_documentSome_documentSome_documentSome_documentSome_documentSome_documentSome_documentSome_documentSome_documentSome_document.pdf
                </div>
                <div class="document__size">
                  1.2 MB
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
            <div class="document">
              <img
                class="document__img"
                src="~/assets/img/ui/pdf.svg"
                alt=""
              >
              <div class="document__title">
                <div class="document__name">
                  Some_documentSome_documentSome_documentSome_documentSome_documentSome_documentSome_documentSome_documentSome_documentSome_document.pdf
                </div>
                <div class="document__size">
                  1.2 MB
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
        </template>
        <template v-if="pensionIsReg && !isDeadline">
          <base-btn
            class="btn__time-machine"
            @click="jumpInTime()"
          >
            +3 years
          </base-btn>
          <div class="info-block__triple">
            <div class="info-block__third">
              <div class="info-block__name">
                {{ $t('pension.pensionBalance') }}
              </div>
              <div class="info-block__tokens">
                4 562 WUSD
              </div>
              <base-btn
                class="btn_bl"
                @click="openMakeDepositModal()"
              >
                {{ $t('pension.makeADeposit') }}
              </base-btn>
            </div>
            <div class="info-block__third">
              <div class="info-block__name">
                {{ $t('pension.currentPercentFromAQuest') }}
              </div>
              <div class="info-block__tokens">
                15%
              </div>
              <base-btn
                class="btn_bl"
                @click="openChangePercentModal()"
              >
                {{ $t('pension.changePercent') }}
              </base-btn>
            </div>
            <div class="info-block__third_rate">
              <div class="info-block__small">
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
            </div>
          </div>
          <div class="info-block">
            <div class="info-block__name">
              {{ $t('pension.transactionHistory') }}
            </div>
            <div class="pension-page__table">
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
        <template v-if="isDeadline">
          <div class="info-block__grid">
            <div>
              <div class="info-block__name">
                Current pension balance
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
                @click="openApplyForAPensionModal()"
              >
                {{ $t('pension.prolong') }}
              </base-btn>
            </div>
          </div>
          <div class="info-block">
            <div class="info-block__name">
              {{ $t('pension.transactionHistory') }}
            </div>
            <div class="pension-page__table">
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
      <div />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import modals from '~/store/modals/modals';

export default {
  data() {
    return {
      pensionIsReg: false,
      isDeadline: false,
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
    openApplyForAPensionModal() {
      window.addEventListener('close-modal', () => {
        this.pensionIsReg = true;
        this.isDeadline = false;
      });
      this.ShowModal({
        key: modals.applyForAPension,
      });
    },
    openMakeDepositModal() {
      this.ShowModal({
        key: modals.makeDeposit,
      });
    },
    openChangePercentModal() {
      this.ShowModal({
        key: modals.changePercent,
      });
    },
    jumpInTime() {
      this.pensionIsReg = false;
      this.isDeadline = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.pension-page {
  background: linear-gradient(to bottom, #103D7C 320px, #dcdcdc 320px);
  display: flex;
  justify-content: center;
  height: 100vh;

  &__container {
    display: grid;
    grid-template-rows: 195px max-content;
    max-width: 1280px;
    grid-row-gap: 50px;
    width: 100%;

    &_registered {
      @extend .pension-page__container;
      gap: 20px;
    }

    &_expired {
      @extend .pension-page__container;
      gap: 15px;
    }
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
    grid-template-rows: 140px max-content max-content;
    width: 100%;

    .btn-group {
      display: grid;
      grid-template-columns: repeat(2, calc(50% - 10px));
      gap: 20px;
      padding-bottom: 20px;

      &_exp {
        @extend .btn-group;
        width: calc(100% - 20px);
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

    .info-block {
      background-color: #fff;
      border-radius: 6px;

      &__grid {
        @extend .info-block;
        display: grid;
        grid-template-columns: 5fr 4fr;
        grid-template-rows: 3fr 1fr;
        position: relative;
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

      &__triple {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }

      &__third {
        @extend .info-block;
        display: grid;
        grid-template-rows: min-content min-content auto;

        .btn {
          align-self: flex-end;
          margin: 0 0 20px 20px;
          width: calc(100% - 40px);
        }

        &_rate {
          @extend .info-block__third;
          grid-template-rows: repeat(2, 1fr);
          align-items: flex-end;
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

      &__about {
        width: calc(100% - 50px);
        grid-template-areas:
          "hd ."
          "ft sd";
        margin-left: 20px;
        display: grid;
        grid-template-columns: 60% auto;
        grid-template-rows: auto 63px;
        gap: 20px;
        position: relative;

        .info-block__subtitle {
          grid-area: hd;
        }

        .calendar-img {
          grid-area: sd;
          position: absolute;
          right: 0px;
          bottom: 0;
        }

        .btn-group {
          grid-area: ft;
        }
      }

      .document {
        border: 1px solid #E1E4ED;
        border-radius: 8px;
        height: 80px;
        margin: 0 0 20px 20px;
        width: calc(100% - 40px);
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

      &__tokens {
        font-weight: 700;
        font-size: 25px;
        color: #0083C7;
        padding: 0 20px;
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

      .ava {
        height: 33px;
        width: 33px;
        border-radius: 50%;
        background-color: #fff;
        flex: none;

        &_list {
          @extend .ava;
          position: absolute;
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

    &_registered {
      @extend .pension-page__content;
      grid-template-rows: 196px max-content;
    }

    &_expired {
      @extend .pension-page__content;
      grid-template-rows: 208px max-content;
    }
  }
}
</style>
