<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { useLocationsStore } from '@/stores/locations';

const ERROR_TIME = 3000;

const locationsStore = useLocationsStore();
const name = ref<string>('');
const submitButton = ref<HTMLButtonElement | null>(null);
const error = ref<string>('');
const errorTimer = ref<ReturnType<typeof setTimeout> | undefined>(undefined);

async function addLocation() {
  if (submitButton.value) submitButton.value.disabled = true;

  if (name.value) {
    try {
      await locationsStore.addLocationByName(name.value);
    } catch (err) {
      error.value = `Couldn't add location ${name.value.toLocaleUpperCase()}`;
    }
  }

  name.value = '';
  if (submitButton.value) submitButton.value.disabled = false;
}

watch(error, () => {
  clearTimeout(errorTimer.value);
  errorTimer.value = setTimeout(() => {
    error.value = '';
  }, ERROR_TIME);
});

onUnmounted(() => {
  clearTimeout(errorTimer.value);
});
</script>

<template>
  <form class="add-location" @submit.prevent="addLocation" aria-label="add location">
    <fieldset class="add-location__fieldset">
      <legend>Add location</legend>
      <label class="visually-hidden" for="name">name</label>
      <input
        class="add-location__input"
        v-model.trim="name"
        type="text"
        id="name"
        name="name"
        autocomplete="off"
      />
      <button class="button add-location__submit" ref="submitButton" type="submit" name="submit">
        submit
      </button>
      <span class="add-location__error" aria-live="polite" role="alert">{{ error }}</span>
    </fieldset>
  </form>
</template>

<style scoped>
.add-location {
  background-color: var(--gray);
}

.add-location__fieldset {
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 1rem;
  align-items: start;
  border: 2px solid var(--black);
  border-radius: 5px;
  padding: 1rem;

  @media (width < 495px) {
    grid-template-columns: 1fr;
  }
}

.add-location__input {
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  border: 2px solid var(--green);
  border-radius: 5px;
  padding: 1rem;
}

.add-location__submit {
  width: 150px;
  height: 100%;

  @media (width < 495px) {
    width: 100%;
  }
}

.add-location__error {
  grid-column: 1 / -1;
  color: var(--red);
  text-align: center;
}
</style>
