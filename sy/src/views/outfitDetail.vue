<template>
    <div>
        <headers></headers>
        <outfitDetail></outfitDetail>
        <customzied-modal></customzied-modal>
    </div>
</template>
<script>
import OutfitDetail from '@/components/outfitDetail.vue'
import Header from '@/components/header.vue'
import CustomziedModal from '@/components/customziedModal.vue'
export default {
    components:{
        'headers':Header,
        'outfitDetail':OutfitDetail,
        'customzied-modal':CustomziedModal,
    }
}
</script>

