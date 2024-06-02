<template>
  <div class="wrapperCard">
    <div
      class="cardDispute"
      @click="toDispute"
    >
      <div class="cardDispute__left">
        <skeleton-block
          v-for="i of 3"
          v-show="isSkeleton"
          :key="'skeleton'+i"
        />
        <div
          v-for="(card, key) in cardData(dispute)"
          v-show="!isSkeleton"
          :key="key"
          :data-selector="`DISPUTES-${key}`"
          class="cardDispute__text"
        >
          {{ card.title }}
          <span
            class="cardDispute__text_blue"
          >
            {{ card.value }}
          </span>
        </div>
        <skeleton-block v-if="isSkeleton" />
        <div
          v-else
          class="cardDispute__text"
        >
          {{ $t('disputes.status') }}
          <span :class="[dispute && colorDisputeStatus[dispute.status]]">
            {{ disputeStatus(dispute.status) }}
          </span>
        </div>
      </div>
      <div class="cardDispute__vl" />

      <div class="cardDispute__right">
        <skeleton-block v-if="isSkeleton" />
        <div
          v-else
          class="cardDispute__text"
        >
          {{ $t('disputes.decision') }}
          <div class="cardDispute__decision">
            {{ dispute.decisionDescription ? dispute.decisionDescription : '-' }}
          </div>
        </div>
      </div>
    </div>
    <star-rating
      v-if="!isSkeleton && dispute.status === $options.DisputeStatues.CLOSED"
      class="cardDispute__review"
      :stars-number="5"
      :data-selector="`ACTION-BTN-SHOW-REVIEW-MODAL-${dispute.id}`"
      :rating="dispute.currentUserDisputeReview && dispute.currentUserDisputeReview.mark"
      :is-disabled="dispute.currentUserDisputeReview && !!dispute.currentUserDisputeReview.mark"
      @input="showReviewModal($event, dispute.id)"
    />
  </div>
</template>
<script>
import BigNumber from 'bignumber.js';
import moment from 'moment';
import {
  DisputeStatues, Path, TokenSymbols,
} from '~/utils/enums';
import modals from '~/store/modals/modals';

export default {
  name: 'CardDispute',
  DisputeStatues,
  props: {
    dispute: {
      type: Object,
      default: () => {
      },
    },
    isSkeleton: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    colorDisputeStatus() {
      return {
        [DisputeStatues.PENDING]: 'cardDispute__text_blue',
        [DisputeStatues.IN_PROGRESS]: 'cardDispute__text_yellow',
        [DisputeStatues.PENDING_CLOSED]: 'cardDispute__text_green',
        [DisputeStatues.CLOSED]: 'cardDispute__text_green',
        [DisputeStatues.CREATED]: 'cardDispute__text_darkblue',
      };
    },
    rating() {
      return this.dispute.currentUserDisputeReview?.mark || 0;
    },
  },
  methods: {
    cardData(item) {
      if (this.isSkeleton) return [];
      return [
        {
          title: this.$t('disputes.dispute'),
          value: item.number,
        },
        {
          title: this.$t('disputes.quest'),
          value: item.quest.title,
        },
        {
          title: this.$t('disputes.employer'),
          value: `${item.quest.user.firstName} ${item.quest.user.lastName}`,
        },
        {
          title: this.$t('disputes.questSalary'),
          value: `${new BigNumber(item.quest.price).shiftedBy(-6).toString()} ${TokenSymbols.USDT}`,
        },
        {
          title: this.$t('disputes.disputeTime'),
          value: this.convertDate(item.quest.createdAt),
        },
      ];
    },
    toDispute() {
      if (this.isSkeleton) return;
      this.$router.push(`${Path.DISPUTES}/${this.dispute.id}`);
    },
    convertDate(createdAt) {
      return createdAt ? moment(createdAt).format('MMMM Do YYYY, h:mm') : '';
    },
    disputeStatus(status) {
      const obj = {
        [DisputeStatues.PENDING]: this.$t('disputes.pending'),
        [DisputeStatues.IN_PROGRESS]: this.$t('disputes.inProgress'),
        [DisputeStatues.PENDING_CLOSED]: this.$t('meta.completed'),
        [DisputeStatues.CLOSED]: this.$t('meta.completed'),
        [DisputeStatues.CREATED]: this.$t('disputes.created'),
      };
      return obj[status];
    },
    showReviewModal(rating, disputeId) {
      this.ShowModal({
        key: modals.review,
        title: this.$tc('modals.titles.review'),
        rating,
        callback: async (message, mark) => {
          this.CloseModal();
          this.SetLoader(true);
          const { ok, msg } = await this.$store.dispatch('user/sendReviewDispute', { disputeId, message, mark });
          if (ok) {
            this.ShowModal({ key: modals.thanks });
            await this.$store.dispatch('disputes/setMarkInDisputes', { disputeId, mark });
          } else {
            await this.ShowToast(msg || ' ');
          }
          this.SetLoader(false);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  @include main;
  &-white {
    @include main-white;
  }
}
.wrapperCard{
  position: relative;
}
.cardDispute {
  position:relative;
  background-color: $white;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 60% 1% 39%;
  width: 100%;
  min-height: 247px;
  transition: .5s;
  &:hover {
    @include shadow;
    cursor: pointer;
  }
  &__none {
    display: grid;
    width: 100%;
    align-items: center;
    justify-items: center;
  }
  &__decision {
    @include text-simple;
    font-weight: 400;
    font-size: 16px;
    color: $black500;

    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    line-clamp: 6;
    -webkit-line-clamp: 6;
    box-orient: vertical;
    -webkit-box-orient: vertical;
    word-break: break-word;
  }
  &__title {
    @include text-simple;
    margin: 20px 0;
    font-size: 25px;
    color: $black800;
    text-align: left;
    word-break: break-word;
  }
  &__left {
    height: fit-content;
    max-height: 400px;
    padding: 20px 20px 35px;
  }
  &__right {
    height: fit-content;
    max-height: 400px;
    margin: 20px;
    padding-bottom: 35px;
  }
  &__review{
    position: absolute;
    width:96px;
    bottom: 20px;
    right: 20px;
    margin-top:20px;
  }
  &__text {
    @include text-simple;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    box-orient: vertical;
    -webkit-box-orient: vertical;
    word-break: break-word;
    &_blue {
      color: $blue;
    }
    &_darkblue {
       color: $darkblue;
     }
    &_yellow {
      color: $yellow;
    }
    &_green {
      color: $green;
    }
  }
  &__vl {
    margin: 20px 5px;
    border-left: 1px solid $black0;
    height: auto;
  }
  &__skeleton{
    height: 250px;
    width: auto;
    margin: 20px 20px 35px;
  }
}
@include _575 {
  .cardDispute{
    display: flex;
    flex-wrap: wrap;
    &__vl {
      display: none;
    }
    &__right {
      margin-top: 0;
    }
    &__skeleton{
      width: 100%;
      margin: 20px 20px 35px;
    }
  }

}
</style>
