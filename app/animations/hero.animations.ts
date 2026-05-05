import type { Ref } from 'vue'
import { colors } from '../design/colors'
import { useColorCycle } from '@/composables/useColorCycle'


interface HeroAnimationRefs {
  letterRefs:  Ref<HTMLElement[]>
  //ellipseRefs: Ref<HTMLElement[]>
}


export const heroAnimation = (gsap: GSAP, refs: HeroAnimationRefs) => {
  const textTl = animateText(gsap, refs.letterRefs)

  // animateBackground(tl)
    return {
        pause:   () => textTl.pause(),
        resume:  () => textTl.resume(),
        restart: () => textTl.restart(),
    }
}

const animateText = (gsap: GSAP, letterRefs: Ref<HTMLElement[]>) => {
  const letters  = letterRefs.value.filter(Boolean)
  const shuffled = gsap.utils.shuffle([...letters])
  const cycle = useColorCycle()

  return gsap.timeline({ delay: 0.2 })
    .to(shuffled, {
      color: () => cycle.next(),
      opacity: 1,
      duration: 0.01,
      stagger:  0.09,
    })
    .to(gsap.utils.shuffle([...letters]), {
      color:    '#111111',
      duration: 0.5,
      stagger:  0.07,
      ease:    'power2.out',
      delay:    0.2,
    }, "-=0.5")
    
}

/*const animateBackground = (tl: GSAPTimeline) => {
  tl.from('.hero-bg', { scale: 1.2 }, 0)
}*/