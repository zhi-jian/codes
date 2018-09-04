<template>
    <div>
        <product></product>
        <tab-bar></tab-bar>
    </div>
</template>
<script>
import Product from '@/components/product.vue'
import TabBar from '@/components/tabBar.vue'
export default {
    components:{
        'product':Product,
        'tab-bar':TabBar
    }
}
</script>

