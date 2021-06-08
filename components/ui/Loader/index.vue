<template>
  <div
    class="loader"
    :class="{'loader_hider': isLoaderBackgroundHider}"
  >
    <div
      class="loader__body"
    >
      <div class="sk-chase">
        <div class="sk-chase-dot" />
        <div class="sk-chase-dot" />
        <div class="sk-chase-dot" />
        <div class="sk-chase-dot" />
        <div class="sk-chase-dot" />
        <div class="sk-chase-dot" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import loaderModes from '~/store/main/loaderModes';

export default {
  data: () => ({
    loaderModes,
  }),
  computed: {
    ...mapGetters({
      loaderStatusText: 'main/getLoaderStatusText',
      loaderMode: 'main/getLoaderMode',
      loaderProgress: 'main/getLoaderProgress',
      isLoaderBackgroundHider: 'main/getIsLoaderBackgroundHider',
    }),
  },
};
</script>
<style lang="scss" scoped>

.loader {
  padding: 10px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(#000000, .5);
  z-index: 1500;
  align-items: center;
  justify-content: center;
  display: flex;
  &_hider {
    background: #F7F8FA;
  }
  &__text {
    margin-top: 16px;
  }
  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.sk-chase {
  width: 40px;
  height: 40px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2.0s infinite ease-in-out both;
}

.sk-chase-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: #0083C7;
  border-radius: 100%;
  animation: sk-chase-dot-before 2.0s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
.sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

@keyframes sk-chase {
  100% { transform: rotate(360deg); }
}

@keyframes sk-chase-dot {
  80%, 100% { transform: rotate(360deg); }
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  } 100%, 0% {
      transform: scale(1.0);
    }
}

</style>
