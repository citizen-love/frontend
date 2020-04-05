<template>
  <v-container class="user-profile">
    <v-row>
      <v-col>
        <h1>{{ $t('userProfile.profile')}}</h1>
        <br/>
        <p><strong>{{ $t('userProfile.name')}}</strong><br/>{{firstName}} {{lastName}}</p>
        <p><strong>{{ $t('userProfile.email')}}</strong><br/>{{email}}</p>
      </v-col>
      <v-col>
        <div class="center">
            <v-avatar>
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
           <br/> <br/>
          <v-btn>{{ $t('userProfile.edit')}}<v-icon>mdi-edit</v-icon></v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-btn color="primary">{{ $t('userProfile.cta')}}</v-btn>
    </v-row>

            
   
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserProfile",
  computed: {
    ...mapGetters(["firstName", "lastName","email"]),
  },
  methods: {
    ...mapActions(["fetchUserData"])
  },
  updated() {
    this.fetchUserData()
  },
  created() {
    this.fetchUserData()
  },
}
</script>
