<template>
  <div class="user-profile">
    <h1>{{ $t('userProfile.profile')}}</h1>
    <br/>
    <p><strong>Name</strong><br/>{{firstName}} {{lastName}}</p>
    <p><strong>Email</strong><br/>{{email}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserProfile",
  computed: {
    ...mapGetters({
      firstName: "firstName",
      lastName: "lastName",
      email: "email"
    })
  },
}
</script>
