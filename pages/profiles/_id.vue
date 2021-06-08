<template>
  <div>
    <section
      id="main-section"
      class="main-section_white"
    >
      <div class="main-container">
        <div
          id="information-grid"
        >
          <div class="col info-grid__col_left">
            <div class="info-grid__avatar">
              <img
                class="info-grid__avatar"
                src="~/assets/img/temp/avatar.jpg"
                alt=""
              >
            </div>
            <div class="rating" />
            <!--              TODO: Добавить стили в BASE Button-->
            <nuxt-link
              class="reviews-amount"
              to="/profiles/1"
            >
              23 {{ $t('quests.reviews') }}
            </nuxt-link>
          </div>
          <div class="col info-grid__col info">
            <div class="title">
              {{ payload.user.name }}
            </div>
            <div class="description">
              {{ payload.user.desc }}
            </div>
            <div class="socials">
              <nuxt-link
                class="social__link"
                to="/profiles/1"
              >
                <span
                  class="icon-facebook"
                />
              </nuxt-link>
              <nuxt-link
                class="social__link"
                to="/profiles/1"
              >
                <span
                  class="icon-twitter"
                />
              </nuxt-link>
              <nuxt-link
                class="social__link"
                to="/profiles/1"
              >
                <span
                  class="icon-instagram"
                />
              </nuxt-link>
              <nuxt-link
                class="social__link"
                to="/profiles/1"
              >
                <span
                  class="icon-LinkedIn"
                />
              </nuxt-link>
            </div>
            <div class="contacts">
              <span class="icon-location" /><span class="contact__link">{{ payload.user.location }}</span>
              <span class="icon-phone" /><span class="contact__link">{{ payload.user.tel }}</span>
              <span class="icon-mail" /><span class="contact__link">{{ payload.user.email }}</span>
            </div>
          </div>

          <div class="share-btn" />
        </div>
      </div>
    </section>

    <section id="information-section">
      <div class="main-container">
        <!-- DATA -->

        <div
          v-if="userRole === 'worker'"
          id="data-grid"
        >
          <div class="data-item">
            <div class="card-title">
              {{ $t('quests.activeQuests') }}
            </div>
            <div class="number number_green">
              {{ payload.quests.activeQuests }}
            </div>
            <nuxt-link
              class="card-subtitle card-subtitle_green"
              to="/profiles/1"
            >
              {{ $t('quests.showAllActiveQuests') }}
            </nuxt-link>
          </div>
          <div class="data-item">
            <div class="card-title">
              {{ $t('quests.completedQuests') }}
            </div>
            <div class="number">
              {{ payload.quests.completedQuestsOneTime }}
            </div>
            <div class="card-subtitle">
              {{ $t('quests.oneTime') }}
            </div>
          </div>
          <div class="data-item">
            <div class="card-title">
              {{ $t('quests.completedQuests') }}
            </div>
            <div class="number">
              {{ payload.quests.completedQuestsFullTime }}
            </div>
            <div class="card-subtitle">
              {{ $t('quests.fullTime') }}
            </div>
          </div>
          <div class="data-item">
            <div class="card-title">
              {{ $t('quests.averageRating') }}
            </div>
            <div class="number number__rating">
              {{ payload.quests.averageRating }}
            </div>
            <div class="card-subtitle">
              {{ $t('quests.fromBig') }} {{ payload.quests.reviewCount }} {{ $t('quests.reviews') }}
            </div>
          </div>
        </div>

        <!-- REVIEWS -->
        <div class="title">
          {{ $t('quests.reviewsBig') }}
        </div>
        <div id="reviews-grid">
          <span
            v-for="(item, i) in payload.reviews"
            :key="i"
          >
            <div class="reviews-item">
              <div class="header">
                <div class="avatar">
                  <img
                    src="~/assets/img/temp/avatar-medium.jpg"
                    alt=""
                  >
                </div>
                <div class="name">
                  <div class="title">
                    {{ item.reviewerName }}
                  </div>
                  <div class="card-subtitle card-subtitle_green">
                    {{ $t('role.worker') }}
                  </div>
                </div>
              </div>
              <div class="subheader">
                <div class="card-subtitle">
                  {{ $t('quests.questBig') }}
                </div>
                <div class="card-subtitle -name">
                  {{ item.questName }}
                </div>
              </div>
              <div class="description">
                {{ item.reviewDesc }}
              </div>

              <div class="rating">
                {{ item.reviewerRating }}
              </div>
              <nuxt-link
                class="simple-button"
                to="/profiles/1"
              >
                {{ $t('quests.readCompletely') }}
              </nuxt-link>
            </div>
          </span>
        </div>
        <!-- ACTIVE -->

        <div id="active-quests-grid">
          <div class="title">
            {{ $t('quests.activeQuests') }}
          </div>
          <div class="active-quests-item">
            <img
              class="active-quests-image"
              src="~assets/img/temp/fake-card.svg"
              alt=""
            >
            <div class="inner">
              <div class="header">
                <img
                  class="active-quests-image-profile"
                  src="~/assets/img/app/fake_profile.png"
                  alt=""
                >
                <div class="name">
                  Samantha Sparcs
                </div>
              </div>
              <div class="subheader">
                200m {{ $t('quests.fromYou') }}
              </div>
              <div class="quest-title">
                <a href="#">Paint the garage quickly</a>
              </div>
              <div class="description">
                Hi, i’m urgently looking for a skilled man that can paint my Garage doors and a couple of walls around the garage and by the way...
              </div>
              <div class="footer">
                <div class="priority">
                  <div class="text">
                    {{ $t('priority.low') }}
                  </div>
                </div>
                <div class="cost -green">
                  1500 WUSD
                </div>
              </div>
            </div>
            <!--              TODO: Добавить стили в BASE Button-->
            <nuxt-link
              class="simple-button"
              to="/profiles/1"
            >
              {{ $t('profile.details') }}
            </nuxt-link>
            <div class="favorite" />
          </div>
          <div class="button">
            <nuxt-link
              class="more-button"
              to="/profiles/1"
            >
              {{ $t('meta.showAllReviews') }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProfileID',
  data() {
    return {
      payload: {
        user: {
          name: 'Samantha Sparcs',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel',
          location: 'Moscow, Lenina street, 3',
          tel: '+7 989 989 98 98',
          email: 'worker@gmail.com',
        },
        quests: {
          activeQuests: '12',
          completedQuestsOneTime: '12',
          completedQuestsFullTime: '2',
          averageRating: '4.5',
          reviewCount: '23',
        },
        reviews: [
          {
            reviewerName: 'Edward Cooper',
            reviewerRating: '4.00',
            questName: 'SPA saloon design',
            reviewDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum ...',
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      tags: 'ui/getTags',
      userRole: 'user/getUserRole',
      userData: 'user/getUserData',
    }),
  },
  async mounted() {
    this.SetLoader(true);
    this.SetLoader(false);
  },
  methods: {
    getPriority(index) {
      const priority = {
        0: this.$t('priority.low'),
        1: this.$t('priority.normal'),
        2: this.$t('priority.urgent'),
      };
      return priority[index] || 'None';
    },
    getPriorityClass(index) {
      const priority = {
        0: 'block__priority_low',
        1: 'block__priority_normal',
        2: 'block__priority_urgent',
      };
      return priority[index] || '';
    },
  },
};
</script>

<style lang="scss" scoped>

.card-subtitle {
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #4C5767;
  &_green {
    color: #00AA5B !important;
  }
}

.number {
  font-weight: bold;
  font-size: 30px;
  line-height: 130%;
  color: #0083C7;
  margin: 9px 0;
  &_green {
    color: #00AA5B !important;
  }
  &__rating {
    color: #353C47;
    background-image: url("data:image/svg+xml,%3Csvg width='28' height='26' viewBox='0 0 28 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a             %3Cpath d='M14 0.5L18.1145 8.83688L27.3148 10.1738L20.6574 16.6631L22.229 25.8262L14 21.5L5.77101 25.8262L7.3426 16.6631L0.685208 10.1738L9.8855 8.83688L14 0.5Z' fill='%23E8D20D'/%3E\a             %3C/svg%3E                           \a             ");
    background-position: 55px 4px;
    background-repeat: no-repeat;
  }
}

.block {
  background: #FFFFFF;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 230px;

  &__img {
    max-width: 240px;
  }

  &__locate {
    display: grid;
    grid-template-columns: 20px 1fr;
    grid-gap: 5px;
    align-items: center;

    span::before {
      font-size: 20px;
      color: $black500;
    }
  }

  &__status {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 15px;
  }

  &__amount {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 130%;
    color: #00AA5B;
    text-transform: uppercase;
  }

  &__priority {
    @include text-simple;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    font-size: 12px;
    line-height: 130%;
    height: 24px;
    padding: 0 5px;

    &_low {
      background: rgba(34, 204, 20, 0.1);
      color: #22CC14;
    }

    &_urgent {
      background: rgba(223, 51, 51, 0.1);
      color: #DF3333;
    }

    &_normal {
      background: rgba(232, 210, 13, 0.1);
      color: #E8D20D;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__right {
    padding: 20px 20px 20px 30px;
    display: grid;
    grid-template-columns: auto;
    grid-gap: 10px;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__icon {
    &_fav {
      cursor: pointer;
    }
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    min-width: 146px;
    height: 34px;
    background: transparent;

    span::before {
      font-size: 24px;
      color: $blue;
    }
  }

  &__text {
    @include text-simple;

    &_details {
      font-size: 16px;
      line-height: 130%;
      color: $blue;
    }

    &_desc {
      font-size: 16px;
      line-height: 130%;
      color: $black700;
    }

    &_blue {
      font-weight: 500;
      font-size: 18px;
      line-height: 130%;
      color: $blue;
    }

    &_title {
      font-weight: 500;
      font-size: 16px;
      line-height: 130%;
      color: $black800;
    }

    &_locate {
      font-size: 14px;
      line-height: 130%;
      color: #7C838D;
    }

    &_grey {
      font-size: 16px;
      line-height: 130%;
      color: #7C838D;
    }
  }
}
.quest{
  &__spec {
    @include text-simple;
    font-style: normal;
    font-weight: 500;
    font-size: 25px;
    color: $black800;
    margin: 0 0 0 0;
  }
  &__title {
    @include text-simple;
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    color: $black800;
    margin: 0 0 10px 0;
  }
  &__description {
    @include text-simple;
    font-style: normal;
    color: $black700;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    /* or 21px */
  }
  &__location {
    @include text-simple;
    color: $black700;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  &__count {
    @include text-simple;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: $black400;
  }
  &__group {
    color:$black800;
    display: flex;
    flex-direction: row;
  }
  &__card {
    color:$black800;
  }
}

.social {
  &__link {
    text-decoration: none;
  }
}

.contact {
  &__link {
    text-decoration: none;
    font-size: 14px;
    line-height: 130%;
    color: #7C838D;
    margin-right: 30px;
    justify-content: center;
    align-items: center;
  }
}

.icon {
  &-facebook::before {
    color: #0A7EEA;
    font-size: 20px;
    cursor: pointer;
  }
  &-twitter::before {
    color: #24CAFF;
    font-size: 20px;
    cursor: pointer;
  }
  &-instagram::before {
    color: #C540F3;
    font-size: 20px;
    cursor: pointer;
  }
  &-LinkedIn::before {
    color: #57A6EF;
    font-size: 20px;
    cursor: pointer;
  }
  &-Earth::before {
    color: #7C838D;
    font-size: 16px;
    cursor: pointer;
    padding-right: 5px;
  }
  &-location::before {
    color: #7C838D;
    font-size: 16px;
    cursor: pointer;
    padding-right: 5px;
  }
  &-phone::before {
    color: #7C838D;
    font-size: 16px;
    cursor: pointer;
    padding-right: 5px;
  }
  &-mail::before {
    color: #7C838D;
    font-size: 16px;
    cursor: pointer;
    padding-right: 5px;
  }
}

.main-section {
  &_white {
    background-color: $white;
  }
}
.main-container {
  width: 1180px;
  margin: 0 auto;
}
.info-grid {
  &__avatar {
    max-width: 142px;
    max-height: 142px;
    width: 100%;
    height: 100%;
  }
  &__col {
    &_left {
      max-width: 157px;
      width: 100%;
      padding: 0 15px 0 0;
    }
  }
}
.rating {
  padding: 0 15px 0 0;
}

.col {
  &__header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;}
  &__main-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#main-header #header .col {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

#main-header #header .col .logo {
  height: 30px;
  width: 173px;
  background-image: url("data:image/svg+xml,%3Csvg width='173' height='30' viewBox='0 0 173 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a           %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M22.8028 15C22.8028 19.6024 19.1567 23.3333 14.6589 23.3333C10.1612 23.3333 6.51509 19.6024 6.51509 15C6.51509 10.3976 10.1612 6.66667 14.6589 6.66667C19.1567 6.66667 22.8028 10.3976 22.8028 15ZM19.5453 15C19.5453 17.7614 17.3576 20 14.6589 20C11.9603 20 9.77263 17.7614 9.77263 15C9.77263 12.2386 11.9603 10 14.6589 10C17.3576 10 19.5453 12.2386 19.5453 15Z' fill='url(%23paint0_linear)'/%3E\a           %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 15C0 23.2843 6.56304 30 14.6589 30H31.4489L34.7065 26.6667H23.8735C24.5941 26.0699 25.2584 25.4047 25.8568 24.6806H36.6474L40 21.25H27.9887C28.8421 19.3474 29.3179 17.2305 29.3179 15C29.3179 6.71573 22.7549 0 14.6589 0C6.56304 0 0 6.71573 0 15ZM14.6589 26.6667C20.9558 26.6667 26.0604 21.4433 26.0604 15C26.0604 8.55668 20.9558 3.33333 14.6589 3.33333C8.36213 3.33333 3.25754 8.55668 3.25754 15C3.25754 21.4433 8.36213 26.6667 14.6589 26.6667Z' fill='url(%23paint1_linear)'/%3E\a           %3Cpath d='M50.2191 23H53.6658L56.843 12.0636H56.9737L60.1591 23H63.6058L68.392 6.27273H64.5288L61.7599 17.9197H61.6129L58.5664 6.27273H55.2585L52.2038 17.8952H52.065L49.2962 6.27273H45.4329L50.2191 23ZM74.5402 23.245C78.3463 23.245 80.7149 20.6396 80.7149 16.7763C80.7149 12.8885 78.3463 10.2912 74.5402 10.2912C70.7341 10.2912 68.3655 12.8885 68.3655 16.7763C68.3655 20.6396 70.7341 23.245 74.5402 23.245ZM74.5566 20.5497C72.8005 20.5497 71.9021 18.9407 71.9021 16.7518C71.9021 14.5629 72.8005 12.9457 74.5566 12.9457C76.2799 12.9457 77.1784 14.5629 77.1784 16.7518C77.1784 18.9407 76.2799 20.5497 74.5566 20.5497ZM82.9774 23H86.4568V15.9023C86.4568 14.3587 87.5839 13.2969 89.1194 13.2969C89.6013 13.2969 90.2629 13.3786 90.5896 13.4847V10.3974C90.2792 10.3239 89.8463 10.2749 89.4951 10.2749C88.0903 10.2749 86.9387 11.0916 86.4813 12.6435H86.3506V10.4545H82.9774V23ZM92.3885 23H95.8679V19.0142L96.8072 17.9442L100.229 23H104.305L99.4126 15.886L104.068 10.4545H100.074L96.0558 15.2163H95.8679V6.27273H92.3885V23ZM121.212 14.6364C121.212 9.16406 117.814 6.04403 113.379 6.04403C108.92 6.04403 105.547 9.16406 105.547 14.6364C105.547 20.0842 108.92 23.2287 113.379 23.2287C114.425 23.2287 115.413 23.0572 116.311 22.7141L117.659 24.3722H120.959L118.566 21.3665C120.199 19.9045 121.212 17.6175 121.212 14.6364ZM112.154 17.1847L114.294 20.0107C114.008 20.0678 113.698 20.1005 113.379 20.1005C110.806 20.1005 109.132 18.1811 109.132 14.6364C109.132 11.0916 110.806 9.17223 113.379 9.17223C115.944 9.17223 117.626 11.0916 117.626 14.6364C117.626 16.4577 117.177 17.8544 116.401 18.7773L115.16 17.1847H112.154ZM131.812 17.6584C131.82 19.3409 130.668 20.223 129.418 20.223C128.103 20.223 127.254 19.3001 127.246 17.8217V10.4545H123.766V18.4425C123.775 21.3746 125.49 23.1634 128.014 23.1634C129.9 23.1634 131.256 22.1914 131.82 20.7212H131.95V23H135.291V10.4545H131.812V17.6584ZM143.791 23.245C146.895 23.245 148.986 21.734 149.476 19.4062L146.258 19.1939C145.907 20.1495 145.008 20.6477 143.849 20.6477C142.109 20.6477 141.006 19.4961 141.006 17.6257V17.6175H149.55V16.6619C149.55 12.3984 146.969 10.2912 143.653 10.2912C139.961 10.2912 137.568 12.913 137.568 16.7844C137.568 20.7621 139.928 23.245 143.791 23.245ZM141.006 15.4613C141.08 14.032 142.166 12.8885 143.71 12.8885C145.221 12.8885 146.266 13.9666 146.274 15.4613H141.006ZM162.258 14.032C161.948 11.7205 160.086 10.2912 156.917 10.2912C153.707 10.2912 151.591 11.7777 151.6 14.1953C151.591 16.0739 152.776 17.2908 155.226 17.7809L157.399 18.2138C158.493 18.4343 158.991 18.8345 159.008 19.4634C158.991 20.2067 158.183 20.7376 156.966 20.7376C155.724 20.7376 154.899 20.2067 154.687 19.1857L151.265 19.3654C151.591 21.7667 153.633 23.245 156.958 23.245C160.208 23.245 162.536 21.587 162.544 19.1122C162.536 17.299 161.352 16.2127 158.918 15.7145L156.647 15.2571C155.479 15.0039 155.046 14.6037 155.055 13.9993C155.046 13.2479 155.896 12.7578 156.974 12.7578C158.183 12.7578 158.901 13.4194 159.073 14.228L162.258 14.032ZM171.408 10.4545H169.048V7.44886H165.568V10.4545H163.853V13.0682H165.568V19.6023C165.552 22.0607 167.226 23.2777 169.75 23.1715C170.649 23.1388 171.286 22.9592 171.637 22.8448L171.09 20.2557C170.918 20.2884 170.551 20.37 170.224 20.37C169.53 20.37 169.048 20.1087 169.048 19.1449V13.0682H171.408V10.4545Z' fill='%23353C47'/%3E\a           %3Cdefs%3E\a           %3ClinearGradient id='paint0_linear' x1='0' y1='0' x2='28.8' y2='38.4' gradientUnits='userSpaceOnUse'%3E\a           %3Cstop stop-color='%230083C7'/%3E\a           %3Cstop offset='1' stop-color='%2300AA5B'/%3E\a           %3C/linearGradient%3E\a           %3ClinearGradient id='paint1_linear' x1='0' y1='0' x2='28.8' y2='38.4' gradientUnits='userSpaceOnUse'%3E\a           %3Cstop stop-color='%230083C7'/%3E\a           %3Cstop offset='1' stop-color='%2300AA5B'/%3E\a           %3C/linearGradient%3E\a           %3C/defs%3E\a           %3C/svg%3E                   \a           ");
  background-position: 0 0;
  background-repeat: no-repeat;
  margin-right: 35px;
}

#main-header #header .col .navigation {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

#main-header #header .col .navigation a {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 130%;
  text-decoration: none;
  color: #8D96A2;
  margin-right: 25px;
}

#main-header #header .col .navigation .instruments-btn {
  color: #8D96A2;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a             %3Cpath d='M5 5.5L10 0.5L0 0.5L5 5.5Z' fill='%238D96A2'/%3E\a             %3C/svg%3E                             \a             ");
  background-repeat: no-repeat;
  background-position: 100% 4px;
  padding-right: 24px;
}

#main-header #header .col .navigation .instruments-btn:hover {
  cursor: pointer;
}

#main-header #header .col .-btn:hover {
  cursor: pointer;
}

