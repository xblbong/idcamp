import '../styles/styles.css';

import App from './app.js';
import './utils/skip-link.js';
import { showLoading, hideLoading } from './utils/loading.js';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });

  await app.renderPage();
});


async function afterRender() {
  showLoading();
  await doSomethingAsync();
  hideLoading();
}