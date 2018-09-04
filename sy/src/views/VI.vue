<template>
    <div>
        <headers></headers>
        <vi></vi>
        <customzied-modal></customzied-modal>
    </div>
</template>
<script>
import VI from '@/components/VI.vue'
import Header from '@/components/header.vue'
import CustomziedModal from '@/components/customziedModal.vue'
export default {
    components:{
        'headers':Header,
        'vi':VI,
        'customzied-modal':CustomziedModal,
    }
}
</script>

