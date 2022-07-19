<template>
  <h2>Users with Vue.js</h2>
  <!-- <button class="btn btn-success mt-2 form-control" type="submit">
    Create User
  </button> -->
  <router-link
    class="btn btn-success form-control"
    :to="{
      name: 'Create',
    }"
  >
    Create User
  </router-link>
  <ListUsers />
</template>

<script>
// @ is an alias to /src

import ListUsers from "../components/ListUsers";
import { mapActions } from "vuex";

// const shortid = require('shortid');

export default {
  name: "Home",
  components: {
    ListUsers,
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["uploadStorage"]),
  },
  created() {
    this.uploadStorage();
  },
};
</script>
