<template>
  <div class="main">
    <div class="main__body">
      <section class="pc">
        <div class="chat">
          <h2 class="page__title">
            {{ $t('chat.messages') }}
          </h2>
          <div class="chat__body">
            <div class="chat__header">
              <div class="chat__title">
                <div>{{ $t('chat.chat') }}</div> <div class="icon-more">
                  <span class="icon-more_horizontal" />
                </div>
              </div>
            </div>
            <div class="chat__cards">
              <div
                v-for="(item, i) in cards"
                :key="i"
              >
                <div
                  class="chat__card"
                  @click="showDetails()"
                >
                  <div class="avatar__row">
                    <div>
                      <img
                        class="profile__img"
                        src="~/assets/img/temp/profile.svg"
                      >
                    </div>
                    <div>
                      <span class="profile__name">
                        {{ item.name }}
                      </span>
                    </div>
                    <div>
                      <span class="profile__company">
                        {{ item.company }}
                      </span>
                    </div>
                  </div>
                  <div class="quest__row">
                    <div class="quest">
                      <span class="params">{{ $t('chat.quest') }}</span>
                      <span class="quest__title">{{ item.questName }}</span>
                    </div>
                  </div>
                  <div class="you__row">
                    <div class="you">
                      <span class="params">{{ $t('chat.you') }}</span>
                      <span class="you__message">{{ item.youMessage }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="mobile">
        <div class="mobile__header">
          <div class="title__container">
            <h2 class="mobile__title">
              {{ $t('mobile.chat') }}
            </h2>
          </div>
          <div>
            <span class="icon-more_vertical" />
          </div>
        </div>
        <span
          v-for="(item, i) in cards"
          :key="i"
        >
          <div
            class="mobile__body"
            @click="showDetails()"
          >
            <div class="message__body">
              <div class="avatar__container">
                <img
                  :alt="item.name"
                  src="~assets/img/temp/photo.jpg"
                  class="message__avatar"
                >
              </div>
              <div class="message__container">
                <div class="message__name">
                  {{ item.name }}
                </div>
                <div class="message__text">
                  You: {{ item.youMessage }}
                </div>
                <div class="message__data">
                  14 days ago
                </div>
              </div>
            </div>
          </div>
        </span>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  data() {
    return {
      cards: [
        {
          name: 'Edward cooper',
          company: 'from Amazon',
          questName: 'Paint the garage quickly',
          youMessage: 'Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim',
        },
        {
          name: 'Edward cooper',
          company: 'from Amazon',
          questName: 'Paint the garage quickly',
          youMessage: 'Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim',
        },
        {
          name: 'Edward cooper',
          company: 'from Amazon',
          questName: 'Paint the garage quickly',
          youMessage: 'Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim',
        },
        {
          name: 'Edward cooper',
          company: 'from Amazon',
          questName: 'Paint the garage quickly',
          youMessage: 'Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim',
        },
        {
          name: 'Edward cooper',
          company: 'from Amazon',
          questName: 'Paint the garage quickly',
          youMessage: 'Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim',
        },
        {
          name: 'Edward cooper',
          company: 'from Amazon',
          questName: 'Paint the garage quickly',
          youMessage: 'Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim',
        },
        {
          name: 'Edward cooper',
          company: 'from Amazon',
          questName: 'Paint the garage quickly',
          youMessage: 'Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim',
        },
        {
          name: 'Edward cooper',
          company: 'from Amazon',
          questName: 'Paint the garage quickly',
          youMessage: 'Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim',
        },
        {
          name: 'Edward cooper',
          company: 'from Amazon',
          questName: 'Paint the garage quickly',
          youMessage: 'Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim',
        },
      ],
    };
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    showDetails() {
      this.$router.push('/messages/1');
    },
  },
};
</script>

<style lang="scss" scoped>

.message {
  &__container {}
  &__avatar {
    max-width: 74px;
    max-height: 74px;
    border-radius: 118px;
  }
  &__name {
    @include text-simple;
    color: $black800;
    font-weight: 500;
    font-size: 16px;
  }
  &__body {
    @include text-simple;
    display: grid;
    padding: 10px 0 0 0;
    border-bottom: 1px solid $black100;
    justify-items: center;
  }
  &__text {
    @include text-simple;
    font-weight: 400;
    font-size: 14px;
    color: $black500;
  }
  &__data {
    @include text-simple;
    font-weight: 400;
    font-size: 12px;
    color: $black200;
    padding: 0 0 10px 0;
  }
}

.mobile {
  &__body {
    display: grid;
  }
  &__title {
    @include text-simple;
    color: $black800;
    font-weight: 700;
    font-size:30px;
    margin: 18px 20px 0 20px;
  }
  &__header {
    display: flex;
    align-items: baseline;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px 0 0;
    margin: 0 0 20px 0;
  }
}

.icon {
  color: $black500;
  font-size: 26px;
  &-more_vertical::before {
    @extend .icon;
    content: "\e952";
    color: $blue;
  }
  &-more_horizontal::before {
    @extend .icon;
    content: "\e951";
  }
  &-more {
    margin: 0 19px 0 0;
  }
}

.you {
  margin: 0 0 20px 0;
  &__row {
    display: flex;
    flex-direction: row;
    margin: 14.5px 0 0 30px;
  }
  &__message {
    font-weight: 400;
    font-size: 16px;
    color: $black500;
  }
}

.quest {
  &__row {
    display: flex;
    flex-direction: row;
    margin: 14.5px 0 0 30px;
  }
  &__title {
    color: $blue;
    font-size: 16px;
    font-weight: 500;
  }
}

.profile {
  &__img {
    width: 100%;
    height: 100%;
    max-height: 30px;
    max-width: 30px;
    border-radius: 84px;
  }
  &__name {
    color: $black800;
    font-size:16px;
    font-weight: 500;
    margin: 0 10px 0 10px;
  }
  &__company {
    color: $black500;
    font-size: 16px;
    font-weight: 400;
  }
}
.avatar {
  &__row {
    display: flex;
    flex-direction: row;
    margin: 20px 0 0 30px;
  }
}
.main {
  @include main;
  &-white {
   @include main-white;
   justify-content: flex-start;
   border-radius: 6px;
 }
}
.chat {
  &__header {
    border: 1px solid #E9EDF2;
    border-radius: 6px 0 0 0;
  }
  &__title {
    background-color: $white;
    margin: 15px 0 15px 15px;
    font-weight: 500;
    font-size: 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  &__body {
    background-color: $white;
    border: 1px solid #E9EDF2;
    border-radius: 6px;
    width: 100%;
    max-width: 1180px;
    height: 100%;
    max-height: 852px;
  }
  &__cards {
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    max-height: 793px;
  }
  &__card {
    border: 1px solid #E9EDF2;
    cursor: pointer;
  }
}
.page {
  &__title {
    margin: 20px 0 20px 0;
  }
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 24px rgba(0, 131, 199, 1);
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
  .chat {
    margin: 0 20px 0 20px;
  }
}
@include _991 {
  .avatar {
    &__container {
      margin: 6px 0 0 0;
    }
  }
  .message {
    &__avatar {
      max-height: 54px;
      max-width: 54px;
    }
    &__body {
      grid-template-columns: 1fr 6fr;
      align-items: flex-start;
    }
  }
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

@include _480 {
  .message {
    &__container {
      margin: 0 0 0 10px;
    }
  }
}
</style>
