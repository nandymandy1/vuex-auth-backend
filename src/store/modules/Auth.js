import axios from 'axios';

const state = {
    status: '',
    token: localStorage.getItem('token') || "",
    user: {}
}

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
}

const actions = {
    async login({
        commit
    }, credentials) {
        try {
            let res = await axios.post('http://localhost:5000/api/users/login', credentials)
            const token = res.data.token
            const user = res.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
        } catch (error) {
            console.log(error)
        }
    },
    async register({
        commit
    }, userDetails) {
        try {
            let res = await axios.post('http://localhost:5000/api/users/login', userDetails)
            commit('register_success', res.data)
        } catch (error) {
            console.log(error)
        }
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
}

const mutations = {
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
}

export default {
    state,
    getters,
    actions,
    mutations
}