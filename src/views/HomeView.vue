<script setup lang="ts">
import { ref } from 'vue';
import { useLocationsStore } from '@/stores/locations';
import WeatherList from '@/components/WeatherList.vue';
import IconUpdate from '@/components/icons/IconUpdate.vue';

const locationsStore = useLocationsStore();

const key = ref<number>(0);

function updateData() {
  key.value += 1;
}
</script>

<template>
  <section class="current-weather" aria-labelledby="heading-current-weather">
    <h2 id="heading-current-weather">Current weather</h2>

    <button
      v-if="locationsStore.locations.length > 0"
      class="button button--as-icon current-weather__button-update"
      type="button"
      @click="updateData"
    >
      <span class="visually-hidden">update weather data</span>
      <IconUpdate />
    </button>

    <WeatherList class="current-weather__list" :key="key" />
  </section>
</template>

<style scoped>
.current-weather {
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 2rem;
  align-items: center;
}

.current-weather__button-update {
  justify-self: end;
}

.current-weather__list {
  grid-column: 1 / -1;
}
</style>
