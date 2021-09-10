<template>
  <div class="chats-page">
    <div class="chats-page__body">
      <h2 class="chats-page__header">
        {{ $t('chat.messages') }}
      </h2>
      <div class="chats-container">
        <div class="chats-container__header">
          <div>{{ $t('chat.chat') }}</div>
          <ChatMenu />
        </div>
        <div class="chats-container__list">
          <div
            v-for="chat in chats.list"
            :key="chat.id"
            class="chats-container__chat chat"
            @click="handleSelChat(chat.id)"
          >
            <div class="chat__body">
              <div class="chat__data">
                <div class="chat__row">
                  <div class="chat__avas-cont">
                    <div
                      v-for="user in chat.members"
                      :key="user.id"
                      class="chat__ava-cont"
                    >
                      <img
                        class="chat__avatar"
                        :src="user.avatar ? user.avatar.url : require('~/assets/img/ui/template_avatar.svg')"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="chat__title chat__title_bold">
                    {{ chat.members.length > 1 ? 'Group Chat' : chat.members[0].firstName + ' ' + chat.members[0].lastName }}
                  </div>
                  <div
                    v-if="chat.members[0].additionalInfo.company"
                    class="chat__title chat__title_gray"
                  >
                    {{ chat.members[0].additionalInfo.company }}
                  </div>
                </div>
<!--                <div class="chat__row">-->
<!--                  <div class="chat__title">-->
<!--                    {{ $t('chat.quest') }}-->
<!--                  </div>-->
<!--                  <a-->
<!--                    href="#"-->
<!--                    class="chat__title"-->
<!--                  >-->
<!--                    questName-->
<!--                  </a>-->
<!--                </div>-->
                <div class="chat__row">
                  <div
                    v-if="userData.id === chat.lastMessage.sender.id"
                    class="chat__title"
                  >
                    {{ $t('chat.you') }}
                  </div>
                  <div class="chat__title chat__title_gray chat__title_ellipsis">
                    {{ chat.lastMessage.text }}
                  </div>
                </div>
              </div>
              <div class="chat__status">
                <div class="chat__unread-dot" />
                <!--                <div-->
                <!--                  v-if="isHideStar(chat.type)"-->
                <!--                  class="block__icon block__icon_fav star"-->
                <!--                  @click="item.isFavourite = !item.isFavourite"-->
                <!--                >-->
                <!--                  <img-->
                <!--                    class="star__hover"-->
                <!--                    src="~assets/img/ui/star_hover.svg"-->
                <!--                    alt=""-->
                <!--                  >-->
                <!--                  <img-->
                <!--                    v-if="item.isFavourite"-->
                <!--                    class="star__checked"-->
                <!--                    src="~assets/img/ui/star_checked.svg"-->
                <!--                    alt=""-->
                <!--                  >-->
                <!--                  <img-->
                <!--                    v-else-->
                <!--                    class="star__default"-->
                <!--                    src="~assets/img/ui/star_simple.svg"-->
                <!--                    alt=""-->
                <!--                  >-->
                <!--                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ChatMenu from '~/components/ui/ChatMenu';

export default {
  name: 'Messages',
  components: {
    ChatMenu,
  },
  data() {
    return {
      filter: {
        limit: 10,
        offset: 0,
      },
    };
  },
  computed: {
    ...mapGetters({
      chats: 'data/getChats',
      userData: 'user/getUserData',
    }),
  },
  async mounted() {
    this.getChats();
    this.SetLoader(false);
  },
  methods: {
    async getChats() {
      await this.$store.dispatch('data/getChatsList', this.filter);
    },
    handleSelChat(chatId) {
      this.$router.push(`/messages/${chatId}`);
    },
    isHideStar(type) {
      return !(type === 4 || type === 3);
    },
  },
};
</script>

<style lang="scss" scoped>

.chats-page {
  @include main;

  &__header {
    padding: 20px 0;
  }
}

.chats-container {
  background-color: $white;
  border: 1px solid #E9EDF2;
  border-radius: 6px;

  &__header {
    border-bottom: 1px solid #E9EDF2;
    padding: 15px;
    font-weight: 500;
    font-size: 18px;
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
  }
}

.chat {
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid #E9EDF2;
  }
  &__body {
    padding: 20px 30px;
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 30px;
  }
  &__data {
    display: grid;
    gap: 15px;
  }
  &__status {
    position: relative;
    display: grid;
    justify-items: center;
    align-items: center;
  }
  &__unread-dot {
    position: absolute;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: #0083C7;
    top: 0;
  }
  &__row {
    display: grid;
    grid-auto-flow: column;
    gap: 5px;
    justify-content: start;
    align-items: center;
  }
  &__avas-cont {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    height: 43px;
    min-width: 43px;
  }
  &__ava-cont {
    width: 25px;
  }
  &__avatar {
    width: 43px;
    height: 43px;
    border-radius: 50%;
    flex: none;
    position: absolute;
  }
  &__title {
    font-weight: 400;
    font-size: 16px;

    &_bold {
      font-weight: 500;
    }

    &_gray {
      color: #7C838D;
    }

    &_ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
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
      &__default,
      &__checked {
        display: none;
      }
    }
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

@include _1199 {
}
@include _991 {
}

@include _480 {
}

@include _380 {
}
</style>
