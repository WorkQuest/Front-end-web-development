<template>
  <div class="notifications">
    <section class="pc">
      <!--  <div>-->
      <!--    <Header-->
      <!--      :title="'Notification'"-->
      <!--      :sub-title="'Information'"-->
      <!--    />-->
      <!--    notification-->
      <!--  </div>-->
      {{ $t('mobile.notifications') }}
    </section>
    <section class="mobile">
      <div class="mobile__header">
        <div class="btn__back">
          <base-btn
            mode="back"
            @click="$router.go(-1)"
          >
            <template v-slot:left>
              <span class="icon-chevron_big_left" />
            </template>
          </base-btn>
        </div>
        <div class="mobile__title">
          {{ $t('mobile.notifications') }}
        </div>
      </div>
      <span
        v-for="(notification, i) in notifications"
        :key="i"
      >
        <div class="notification">
          <div class="notification__user">
            <div class="image__container">
              <img
                alt=""
                src="~assets/img/temp/photo.jpg"
                class="notification__image"
              >
            </div>
            <div class="notification__name">
              {{ notification.name }}
            </div>
            <div class="notification__date">
              {{ notification.date }}
            </div>
          </div>
          <div class="notification__text">
            {{ $t('mobile.inviteYouAQuest') }}
          </div>
          <div class="notification__quest">
            <div class="quest__title">
              {{ notification.quest }}
            </div>
            <div class="icon__container">
              <span class="icon-chevron_right" />
            </div>
          </div>
        </div>
      </span>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  data() {
    return {
      notifications: [
        {
          name: 'Samantha Sparcs',
          date: '14 Jan 2021, 14:54',
          quest: 'Paint the garage quickly',
        },
        {
          name: 'Samantha Sparcs',
          date: '14 Jan 2021, 14:54',
          quest: 'Paint the garage quickly',
        },
        {
          name: 'Samantha Sparcs',
          date: '14 Jan 2021, 14:54',
          quest: 'Paint the garage quickly',
        },
        {
          name: 'Samantha Sparcs',
          date: '14 Jan 2021, 14:54',
          quest: 'Paint the garage quickly',
        },
        {
          name: 'Samantha Sparcs',
          date: '14 Jan 2021, 14:54',
          quest: 'Paint the garage quickly',
        },
      ],
    };
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
};
</script>

<style lang="scss" scoped>

.icon {
  font-size: 25px;
  &-chevron_big_left:before {
    @extend .icon;
    content: "\ea4d";
    color: $blue;
  }
  &-chevron_right:before {
    font-size: 20px;
    content: "\ea56";
    color: $blue;
  }
  &__container {
    margin: 15px 15px 13px 0;
  }
}

.quest {
  &__title {
    padding: 12px 0 12px 11px;
  }
}

.notification {
  border-bottom: 1px solid $black100;
  &__date {
    font-weight: 400;
    font-size: 12px;
    color: $black300;
    display: flex;
    justify-content: flex-end;
  }
  &__image {
    max-width: 40px;
    max-height: 40px;
    width: 100%;
    height: 100%;
    border-radius: 89px;
  }
  &__name {
    font-weight: 400;
    font-size: 16px;
    color: $black800;
    margin: 0 0 0 10px;
  }
  &__quest {
    margin: 10px 20px 20px 20px;
    background: $black100;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &__text {
    margin: 10px 20px 0 20px;
    font-size: 16px;
    font-weight: 400;
    color: $black300;
  }
  &__user {
    display: grid;
    grid-template-columns: 1fr 5fr 6fr;
    margin: 0 20px 0 20px;
  }
}

.mobile {
  width: 100%;
  height: 100%;
  max-height: 900px;
  &__title {
    @include text-simple;
    font-weight: 700;
    font-size: 30px;
    color: $black800;
  }
  &__header {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
    padding: 18px 18px;
  }
}

@include _2560 {
  .mobile {
    display: none;
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
  .wallet {
    margin: 0 20px 0 20px;
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
  }
}
</style>
