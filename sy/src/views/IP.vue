<template>
    <div>
        <headers></headers>
        <ip></ip>
    </div>
</template>
<script>
import IP from '@/components/IP.vue'
import Header from '@/components/header.vue'
export default {
    components:{
        'ip':IP,
        'headers':Header,
    }
}
</script>
