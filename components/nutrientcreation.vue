<template>
  <main class="container my-5">
    <div class="row">
      <div class="col-12 text-center my-3">
        <h2 class="mb-3 display-4 text-uppercase">{{ nutrient.name }}</h2>
      </div>
      <div class="col-md-6 mb-4">
      </div>
      <div class="col-md-4">
        <form @submit.prevent="submitNutrient">
          <div class="form-group">
            <label for>Nutrient Name</label>
            <input type="text" class="form-control" v-model="nutrient.name">
          </div>
          <div class="form-group">
            <label for>Description</label>
            <input type="text" v-model="nutrient.description" class="form-control" name="Ingredients">
          </div>
          <div class="form-group mb-3">
            <label for>Ingredient</label>
            <textarea v-model="nutrient.ingredient" class="form-control" rows="8"></textarea>
          </div>
          <button type="submit" class="btn btn-success">Save</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: "nutrientcreation",
    data() {
      return {
        nutrient: {
          name: "",
          description: "",
          ingredient: "",
          // difficulty: "",
          // prep_time: null,
          // prep_guide: ""
        },
        // preview: ""
      };
    },
    methods: {
      async submitNutrient() {
        const config = {
          headers: {"content-type": "multipart/form-data"}
        };
        let formData = new FormData();
        for (let data in this.nutrient) {
          formData.append(data, this.nutrient[data]);
        }
        try {
          let response = await this.$axios.$post("/api/nutrient/", formData, config);
          this.$router.push("/nutrient/");
        } catch (e) {
          // console.log(e);
        }
      }
    }
  }
</script>

<style scoped>

</style>
