<template>
<h2 mt-2>
  Editar: {{ user.name }}
</h2>
  <form @submit.prevent="updateUser(user)">
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
    computed: {
        ...mapState(['user'])
    },
    methods: {
        ...mapActions(['setUser', 'updateUser'])
    },
    created(){
        this.setUser(this.$route.params.id)
    },
}
</script>
