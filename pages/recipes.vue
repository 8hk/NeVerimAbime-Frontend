<template>
  <div>
    <template>
      <user-navbar></user-navbar>
    </template>
    <div class="loading" v-if="loading">
      <img class="loading-icon" src="../assets/loading.gif">
    </div>
    <div v-else>
      <p> {{ this.$auth.user.email }}</p>
      <b-card-group deck>
        <template v-for="(recipe,counter) in recipes">
          <div v-bind:key="counter" class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <recipe-card :recipe="recipe"></recipe-card>
          </div>
        </template>
      </b-card-group>
    </div>
  </div>
</template>
<script>
  import RecipeCard from "~/components/RecipeCard.vue";
  import {mapGetters, mapState} from "vuex";
  import UserNavbar from "../components/user-navbar";

  export default {
    // loading: false,
    name: "recipes.vue",
    data() {
      return {
        loading: true,
        recipes: [],
        currentUser: {}
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    async mounted() {
      // this.loading=false;
      // this.$nuxt.$loading.start();
      await this.$auth.fetchUser().then((resp) => {
        this.currentUser = resp.data;
      });

      await this.$axios.get('/api/recipe/getrecipes', {
          params: {
            id: this.currentUser.id
          }
        }
      ).then((resp) => {
        this.loading = false;
        setTimeout(() => this.$nuxt.$loading.finish(), 5000)
        this.recipes = resp.data;
      });
    }, components: {
      RecipeCard, UserNavbar
    },
  }
</script>

<style scoped>

</style>
