<template>
  <main class="container my-5">
    <div>
      <div class="loading" v-if="loading">
        <img class="loading-icon" src="../../../assets/loading.gif">
      </div>
      <div v-else>
        <template v-for="(recipe,counter) in recipes">
          <div v-bind:key="counter" class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <recipe-card :recipe="recipe"></recipe-card>
          </div>
        </template>
      </div>

    </div>
  </main>
</template>
<script>
  import CommentCard from "../../../components/CommentCard";
  import RecipeCard from "~/components/RecipeCard.vue";

  function getSafe(fn) {
    try {
      return fn();
    } catch (e) {
      return undefined;
    }
  }

  export default {

    components: {CommentCard, RecipeCard},
    head() {
      return {
        title: "Search",

      };
    },
    async mounted() {
      // this.$nuxt.$loading.start();
      // await this.$auth.fetchUser().then((resp) => {
      //   this.currentUser = resp.data;
      // });
      const config = {
        headers: {"content-type": "application/json"}
      };
      // console.log("params uuid: " + this.$nuxt.$route.query.uuid);
      // console.log("params query: " + this.$nuxt.$route.query.query);
      //recipe search

      await this.$axios.get('/api/recipe/search/', {
        params: {
          query: this.$nuxt.$route.query.query
        }
      }).then((resp) => {
        // console.log("response: " + resp);
        // console.log("response data: " + resp.data);
        this.recipes = resp.data;
        this.loading = false;
        this.$nuxt.$loading.finish();
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      });

      //tag search
      await this.$axios.get('/api/tag/search/', {
        params: {
          query: this.$nuxt.$route.query.query
        }
      }).then((resp) => {
        // console.log("response: " + resp);
        // console.log("response data: " + resp.data);
        var all_recipes;
        getSafe(() => {
          all_recipes = resp.data[0].recipes
        });
        if(all_recipes){
          for (let i = 0; i < all_recipes.length; i++) {
          this.recipes.push(all_recipes[i]);
        }
        }

        // this.recipes = resp.data[0].recipes;
        this.loading = false;
        this.$nuxt.$loading.finish();
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      });
      this.$nuxt.$loading.finish();
    },
    data() {
      return {
        recipes: [],
        loading: true
      };
    },
    methods: {},
  };
</script>
<style scoped>
</style>
