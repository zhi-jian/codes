<template>
    <div>
        <headers></headers>
        <merchant></merchant>
        <customzied-modal></customzied-modal>
    </div>
</template>
<script>
import Merchant from '@/components/merchant.vue'
import Header from '@/components/header.vue'
import CustomziedModal from '@/components/customziedModal.vue'
export default {
    components:{
        'headers':Header,
        'merchant':Merchant,
        'customzied-modal':CustomziedModal,
    }
}
</script>

