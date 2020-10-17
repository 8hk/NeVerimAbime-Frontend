<template>
  <div>
    <user-navbar></user-navbar>
    <div class="loading" v-if="loading">
      <img class="loading-icon" src="../assets/loading.gif">
    </div>
    <div v-else>
      <template v-for="(recipe,counter) in recipes">
        <div v-bind:key="counter" class="col-lg-3 col-md-4 col-sm-6 mb-4">
          <recipe-card :recipe="recipe"></recipe-card>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import Loginbutton from "../components/loginbutton"
  import {mapGetters} from 'vuex'
  import Navbar from "../components/navbar";
  import UserNavbar from "../components/user-navbar";
  import RecipeCard from "~/components/RecipeCard.vue";

  export default {
    name: "home",
    components: {UserNavbar, Navbar, Loginbutton, RecipeCard},
    data() {
      return {
        loading: true,
        currentUser: "",
        recipes: []
      }
    },
    async mounted() {
      await this.$auth.fetchUser().then((resp) => {
        this.currentUser = resp.data;
      });

      await this.$axios.get('/api/recipe/getfollowingrecipes', {
          params: {
            id: this.currentUser.id
          }
        }
      ).then((resp) => {
        this.loading = false;
        setTimeout(() => this.$nuxt.$loading.finish(), 5000)
        // console.log(resp.data);
        for (let i = 0; i < resp.data.length; i++) {
          for (let j = 0; j <resp.data[i].length ; j++) {
             this.recipes.push(resp.data[i][j])
          }
        }
      });
    }
  }
</script>

<style scoped>

</style>
