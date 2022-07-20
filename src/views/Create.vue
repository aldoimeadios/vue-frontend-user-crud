<template>
<h2 mt-2>
  Crear Usuario
</h2>
  <form @submit.prevent="submitForm">
    <Input :user="user" />
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex"
import Input from "../components/Input"

export default {
    components: {
        Input
    },
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
          phone: '',
          id_card: '',
          date_of_birth: '',
          city_code: ''
        }
      }
    },
    methods: {
        ...mapActions(['setUsers']),
        submitForm() {
          this.setUsers(this.user)
        }

    },
}
</script>