#main-header #header .col .language {
  text-transform: uppercase;
  color: #4C5767;
  font-size: 16px;
  line-height: 130%;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a           %3Cpath d='M5 5.5L10 0.5L0 0.5L5 5.5Z' fill='%238D96A2'/%3E\a           %3C/svg%3E                             \a           ");
  background-repeat: no-repeat;
  background-position: 100% 7px;
  padding-right: 24px;
  margin-right: 40px;
}

#main-header #header .col .communication {
  height: 24px;
  width: 24px;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a           %3Cpath d='M3 21V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H9C8.56713 16.9992 8.14582 17.1396 7.8 17.4L3 21ZM5 5V17L7.134 15.4C7.47964 15.1393 7.90107 14.9988 8.334 15H19V5H5Z' fill='%237C838D'/%3E\a           %3C/svg%3E                                             \a           ");
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 36px;
}

#main-header #header .col .notification {
  height: 24px;
  width: 24px;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a           %3Cpath d='M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H13C12.3479 2.86394 11.9967 3.91762 12 5C12 5.25138 12.0187 5.50241 12.056 5.751H12C10.7799 5.67197 9.60301 6.21765 8.875 7.2C8.25255 8.18456 7.94714 9.33638 8 10.5V17H16V10.5C16 10.289 15.993 10.086 15.979 9.9C16.6405 10.0366 17.3226 10.039 17.985 9.907C17.996 10.118 18 10.319 18 10.507V16L20 17V19Z' fill='%237C838D'/%3E\a           %3Cpath d='M15.307 7.477C15.8055 7.81839 16.3958 8.00073 17 8C18.6568 8 20 6.65685 20 5C19.9998 3.5728 18.9942 2.34329 17.5954 2.06004C16.1966 1.77678 14.7919 2.5182 14.2365 3.8329C13.6811 5.1476 14.1288 6.67158 15.307 7.477Z' fill='%23DF3333'/%3E\a           %3C/svg%3E                                                      \a           ");
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 36px;
}

