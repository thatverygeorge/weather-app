import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useLocationsStore } from './locations';

enum Position {
  Before = 'before',
  After = 'after',
}

export const useDragAndDropStore = defineStore('dragAndDrop', () => {
  const locationsStore = useLocationsStore();

  const isDraggedByIcon = ref(false);

  const draggedElement = ref<HTMLLIElement | null>(null);
  const targetElement = ref<HTMLLIElement | null>(null);
  const position = ref(Position.After);

  const mouseX = ref(0);
  const mouseY = ref(0);
  const offsetX = ref(0);
  const offsetY = ref(0);

  function handleDragStart(evt: DragEvent) {
    if (isDraggedByIcon.value && evt.dataTransfer) {
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.effectAllowed = 'move';

      const target = evt.target as HTMLLIElement;

      mouseX.value = evt.pageX;
      mouseY.value = evt.pageY;
      const rect = target.getBoundingClientRect();
      offsetX.value = evt.pageX - rect.x;
      offsetY.value = evt.pageY - rect.y;

      draggedElement.value = target;
      draggedElement.value.style.width = `${target.offsetWidth}px`;
      draggedElement.value.style.height = `${target.offsetHeight}px`;
      draggedElement.value.style.position = 'absolute';
      draggedElement.value.style.top = `${mouseY.value - offsetY.value}px`;
      draggedElement.value.style.left = `${mouseX.value - offsetX.value}px`;

      evt.dataTransfer.setDragImage(new Image(), 0, 0);
    } else {
      evt.preventDefault();
    }
  }

  function handleDragOver(evt: DragEvent) {
    evt.preventDefault();

    if (draggedElement.value) {
      mouseX.value = evt.pageX;
      mouseY.value = evt.pageY;

      const elements = document.elementsFromPoint(evt.pageX, evt.pageY);
      elements.forEach((el) => {
        const item = el.closest('.locations li') as HTMLLIElement;
        if (item !== null) {
          handleDragEnter(item);
        }
      });

      draggedElement.value.style.top = `${mouseY.value - offsetY.value}px`;
      draggedElement.value.style.left = `${mouseX.value - offsetX.value}px`;
    }
  }

  function handleDragEnter(target: HTMLLIElement) {
    if (target === draggedElement.value) return;

    if (targetElement.value === null) {
      targetElement.value = target;
    }

    if (target !== targetElement.value) {
      targetElement.value.style.marginTop = '0';
      targetElement.value.style.marginBottom = '0';
      targetElement.value = target;
    }

    if (targetElement.value && draggedElement.value) {
      const rect = targetElement.value.getBoundingClientRect();
      const midPoint = rect.y + rect.height / 2;

      if (mouseY.value <= midPoint) {
        targetElement.value.style.marginTop = `${draggedElement.value.offsetHeight}px`;
        targetElement.value.style.marginBottom = '0';
        position.value = Position.Before;
      } else {
        targetElement.value.style.marginTop = '0';
        targetElement.value.style.marginBottom = `${draggedElement.value.offsetHeight}px`;
        position.value = Position.After;
      }
    }
  }

  function handleDrop(evt: DragEvent) {
    evt.preventDefault();

    isDraggedByIcon.value = false;

    if (draggedElement.value && targetElement.value) {
      const dragIndex = locationsStore.locations.findIndex(
        (el) => el.id === draggedElement.value!.id
      );
      const targetIndex = locationsStore.locations.findIndex(
        (el) => el.id === targetElement.value!.id
      );

      switch (position.value) {
        case Position.Before:
          locationsStore.locations.splice(targetIndex, 0, locationsStore.locations[dragIndex]);
          break;
        case Position.After:
          locationsStore.locations.splice(targetIndex + 1, 0, locationsStore.locations[dragIndex]);
          break;
        default:
          locationsStore.locations.splice(targetIndex + 1, 0, locationsStore.locations[dragIndex]);
          break;
      }

      if (dragIndex < targetIndex) {
        locationsStore.locations.splice(dragIndex, 1);
      } else {
        locationsStore.locations.splice(dragIndex + 1, 1);
      }
    }
  }

  function handleDragEnd() {
    if (draggedElement.value) {
      draggedElement.value.style.position = 'static';
      draggedElement.value.style.width = 'auto';
      draggedElement.value.style.height = 'auto';
      draggedElement.value.style.top = 'auto';
      draggedElement.value.style.left = 'auto';
    }

    if (targetElement.value) {
      targetElement.value.style.marginTop = '0';
      targetElement.value.style.marginBottom = '0';
    }

    draggedElement.value = null;
    targetElement.value = null;
    position.value = Position.After;
  }

  return {
    isDraggedByIcon,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDrop,
    handleDragEnd,
  };
});
