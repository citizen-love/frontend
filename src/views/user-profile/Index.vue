<template>
  <div class="user-profile">
    <h1>{{ $t('userProfile.profile')}}</h1>
    <br/>
    <p><strong>{{ $t('userProfile.name')}}</strong><br/>{{firstName}} {{lastName}}</p>
    <p><strong>{{ $t('userProfile.email')}}</strong><br/>{{email}}</p>
    <div class="center">
       <v-btn color="primary">{{ $t('userProfile.cta')}}</v-btn>
    </div>
   
  </div>
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
