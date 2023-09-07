<script setup lang="ts">
import IconSettingsGear from '@/components/icons/IconSettingsGear.vue';
import IconClose from '@/components/icons/IconClose.vue';
</script>

<template>
  <header class="header">
    <div class="header__container">
      <h1 class="header__heading">Weather App</h1>

      <button
        class="button button--as-icon header__nav-button"
        v-if="$route.name === 'settings'"
        type="button"
        @click="$router.push({ name: 'home' })"
      >
        <span class="visually-hidden">go to settings</span>
        <IconClose />
      </button>

      <button
        class="button button--as-icon header__nav-button"
        v-if="$route.name === 'home'"
        type="button"
        @click="$router.push({ name: 'settings' })"
      >
        <span class="visually-hidden">go to main screen</span>
        <IconSettingsGear />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  flex-shrink: 0;
  background-color: var(--green);
}

.header__container {
  max-width: var(--max-content-width);
  min-height: 85px;
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 1rem;
  justify-items: flex-start;
  align-items: center;
  margin: 0 auto;
  padding: 1rem;
}

.header__heading {
  font-size: 1.75rem;
  color: var(--white);
}

.header__nav-button {
  justify-self: end;
  color: var(--white);
}
</style>
