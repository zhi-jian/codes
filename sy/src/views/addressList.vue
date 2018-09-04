<template>
    <div>
        <headers></headers>
        <address-list></address-list>
    </div>
</template>
<script>
import AddressList from '@/components/addressList.vue'
import Header from '@/components/header.vue'
export default {
    components:{
        'headers':Header,
        'address-list':AddressList
    }
}
</script>

