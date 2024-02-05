<script setup lang="ts">
import { useLocationsStore } from '@/stores/locations';
import WeatherCard from '@/components/WeatherCard.vue';
import WeatherCardSkeleton from './WeatherCardSkeleton.vue';

const locationsStore = useLocationsStore();
</script>

<template>
  <ul
    v-if="locationsStore.locations.length > 0"
    class="weather-list"
    :class="{ 'weather-list--narrow': locationsStore.locations.length === 1 }"
  >
    <li v-for="location in locationsStore.locations" :key="location.id">
      <Suspense>
        <WeatherCard v-bind="location" />
        <template #fallback>
          <WeatherCardSkeleton />
        </template>
      </Suspense>
    </li>
  </ul>
  <p v-else>Nothing to show yet</p>
</template>

<style scoped>
.weather-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;

  @media (width < 370px) {
    grid-template-columns: 1fr;
  }
}

.weather-list--narrow {
  grid-template-columns: repeat(auto-fit, minmax(320px, 50%));

  @media (width < 370px) {
    grid-template-columns: 1fr;
  }
}
</style>
