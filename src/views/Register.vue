<template>
  <div class="card">
    <h3 class="text-center">Register</h3>
    <div class="alert alert-danger" v-if="err">{{ msg }}</div>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          v-model="username"
          placeholder="Username"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          v-model="name"
          placeholder="Name"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input
          type="text"
          name="name"
          id="address"
          v-model="address"
          placeholder="Address"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="adhaar">Adhaar</label>
        <input
          type="text"
          name="name"
          id="adhaar"
          v-model="adhaar"
          placeholder="Adhaar"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="phone">Contact Number</label>
        <input
          id="phone"
          type="text"
          name="phone"
          v-model="phone"
          placeholder="Contact Number"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          placeholder="Email"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          placeholder="Password"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="confirm_password">Confirm Password</label>
        <input
          id="confirm_password"
          type="password"
          name="confirm_password"
          v-model="confirm_password"
          placeholder="Confirm Password"
          class="form-control"
        >
      </div>
      <button class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      username: "",
      confirm_password: "",
      name: "",
      adhaar: "",
      email: "",
      phone: "",
      address: "",
      err: false,
      msg: ""
    };
  },
  methods: {
    register() {
      if (this.password === this.confirm_password) {
        let data = {
          name: this.name,
          password: this.password,
          email: this.email,
          address: this.address,
          adhar: this.adhaar,
          username: this.username,
          phone: this.phone
        };
        this.$store
          .dispatch("register", data)
          .then(res => {
            console.log(res);
            this.$router.push("/");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.showAlert("Password do not match.");
      }
    },
    showAlert(msg) {
      this.err = true;
      this.msg = msg;
      setTimeout(() => {
        this.err = false;
        this.msg = "";
      }, 3000);
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
.alert {
  border-radius: 0px;
}
.alert-danger {
  background-color: red;
  color: #fff;
}
</style>
