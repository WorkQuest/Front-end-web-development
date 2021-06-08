<template>
  <div class="main">
    <div class="main__body">
      <h2 class="page__title">
        {{ $t('disputes.disputes') }}
      </h2>
      <span
        v-for="(item, i) in payload.disputes"
        :key="i"
      >
        <div
          v-if="item.number.length === 0"
          class="page__zero-el"
        >
          <img src="~assets/img/ui/youAreHaven'tDisputs.svg">
        </div>
      </span>
      <div class="page__grid">
        <div
          v-for="(item, i) in payload.disputes"
          :key="i"
          class=""
        >
          <div class="page__card">
            <div class="page__card-body">
              <div class="page__text">
                {{ $t('disputes.dispute') }} <span class="page__text_blue">{{ item.number }}</span>
              </div>
              <div class="page__text">
                {{ $t('disputes.quest') }} <span class="page__text_blue">{{ item.quest }}</span>
              </div>
              <div class="page__text">
                {{ $t('disputes.employer') }} <span class="page__text_blue">{{ item.employer }}</span>
              </div>
              <div class="page__text">
                {{ $t('disputes.questSalary') }} <span class="page__text_blue">{{ item.questSalary }}</span>
              </div>
              <div class="page__text">
                {{ $t('disputes.status') }} <span
                  v-if="item.status === 'Pending'"
                  class="page__text_yellow"
                >{{ item.status }}</span>
                <span
                  v-if="item.status === 'Completed'"
                  class="page__text_green"
                >{{ item.status }}</span>
              </div>
            </div>
            <div class="page__vl" />
            <div class="page__card-body">
              <div class="page__text">
                {{ $t('disputes.decision') }}
                <div
                  v-if="item.decision.length === 0"
                  class="page__decision"
                >
                  -
                </div>
                <div
                  v-if="item.decision.length !== 0"
                  class="page__decision"
                >
                  {{ item.decision }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Disputes',
  data() {
    return {
      payload: {
        disputes: [
          {
            number: '1',
            quest: 'Pain the garage quickly...',
            employer: 'Samantha Sparcs',
            questSalary: '1 500 WUSD',
            status: 'Pending',
            decision: '',
          },
          {
            number: '2',
            quest: 'Pain the garage quickly...',
            employer: 'Samantha Sparcs',
            questSalary: '1 500 WUSD',
            status: 'Completed',
            decision: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
          },
          {
            number: '3',
            quest: 'Pain the garage quickly...',
            employer: 'Samantha Sparcs',
            questSalary: '1 500 WUSD',
            status: 'Pending',
            decision: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
          },
          {
            number: '4',
            quest: 'Pain the garage quickly...',
            employer: 'Samantha Sparcs',
            questSalary: '1 500 WUSD',
            status: 'Pending',
            decision: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
          },
        ],
      },
    };
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
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

.page {
  &__zero-el {
    display: grid;
    width: 100%;
    grid-template-columns: 100%;
    align-items: center;
    justify-items: center;
  }
  &__decision {
    @include text-simple;
    font-weight: 400;
    font-size: 16px;
    color: $black500;
  }
  &__title {
    @include text-simple;
    margin: 20px 0 0 0;
    font-size: 25px;
    color: $black800;
  }
  &__card-body {
    margin: 20px;
  }
  &__grid {
    display: grid;
    width: 100%;
    grid-template-columns: 50% 50%;
  }
  &__card {
    background-color: $white;
    border-radius: 6px;
    display: grid;
    grid-template-columns: 49% 2% 49%;
    max-width: 580px;
    width: 100%;
    margin: 5px 10px 10px 0;
    height: 100%;
    max-height: 185px;
  }
  &__text {
    font-size: 16px;
    @include text-simple;
    &_blue {
      color: $blue;
    }
    &_yellow {
      color: $yellow;
    }
    &_green {
      color: $green;
    }
  }
  &__vl {
    margin: 20px 0 0 0;
    border-left: 1px solid $black0;
    height: 110px;
  }
}
</style>
