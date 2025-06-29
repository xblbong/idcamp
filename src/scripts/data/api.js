import CONFIG from '../config.js'

// Endpoint API
const ENDPOINTS = {
  LOGIN: `${CONFIG.BASE_URL}/login`,
  ADD_STORY: `${CONFIG.BASE_URL}/stories`,
  ADD_STORY_GUEST: `${CONFIG.BASE_URL}/stories/guest`,
  GET_STORIES: `${CONFIG.BASE_URL}/stories`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
};

// Fungsi untuk login dan mendapatkan token
export async function login(email, password) {
  const response = await fetch(`${CONFIG.BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

// Fungsi untuk menambahkan cerita baru menggunakan autentikasi
export async function addStory(description, photo, lat, lon) {
  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  if (lat) formData.append('lat', lat);
  if (lon) formData.append('lon', lon);

  const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(CONFIG.ACCESS_TOKEN_KEY)}`,
    },
    body: formData,
  });
  return response.json();
}

// Fungsi untuk menambahkan cerita sebagai tamu tanpa autentikasi
export async function addStoryGuest(description, photo, lat, lon) {
  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  if (lat && lon) {
    formData.append('lat', lat);
    formData.append('lon', lon);
  }

  try {
    const response = await fetch(ENDPOINTS.ADD_STORY_GUEST, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.error) {
      throw new Error('Error adding story (guest): ' + data.message);
    }

    console.log('Cerita berhasil ditambahkan (Guest):', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Fungsi untuk mendapatkan daftar cerita
export async function getStories() {
  const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(CONFIG.ACCESS_TOKEN_KEY)}`,
    },
  });
  const result = await response.json();
  return result.listStory || [];
}

export async function register(name, email, password) {
  const response = await fetch(`${CONFIG.BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
}