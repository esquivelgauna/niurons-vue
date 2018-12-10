<template>
    <div>
        <h3>Saliendo</h3>
    </div>
</template>

<script>
export default {

    mounted(){
        localStorage.removeItem('token');
    }
}
</script>

<style>

</style>
