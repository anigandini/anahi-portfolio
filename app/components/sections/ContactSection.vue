<template>
    <section class="services-section flex flex-col mt-30 p-25 pb-10">
        <h3 class="title text-5xl">HAVE A PROJECT IN MIND?<br>LET’S TALK</h3>
        <main>
            <ul class="flex flex-col gap-10">
                <li class="flex items-center gap-5" v-for="link in links" :key="link.name">
                    <button
                        v-if="link.copy"
                        @click="copyEmail(link.value)"
                        class="text-xl cursor-pointer"
                    >
                        {{ copied ? 'Email copied!' : link.name }}
                    </button>

                    <a
                        v-else
                        :href="link.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-xl"
                    >
                        {{ link.name }}
                    </a>  
                </li>
                
            </ul>
        </main>
        <footer>@2026 Anahí</footer>
    </section>
</template>

<style scoped>
.services-section {
    background-color: var(--color-black);
    color: var(--color-white);
}

ul {
    align-items: flex-end;
}

button:hover {
    color: var(--color-primary);
}

</style>

<script setup lang="ts">
import { ref } from 'vue'

const copied = ref(false)

const copyEmail = async (email: string) => {
    try {
        await navigator.clipboard.writeText(email)

        copied.value = true

        setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch (error) {
        console.error('Failed to copy email:', error)
    }
}

const links = [
    {
        name: 'Email',
        value: 'anigandini@gmail.com',
        copy: true
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/anigandini'
    },
    {
        name: 'GitHub',
        href: 'https://github.com/anigandini'
    }
]
</script>