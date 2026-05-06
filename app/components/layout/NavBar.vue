<template>
    <div class="navbar container fixed flex flex-row p-4 items-center justify-between">
        <figure class="logo">
            <img src="/logo.png" alt="Logo" class="h-12" />
        </figure>
        <Menu />
    </div>
</template>

<script setup>
import Menu from '../UI/menu.vue'
</script>
