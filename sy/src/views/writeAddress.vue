<template>
    <div>
        <headers></headers>
        <write-address></write-address>
    </div>
</template>
<script>
import WriteAddress from '@/components/writeAddress.vue'
import Header from '@/components/header.vue'
export default {
    components:{
        'headers':Header,
        'write-address':WriteAddress
    }
}
</script>

