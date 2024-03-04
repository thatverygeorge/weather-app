<script setup lang="ts">
import SettingsAddLocationForm from '@/components/SettingsAddLocationForm.vue';
import SettingsLocationList from '@/components/SettingsLocationList.vue';
</script>

<template>
  <section class="settings" aria-labelledby="heading-settings">
    <h2 class="settings__heading" id="heading-settings">Settings</h2>

    <SettingsAddLocationForm class="settings__add-location" />
    <SettingsLocationList />
  </section>
</template>

<style scoped>
.settings {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (width < 960px) {
    grid-template-columns: 1fr;
  }
}

.settings__heading {
  grid-column: 1 / -1;
}

.settings__add-location {
  position: sticky;
  top: 2rem;
  left: 0;
  align-self: start;

  @media (width < 960px) {
    position: static;
  }
}
</style>
