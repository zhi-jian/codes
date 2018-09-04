<template>
    <div>
        <headers></headers>
        <order-detail></order-detail>
    </div>
</template>
<script>
import OrderDetail from '@/components/orderDetail.vue'
import Header from '@/components/header.vue'
export default {
    components:{
        'headers':Header,
        'order-detail':OrderDetail
    }
}
</script>

