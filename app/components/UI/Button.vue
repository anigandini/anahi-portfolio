<template>
  <component
    :is="tag"
    :href="href"
    class="base-button title"
    :class="[variant, { full }]"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
type Props = {
  href?: string
  variant?: 'primary' | 'secondary'
  full?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  full: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const tag = computed(() => (props.href ? 'a' : 'button'))

const onClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  padding: 19px 40px;
  border-radius: 50px;

  font-family: sans-serif;
  font-size: 14px;
  line-height: 1;
  text-decoration: none;

  cursor: pointer;
  border: none;

  transition: all 0.3s cubic-bezier(0.4, 0.4, 0, 1);
  -webkit-tap-highlight-color: transparent;
}

.primary {
  background: #111111;
  color: #ffffff;
}

.primary:hover {
  background: var(--color-primary);
}

.secondary:hover {
  background: #fff;
  color: var(--color-primary);
}


.full {
  width: 100%;
}


.base-button:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

.base-button:active {
  transform: translateY(0px);
}
</style>

