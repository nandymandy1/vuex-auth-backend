<template>
  <div class="card">
    <h3 class="text-center">Login</h3>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          v-model="username"
          placeholder="Username"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Password"
          class="form-control"
        >
      </div>
      <button class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      username: ""
    };
  },
  methods: {
    login() {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => {
          this.$router.push("/profile");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.card {
  padding: 40px;
  border-radius: 0px;
}
.form-control {
  border-radius: 0px;
}
.btn {
  border-radius: 0px;
}
</style>
