import type { Ref } from 'vue'
import type { gsap as GSAPType } from 'gsap'
import { useColorCycle } from '@/composables/useColorCycle'
type GSAP = typeof GSAPType

// TYPES // ----------------------------------------------------------------------

export interface EllipseConfig {
  id:    number
  color: string
}

interface HeroAnimationRefs {
  letterRefs:  Ref<HTMLElement[]>,
  ellipseRefs: Ref<HTMLElement[]>,
  subtitleRef: Ref<HTMLElement>
  navbarRef:   Ref<HTMLElement>
}

type Pose = {
  x: number
  y: number
  rx: number
  ry: number
  rot: number
}

// CONSTANTS // -------------------------------------------------------------------

const ELLIPSE_COUNT = 4
 
export const ELLIPSE_CONFIGS: EllipseConfig[] = Array.from(
  { length: ELLIPSE_COUNT },
  (_, i) => {
    const cycle = useColorCycle()
    for (let j = 0; j < i; j++) cycle.next()
    return { id: i, color: cycle.next() }
  }
)

// HERO ORCHESTRATOR // --------------------------------------------------------------

export const heroAnimation = (gsap: GSAP, refs: HeroAnimationRefs) => {
    const textTl = animateText(gsap, refs.letterRefs, refs.subtitleRef, refs.navbarRef)
    const bg = animateBackground(gsap, refs.ellipseRefs)
    
    return {
        pause:   () => textTl.pause(),
        resume:  () => textTl.resume(),
        restart: () => textTl.restart(),
        kill:    () => bg.kill()
    }
}

// TEXT ANIMATION // ------------------------------------------------------------------

const animateText = (
  gsap: GSAP, 
  letterRefs: Ref<HTMLElement[]>,
  subtitleRef: Ref<HTMLElement | null>,
  navbarRef:   Ref<HTMLElement | null>
  ) => {
  const letters  = letterRefs.value.filter(Boolean)
  const shuffled = gsap.utils.shuffle([...letters])
  const cycle = useColorCycle()

  return gsap.timeline({ delay: 0.4 })
    .to(shuffled, {
      color: () => cycle.next(),
      opacity: 1,
      duration: 0.01,
      stagger:  0.09,
    })
    .to(subtitleRef.value, {
      opacity:  1,
      duration: 0.8,
      ease:     'power2.inOut',
    }, 0)
    .to(gsap.utils.shuffle([...letters]), {
      color:    '#111111',
      duration: 0.5,
      stagger:  0.07,
      ease:    'power2.out',
      delay:    0.2,
    }, "-=0.5")
    .to(navbarRef.value, {
      opacity:  1,
      duration: 0.5,
      ease:     'power2.out',
    })
    
}

// BACKGROUND ANIMATION // ------------------------------------------------------------------

function buildPoses(W: number, H: number): Pose[][] {
  return [
    [
      { x: W * 0.62, y: H * 0.53, rx: 230, ry: 210, rot: -15 },
      { x: W * 0.22, y: H * 0.28, rx: 190, ry: 160, rot:  20 },
      { x: W * 0.15, y: H * 0.80, rx: 150, ry: 120, rot: -20 },
      { x: W * 0.50, y: H * 0.42, rx: 130, ry: 100, rot:  30 },
    ],
    [
      { x: W * 0.80, y: H * 0.30, rx: 230, ry: 210, rot:  40 },
      { x: W * 0.55, y: H * 0.70, rx: 190, ry: 160, rot: -10 },
      { x: W * 0.85, y: H * 0.55, rx: 150, ry: 120, rot:  60 },
      { x: W * 0.30, y: H * 0.75, rx: 130, ry: 100, rot: -25 },
    ],
    [
      { x: W * 0.70, y: H * 0.72, rx: 230, ry: 210, rot:  10 },
      { x: W * 0.15, y: H * 0.60, rx: 190, ry: 160, rot:  50 },
      { x: W * 0.45, y: H * 0.25, rx: 150, ry: 120, rot:  15 },
      { x: W * 0.70, y: H * 0.20, rx: 130, ry: 100, rot:  10 },
    ],
    [
      { x: W * 0.40, y: H * 0.55, rx: 230, ry: 210, rot: -30 },
      { x: W * 0.75, y: H * 0.45, rx: 190, ry: 160, rot:  -5 },
      { x: W * 0.25, y: H * 0.40, rx: 150, ry: 120, rot: -45 },
      { x: W * 0.85, y: H * 0.80, rx: 130, ry: 100, rot: -60 },
    ],
  ]
}


function animateBackground(
    gsap: GSAP, 
    ellipseRefs: Ref<HTMLElement[]>,
) {
  const W = window.innerWidth
  const H = window.innerHeight
  const poses = buildPoses(W, H)

  const HOLD    = 2.2
  const MORPH   = 0.7
  const COL_DUR = 0.12
  let cycle = 0
  let currentTl: GSAPTimeline | null = null
  const colorCycles = Array.from({ length: ELLIPSE_COUNT }, (_, i) => {
  const cycle = useColorCycle()
  for (let j = 0; j < i + 1; j++) cycle.next()
  return cycle
})
  
  ellipseRefs.value.forEach((el, i) => {
    if (!el) return
    const p = poses[0][i]
    gsap.set(el, {
      left:     p.x - p.rx,
      top:      p.y - p.ry,
      width:    p.rx * 2,
      height:   p.ry * 2,
      rotation: p.rot,
    })
  })

  function runCycle() {
    const next = (cycle + 1) % poses.length
    const tl = gsap.timeline({
      onComplete: () => { cycle = next; runCycle() },
    })
    currentTl = tl

    ellipseRefs.value.forEach((el, i) => {
      if (!el) return
      const to  = poses[next][i]

      tl.to(el, {
        left:     to.x - to.rx,
        top:      to.y - to.ry,
        width:    to.rx * 2,
        height:   to.ry * 2,
        rotation: to.rot,
        duration: MORPH,
        ease:    'sine.inOut',
      }, 0)

      tl.to(el, {
        backgroundColor: () => colorCycles[i].next(),
        duration: COL_DUR,
        ease: 'none',
      }, MORPH * 0.1 + i * 0.03)
    })

    tl.to({}, { duration: HOLD })
  }

  gsap.delayedCall(0.1, runCycle)

  return {
    kill: () => currentTl?.kill(),
  }
}