#main-header #header .col .menu {
  height: 24px;
  width: 24px;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a           %3Cpath d='M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z' fill='%237C838D'/%3E\a           %3C/svg%3E                                                              \a           ");
  background-repeat: no-repeat;
  background-position: center;
}

#main-section #information-grid {
  padding: 25px 0;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

#main-section #information-grid .share-btn {
  height: 24px;
  width: 24px;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a         %3Cpath d='M17.5 22C16.4179 22.0125 15.3923 21.5181 14.7282 20.6637C14.0641 19.8094 13.8379 18.6935 14.117 17.648L7.85697 14.07C6.77525 15.0611 5.18965 15.2708 3.88746 14.5951C2.58526 13.9194 1.84384 12.5023 2.03134 11.0472C2.21883 9.5922 3.2953 8.40926 4.72625 8.08577C6.15719 7.76227 7.63783 8.36714 8.43297 9.60002L14.116 6.35102C14.0424 6.07321 14.0035 5.78738 14 5.50002C13.9856 3.82674 15.1478 2.37316 16.7832 2.01884C18.4186 1.66452 20.0781 2.50676 20.7576 4.03594C21.4371 5.56511 20.95 7.36125 19.5909 8.33753C18.2319 9.31381 16.3742 9.20211 15.142 8.07002L8.99097 11.585C8.98488 11.8443 8.94863 12.1021 8.88297 12.353L15.142 15.93C16.2942 14.8726 18.0087 14.7093 19.3399 15.5303C20.671 16.3514 21.2946 17.9568 20.8668 19.461C20.439 20.9653 19.0639 22.0023 17.5 22ZM17.5 17C16.6715 17 16 17.6716 16 18.5C16 19.3284 16.6715 20 17.5 20C18.3284 20 19 19.3284 19 18.5C19 17.6716 18.3284 17 17.5 17ZM5.49997 10C4.67154 10 3.99997 10.6716 3.99997 11.5C3.99997 12.3284 4.67154 13 5.49997 13C6.3284 13 6.99997 12.3284 6.99997 11.5C6.99997 10.6716 6.3284 10 5.49997 10ZM17.5 4.00002C16.6715 4.00002 16 4.67159 16 5.50002C16 6.32845 16.6715 7.00002 17.5 7.00002C18.3284 7.00002 19 6.32845 19 5.50002C19 4.67159 18.3284 4.00002 17.5 4.00002Z' fill='%237C838D'/%3E\a         %3C/svg%3E                                                                   \a         ");
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  right: 0;
  top: 28px;
}

