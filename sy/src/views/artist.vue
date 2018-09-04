<template>
    <div>
        <headers></headers>
        <artist></artist>
    </div>
</template>
<script>
import Artist from '@/components/artist.vue'
import Header from '@/components/header.vue'
export default {
    components:{
        'headers':Header,
        'artist':Artist
    }
}
</script>

