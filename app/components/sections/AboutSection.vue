<template>
    <section class="about-section w-full 
    h-screen mt-30 lg:pl-25">
        <main class="container flex flex-col w-full">
            <h3 class="text-xl md:text-xl title uppercase">
                philosophy
            </h3>
            <figure class="about-title">
                <div/>
                <h2 class="text-6xl title uppercase">Design <br> Matters</h2>
            </figure>
            <p class="text-lg md:text-xl mt-6 max-w-2xl self-end text-end lg:pr-25">
                I believe the web is more than functionality, it’s a space where brands can express, connect and create meaningful experiences.
            </p>
            <Button variant="primary" class="mt-10 uppercase self-end lg:mr-25">
                View About
            </Button>
        </main>
    </section>
</template>
<style scoped>
.about-title {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0;
    margin-top: 2rem;
}
.about-title div {
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    background-color: var(--color-primary);
}
.about-title h2 {
    line-height: 1.5;
    position: relative;
    left: -3rem;
}
</style>
<script setup lang="ts">
import Button from '@/components/UI/Button.vue'
</script>