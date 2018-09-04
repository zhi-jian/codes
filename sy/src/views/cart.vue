<template>
    <div>
        <cart></cart>
        <tab-bar></tab-bar>
    </div>
</template>
<script>
import Cart from '@/components/cart.vue'
import TabBar from '@/components/tabBar.vue'
export default {
    components:{
        'cart':Cart,
        'tab-bar':TabBar
    }
}
</script>

