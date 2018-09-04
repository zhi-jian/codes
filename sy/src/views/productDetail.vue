<template>
    <div>
        <headers></headers>
        <product-detail></product-detail>
        <customzied-modal></customzied-modal>
    </div>
</template>
<script>
import Header from '@/components/header.vue'
import ProductDetail from '@/components/productDetail.vue'
import CustomziedModal from '@/components/customziedModal.vue'
export default {
    components:{
        'headers':Header,
        'product-detail':ProductDetail,
        'customzied-modal':CustomziedModal,
    }
}
</script>
<style>

</style>