#main-section #information-grid .share-btn:hover {
  cursor: pointer;
}

.info {
  justify-content: initial !important;
}
.contacts {
  display: flex;
  align-items: center;
}

#main-section #information-grid .col {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

#main-section #information-grid .col .avatar {
  border-radius: 89px;
}

#main-section #information-grid .col .rating {
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg width='120' height='20' viewBox='0 0 120 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a           %3Cpath d='M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z' fill='%23E8D20D'/%3E\a           %3Cpath d='M35 0L37.9389 5.95492L44.5106 6.90983L39.7553 11.5451L40.8779 18.0902L35 15L29.1221 18.0902L30.2447 11.5451L25.4894 6.90983L32.0611 5.95492L35 0Z' fill='%23E8D20D'/%3E\a           %3Cpath d='M60 0L62.9389 5.95492L69.5106 6.90983L64.7553 11.5451L65.8779 18.0902L60 15L54.1221 18.0902L55.2447 11.5451L50.4894 6.90983L57.0611 5.95492L60 0Z' fill='%23E8D20D'/%3E\a           %3Cpath d='M85 0L87.9389 5.95492L94.5106 6.90983L89.7553 11.5451L90.8779 18.0902L85 15L79.1221 18.0902L80.2447 11.5451L75.4894 6.90983L82.0611 5.95492L85 0Z' fill='%23E8D20D'/%3E\a           %3Cpath d='M110 0L112.939 5.95492L119.511 6.90983L114.755 11.5451L115.878 18.0902L110 15L104.122 18.0902L105.245 11.5451L100.489 6.90983L107.061 5.95492L110 0Z' fill='%23E9EDF2'/%3E\a           %3C/svg%3E                                                              \a           ");
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 20px;
}

