<template>
  <h2>Users with Vue.js</h2>

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

import ListUsers from "../components/ListUsers";
import { mapActions } from "vuex";


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
        phone: '',
        id_card: '',
        date_of_birth: '',
        city_code: ''
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
