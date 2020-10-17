<template>
  <div>
    <b-dropdown id="dropdown-1" text="Login" class="m-md-2" variant="success">
      <b-dropdown-form>
        <b-form-group description="Let us know your Email." label="Enter your Email" label-for="username">
          <b-form-input id="username" v-model="form.username" type="email" required></b-form-input>
        </b-form-group>
        <b-form-group description="Let us know your Password." label="Enter your Password" label-for="pw">
          <b-form-input id="pw" v-model="form.password" type="password"></b-form-input>
        </b-form-group>
        <b-button-group size="sm">
          <b-button @click="submit" variant="outline-success">Login</b-button>
          <b-button @click="logout" variant="outline-success">Logout</b-button>
          <b-button to="/callback" variant="outline-success">Callback</b-button>
        </b-button-group>
      </b-dropdown-form>

    </b-dropdown>
  </div>
</template>

<script>
  export default {
    layout:'loginbutton',
    middleware: 'auth',
    data: () => ({
      error: null,
      form: {
        username: '',
        password: ''
      },
    }),
    methods: {
      onClick() {
        // Close the menu and (by passing true) return focus to the toggle button
        this.$refs.dropdown.hide(true)
      },
      async submit() {
        this.$toast.show('Logging in...', {icon: "fingerprint"});
        this.$auth.loginWith('local', {
          data: {
            username: this.form.username,
            password: this.form.password,
          },
          xsrfCookieName: 'csrftoken',
          xsrfHeaderName: 'X-CSRFToken'
        })
          .then((resp) => {
              // console.log("login success");
               // this.$axios.get('/api/v1/me').then((resp) => { this.$auth.setUser(resp.data)});
              let data = resp.data;
              this.$auth.setUser(this.$axios.get('/api/v1/me'));
              this.$router.push("/home/");
            }
          )
          .catch((e) => {
            // console.log("login error")
            // console.log(e)
            let messages = [];
            // console.log(messages)
          })}
        ,check()
        {
          // console.log(this.$auth.loggedIn)
        }
      ,
        logout()
        {
          this.$toast.show('Logging out...', {icon: "fingerprint"});
          this.$auth.logout()
        }
      ,
    }
  }
</script>

<style scoped>

</style>
