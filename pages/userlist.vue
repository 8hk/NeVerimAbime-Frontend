<template>
  <div>
    <template>
      <user-navbar></user-navbar>
    </template>
    <div>
      <b-card-group deck>
        <template v-for="(user,counter) in userfollower" v-if="currentUser.id != user.id">
          <div v-bind:key="counter" class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <user-card :user="user"></user-card>
          </div>
        </template>
      </b-card-group>
    </div>
  </div>
</template>

<script>
  import UserCard from "../components/UserCard.vue";
  import {mapGetters} from "vuex";
  import UserNavbar from "../components/user-navbar";

  export default {
    name: "userlist.vue",
    data() {
      return {
        userfollower: [],
        currentUser: {}
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    async mounted() {
      const config = {
        headers: {"content-type": "application/json"}
      };
      await this.$auth.fetchUser().then((resp) => {
          this.currentUser = resp.data;
        }
      )
      this.$axios.get('/api/users/getusers').then((resp) => {
        // console.log("followers: " + resp.data);
        this.userfollower = resp.data;
      });
    },
    methods: {
      async addNewFollower(counter) {
        const config = {
          headers: {"content-type": "application/json"}
        }
        try {
          let response = await this.$axios.$post("/api/users/addnewfollower/", this.userfollower[counter], config);
          await this.$router.push("/home/");
        } catch (e) {
          // console.log(e);
        }
      },
    }, components: {
      UserCard, UserNavbar
    },
  }

</script>

<style scoped>

</style>
