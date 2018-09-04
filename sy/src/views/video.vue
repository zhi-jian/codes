<template>
    <div>
        <headers></headers>
        <videos></videos>
    </div>
</template>
<script>
import Video from '@/components/video.vue'
import Header from '@/components/header.vue'
export default {
    components:{
        'headers':Header,
        'videos':Video,
    }
}
</script>

