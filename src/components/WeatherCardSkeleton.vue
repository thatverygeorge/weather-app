<template>
  <article class="weather-card-skeleton" aria-hidden="true">
    <div class="weather-card-skeleton__heading"></div>
    <div class="weather-card-skeleton__icon"></div>
    <div class="weather-card-skeleton__temp"></div>
    <div class="weather-card-skeleton__description"></div>
    <div class="weather-card-skeleton__description"></div>
  </article>
</template>

<style scoped>
.weather-card-skeleton {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: start;
  gap: 1rem;
  border: 2px solid black;
  border-radius: 5px;
  padding: 0.5rem;
  animation: pulse 500ms infinite alternate ease-in-out;

  @media (width < 300px) {
    grid-template-columns: 1fr;
  }
}

.weather-card-skeleton__heading {
  grid-column: 1 / -1;
  width: 100%;
  height: 2rem;
  background-color: black;
}

.weather-card-skeleton__icon,
.weather-card-skeleton__temp {
  width: 100px;
  height: 100px;
  background-color: black;
}

.weather-card-skeleton__description {
  grid-column: 1 / -1;
  width: 100%;
  height: 50px;
  background-color: black;
}
</style>
