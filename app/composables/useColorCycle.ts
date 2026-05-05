import { colors } from '@/design/colors'

export const useColorCycle = () => {
  let lastIndex = -1

  const next = (): string => {
    lastIndex = (lastIndex + 1) % colors.length
    return colors[lastIndex] ?? '#000000'
  }

  const reset = () => {
    lastIndex = -1
  }

  return {
    next,
    reset
  }
}