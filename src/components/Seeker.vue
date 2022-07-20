<template>
  <input 
    type="text"
    placeholder="Enter User Name"
    class="form-control my-3"
    v-model="textUser"
    @keyup="searchUser"
  >
</template>

<script>
import { ref } from "vue"
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()

        const textUser = ref('')

        const searchUser = () => {
            store.dispatch("nameFilters", textUser.value)
        }

        return {textUser, searchUser}
    }
}
</script>

