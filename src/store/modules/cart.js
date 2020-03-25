import shop from "@/api/shop";

export default {
    namespaced: true,
    state: {
        // {id, quantity}
        items: [],
        checkoutStatus: null
    },

    getters: {
        cartProducts (state, getters, rootState) {
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(product => product.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },

        cartTotal (state, getters) {
            return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
        },

    },

    mutations: {
        // const cartItem = {id: 123, quantity: 2}
        pushProductToCart (state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1,
            })
        },

        incrementItemQuantity (state, cartItem) {
            cartItem.quantity++
        },
        
        setCheckoutStatus (state, status) {
            state.checkoutStatus = status
        },

        emptyCart (state) {
            state.items = []
        }
    },

    actions: {
        addProductToCart ({state, commit, rootGetters}, product) {
            if (rootGetters['products/productIsInStock'](product)){
                //find cartItem
                const cartItem = state.items.find(item => item.id === product.id)
                if(!cartItem) {
                    // pushProductToCart
                    commit('pushProductToCart', product.id)
                } else {
                    // incrementItemQuantity
                    commit('incrementItemQuantity', cartItem)
                }
                commit('products/decrementProductInventory', product, {root: true})
            }
        },

        checkout (state, commit) {
            shop.buyProducts(
                state.cart,
                () => {
                    commit('emptyCart')
                    commit('setCheckoutStatus', 'succes')
                },
                () => {
                    commit('setCheckoutStatus', 'fail')
                }
            )
        }
    }
}