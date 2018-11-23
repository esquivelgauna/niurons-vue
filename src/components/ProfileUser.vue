<template>
<div class="container">
    <div class="column">
        <h3> Perfil de usuario {{ $route.params.nickname }} </h3>
        <div class="columns">
            <div class="columm is-4 ">
                <img :src=" $host + session.img" alt="">
            </div>
            <div class="columm is-4 "></div>
        </div>
    </div>
</div>
</template>
