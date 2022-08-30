import 'virtual:windi.css'
import { createApp } from 'vue'
import { setupNaive } from './utils/naive'
import router from "./router"
import App from './App.vue'

async function bootstrap() {
  const app = createApp(App);

  setupNaive(app);

  app.use(router);
  await router.isReady();

  app.mount('#app', true);
}

void bootstrap();
