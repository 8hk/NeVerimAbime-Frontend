<template>
  <div class="col-md-4">
    <form @submit.prevent="submitRegister">
      <b-form-group>
        <div class="form-group">
          <label for>User Name</label>
          <input type="text" class="form-control" v-model="newuser.name">
        </div>
      </b-form-group>
      <b-form-group>
        <div class="form-group">
          <label for>User E-Mail</label>
          <input type="text" class="form-control" v-model="newuser.email">
        </div>
      </b-form-group>
      <b-form-group>
        <div class="form-group">
          <label for>Password 1</label>
          <b-form-input type="password" v-model="newuser.password1" class="form-control" name="password"
                        :state="passwordState">
          </b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Enter at least 6 letters
          </b-form-invalid-feedback>

          <label for>Password 2</label>
          <b-form-input type="password" v-model="newuser.password2" class="form-control" name="password"
                        :state="passwordCheckState">
          </b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Enter same password
          </b-form-invalid-feedback>

        </div>
        <div>
          <b-form-checkbox
            id="checkbox-1"
            v-model="foodProviderstatus"
            name="checkbox-1"
            value="true"
            unchecked-value="false"
          >
            Food Provider
          </b-form-checkbox>

          <label>File
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
          </label>

        </div>
        <button type="submit" class="btn btn-success">Save</button>
      </b-form-group>
    </form>
  </div>
</template>

<script>
  import jsonToFormData from "json-form-data";
  export default {
    name: "registerpage",
    middleware: 'auth',
    data() {
      return {
        foodProviderstatus: 'false',
        newuser: {
          name: "",
          email: "",
          // caloriesPerUnit: "",
          password1: "",
          password2: "",
        },
        file: '',
      }
    },
    methods: {
      async submitRegister() {
        const config = {
          headers: {"content-type": "application/json"}
        };
        // try {
        var _this = this;
        let response = await this.$axios.post('/rest-auth/registration/', {
          username: this.newuser.name,
          email: this.newuser.email,
          password1: this.newuser.password1,
          password2: this.newuser.password2,
          foodProvider: this.foodProviderstatus,
        }, config).then(() => {
            const config2 = {
              headers: {"content-type": "application/json"}
            };
            let formData = new FormData();
            // console.log("this file");
            // console.log(this.file);
            formData.append('file', this.file);
            formData.append('user', this.newuser.name);

            this.$axios.put('/api/users/addprofilepicture/',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function () {
               _this.$router.push("/");
              // console.log('SUCCESS!!');
            })
              .catch(function () {
                // console.log('FAILURE!!');
              });



          }
        ).catch(function (error) {
          if (error.response) {
            // console.log(error.toString());
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            _this.$toast.show(error.response.data["email"].toString(), {icon: "email"});
            _this.$toast.show(error.response.data["username"].toString(), {icon: "username"});
            _this.$toast.show(error.response.status.toString(), {icon: "status"});
          }
        });
      },
      handleFileUpload() {
        this.file = this.$refs.file.files[0];
      }
    },
    computed: {
      passwordState() {
        return this.newuser.password1.length > 5 ? true : false
      },
      passwordCheckState() {
        if (this.newuser.password2.length > 0) {
          return this.newuser.password2 === this.newuser.password1 ? true : false
        } else
          return false;

      }
    }
  }
</script>

<style scoped>

</style>
