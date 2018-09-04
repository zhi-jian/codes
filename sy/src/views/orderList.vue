<template>
    <div>
        <headers></headers>
        <order-list></order-list>
    </div>
</template>
<script>
import OrderList from '@/components/orderList.vue'
import Header from '@/components/header.vue'
export default {
    components:{
        'headers':Header,
        'order-list':OrderList
    }
}
</script>

