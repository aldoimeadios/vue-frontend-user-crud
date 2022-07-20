<template>
  <div class="navbar navbar-dark bg-dark">
      <div class="d-felx">
        <router-link 
          to="/" 
          class="navbar-brand ml-2"
          v-if="userAuth"
        >
          Users
        </router-link>
      </div>
      <div class="d-felx">
          <router-link 
            to="/login" 
            class="btn btn-dark"
            v-if="!userAuth"
          >
            Login
          </router-link>
          <router-link 
            to="/register" 
            class="btn btn-dark"
            v-if="!userAuth"
          >
            Register
          </router-link>
          <button 
            class="btn btn-dark"
            v-if="userAuth"
            @click="logOffUser"
          >
            Log Off
          </button>
      </div>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userAuth'])
  },
  methods: {
    ...mapActions(['logOffUser'])
  },
}
</script>

