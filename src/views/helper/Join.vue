<template>
  <v-container class="cl-container">
    <v-card>
      <v-card-title> <v-icon large color="primary" class="mr-2">mdi-heart</v-icon>Almost there!</v-card-title>
        <v-card-text>
          <v-card-subtitle>To verify you are a real person with a big heart, please sign up or login in first.</v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click="$router.push('/authentication?type=signup')">Join now</v-btn>
            <v-btn color="secondary" @click="$router.push('/authentication?type=login')">I have already an account</v-btn>
          </v-card-actions>
         </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

/** @description if user not authenticated, this page is show to reminding users to login or signup first.
 * If user is authenticated, not displayed and redirects directly to form to apply for volunteer.
 * 
 * router: /join
  */
export default {
  name: "Join",
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  created() {
    if(this.isAuthenticated) {
      this.$router.push("/helpforce/register")
    }
  }
}
</script>

<style lang="scss" scoped>

</style>