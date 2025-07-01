import '../styles/styles.css';

import App from './app.js';
import './utils/skip-link.js';
import { showLoading, hideLoading } from './utils/loading.js';
import * as auth from "./utils/auth.js";

const VAPID_PUBLIC_KEY = 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';

if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      // Request permission
      if (Notification.permission !== 'granted') {
        await Notification.requestPermission();
      }
      // Subscribe push
      const convertedVapidKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      let subscription = await reg.pushManager.getSubscription();
      if (!subscription) {
        subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        });
      }
      // Kirim subscription ke API Dicoding
      const token = auth.getAccessToken && auth.getAccessToken();
      if (token && subscription) {
        await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subscription),
        });
      }
    } catch (err) {
      console.error('Push Notification error:', err);
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

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