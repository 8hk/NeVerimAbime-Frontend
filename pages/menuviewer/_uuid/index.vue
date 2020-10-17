<template>
  <main>
    <div>
      <template>
        <user-navbar></user-navbar>
      </template>
      <div class="col-12 text-center my-3">
        <img :src="this.awsUrls+'/media/menu_image/'+menu.uuid+'.png'"
             class="img-fluid"
             style="width: 400px; border-radius: 10px; box-shadow: 0 1rem 1rem rgba(0,0,0,.7);" alt>
        <h2 class="mb-3 display-4 text-uppercase">{{ menu.name }}</h2>
        <h2 class="mb-3 display-4 text-uppercase">Menu Owner: {{ menu.menu_owner.username}}</h2>
      </div>
      <div class="col-12 text-center my-3">
        <template class="recipe-details">
          <h4>Meals</h4>
          <b-card-group deck>
            <template
              v-for="meal in menu.meal_items">
              <div>
                <meal-card :meal="meal">
                </meal-card>
              </div>
            </template>
          </b-card-group>
        </template>
      </div>
    </div>
  </main>
</template>
<script>
  import CommentCard from "../../../components/CommentCard";
  import IngredientCard from "../../../components/IngredientCard";
  import CountryFlag from 'vue-country-flag'
  import MealCard from "../../../components/MealCard";
  import UserNavbar from "../../../components/user-navbar";
  import awsUrls from 'static/urls.json'

  export default {
    components: {UserNavbar, MealCard, CommentCard, IngredientCard, CountryFlag},
    head() {
      return {
        title: "View Recipe"
      };
    },
    async mounted() {
      await this.$auth.fetchUser().then((resp) => {
        this.currentUser = resp.data;
      });
      const config = {
        headers: {"content-type": "application/json"}
      };
      // console.log("params: " + this.$nuxt.$route.query.uuid);
      await this.$axios.get('/api/menu/getmenu/', {
        params: {
          uuid: this.$nuxt.$route.query.uuid
        }
      }).then((resp) => {
        // console.log("response: " + resp);
        // console.log("response data: " + resp.data);
        this.menu = resp.data;

      });
      this.awsUrls= awsUrls.awsLink;
    },
    data() {
      return {
        menu: {
          meal_items: [],
          menu_owner: {}
        },
        awsUrls: ''
      };
    },
    methods: {}
  };
</script>
<style scoped>
</style>