#main-section #information-grid .col .reviews-amount {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  text-decoration: none;
  color: #7C838D;
  text-align: center;
  margin-top: 5px;
}

#main-section #information-grid .col .description {
  margin: 15px 0;
}

#main-section #information-grid .col .socials {
  margin-bottom: 15px;
}

#main-section #information-grid .col .socials a {
  display: inline-block;
}

#main-section #information-grid .col .socials .icon {
  height: 24px;
  width: 24px;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 5px;
}

#main-section #information-grid .col .contacts a {
  text-decoration: none;
  font-size: 14px;
  line-height: 130%;
  color: #7C838D;
  margin-right: 30px;
}

#main-section #information-grid .col .contacts .location {
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a           %3Cpath d='M9.99999 17.5C8.94744 16.6022 7.97181 15.6179 7.08332 14.5575C5.74999 12.965 4.16666 10.5933 4.16666 8.33334C4.16548 5.97297 5.58686 3.8445 7.76755 2.94118C9.94823 2.03785 12.4584 2.53771 14.1267 4.20751C15.2237 5.29968 15.8383 6.78534 15.8334 8.33334C15.8334 10.5933 14.25 12.965 12.9167 14.5575C12.0282 15.6179 11.0525 16.6022 9.99999 17.5ZM9.99999 5.83334C9.10683 5.83334 8.28151 6.30984 7.83493 7.08334C7.38835 7.85685 7.38835 8.80984 7.83493 9.58335C8.28151 10.3568 9.10683 10.8333 9.99999 10.8333C11.3807 10.8333 12.5 9.71406 12.5 8.33334C12.5 6.95263 11.3807 5.83334 9.99999 5.83334Z' fill='%237C838D'/%3E\a           %3C/svg%3E                                                                       \a           ");
  background-repeat: no-repeat;
  background-position: 0 -2px;
  padding-left: 25px;
}

#main-section #information-grid .col .contacts .phone {
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a           %3Cpath d='M15.8312 16.6667C8.72155 16.6767 3.32573 11.2163 3.33334 4.16877C3.33334 3.70853 3.70643 3.33334 4.16667 3.33334H6.36613C6.77911 3.33334 7.12994 3.63678 7.19058 4.04528C7.33592 5.02434 7.62097 5.97748 8.03707 6.8756L8.1227 7.06043C8.24177 7.31743 8.16106 7.62279 7.93056 7.7874C7.24941 8.27384 6.9891 9.25297 7.51974 10.017C8.18564 10.9757 9.02504 11.8149 9.98355 12.4805C10.7475 13.011 11.7265 12.7507 12.2129 12.0697C12.3776 11.8391 12.6832 11.7583 12.9403 11.8775L13.1243 11.9627C14.0225 12.3788 14.9757 12.6638 15.9549 12.8091C16.3634 12.8698 16.6667 13.2206 16.6667 13.6336V15.8333C16.6667 16.2936 16.2927 16.6667 15.8324 16.6667L15.8312 16.6667Z' fill='%237C838D'/%3E\a           %3C/svg%3E                                                                                \a           ");
  background-repeat: no-repeat;
  background-position: 0 -1px;
  padding-left: 25px;
}

