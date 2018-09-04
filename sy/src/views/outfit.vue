<template>
    <div>
        <headers></headers>
        <outfit></outfit>
        <customzied-modal></customzied-modal>
    </div>
</template>
<script>
import Outfit from '@/components/outfit.vue'
import Header from '@/components/header.vue'
import CustomziedModal from '@/components/customziedModal.vue'
export default {
    components:{
        'headers':Header,
        'outfit':Outfit,
        'customzied-modal':CustomziedModal,
    }
}
</script>

