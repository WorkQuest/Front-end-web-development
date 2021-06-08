<template>
  <div class="main">
    <div class="main__body">
      <h2 class="page__title">
        {{ $t('chat.messages') }}
      </h2>
      <div class="chat__body">
        <div class="chat__header">
          <div class="chat__title">
            <div
              class="arrow-back"
              @click="showDetails()"
            >
              <span
                class="icon-short_left"
              />
              <span>{{ $t('chat.chat') }}</span>
            </div>
            <div class="icon-more">
              <span class="icon-more_horizontal" />
            </div>
          </div>
        </div>
        <div class="chat__messages">
          <div class="chat__info-message">
            <div class="name__underline">
              Samantha Sparcs
            </div>
            <div class="event">
              {{ $t('chat.invitedYou') }}
            </div>
          </div>
          <div class="info">
            <div class="quest__info">
              <div class="quest__name">
                Paint the garage quickly
              </div>
            </div>
          </div>
          <div
            v-for="(item, i) in messages"
            :key="i"
          >
            <div
              class="chat__message"
            >
              <div>
                <div class="row__container">
                  <div class="chat__img-container">
                    <img
                      class="chat__img"
                      src="~/assets/img/temp/profile.svg"
                    >
                  </div>
                  <div class="chat__name-container">
                    <div class="chat__name">
                      {{ item.userName }}
                    </div>
                    <div class="chat__star">
                      <div
                        class="block__icon block__icon_fav star"
                        @click="item.isFavourite = !item.isFavourite"
                      >
                        <img
                          class="star__hover"
                          src="~assets/img/ui/star_hover.svg"
                          alt=""
                        >
                        <img
                          v-if="!item.isFavourite"
                          class="star__default"
                          src="~assets/img/ui/star_simple.svg"
                          alt=""
                        >
                        <img
                          v-if="item.isFavourite"
                          class="star__checked"
                          src="~assets/img/ui/star_checked.svg"
                          alt=""
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="message__interlocutor"
                  :class="{ message__owner: +item.type === 2 }"
                >
                  <span class="message__body">
                    {{ item.body }}
                  </span>
                  <div class="message__time">
                    {{ item.messageTime }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chat__panel">
          <div class="input__wrapper">
            <input
              id="input__file"
              name="file"
              type="file"
              class="input input__file chat__btn_add"
              multiple
            >
            <label
              for="input__file"
              class="input__file-button"
            >
              <span class="icon-link" />
            </label>
          </div>

          <!--          <button class="chat__btn_add">-->
          <!--            <span class="icon-link" />-->
          <!--          </button>-->
          <div class="message__input">
            <div class="input">
              <base-field
                v-model="message_input"
                :placeholder="$t('chat.writeYouMessage')"
              />
            </div>
          </div>
          <button
            class="chat__btn_spend"
            @click="sendMessages()"
          >
            <span class="icon-send" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Messages',
  data() {
    return {
      isShowFavourite: false,
      message_input: '',
      messages: [
        {
          type: '1',
          rating: '',
          userName: 'Samantha Sparcs',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim Lorem ipsum dolor sit amet, consectetur adipiscing',
          messageTime: moment().format('HH:mm'),
          isFavourite: true,
        },
        {
          type: '2',
          rating: '',
          userName: 'Rosalia Vanse',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim Lorem ipsum dolor sit amet, consectetur adipiscing',
          messageTime: moment().format('HH:mm'),
          isFavourite: false,
        },
        {
          type: '1',
          rating: '',
          userName: 'Samantha Sparcs',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim Lorem ipsum dolor sit amet, consectetur adipiscing',
          messageTime: moment().format('HH:mm'),
          isFavourite: false,
        },
        {
          type: '2',
          rating: '',
          userName: 'Rosalia Vanse',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim Lorem ipsum dolor sit amet, consectetur adipiscing',
          messageTime: moment().format('HH:mm'),
          isFavourite: false,
        },
        {
          type: '1',
          rating: '',
          userName: 'Samantha Sparcs',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim Lorem ipsum dolor sit amet, consectetur adipiscing',
          messageTime: moment().format('HH:mm'),
          isFavourite: false,
        },
        {
          type: '2',
          rating: '',
          userName: 'Rosalia Vanse',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam',
          messageTime: moment().format('HH:mm'),
          isFavourite: false,
        },
      ],
    };
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    isRating(type) {
      return (type === 1 || type === 2);
    },
    showDetails() {
      this.$router.push('/messages');
    },
    // scrollChat() {
    //   this.$nextTick(() => {
    //     this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
    //   });
    // },
    sendMessages() {
      if (!this.messages && !this.messages.length) {
        return;
      }
      this.messages.push({
        userName: 'Rosalia Vanse',
        type: 2,
        body: this.message_input,
        isFavourite: false,
        messageTime: moment().format('HH:mm'),
      });
      this.messanges = '';
      // this.scrollChat();
    },
    onEnter(e, callback) {
      if (!e.ctrlKey) {
        e.preventDefault();
        callback(this.sendMessages);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.arrow-back {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon-more_horizontal::before {
  content: "\e951";
  color: $black500;
  font-size: 26px;
}

.icon-more {
  margin: 0 19px 0 0;
}

.input__wrapper {
  width: 100%;
  position: relative;
  margin: 15px 0;
  text-align: center;
}

.input__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}

.input__file-icon-wrapper {
  height: 60px;
  width: 60px;
  margin-right: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-right: 1px solid #fff;
}

.input__file-button-text {
  line-height: 1;
  margin-top: 1px;
}

.input__file-button {
  width: 100%;
  max-width: 40px;
  height: 40px;
  background: #F7F8FA;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 0 0 10px;
  transition: .2s;
}

.input__file-button:hover {
  width: 100%;
  max-width: 40px;
  height: 40px;
  background: #F7F8FA;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 0 0 10px;
  box-shadow: 0 0 6px rgba(0,0,0,0.2);
  transition: .2s;
}

.star {
  &__default {
    display: flex;
  }

  &__hover {
    display: none;
  }

  &:hover {
    .star {
      &__hover {
        display: flex;
      }

      &__default {
        display: none;
      }

      &__checked {
        display: none;
      }
    }
  }
}

.block {
  background: #FFFFFF;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100%;
  &__icon {
    &_fav {
      cursor: pointer;
    }

    &_perf {
      display: grid;
      grid-template-columns: 25px 25px 25px 25px 25px;
    }
  }
}

.info {
  display: flex;
  justify-content: center;
}

.quest {
  &__info {
    background: rgba(0, 131, 199, 0.1);
    width: 100%;
    max-width: 215px;
    border-radius: 6px;
    display: flex;
  }
  &__name {
    padding: 15px;
    color: $blue;
  }
}

.event {
  margin: 20px 0 0 0;
  font-size: 16px;
  color: $black600;
  font-weight: 400;
}

.name {
  &__underline {
    text-decoration: underline;
    margin: 20px 10px 20px 0;
    font-size: 16px;
    color: $black800;
    font-weight: 400;
  }
}

.icon-send::before {
  content: "\ea6b";
  font-size: 30px;
  color: $blue;
}

.icon-link::before {
  content: "\ea20";
  color: $black700;
  font-size: 30px;
}

.icon-short_left::before {
  content: "\ea6d";
  color: $black800;
  font-size: 26px;
  cursor: pointer;
}

.input {
  width: 100%;
  margin: 11px;
}
.row {
  &__container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

.message {
  &__time {
    margin: 15px 15px 0 15px;
    padding: 0;
    text-align: right;
  }
  &__interlocutor {
    background-color:#0083C7;
    margin: 0 54px 0 60px;
    border-radius: 6px;
    color: $white;
    padding: 15px;
  }
  &__owner {
    background-color:$black0;
    color: $black800;
    padding: 15px;
    margin: 0 54px 0 60px;
    border-radius: 6px;
  }
  &__input {
    width: 100%;
    display: flex;
    height: 70px;
  }
  &__body {
    display: flex;
    word-break: break-word;
    width: 100%;
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
  &__info-message {
    display: flex;
    justify-content: center;
  }
  &__header {
    border: 1px solid #E9EDF2;
    border-radius: 6px 0 0 0;
  }
  &__btn {
    &_spend {
      background-color: $black0;
      border-radius: 6px;
      width: 100%;
      height: 100%;
      max-width:40px;
      max-height: 40px;
      margin: 0 11px 0 0;
      transition: .2s;
    }
    &_spend:hover {
      background-color: $black0;
      border-radius: 6px;
      width: 100%;
      height: 100%;
      max-width:40px;
      max-height: 40px;
      margin: 0 11px 0 0;
      box-shadow: 0 0 6px rgba(0,0,0,0.2);
      transition: .2s;
    }
    &_add {
      background-color: $black0;
      border-radius: 6px;
      width: 100%;
      height: 100%;
      max-width:40px;
      max-height: 40px;
      margin: 0 -11px 0 0;
      transition: .2s;
    }
    &_add:hover {
      background-color: $black0;
      border-radius: 6px;
      width: 100%;
      height: 100%;
      max-width:40px;
      max-height: 40px;
      margin: 0 -11px 0 0;
      box-shadow: 0 0 6px rgba(0,0,0,0.2);
      transition: .2s;
    }
  }
  &__panel {
    height: 100%;
    max-height: 70px;
    width: 100%;
    display: grid;
    grid-template-columns: 4% 92% 4%;
    align-items: center;
    justify-items: center;
    border: 1px solid #E9EDF2;
    border-radius: 0px 0px 6px 6px;
  }
  &__name-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
  &__title {
    background-color: $white;
    margin: 15px 0 15px 15px;
    align-items: center;
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
  &__message {
    cursor: pointer;
    margin: 0 0 20px 0;
    display: inline-block;
  }
  &__messages {
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    max-height: 722px;
  }
  &__img-container {}
  &__img {
    width: 100%;
    height: 100%;
    max-height: 30px;
    max-width: 30px;
    border-radius: 84px;
    margin: 10px 10px 10px 20px;
  }
  &__name {
    padding: 0 0 0 12px;
  }
  &__star {
    margin: 0 20px 0 0;
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
</style>
