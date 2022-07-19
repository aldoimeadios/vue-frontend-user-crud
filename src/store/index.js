import { createStore } from 'vuex'
import router from '../router'


export default createStore({
  state: {
    users: [],
    user: {
      name: '',
      email: '',
      password: '',
    },
    error: {
      type: null,
      message: null
    },
    people: null,
    url: 'http://localhost:8000/api/'
  },
  mutations: {
    setPeople(state, payload){
      state.people = payload
    },
    upload(state, payload){
      state.users = payload
    },
    set(state, payload){
      state.users.push(payload)
      router.push('/')
    },
    delete(state, payload) {
      state.users = state.users.filter(item => item.id !== payload)
    },
    edit(state, payload) {      
      if (!state.users.find(item => item.id === parseInt(payload))) {
        router.push('/')
        return
      }
      state.user = state.users.find(item => item.id === parseInt(payload))
      state.user.password = ''
    },
    update(state, payload) {
      state.users = state.users.map(item => item.id === payload.id ? payload : item)
      router.push('/')
    },
    setError(state, payload) {
      if (payload === "EMAIL_NOT_FOUND") {
        return state.error = {
          type: 'email',
          message: 'Email no registrado'
        }
      }
    },
  },
  actions: {
    async uploadStorage({commit, state}){
      try {

        if (localStorage.getItem('user')) {
          commit('setPeople', JSON.parse(localStorage.getItem('user')))
        } else {
          return commit('setPeople', null)
        }

        const res = await fetch(`${state.url}users`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${state.people.token_type} ${state.people.access_token}`
          },
        })
        const dataDB = await res.json()
        const userArray = []
        for (let id in dataDB.users) {
          userArray.push(dataDB.users[id])
        }
        commit('upload', userArray)

      } catch (error) {
        console.log(error)
      }
    },
    async registerUser({commit, state}, user) {
      try {
        const res = await fetch(`${state.url}auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
          })
        })
        const userDB = await res.json()
        if(userDB.error){
          console.log(userDB.error)
          return
        }

        commit('setPeople', userDB)
        router.push('/')
        localStorage.setItem('user', JSON.stringify(userDB))

      } catch (error) {
        console.log(error)
      }
    },
    async loginUser({commit, state}, user) {
      try {
        const res = await fetch(`${state.url}auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          })
        })
        const userDB = await res.json()
        if(userDB.error){
          console.log(userDB.error)
          return commit('setError', userDB.error.message)
        }

        commit('setPeople', userDB)
        router.push('/')
        localStorage.setItem('user', JSON.stringify(userDB))

      } catch (error) {
        console.log(error)
      }
    },
    async logOffUser({commit, state}) {
      try {
        const res = await fetch(`${state.url}auth/logout`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${state.people.token_type} ${state.people.access_token}`
          },
        })

        commit('setPeople', null)
        localStorage.removeItem('user')
        router.push('/login')

      } catch (error) {
        console.log(error)
      }
    },
    async destroyUser ({commit, state}, id) {
      try {
        const res = await fetch(`${state.url}users/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${state.people.token_type} ${state.people.access_token}`
          },
        })
        commit('delete', id)
      } catch (error) {
        console.log(error)
      }
    },
    async updateUser({commit, state}, user) {
      try {

        const res = await fetch(`${state.url}users/${state.user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${state.people.token_type} ${state.people.access_token}`
          },
          body: JSON.stringify(user)
        })
        commit('update', user)

      } catch (error) {
        console.log(error)
      }
    },
    setUser({commit}, id) {
      commit('edit', id)
    },
    async setUsers({commit, state}, user){
      try {
        const res = await fetch(`${state.url}users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${state.people.token_type} ${state.people.access_token}`
          },
          body: JSON.stringify(user)
        })
        const userDB = await res.json()

        commit('set', userDB.user)

      } catch (error) {
        console.log(error)
      }
    },
  },
  getters:{
    userAuth(state) {
      return !!state.people
    }
  },
  modules: {
  }
})
