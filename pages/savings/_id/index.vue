<template>
  <div class="saving-page">
    <div class="saving-page__container">
      <div class="saving-page__header">
        <div class="title">
          {{ $t('saving.workQuestSavings') }}<br>{{ $t('saving.lendAndEarn') }}
        </div>
        <div class="title_sub">
          {{ $t('general.midPlug') }}
        </div>
      </div>
      <div class="saving-page__content">
        <div class="info-block__grid">
          <div>
            <div class="info-block__name">
              {{ $t('saving.depositAmount') }}
            </div>
            <div class="info-block__tokens">
              {{ $tc('general.wusdCount', "4 562") }}
            </div>
          </div>
          <div class="info-block__small_right">
            <div class="info-block__perc">
              {{ $tc('general.plusPercents', "6.5") }}
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
              {{ $t('saving.date') }}
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
                    src="~/assets/img/temp/avatar-small.jpg"
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
      items: [
        {
          userName: this.$t('general.table.userName'),
          avaUrl: '~/assets/img/social/GOOGLE_+_.png',
          userID: this.$t('general.table.userId'),
          txHash: this.$t('general.table.txHash'),
          time: this.$t('general.table.time'),
          amount: this.$tc('referral.wqtCount', 12),
          status: this.$t('general.table.status'),
        },
        {
          userName: this.$t('general.table.userName'),
          avaUrl: '~/assets/img/social/GOOGLE_+_.png',
          userID: this.$t('general.table.userId'),
          txHash: this.$t('general.table.txHash'),
          time: this.$t('general.table.time'),
          amount: this.$tc('referral.wqtCount', 12),
          status: this.$t('general.table.status'),
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
  },
};
</script>

<style lang="scss" scoped>
.saving-page {
  background: linear-gradient(to bottom, #103D7C 374px, #f6f8fa 374px);
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

    .btn {
      box-sizing: border-box;
      font-weight: 400;
      font-size: 16px;
      color: #0083C7;
      border: 1px solid #0083C71A;
      border-radius: 6px;
      transition: .3s;

      &:hover {
        background-color: #0083C71A;
        border: 0;
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

      &__name {
        font-size: 16px;
        color: #1D2127;
        padding: 20px 20px 10px 20px;
        font-weight: 400;
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
