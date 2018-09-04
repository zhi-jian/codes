<template>
    <div>
       <home></home>
       <tab-bar></tab-bar>
    </div>
</template>
<script>
import Home from '@/components/home.vue'
import TabBar from '@/components/tabBar.vue'
export default {
    components:{
        'home':Home,
        'tab-bar':TabBar
    }
}
</script>
<style>

</style>
