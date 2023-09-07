<template>
  <section class="not-found" aria-labelledby="not-found-heading">
    <h2 class="not-found__heading" id="not-found-heading">404. Not Found</h2>
    <RouterLink class="not-found__link" :to="{ name: 'home' }">go home</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10rem;
}

.not-found__heading {
  font-size: 1.75rem;
}

.not-found__link {
  font-size: 1.5rem;
  color: var(--green);
}
</style>
