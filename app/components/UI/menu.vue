<template>
    <nav>
            <!-- Desktop -->
            <ul class="hidden md:flex gap-12 uppercase">
            <li v-for="item in links" :key="item.href">
                <a :href="item.href">{{ item.label }}</a>
            </li>
            </ul>

            <!-- Mobile burger button -->
            <button class="md:hidden" @click="isOpen = !isOpen">
            ☰
            </button>
            
            


            <!-- Mobile drawer -->
             <div v-if="isOpen" class="menu-mobile md:hidden w-full h-full">
                <button v-if="isOpen" class="md:hidden fixed top-4 right-4 z-1000" @click="isOpen = !isOpen">
                  X
                </button>
                <ul class="flex flex-col gap-6 uppercase mt-12">
                <li v-for="item in links" :key="item.href">
                    <a :href="item.href" @click="isOpen = false">{{ item.label }}</a>
                </li>
                </ul>
            </div>
        </nav>
</template>

<script setup>
const isOpen = ref(false)

const links = [
  { label: 'Top', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]
</script>

<style scoped>
.menu-mobile {
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-gray);
  padding: 2rem;
  z-index: 1000;
}
</style>