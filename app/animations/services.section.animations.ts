import type { Ref } from 'vue'
import type gsap from 'gsap'
import type ScrollTrigger from 'gsap/ScrollTrigger'

interface ServicesSectionAnimationsOptions {
    gsap: typeof gsap
    ScrollTrigger: typeof ScrollTrigger

    computerRef: Ref<HTMLElement | null>
    imageColRef: Ref<HTMLElement | null>
    blobRef: Ref<HTMLElement | null>
    marqueeRef: Ref<HTMLElement | null>
}

export const initServicesSectionAnimations = ({
    gsap,
    ScrollTrigger,
    computerRef,
    imageColRef,
    blobRef,
    marqueeRef,
}: ServicesSectionAnimationsOptions) => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
        gsap.fromTo(
            computerRef.value,
            {
                rotate: -8,
                opacity: 0,
                scale: 0.85,
            },
            {
                rotate: 0,
                opacity: 1,
                scale: 1,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: imageColRef.value,
                    start: 'top 80%',
                },
            },
        )

        const handleMouseEnter = () => {
            gsap.to(computerRef.value, {
                rotate: 3,
                duration: 0.3,
                ease: 'power1.out',
            })
        }

        const handleMouseLeave = () => {
            gsap.to(computerRef.value, {
                rotate: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.4)',
            })
        }

        computerRef.value?.addEventListener('mouseenter', handleMouseEnter)
        computerRef.value?.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            computerRef.value?.removeEventListener('mouseenter', handleMouseEnter)
            computerRef.value?.removeEventListener('mouseleave', handleMouseLeave)
        }
    })

    gsap.fromTo(
        blobRef.value,
        {
            x: 100,
            opacity: 0,
        },
        {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: blobRef.value,
                start: 'top 85%',
            },
        },
    )

    const track = marqueeRef.value

    if (track) {
        const totalWidth = track.scrollWidth / 2

        gsap.to(track, {
            x: -totalWidth,
            duration: 18,
            ease: 'none',
            repeat: -1,
        })
    }

    return () => ctx.revert()
}