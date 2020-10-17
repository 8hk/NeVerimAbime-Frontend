<template>
  <div>
    <template>
      <user-navbar></user-navbar>
    </template>
    <b-row>
      <b-col md="auto">
        <b-calendar v-model="selectedDate" @context="onContext" locale="en-US"></b-calendar>
      </b-col>
      <b-col v-if="selectedDate!=''">

        <template v-for="dates in cpd">
          <template v-if="dates.date==selectedDate.toString()">
            <h2>{{dates.user.email}} {{dates.gainedCalories}} calories gained at {{selectedDate}}</h2>
            <h2 v-if="dates.recipes.length<2">There is {{dates.recipes.length}} recipe</h2>
            <h2 v-else>There are {{dates.recipes.length}} different recipe</h2>
            <template v-for="recipe in dates.recipes">
              <recipe-card :recipe="recipe"></recipe-card>
            </template>
          </template>
        </template>
      </b-col>
      <b-col v-else>
        <h2>Please choose a date</h2>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import RecipeCard from "~/components/RecipeCard.vue";
  import CommentCard from "../components/CommentCard";
  import UserNavbar from "../components/user-navbar";

  export default {
    components: {RecipeCard,UserNavbar},
    name: "calendar",
    data() {
      return {
        selectedDate: '',
        context: null,
        currentUser: {},
        // consumption per day list
        cpd: [{
          date: "",
          gainedCalories: "",
          user: {},
          recipes: [{
            uuid: ""
          }]
        }]
      }
    },
    methods: {
      onContext(ctx) {
        this.context = ctx
      }
    },
    async mounted() {
      await this.$auth.fetchUser().then((resp) => {
        this.currentUser = resp.data;
        // console.log("current food provider:" + this.currentUser.foodProvider)
      });

      await this.$axios.get('/api/cpd/getuserconsumption/').then((resp) => {
        // console.log("response: " + resp);
        // console.log("response data: " + resp.data);
        this.cpd = resp.data;
      });
    }
  }
</script>

<style scoped>

</style>