#main-section #information-grid .col .contacts .email {
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a           %3Cpath d='M16.6667 16.6667H3.33333C2.41286 16.6667 1.66667 15.9205 1.66667 15V4.92751C1.70551 4.03547 2.44044 3.3325 3.33333 3.33334H16.6667C17.5871 3.33334 18.3333 4.07954 18.3333 5.00001V15C18.3333 15.9205 17.5871 16.6667 16.6667 16.6667ZM3.33333 6.55668V15H16.6667V6.55668L10 11L3.33333 6.55668ZM4 5.00001L10 9.00001L16 5.00001H4Z' fill='%237C838D'/%3E\a           %3C/svg%3E                                                                                \a           ");
  background-repeat: no-repeat;
  background-position: 0 -1px;
  padding-left: 25px;
}

#information-section #data-grid {
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

#information-section #data-grid .data-item {
  display: grid;
  border-radius: 6px;
  background-color: #fff;
  padding: 20px;
}

#information-section #data-grid .data-item .number {
  @include text-simple;
  font-weight: bold;
  font-size: 30px;
  line-height: 130%;
  color: #0083C7;
  margin: 9px 0;
}

#information-section #data-grid .data-item .number.-raiting {
  @include text-simple;
  color: #353C47;
  background-image: url("data:image/svg+xml,%3Csvg width='28' height='26' viewBox='0 0 28 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a             %3Cpath d='M14 0.5L18.1145 8.83688L27.3148 10.1738L20.6574 16.6631L22.229 25.8262L14 21.5L5.77101 25.8262L7.3426 16.6631L0.685208 10.1738L9.8855 8.83688L14 0.5Z' fill='%23E8D20D'/%3E\a             %3C/svg%3E                           \a             ");
  background-position: 55px 4px;
  background-repeat: no-repeat;
}

#information-section #reviews-grid {
  padding-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

#information-section #reviews-grid .reviews-item {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 20px 20px 69px;
  position: relative;
}

#information-section #reviews-grid .reviews-item .header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

#information-section #reviews-grid .reviews-item .header .avatar {
  margin-right: 15px;
}

#information-section #reviews-grid .reviews-item .subheader {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 15px 0;
}

#information-section #reviews-grid .reviews-item .subheader .-name {
  font-weight: normal;
  color: #7C838D;
  margin-left: 10px;
}

#information-section #reviews-grid .reviews-item .rating {
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: #4C5767;
  padding-left: 133px;
  position: absolute;
  top: 20px;
  right: 20px;
  background-image: url("data:image/svg+xml,%3Csvg width='120' height='21' viewBox='0 0 120 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a           %3Cpath d='M10 0.5L12.9389 6.45492L19.5106 7.40983L14.7553 12.0451L15.8779 18.5902L10 15.5L4.12215 18.5902L5.24472 12.0451L0.489435 7.40983L7.06107 6.45492L10 0.5Z' fill='%23E8D20D'/%3E\a           %3Cpath d='M35 0.5L37.9389 6.45492L44.5106 7.40983L39.7553 12.0451L40.8779 18.5902L35 15.5L29.1221 18.5902L30.2447 12.0451L25.4894 7.40983L32.0611 6.45492L35 0.5Z' fill='%23E8D20D'/%3E\a           %3Cpath d='M60 0.5L62.9389 6.45492L69.5106 7.40983L64.7553 12.0451L65.8779 18.5902L60 15.5L54.1221 18.5902L55.2447 12.0451L50.4894 7.40983L57.0611 6.45492L60 0.5Z' fill='%23E8D20D'/%3E\a           %3Cpath d='M85 0.5L87.9389 6.45492L94.5106 7.40983L89.7553 12.0451L90.8779 18.5902L85 15.5L79.1221 18.5902L80.2447 12.0451L75.4894 7.40983L82.0611 6.45492L85 0.5Z' fill='%23E8D20D'/%3E\a           %3Cpath d='M110 0.5L112.939 6.45492L119.511 7.40983L114.755 12.0451L115.878 18.5902L110 15.5L104.122 18.5902L105.245 12.0451L100.489 7.40983L107.061 6.45492L110 0.5Z' fill='%23E9EDF2'/%3E\a           %3C/svg%3E                               \a           ");
  background-position: 0 0;
  background-repeat: no-repeat;
}

#information-section #active-quests-grid {
  padding-bottom: 59px;
}

#information-section #active-quests-grid .active-quests-item {
  display: grid;
  grid-template-columns: 240px 1fr;
  background-color: #fff;
  border-radius: 6px;
  margin: 20px 0;
  position: relative;
}
#information-section #active-quests-grid .active-quests-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 6px 0 0 6px;
}

#information-section #active-quests-grid .active-quests-image-profile {
  object-fit: cover;
  width: 30px;
  height: 30px;
  border-radius: 100%;
}

#information-section #active-quests-grid .active-quests-item .inner {
  padding: 22px 20px 23px 30px;
}

#information-section #active-quests-grid .active-quests-item .inner .header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

#information-section #active-quests-grid .active-quests-item .inner .header .name {
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: #1D2127;
  margin-left: 10px;
}

