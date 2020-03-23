import Vuex from 'vuex'

import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // = data
        products: []
    },

    getters: { // = computed properties
        availableProducts (state, getters) {
            return state.products.filter(product => product.inventor > 0)
        }
    },

    actions: {
        fetchProducts () {
            // make the call
            // run setProducts mutations
        }
    },

    mutations: {
        setProducts (state, products) {
            // update products
            state.products = products
        }
    }
})