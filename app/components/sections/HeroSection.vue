<template>
   <DotLottieVue autoplay loop ref="playerRef" class="animation-bg" src="https://lottie.host/2707ac95-673f-442f-905b-8c3465120689/g0t7HKNbW3.json" />
    <main class="w-full h-screen px-4 flex flex-col justify-center items-center gap-20 z-1">
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
</template>

<script setup>
import { heroAnimation } from '@/animations/hero.animations'
import { useColorCycle } from '@/composables/useColorCycle'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const { $gsap } = useNuxtApp()
const cycle = useColorCycle()

const titleText = "Front end Developer"
const titleLetters = [...titleText]
const letterRefs  = ref([])
const playerRef = ref(null);



let animation

onMounted(() => {
  animation = heroAnimation($gsap, { letterRefs })
  if (playerRef.value) {
    const dotLottie = playerRef.value.getDotLottieInstance();
    dotLottie.addEventListener('pause', () => {
      console.log('paused')
    });
    dotLottie.addEventListener('frame', ({ currentFrame }) => {
      console.log('Frame:', currentFrame)
    });
  }
})

onUnmounted(() => {
  $gsap.killTweensOf('*')
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
</style>
