<template>
    <div>
        <headers></headers>
        <artist-detail></artist-detail>
    </div>
</template>
<script>
import Header from '@/components/header.vue'
import ArtistDetail from '@/components/artistDetail.vue'
export default {
    components:{
        'headers':Header,
        'artist-detail':ArtistDetail
    }
}
</script>
<style>

</style>
