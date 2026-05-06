<template>
  <Navbar ref="navbarRef" class="opacity-0" />
  <slot />
  <!-- <Footer /> -->
</template>

<script setup lang="ts">
//import Footer from '@/components/layout/Footer.vue';
import Navbar from '@/components/layout/NavBar.vue'

const navbarRef = ref(null)
const navbarEl = computed(() => navbarRef.value?.$el ?? null)
provide('navbarRef', navbarEl)
</script>