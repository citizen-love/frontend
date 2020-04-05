<template>
  <v-container class="cl-container">
    <v-card outlined class="mt-2">
      <v-card-title class="ml-2">Join the community <v-icon large color="primary" class="ml-2">mdi-heart</v-icon></v-card-title>
         <v-card-subtitle class="ml-2 my-1"> To verify you are a real person with a big heart, please sign up or login in first.</v-card-subtitle>
        <v-card-text>
          <br/>
          <v-btn color="primary" class="ma-1" @click="$router.push('/authentication?type=signup')">Join now</v-btn>
          <v-btn outlined color="primary" class="ma-1"  @click="$router.push('/authentication?type=login')">I have already joined</v-btn>
         </v-card-text>
    </v-card>
    <br/>
    <div class="ma-3">
      <steps-explained/>
    </div>
      
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import StepsExplained from "@/components/StepsExplained"

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
  },
  components: {
    StepsExplained
  }
}
</script>

<style lang="scss" scoped>

</style>