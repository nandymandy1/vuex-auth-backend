import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
// import auth from './modules/Auth'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || "",
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
        register_success(state) {
            state.status = 'success'
        },
        register_error(state) {
            state.status = 'error'
        }
    },
    actions: {
        login({
            commit
        }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post('http://localhost:5000/api/users/login', user)
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        register({
            commit
        }, user) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:5000/api/users/register', user)
                    .then(resp => {
                        commit('register_success')
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('register_error')
                        reject(err)
                    })
            })
        },
        logout({
            commit
        }) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status
    }
})

export default store;