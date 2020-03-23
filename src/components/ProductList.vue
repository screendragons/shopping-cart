<template>
<div>
    <h1>Product List</h1>
    <ul>
        <li v-for="(product, index) in products" :key="`product-${index}`">{{product.title}}</li>
    </ul>
</div>
</template>

<script>
import shop from '@/api/shop'
import store from '@/store/index'

export default {
    computed: {
        products () {
            return store.getters.availableProducts
        }
    },
    created() {
        shop.getProducts(products => {
            store.commit('setProducts', products)
        })
    }
}
</script>

<style>

</style>