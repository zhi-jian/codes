<template>
    <div>
        <headers></headers>
        <ficitious></ficitious>
    </div>
</template>
<script>
import Ficitious from '@/components/ficitious.vue'
import Header from '@/components/header.vue'
export default {
    components:{
        'headers':Header,
        'ficitious':Ficitious,
    }
}
</script>

