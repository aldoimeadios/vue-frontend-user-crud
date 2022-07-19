<template>

  <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in users" :key="item.id">
        <th scope="row"> {{ item.id }} </th>
        <td>{{ item.name }}</td>
        <td> {{ item.email }} </td>
        <td> 
            <button 
                class="btn btn-danger btn-sm"
                @click="destroyUser(item.id)"
            >
                Delete
            </button>
            <router-link 
                class="btn btn-warning ms-2 btn-sm"
                :to="{
                    name: 'Edit',
                    params: {
                       id: item.id
                    }
                }"
            >
                Update
            </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
    computed: {
        ...mapState(['users'])
    },
    methods: {
        ...mapActions(['destroyUser'])
    }
}
</script>
