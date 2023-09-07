<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<template>
  <TheHeader />

  <main class="main">
    <div class="main__container">
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component"></component>
        </KeepAlive>
      </RouterView>
    </div>
  </main>

  <TheFooter />
</template>

<style scoped>
.main {
  flex-grow: 1;
  overflow-y: scroll;
  scrollbar-width: none;
}

.main__container {
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: 1rem;
}
</style>
