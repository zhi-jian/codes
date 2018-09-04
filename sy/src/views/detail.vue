<template>
    <div>
        <headers></headers>
        <detail></detail>
        <customzied-modal></customzied-modal>
    </div>
</template>
<script>
import Header from '@/components/header.vue'
import Detail from '@/components/detail.vue'
import CustomziedModal from '@/components/customziedModal.vue'
export default {
    components:{
        'headers':Header,
        'detail':Detail,
        'customzied-modal':CustomziedModal,
    }
}
</script>
<style>

</style>
