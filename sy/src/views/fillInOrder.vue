<template>
    <div>
        <headers></headers>
        <fillIn-order></fillIn-order>
    </div>
</template>
<script>
import FillInOrder from '@/components/fillInOrder.vue'
import Header from '@/components/header.vue'
export default {
    components:{
        'headers':Header,
        'fillIn-order':FillInOrder,
    }
}
</script>


