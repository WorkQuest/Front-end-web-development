<template>
  <div class="empty">
    <div class="empty__text">
      Sorry, the service is temporarily unavailable.
      <button
        class="empty__btn"
        @click="toAbout()"
      >
        Back
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Temp',
  methods: {
    toAbout() {
      this.$router.push('/about');
    },
  },
};
</script>

<style lang="scss" scoped>
.empty {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #20253b;
  &__text {
    color: #FFFFFF;
    text-align: center;
    font-size: 36px;
    display: flex;
    grid-gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__btn {
    width: 250px;
    height: 40px;
    border-radius: 20px;
    color: #FFFFFF;
    background: #3c3e3c;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px 1px black;
  }
}
</style>