#information-section #active-quests-grid .active-quests-item .inner .subheader {
  font-size: 14px;
  line-height: 130%;
  color: #7C838D;
  padding-left: 25px;
  margin: 10px 0;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a             %3Cpath d='M9.99999 17.5C8.94744 16.6022 7.97181 15.6179 7.08332 14.5575C5.74999 12.965 4.16666 10.5933 4.16666 8.33333C4.16548 5.97295 5.58686 3.84449 7.76755 2.94116C9.94823 2.03783 12.4584 2.5377 14.1267 4.2075C15.2237 5.29967 15.8383 6.78532 15.8334 8.33333C15.8334 10.5933 14.25 12.965 12.9167 14.5575C12.0282 15.6179 11.0525 16.6022 9.99999 17.5ZM9.99999 5.83333C9.10683 5.83333 8.28151 6.30983 7.83493 7.08333C7.38835 7.85683 7.38835 8.80983 7.83493 9.58333C8.28151 10.3568 9.10683 10.8333 9.99999 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 9.99999 5.83333Z' fill='%237C838D'/%3E\a             %3C/svg%3E                                         \a             ");
  background-position: 0 0;
  background-repeat: no-repeat;
}

#information-section #active-quests-grid .active-quests-item .inner .quest-title a {
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 130%;
  color: #0083C7;
}

#information-section #active-quests-grid .active-quests-item .inner .description {
  font-size: 16px;
  line-height: 130%;
  color: #353C47;
  margin: 10px 0 19px;
}

#information-section #active-quests-grid .active-quests-item .inner .footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

#information-section #active-quests-grid .active-quests-item .inner .footer .priority {
  background-color: rgba(34, 204, 20, 0.1);
  padding: 4px 5px;
  border-radius: 3px;
}

#information-section #active-quests-grid .active-quests-item .inner .footer .priority .text {
  font-size: 12px;
  line-height: 130%;
  color: #22CC14;
}

#information-section #active-quests-grid .active-quests-item .inner .footer .cost {
  font-weight: bold;
  font-size: 18px;
  line-height: 130%;
  color: #00AA5B;
  margin-left: 15px;
}

#information-section #active-quests-grid .active-quests-item .favorite {
  height: 24px;
  width: 24px;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a           %3Cpath d='M11.9999 1.2905L15.6209 7.6169L15.7276 7.80347L15.9365 7.85433L22.8223 9.53117L18.1753 15.16L18.0458 15.3168L18.0626 15.5194L18.673 22.9156L12.2034 20.0337L11.9999 19.9431L11.7965 20.0337L5.32679 22.9156L5.93727 15.5194L5.954 15.3168L5.82454 15.16L1.17752 9.53117L8.06333 7.85433L8.27219 7.80347L8.37897 7.6169L11.9999 1.2905Z' fill='white' stroke='%23E9EDF2'/%3E\a           %3C/svg%3E                                                    \a           ");
  background-position: 0 0;
  background-repeat: no-repeat;
  position: absolute;
  top: 23px;
  right: 20px;
}

#information-section #active-quests-grid .active-quests-item .favorite:hover {
  cursor: pointer;
}

#information-section #active-quests-grid .button {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

#information-section #active-quests-grid .button .more-button {
  display: inline-block;
  text-decoration: none;
  font-size: 16px;
  line-height: 130%;
  color: #0083C7;
  border: 1px solid rgba(0, 131, 199, 0.1);
  border-radius: 6px;
  padding: 13px 67px 13px 28px;
  background-image: url("data:image/svg+xml,%3Csvg width='11' height='6' viewBox='0 0 11 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a           %3Cpath d='M5.5 5.5L10.5 0.5L0.5 0.5L5.5 5.5Z' fill='%230083C7'/%3E\a           %3C/svg%3E                                                          \a           ");
  background-position: 82% 21px;
  background-repeat: no-repeat;
}

#main-footer #footer {
  padding: 21px 0 27px;
}

#main-footer #footer .header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  border-bottom: 1px solid #E9EDF2;
  padding-bottom: 44px;
}

