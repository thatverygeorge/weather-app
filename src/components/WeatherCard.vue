<script setup lang="ts">
import { computed, ref } from 'vue';
import { useLocationsStore } from '@/stores/locations';
import type { Data, Location } from '@/types';
import WeatherCardSkeleton from './WeatherCardSkeleton.vue';
import IconWindArrow from '@/components/icons/IconWindArrow.vue';
import IconPressureGauge from '@/components/icons/IconPressureGauge.vue';
import IconHumidity from '@/components/icons/IconHumidity.vue';
import IconVisibility from '@/components/icons/IconVisibility.vue';

const WIND_DIRECTIONS = {
  N: [348.75, 11.25],
  NNE: [11.25, 33.75],
  NE: [33.75, 56.25],
  ENE: [56.25, 78.75],
  E: [78.75, 101.25],
  ESE: [101.25, 123.75],
  SE: [123.75, 146.25],
  SSE: [146.25, 168.75],
  S: [168.75, 191.25],
  SSW: [191.25, 213.75],
  SW: [213.75, 236.25],
  WSW: [236.25, 258.75],
  W: [258.75, 281.25],
  WNW: [281.25, 303.75],
  NW: [303.75, 326.25],
  NNW: [326.25, 348.75],
};

const props = defineProps<Location>();

const locationsStore = useLocationsStore();
const data = ref<Data | undefined>(
  await locationsStore.fetchCurrentWeatherByCoords(props.coord.lat, props.coord.lon)
);

const windDirection = computed(() => {
  if (!data.value) return '';

  for (const [key, value] of Object.entries(WIND_DIRECTIONS)) {
    if (data.value.wind.deg > value[0] && data.value.wind.deg < value[1]) return key;
  }

  return '';
});
</script>

<template>
  <article class="weather-card" v-if="data">
    <h3 class="weather-card__heading">{{ props.name }}, {{ props.country }}</h3>
    <div class="weather-card__content">
      <img
        class="weather-card__image"
        :src="`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`"
        width="100"
        height="100"
        alt=""
        role="presentation"
      />
      <span class="weather-card__temp">{{ Math.round(data.main.temp) }}&deg;C</span>
      <p class="weather-card__description">
        Feels like {{ Math.round(data.main.feels_like) }}&deg;C
        <br />
        {{ data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1) }}
      </p>
      <p class="weather-card__wind">
        <IconWindArrow :style="{ rotate: data.wind.deg + 'deg' }" />
        {{ data.wind.speed.toFixed(1) }}m/s
        {{ windDirection }}
      </p>
      <p class="weather-card__pressure"><IconPressureGauge /> {{ data.main.pressure }}hPa</p>
      <p class="weather-card__visibility">
        <IconVisibility /> {{ (data.visibility / 1000).toFixed(1) }}km
      </p>
      <p class="weather-card__humidity"><IconHumidity /> {{ data.main.humidity }}%</p>
    </div>
  </article>
  <WeatherCardSkeleton v-else />
</template>

<style scoped>
.weather-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--green);
  border-radius: 5px;
  background-color: var(--white);
}

.weather-card__heading {
  padding: 1rem;
  background-color: var(--green);
  color: var(--white);
}

.weather-card__content {
  flex: 1;
  align-content: flex-start;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.weather-card__image {
  place-self: center;
}

.weather-card__temp {
  font-size: 2.5rem;
  font-weight: bold;
  place-self: center;
}

.weather-card__description {
  grid-column: 1 / -1;
  text-align: center;
}

.weather-card__wind,
.weather-card__pressure,
.weather-card__humidity,
.weather-card__visibility {
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 0.5rem;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
  }

  @media (width < 365px) {
    justify-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: max-content fr;
  }
}
</style>
