<template>
  <section class="services-section">
    <div class="services-grid">
      <div class="image-col" ref="imageColRef">
        <img
          src="/computer.png"
          alt="Retro computer"
          class="computer-img"
          ref="computerRef"
        />
      </div>
      <div class="content-col">
          <div class="blob-wrap" ref="blobRef">
            <div class="blob">
              <p class="eyebrow title">WHAT I DO</p>
            <p class="blob-text">Built with intention, designed to connect.</p>
            <Button class="full secondary">VIEW SERVICES</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="marquee-wrap" aria-hidden="true">
        <div class="marquee-track" ref="marqueeRef">
            <span v-for="n in 6" :key="n" class="marquee-item">
            LET'S CREATE TOGETHER.
            </span>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
    import Button from '@/components/ui/Button.vue'
    import { initServicesSectionAnimations } from '@/animations/services.section.animations'

    const { $gsap, $ScrollTrigger } = useNuxtApp()

    const computerRef = ref<HTMLElement | null>(null)
    const imageColRef = ref<HTMLElement | null>(null)
    const blobRef = ref<HTMLElement | null>(null)
    const marqueeRef = ref<HTMLElement | null>(null)

    onMounted(() => {
        const cleanup = initServicesSectionAnimations({
            gsap: $gsap,
            ScrollTrigger: $ScrollTrigger,
            computerRef,
            imageColRef,
            blobRef,
            marqueeRef,
        })

        onUnmounted(() => {
            cleanup?.()
        })
    })
</script>

<style scoped>
.services-section {

}

.services-grid {
  display: flex;
}


.image-col {
  background: var(--color-gray);
  width: 50%;
  display:    flex;
  align-items: flex-end;
  justify-content: center;
  padding:    4rem 2rem 0;
  height:     100%;
  overflow: visible;
  
}

.computer-img {
  width:          293.5px;
  height:         262px;
  transform: translate(0px, 70px);
  object-fit:     contain;
  display:        block;
  will-change:    transform, opacity;
  cursor:         pointer;
  transform-origin: bottom center;
  OVERFLOW: visible;
  Z-INDEX: 1;
}

.content-col {
  background: #fff;
  height:     50%;
  display:    flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  align-items: center;
  padding:    0rem 1.5rem;
  position:   relative;
}

.eyebrow {
}


.blob-wrap {
  will-change: transform, opacity;
}

.blob {
  background:    var(--color-primary);
  border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
  padding:       5rem 4rem 4rem;
  display:       flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:           2.5rem;
  max-width:     520px;
  position:      relative;
  transform: translate(0px, 70px);
  MARGIN-TOP: 2rem;
  left: -80px;
}

.blob-text {
  font-family: 'Noto Sans', sans-serif;
  text-align:  center;
  font-size:   1.35rem;
  font-weight: 400;
  color:       #fff;
  line-height: 1.5;
  max-width:   320px;
}

.blob-btn {
  align-self: flex-start;
}


.marquee-wrap {
  overflow:    hidden;
  padding:     1.2rem 0;
  background: #fff;
}

.marquee-track {
  display:    flex;
  white-space: nowrap;
  will-change: transform;
}

.marquee-item {
  font-family:    'Poppins', sans-serif;
  font-weight:    800;
  font-size:      4.5rem;
  color:          var(--color-primary);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  padding-right:  2rem;
  padding-top:    2.5rem;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .image-col {
    padding: 3rem 2rem 0;
    height:  auto;
  }

    .computer-img {
    width:          364px;
    height:         325px;
    }

  .content-col {
    padding: 0rem 1.5rem;
  }

  .blob {
    left:    0;
    padding: 3rem 2rem;
  }
}
</style>