<template>
  <div>
    <template>
      <user-navbar></user-navbar>
    </template>
    <div>
      <h5>User ID</h5>
      <p>{{ currentUser.id }}</p>
      <h5>First Name</h5>
      <p>{{ currentUser.first_name }}</p>
      <h5>Last Name</h5>
      <p>{{ currentUser.last_name }}</p>
      <h5>Followers</h5>
      <p v-for="follower in currentUser.follower">{{ follower.username }}</p>
      <h5>User Image</h5>
      <img :src="currentUser.profile_image" width="250">
    </div>
  </div>
</template>

<script>
  import menucreation from "../components/menucreation";
  import UserNavbar from "../components/user-navbar";

  export default {
    name: "profile",
    data() {
      return {
        currentUser: {}
      }
    },
    async mounted() {
      const config = {
        headers: {"content-type": "application/json"}
      };
      await this.$auth.fetchUser().then((resp) => {
          this.currentUser = resp.data;
        }
      )
    },
    components: {
      UserNavbar
    }
  }


</script>

<style scoped>

</style>
