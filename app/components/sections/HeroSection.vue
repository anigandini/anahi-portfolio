<template>
    <section>
        <div class="ellipses-layer">
            <div v-for="e in ELLIPSE_CONFIGS" :key="e.id" :ref="el => { if (el) ellipseRefs[e.id] = el }" class="ellipse" :style="{ background: e.color }" />
        </div>
        <main class="w-full h-screen px-4 flex flex-col justify-center items-center gap-20 z-10">
            <h1 class="hero-title title md:text-6xl uppercase">
                <span
                    v-for="(letter, i) in titleLetters"
                    :key="i"
                    :ref="el => { if (el) letterRefs[i] = el }"
                    class="letter opacity-0"
                    :class="{ 'is-space': letter === ' ' }"
                    >{{ letter === ' ' ? '\u00A0' : letter }}
                </span>
            </h1>
            <h2 class="md:text-3xl text-center">
                Crafting interactive and visually engaging web experiences
                that bring your brand to life online
            </h2>
        </main>
    </section>
</template>

<script setup lang="ts">
import { heroAnimation, ELLIPSE_CONFIGS } from '@/animations/hero.animations'

const { $gsap } = useNuxtApp()

const titleText = "Front end Developer"
const titleLetters = [...titleText]
const letterRefs  = ref<HTMLElement[]>([])
const ellipseRefs = ref<HTMLElement[]>([])

let animation: ReturnType<typeof heroAnimation>

onMounted(() => {
  animation = heroAnimation($gsap, { letterRefs, ellipseRefs })
})

onUnmounted(() => {
  animation?.kill()
})

</script>

<style scoped>
.animation-bg {
  position: absolute;
  top: -40%;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  transform: scale(2);
}

.ellipses-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.ellipse {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: multiply;
  opacity: 0.82;
  will-change: transform, left, top, width, height;
}
</style>
