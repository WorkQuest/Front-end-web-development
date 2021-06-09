<template>
  <div>
    <div class="pc" />
    <div class="mobile">
      <div class="mobile-header">
        <div @click="back()">
          <span class="icon-chevron_big_left" />
        </div>
      </div>
      <div>
        <div class="progress-bar__container">
          <div class="progress">
            <div
              class="progress-bar"
              :class="[
                {'progress-bar__stage1': stage_progress === 25},
                {'progress-bar__stage2': stage_progress === 50},
                {'progress-bar__stage3': stage_progress === 75},
                {'progress-bar__stage4': stage_progress === 100},
              ]"
              role="progressbar"
              :aria-valuenow="stage_progress"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
        <div v-if="stage_progress === 25">
          <h2 class="step__title">
            Step 1
          </h2>
          <span class="step__instruction">Download and install the Google Authenticator app</span>
          <div class="app-link__container">
            <nuxt-link to="/2fa">
              <img
                alt="appStore"
                src="~assets/img/ui/appStore.svg"
                class=""
              >
            </nuxt-link>
            <nuxt-link to="/2fa">
              <img
                alt="playMarket"
                src="~assets/img/ui/playMarket.svg"
                class=""
              >
            </nuxt-link>
          </div>
          <div class="btn__container">
            <base-btn @click="back()">
              Back
            </base-btn>
            <base-btn @click="toStage2()">
              Next
            </base-btn>
          </div>
        </div>
        <div v-if="stage_progress === 50">
          <h2 class="step__title">
            Step 2
          </h2>
          <span class="step__instruction">Download and install the Google Authenticator app</span>
          <div class="app-link__container">
            <nuxt-link to="/2fa">
              <img
                alt="appQr"
                src="~assets/img/ui/appQr.svg"
                class="app-qr__image"
              >
            </nuxt-link>
          </div>
          <div class="btn__container">
            <base-btn @click="toStage1()">
              Back
            </base-btn>
            <base-btn @click="toStage3()">
              Next
            </base-btn>
          </div>
        </div>
        <div v-if="stage_progress === 75">
          <h2 class="step__title">
            Step 3
          </h2>
          <span class="step__instruction">Please keep this key on paper. This key will allow you to restore your Google Authenticator in case of phone loss.</span>
          <div class="app-link__container">
            5MYKZEJFNNXHYWXT
          </div>
          <div class="btn__container">
            <base-btn @click="toStage2()">
              Back
            </base-btn>
            <base-btn @click="toStage4()">
              Next
            </base-btn>
          </div>
        </div>
        <div v-if="stage_progress === 100">
          <h2 class="step__title">
            Step 4
          </h2>
          <span class="step__instruction">Enable Google Authenticator</span>
          <div class="app-link__container">
            // inputs
          </div>
          <div class="btn__container">
            <base-btn @click="toStage3()">
              Back
            </base-btn>
            <base-btn @click="toSettings()">
              Next
            </base-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'F2a',
  data() {
    return {
      stage_progress: 25,
    };
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    toSettings() {
      this.$router.push('/settings');
    },
    toStage1() {
      this.stage_progress = 25;
    },
    toStage2() {
      this.stage_progress = 50;
    },
    toStage3() {
      this.stage_progress = 75;
    },
    toStage4() {
      this.stage_progress = 100;
    },
  },
};
</script>

<style lang="scss" scoped>

.app-qr {
  &__image {
    margin: 0 36px 0 36px;
  }
}

.btn {
  &__container {
    display: flex;
    flex-direction: row;
  }
}

.app-link {
  &__container {
    display: flex;
    flex-direction: row;
  }
}

.step {
  margin: 20px 20px 0 20px;
  &__title {
    @extend .step;
    font-weight: 700;
    font-size: 23px;
    color: $black800;
  }
  &__instruction {
    @extend .step;
    padding-top: 10px;
    font-weight: 400;
    font-size: 16px;
    color: $black500;
  }
}

.progress-bar {
  border-radius: 30px;
  &__container {
    margin: 30px 20px 0 20px;
  }
  &__stage1 {
    width:25%
  }
  &__stage2 {
    width:50%
  }
  &__stage3 {
    width:75%
  }
  &__stage4 {
    width:100%
  }
}

.mobile-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 20px 20px 0 20px;
  background: $white;
  &__title {
    font-weight: 500;
    font-size: 17px;
    color: $black800;
    width: 100%;
    text-align: center;
    z-index: 1;
  }
}

.icon {
  &-chevron_big_left:before {
   font-size: 25px;
   content: "\ea4d";
   color: $blue;
 }
}

@include _1700 {
  .mobile {
    display: none;
  }

}
@include _1600 {
  .mobile {
    display: none;
  }

}
@include _1400 {
  .mobile {
    display: none;
  }

}
@include _1300 {
  .mobile {
    display: none;
  }

}
@include _1199 {
  .mobile {
    display: none;
  }
}
@include _991 {
  .pc {
    display: none;
  }
  .mobile {
    overflow-y: auto;
    display: grid;
    height: 100%;
    width: 100%;
    max-height: 775px;
    background: $white;
  }
}

@include _380 {}

</style>
