<template>
  <main class="container my-5">
    <div class="row">
      <div class="col-12 text-center my-3">
        <h2 class="mb-3 display-4 text-uppercase">{{ user.username }}</h2>
        <!--        <img :src="user.name" width="250">-->
        <b-button @click="followUser" variant="success">Follow</b-button>
        <b-button nuxt-link :to="`/user/recipelist/?id=${this.$nuxt.$route.query.id}`" variant="success">Recipes
        </b-button>
        <b-button nuxt-link :to="`/user/menulist/?id=${this.$nuxt.$route.query.id}`" variant="success">Menus</b-button>
      </div>
      <div class="col-md-6">
        <h5>User Image</h5>
        <img :src="this.awsUrls+'/media/profile_image/'+user.uuid+'.png'" width="250">
        <div class="recipe-details">
          <h4>User ID</h4>
          <p>{{ user.id }}</p>
          <h4>First Name</h4>
          <p>{{ user.first_name }}</p>
          <h4>Last Name</h4>
          <p>{{ user.last_name }}</p>
          <h4>Followers</h4>
          <div>
            <b-card-group deck>
              <template v-for="(user,counter) in user.follower">
                <div v-bind:key="counter" class="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <user-card :user="user"></user-card>
                </div>
              </template>
            </b-card-group>
          </div>

          <!--          <p v-for="follower in user.follower">{{ follower.username }}</p>-->
          <h5>User Image</h5>
          <img :src="user.profile_image" width="250">
        </div>
      </div>
    </div>
  </main>
</template>
<script>
  import UserCard from "../../../components/UserCard";
  import UserNavbar from "../../../components/user-navbar";
  import awsUrls from 'static/urls.json'
  export default {
    head() {
      return {
        title: "View User"
      };
    },
    async mounted() {
      const config = {
        headers: {"content-type": "application/json"}
      };
      // console.log("params: " + this.$nuxt.$route.query.id);
      await this.$axios.get('/api/users/getuser/', {
        params: {
          id: this.$nuxt.$route.query.id
        }
      }).then((resp) => {
        // console.log("response: " + resp);
        // console.log("response data: " + resp.data);
        this.user = resp.data;
      });
      this.awsUrls= awsUrls.awsLink;
    },
    data() {
      return {
        user: {
          id: "",
          username: "",
          first_name: "",
          last_name: "",
          follower: [],
          profile_image: "",
          recipes: []
        },
        awsUrls: ''
      };
    },
    methods: {
      followUser() {
        const config = {
          headers: {"content-type": "application/json"}

        }
        try {
          let response = this.$axios.$post("/api/users/addnewfollower/", this.user, config);
          this.$router.push("/home/");
        } catch (e) {
          // console.log(e);
        }
      },
      // fetchUserRecipe() {
      //   this.$router.push("'/user/?uuid=${recipe.uuid}'");
      // },
    },
    components: {
      UserCard
    },
  };
</script>
<style scoped>
</style>
