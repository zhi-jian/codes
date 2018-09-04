<template>
    <div>
        <my></my>
        <tab-bar></tab-bar>
    </div>
</template>
<script>
import My from '@/components/my.vue'
import TabBar from '@/components/tabBar.vue'
export default {
    components:{
        'my':My,
        'tab-bar':TabBar
    }
}
</script>

