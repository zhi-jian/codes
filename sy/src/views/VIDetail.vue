<template>
    <div>
        <headers></headers>
        <viDetail></viDetail>
        <customzied-modal></customzied-modal>
    </div>
</template>
<script>
import VIDetail from '@/components/VIDetail.vue'
import Header from '@/components/header.vue'
import CustomziedModal from '@/components/customziedModal.vue'
export default {
    components:{
        'headers':Header,
        'viDetail':VIDetail,
        'customzied-modal':CustomziedModal,
    }
}
</script>

