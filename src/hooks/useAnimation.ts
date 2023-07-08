import { useRef } from 'react'
import anime from 'animejs'

export const useAnimation = () => {
    const elementRef = useRef<HTMLSpanElement>(null)

    const startAnimate = (startValue: number, endValue: number) => {
        anime({
            targets: elementRef.current,
            innerHTML: [startValue, endValue],
            round: 1,
            easing: 'easeInOutExpo',
        })
    }

    return {
        elementRef,
        startAnimate
    }
}