<template>
  <v-container fluid class="ma-2 user-profile container cl-container">
    <v-card outlined class="pa-5 mr-4">
    <v-row>
      <v-col cols="12" sm="6">
        <div class="center img-col">
          <img
              class="profile-img"
              :src="profileImg"
              alt="John"
          />
           <br/> <br/>
          <p v-if="bio" class="bio">{{bio}}</p>
          <v-btn text @click="openUpdateView"><v-icon class="mr-2">mdi-pencil</v-icon>{{ $t('userProfile.edit')}}</v-btn>
          <v-card class="mt-3 mx-2 pa-1" outlined dark color="primary">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-icon size="50px" color="white">mdi-account-heart</v-icon><br/>
                  Helped<br><span class="count">{{reviews ? reviews.length : "0"}}</span>
                </v-col>
                 <v-col cols="6">
                  <v-icon size="50px" color="white">mdi-heart</v-icon><br/>
                  Love score<br><span class="count">{{reviews ? averageRating : "?"}}</span><br>
                </v-col>
              </v-row>
              
            </v-container>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
          <h1>{{firstName}} {{lastName}}</h1>
          <br/>
          <p><strong>{{ $t('userProfile.email')}}</strong><br/>{{email}}</p>
          <p v-if="phoneNumber"><strong>Phone number</strong><br/>{{phoneNumber}}</p>
          <p v-if="notifyBySMS"><strong>SMS Notifications</strong><br/>{{notifyBySMS == true ? "On" : "Off"}}</p>
          <p><strong>Is currently available to help</strong><br/>{{isAvailable == true ? "Yes" : "No"}}</p>
          <p v-if="isAvailable"><strong>Helping radius</strong><br/>{{radius}} km</p>
          <p v-if="isAvailable"><strong>Can help in next categories</strong></p>
          <div>
            <v-chip v-for="category of categories" :key="category"
              class="mr-2 mb-2" color="primary"
            >
              {{ category }}
            </v-chip>
          </div>
          <v-btn color="primary" v-if="!isAvailable" @click="openUpdateView">I am available to help</v-btn>
      </v-col>
    </v-row>
    </v-card>

    <v-row>
      <reviews :reviews="reviews"/>
    </v-row>

            
   
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Reviews from "./Reviews"

export default {
  name: "UserProfile",
  data() {
    return {
      isEditing: false
    }
  },
  computed: {
    ...mapGetters([
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "notifyBySMS",
      "createdAt",
      "isAvailable",
      "bio",
      "categories",
      "reviews",
      "coordinates",
      "radius",
      "language",
      "avatar"
      ]),
    profileImg() {
      console.log(this.avatar)
      if(this.avatar) {
        return this.avatar
      }
      return require("@/assets/illustrations/create_user_account.svg")
    },
    averageRating() {
      if(this.reviews) {
        const ratings = this.reviews.map(review => review.rating)
        const sum = ratings.reduce((a, b) => a + b, 0);
        const avg = sum / ratings.length
        return avg.toFixed(1)
      }
      return 0
    }
  },
  methods: {
    ...mapActions(["fetchUserData"]),
    openUpdateView() {
      this.isEditing = "true"
    }
  },
  updated() {
    this.fetchUserData()
  },
  created() {
    this.fetchUserData()
  },
  components: {
    Reviews
  }
}
</script>

<style lang="scss" scoped>

  .bio {
    text-align: center;
    max-width: 70%;
    margin: auto;
    margin-bottom: 2em;
  }


  .profile-img {
    width: 100%;
    max-width: 200px;
    border-radius: 50%;
  }

  .count {
    font-size: 2em;;
  }
</style>
