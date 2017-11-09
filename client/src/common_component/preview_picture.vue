<template>
    <div id='preview_picture' class="modal fade">

        <img class='image' src=""/>


    </div>
</template>

<script>
    export default {
        props: {
            chosenImage: {

            }
        }
    }

</script>

<style scoped>
    .image{
        margin: auto;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        max-width: 80%;
        max-height: 80%;
    }
</style>