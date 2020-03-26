import shop from "@/api/shop";

export default {
    namespaced: true,
    state: {
        items: [],
        products: []
    },

    getters: {
        availableProducts (state) {
            return state.items.filter(product => product.inventory > 0)
        },

        productIsInStock () {
            return (product) => {
                return product.inventory > 0
            }
        }
    },

    mutations: {
        setProducts (state, products) {
            // update products
            state.products = products
            console.log(state)
        },

        decrementProductInventory (state, product) {
            product.inventory--
        },
    },

    actions: {
        fetchProducts({commit}) {
            return new Promise((resolve) => {
                // make the call
                // run setProducts mutations
                shop.getProducts(products => {
                    console.log(products)
                    commit('setProducts', products)
                    resolve()
                })
            })
        }
    }
}