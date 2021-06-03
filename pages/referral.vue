<template>
  <div class="referral-page">
    <div class="referral-page__container">
      <div class="referral-page__header">
        <div class="title">
          {{ $t('referral.inviteFriendsHead') }}
          <br />
          {{ $t('referral.earnCryptoTogether') }}
        </div>
        <div class="title_sub">
          {{ $t('referral.headerSubtitle') }}
        </div>
      </div>
      <div class="referral-page__content">
        <div class="info-block_couple">
          <div class="info-block">
            <div class="info-block__name">{{ $t('referral.referralReward') }}</div>
            <div class="info-block__tokens">{{ $tc('referral.wqtCount', 12) }}</div>
            <div class="info-block__name">{{ $t('referral.lastRefReward') }}</div>
            <div class="user_last-reward">
              <div class="user__info">
                <img
                  class="ava"
                  src=""
                  alt=""
                />
                <div class="user__name">Edward Cooper</div>
              </div>
              <div class="user__value_green">
                {{ $tc('referral.plusCount', $tc('referral.wqtCount', 12)) }}
              </div>
            </div>
          </div>
          <div class="info-block">
            <div class="info-block__name">{{$t('referral.yourRefers')}}</div>
            <div class="info-block__refers">
              <div class="info-block__avatar">
                <img
                  class="ava_list"
                  src="~/assets/img/social/FACEBOOK.png"
                  alt=""
                />
              </div>
              <div class="info-block__avatar">
                <img
                  class="ava_list"
                  src="~/assets/img/social/TWITTER.png"
                  alt=""
                />
              </div>
              <div class="info-block__avatar">
                <img
                  class="ava_list"
                  src="~/assets/img/social/GOOGLE_+_.png"
                  alt=""
                />
              </div>
              <div class="info-block__avatar">
                <div class="info-block__more">{{$tc('referral.plusCount', 17)}}</div>
              </div>
            </div>
            <div class="info-block__name">{{$t('referral.yourReferralLink')}}</div>
            <div class="info-block__link">
              <div class="address">{{'referLink'}}</div>
              <button
                type="button"
                @click="doCopy"
              >
                <img
                  src="~/assets/img/ui/square_link.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
        <div class="info-block">
          <div class="info-block__name_bold">{{$t('referral.howToInviteYourFriends')}}</div>
          <div class="info-block__steps">
            <div class="step">
              <div class="step__name">{{$t('referral.getLink')}}</div>
              <div class="step__about">{{$t('referral.registerAndGenerate')}}</div>
            </div>
            <div class="step">
              <div class="step__name">{{$t('referral.inviteFriends')}}</div>
              <div class="step__about">{{$t('referral.inviteYourFriends')}}</div>
            </div>
            <div class="step">
              <div class="step__name">{{$t('referral.earnCrypto')}}</div>
              <div class="step__about">{{$t('referral.everyTimeYourFriends')}}</div>
            </div>
          </div>
        </div>
        <div class="info-block">
          <div class="info-block__name">{{$t('referral.historyOfRewards')}}</div>
          <div class="referral-page__table">
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
                    :src=el.item.avaUrl
                    alt=""
                  />
                  <div class="user__name">{{el.item.userName}}</div>
                </div>
              </template>
              <template #cell(userID)="el"><div class="user__value_gray">{{el.item.userID}}</div></template>
              <template #cell(txHash)="el"><div class="user__value_gray">{{el.item.txHash}}</div></template>
              <template #cell(time)="el"><div class="user__value_gray">{{el.item.time}}</div></template>
              <template #cell(status)="el"><div class="user__value_green">{{el.item.status}}</div></template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      referLink: 'https://www.workquest.com/ref?v=44T7iUSo1vU',
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
          key: 'userName', label: this.$t('referral.table.name'), sortable: false, thClass: 'cell_head',
        },
        {
          key: 'userID', label: this.$t('referral.table.userID'), sortable: false, thClass: 'cell_head',
        },
        {
          key: 'txHash', label: this.$t('referral.table.txHash'), sortable: false, thClass: 'cell_head',
        },
        {
          key: 'time', label: this.$t('referral.table.time'), sortable: false, thClass: 'cell_head',
        },
        {
          key: 'amount', label: this.$t('referral.table.amount'), sortable: false, thClass: 'cell_head',
        },
        {
          key: 'status', label: this.$t('referral.table.status'), sortable: false, thClass: 'cell_head',
        },
      ],
    };
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    doCopy(ev) {
      ev.stopPropagation();
      this.$copyText(this.referLink).then(() => {
        alert('Copied');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.referral-page {
  background: linear-gradient(to bottom, #103D7C 370px, #dcdcdc 370px);
  display: flex;
  justify-content: center;
  height: 100vh;
  &__container {
    display: grid;
    grid-template-rows: 225px max-content;
    max-width: 1280px;
    grid-row-gap: 30px;
    justify-content: center;
  }
  &__header {
    width: 450px;
    font-weight: 500;
    color: #FFF;
    align-self: center;
    .title {
      @extend .referral-page__header;
      font-size: 45px;
      line-height: 110%;
      margin: 0 0 16px;
      &_sub {
        @extend .referral-page__header;
        font-size: 16px;
        line-height: 100%;
        opacity: 0.5;
      }
    }
  }
  &__content {
    display: grid;
    grid-row-gap: 30px;
    grid-template-rows: 225px max-content max-content;

    .info-block {
      background-color: #fff;
      border-radius: 6px;

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

      &__refers {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 4px;
        width: calc(100% - 40px);
        margin-left: 20px;
        height: 33px;
        position: relative;
      }

      &__avatar {
        width: 25px;
      }

      &__more {
        position: absolute;
        height: 33px;
        width: 53px;
        border-radius: 39px;
        background-color: #F7F8FA;
        text-align: center;
        line-height: 33px;
      }

      &__link {
        border: 1px solid #F7F8FA;
        border-radius: 6px;
        width: calc(100% - 40px);
        margin-left: 20px;
        padding: 0 20px;
        display: grid;
        grid-template-columns: 1fr 20px;
        gap: 10px;
        height: 46px;
        align-items: center;
        .address {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 16px;
          color: #1D2127;
        }
      }

      &__steps {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 60px;
        position: relative;
        width: calc(100% - 40px);
        margin: 0 0 20px 20px;

        .step {
          position: relative;
          background-color: #F7F8FA;
          border-radius: 6px;
          z-index: 2;

          &__name {
            font-weight: 500;
            font-size: 18px;
            color: #0083C7;
            padding: 10px;
          }
          &__about {
            font-size: 16px;
            color: #7C838D;
            padding: 0 10px 10px;
          }
          &:not(:last-child) {
            &:after {
              content: "";
              height: 12px;
              width: 12px;
              border-radius: 50%;
              z-index: 3;
              background-color: #D8DFE3;
              position: absolute;
              right: -5px;
              top: calc(50% - 5px);
            }
          }

          &:not(:first-child) {
            &:before {
              content: "";
              height: 12px;
              width: 12px;
              border-radius: 50%;
              z-index: 3;
              background-color: #D8DFE3;
              position: absolute;
              left: -5px;
              top: calc(50% - 5px);
            }
          }
        }
        &:after {
          content: "";
          position: absolute;
          height: 2px;
          width: 100%;
          top: 50%;
          background-color: #D8DFE3;
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

      &_couple {
        display: grid;
        grid-template-columns: repeat(2, calc(50% - 10px));
        grid-column-gap: 20px;
      }
    }
  }
}
</style>
