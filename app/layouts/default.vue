<template>
  <Navbar />
  <slot />
  <!-- <Footer /> -->
</template>

<script setup>
import Navbar from '@/components/layout/NavBar.vue';
import Footer from '@/components/layout/Footer.vue';
</script>