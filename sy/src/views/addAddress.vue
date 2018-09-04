<template>
    <div>
        <headers></headers>
        <add-address></add-address>
    </div>
</template>
<script>
import AddAddress from '@/components/addAddress.vue'
import Header from '@/components/header.vue'
export default {
    components:{
        'headers':Header,
        'add-address':AddAddress
    }
}
</script>

