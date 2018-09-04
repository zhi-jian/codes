<template>
    <div>
        <headers></headers>
        <ficitious-detail></ficitious-detail>
        <customzied-modal></customzied-modal>
    </div>
</template>
<script>
import Header from '@/components/header.vue'
import FicitiousDetail from '@/components/ficitiousDetail.vue'
import CustomziedModal from '@/components/customziedModal.vue'
export default {
    components:{
        'headers':Header,
        'ficitious-detail':FicitiousDetail,
        'customzied-modal':CustomziedModal,
    }
}
</script>
<style>

</style>