#main-footer #footer .header .logo {
  width: 173px;
  height: 30px;
  background-image: url("data:image/svg+xml,%3Csvg width='173' height='30' viewBox='0 0 173 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a           %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M22.8028 15C22.8028 19.6024 19.1567 23.3333 14.6589 23.3333C10.1612 23.3333 6.51509 19.6024 6.51509 15C6.51509 10.3976 10.1612 6.66667 14.6589 6.66667C19.1567 6.66667 22.8028 10.3976 22.8028 15ZM19.5453 15C19.5453 17.7614 17.3576 20 14.6589 20C11.9603 20 9.77263 17.7614 9.77263 15C9.77263 12.2386 11.9603 10 14.6589 10C17.3576 10 19.5453 12.2386 19.5453 15Z' fill='%238D96A2'/%3E\a           %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 15C0 23.2843 6.56304 30 14.6589 30H31.4489L34.7065 26.6667H23.8735C24.5941 26.0699 25.2584 25.4047 25.8568 24.6806H36.6474L40 21.25H27.9887C28.8421 19.3474 29.3179 17.2305 29.3179 15C29.3179 6.71573 22.7549 0 14.6589 0C6.56304 0 0 6.71573 0 15ZM14.6589 26.6667C20.9558 26.6667 26.0604 21.4433 26.0604 15C26.0604 8.55668 20.9558 3.33333 14.6589 3.33333C8.36213 3.33333 3.25754 8.55668 3.25754 15C3.25754 21.4433 8.36213 26.6667 14.6589 26.6667Z' fill='%238D96A2'/%3E\a           %3Cpath d='M50.2191 23H53.6658L56.843 12.0636H56.9737L60.1591 23H63.6058L68.392 6.27273H64.5288L61.7599 17.9197H61.6129L58.5664 6.27273H55.2585L52.2038 17.8952H52.065L49.2962 6.27273H45.4329L50.2191 23ZM74.5402 23.245C78.3463 23.245 80.7149 20.6396 80.7149 16.7763C80.7149 12.8885 78.3463 10.2912 74.5402 10.2912C70.7341 10.2912 68.3655 12.8885 68.3655 16.7763C68.3655 20.6396 70.7341 23.245 74.5402 23.245ZM74.5566 20.5497C72.8005 20.5497 71.9021 18.9407 71.9021 16.7518C71.9021 14.5629 72.8005 12.9457 74.5566 12.9457C76.2799 12.9457 77.1784 14.5629 77.1784 16.7518C77.1784 18.9407 76.2799 20.5497 74.5566 20.5497ZM82.9774 23H86.4568V15.9023C86.4568 14.3587 87.5839 13.2969 89.1194 13.2969C89.6013 13.2969 90.2629 13.3786 90.5896 13.4847V10.3974C90.2792 10.3239 89.8463 10.2749 89.4951 10.2749C88.0903 10.2749 86.9387 11.0916 86.4813 12.6435H86.3506V10.4545H82.9774V23ZM92.3885 23H95.8679V19.0142L96.8072 17.9442L100.229 23H104.305L99.4126 15.886L104.068 10.4545H100.074L96.0558 15.2163H95.8679V6.27273H92.3885V23ZM121.212 14.6364C121.212 9.16406 117.814 6.04403 113.379 6.04403C108.92 6.04403 105.547 9.16406 105.547 14.6364C105.547 20.0842 108.92 23.2287 113.379 23.2287C114.425 23.2287 115.413 23.0572 116.311 22.7141L117.659 24.3722H120.959L118.566 21.3665C120.199 19.9045 121.212 17.6175 121.212 14.6364ZM112.154 17.1847L114.294 20.0107C114.008 20.0678 113.698 20.1005 113.379 20.1005C110.806 20.1005 109.132 18.1811 109.132 14.6364C109.132 11.0916 110.806 9.17223 113.379 9.17223C115.944 9.17223 117.626 11.0916 117.626 14.6364C117.626 16.4577 117.177 17.8544 116.401 18.7773L115.16 17.1847H112.154ZM131.812 17.6584C131.82 19.3409 130.668 20.223 129.418 20.223C128.103 20.223 127.254 19.3001 127.246 17.8217V10.4545H123.766V18.4425C123.775 21.3746 125.49 23.1634 128.014 23.1634C129.9 23.1634 131.256 22.1914 131.82 20.7212H131.95V23H135.291V10.4545H131.812V17.6584ZM143.791 23.245C146.895 23.245 148.986 21.734 149.476 19.4062L146.258 19.1939C145.907 20.1495 145.008 20.6477 143.849 20.6477C142.109 20.6477 141.006 19.4961 141.006 17.6257V17.6175H149.55V16.6619C149.55 12.3984 146.969 10.2912 143.653 10.2912C139.961 10.2912 137.568 12.913 137.568 16.7844C137.568 20.7621 139.928 23.245 143.791 23.245ZM141.006 15.4613C141.08 14.032 142.166 12.8885 143.71 12.8885C145.221 12.8885 146.266 13.9666 146.274 15.4613H141.006ZM162.258 14.032C161.948 11.7205 160.086 10.2912 156.917 10.2912C153.707 10.2912 151.591 11.7777 151.6 14.1953C151.591 16.0739 152.776 17.2908 155.226 17.7809L157.399 18.2138C158.493 18.4343 158.991 18.8345 159.008 19.4634C158.991 20.2067 158.183 20.7376 156.966 20.7376C155.724 20.7376 154.899 20.2067 154.687 19.1857L151.265 19.3654C151.591 21.7667 153.633 23.245 156.958 23.245C160.208 23.245 162.536 21.587 162.544 19.1122C162.536 17.299 161.352 16.2127 158.918 15.7145L156.647 15.2571C155.479 15.0039 155.046 14.6037 155.055 13.9993C155.046 13.2479 155.896 12.7578 156.974 12.7578C158.183 12.7578 158.901 13.4194 159.073 14.228L162.258 14.032ZM171.408 10.4545H169.048V7.44886H165.568V10.4545H163.853V13.0682H165.568V19.6023C165.552 22.0607 167.226 23.2777 169.75 23.1715C170.649 23.1388 171.286 22.9592 171.637 22.8448L171.09 20.2557C170.918 20.2884 170.551 20.37 170.224 20.37C169.53 20.37 169.048 20.1087 169.048 19.1449V13.0682H171.408V10.4545Z' fill='%238D96A2'/%3E\a           %3C/svg%3E                                              \a           ");
  background-position: 0 0;
  background-repeat: no-repeat;
}

#main-footer #footer .header .inner {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

#main-footer #footer .header .inner .col {
  width: 167px;
  margin-left: 50px;
}

#main-footer #footer .header .inner .col .footer-title {
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: #353C47;
  margin-bottom: 5px;
}

#main-footer #footer .header .inner .col .item {
  display: block;
  text-decoration: none;
  font-size: 16px;
  line-height: 130%;
  color: #7C838D;
  margin-top: 10px;
}

#main-footer #footer .footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-top: 24px;
}

#main-footer #footer .footer .copywriting {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

#main-footer #footer .footer .copywriting .text {
  font-size: 14px;
  line-height: 130%;
  color: #8D96A2;
  margin-right: 15px;
}

#main-footer #footer .footer .links a {
  font-size: 16px;
  line-height: 130%;
  color: #0083C7;
  text-decoration: none;
  margin-left: 20px;
}

.title {
  @include text-simple;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 130%;
  color: $black800;
  margin-bottom: 20px;
}

.description {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 145%;
  color: #4C5767;
}

.card-title {
  font-size: 16px;
  line-height: 130%;
  color: #1D2127;
}

.card-subtitle {
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #4C5767;
}

a:hover {
  opacity: 0.5;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}

.simple-button {
  font-size: 16px;
  line-height: 130%;
  color: #0083C7;
  position: absolute;
  bottom: 27px;
  right: 27px;
  padding-right: 37px;
  text-decoration: none;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E\a     %3Cpath d='M16.17 13L12.59 16.59L14 18L20 12L14 6L12.59 7.41L16.17 11H4V13H16.17Z' fill='%230083C7'/%3E\a     %3C/svg%3E                                     \a     ");
  background-position: 100% -1px;
  background-repeat: no-repeat;
}
</style>
