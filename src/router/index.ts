import { createRouter, createWebHashHistory } from 'vue-router';
import { useDragAndDropStore } from '@/stores/dragAndDrop';
import HomeView from '@/views/HomeView.vue';
import SettingsView from '@/views/SettingsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView,
    },
  ],
});

router.beforeEach((to) => {
  const dragAndDropStore = useDragAndDropStore();

  if (to.name === 'settings') {
    document.addEventListener('dragover', dragAndDropStore.handleDragOver);
    document.addEventListener('drop', dragAndDropStore.handleDrop);
  } else {
    document.removeEventListener('dragover', dragAndDropStore.handleDragOver);
    document.removeEventListener('drop', dragAndDropStore.handleDrop);
  }
});

export default router;
