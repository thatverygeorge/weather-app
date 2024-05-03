<script setup lang="ts">
import { useLocationsStore } from '@/stores/locations';
import { useDragAndDropStore } from '@/stores/dragAndDrop';
import IconBurger from '@/components/icons/IconBurger.vue';
import IconTrashBin from '@/components/icons/IconTrashBin.vue';

const locationsStore = useLocationsStore();
const dragAndDropStore = useDragAndDropStore();
</script>

<template>
  <ul class="locations" v-if="locationsStore.locations.length > 0">
    <li
      v-for="location in locationsStore.locations"
      :key="location.id"
      :id="location.id"
      draggable="true"
      @dragstart="dragAndDropStore.handleDragStart"
      @dragend="dragAndDropStore.handleDragEnd"
    >
      <article class="location-card locations__card">
        <IconBurger
          class="location-card__icon-move"
          @mousedown.left="dragAndDropStore.isDraggedByIcon = true"
          @mouseup.left="dragAndDropStore.isDraggedByIcon = false"
        />
        <p>{{ location.name }}, {{ location.country }}</p>
        <button
          class="button button--as-icon location-card__button-delete"
          type="button"
          @click="locationsStore.deleteLocation(location.id)"
        >
          <span class="visually-hidden">delete location</span>
          <IconTrashBin />
        </button>
      </article>
    </li>
  </ul>
  <p v-else>Nothing to show yet</p>
</template>

<style scoped>
.locations {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.location-card {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid var(--green);
  border-radius: 5px;
  padding: 1rem;
  background-color: var(--white);
}

.location-card__icon-move {
  cursor: move;
  width: 30px;
  height: 30px;
}

.location-card__button-delete {
  justify-self: flex-end;
}
</style>
