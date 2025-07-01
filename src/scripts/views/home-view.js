export default class HomeView {
  render() {
    return `
    <section class="container-home" id="main-content">
      <button>
        <a href="#main-content" class="skip-link">Skip to content</a>
      </button>
      <h1 class="content-title">Daftar Story</h1>
      <div id="loading-overlay" hidden>
        <div class="spinner"></div>
      </div>
      <button id="show-offline-btn" class="story-btn-submit" style="margin-bottom:1rem;">Lihat Story Offline</button>
      <div id="home-map" style="height:300px; margin-bottom:1rem;"></div>
      <div id="stories"></div>
    </section>
    `;
  }

  setLatLon(lat, lon) {
    const latInput = document.getElementById("lat");
    const lonInput = document.getElementById("lon");
    if (latInput && lonInput) {
      latInput.value = lat;
      lonInput.value = lon;
    }
  }

  showLoading() {
    document.getElementById("loading-overlay").hidden = false;
  }

  hideLoading() {
    document.getElementById("loading-overlay").hidden = true;
  }

  showStories(stories, isOffline = false) {
    let html = "";
    if (stories.length === 0 && isOffline) {
      html = `
      <div class="offline-empty">
        <img src="/icons/icon-192x192.png" alt="No Offline Story" style="width:96px;display:block;margin:2rem auto 1rem auto;opacity:0.7;">
        <h3 style="text-align:center;color:#888;">Belum ada story offline</h3>
        <p style="text-align:center;color:#aaa;">Simpan story favoritmu agar bisa diakses tanpa internet!</p>
      </div>
    `;
    } else {
      html = stories
        .map(
          (story) => `
      <div class="story-card">
        <img src="${story.photoUrl || ''}" alt="${story.name || ''}" class="story-img" />
        <h3>${story.name || ''}</h3>
        <p>${story.description || ''}</p>
        <p>${story.createdAt || ''}</p>
        ${
          isOffline
            ? `<button class="delete-offline-btn" data-id="${story.id}">Hapus</button>`
            : `<button class="save-offline-btn" data-id="${story.id}">Simpan Offline</button>`
        }
      </div>
    `
        )
        .join("");
      html = `<div class="stories-list">${html}</div>`;
    }
    document.getElementById("stories").innerHTML = html;
  }

  bindSaveOffline(handler) {
    document.getElementById("stories").addEventListener("click", (e) => {
      if (e.target.classList.contains("save-offline-btn")) {
        const id = e.target.getAttribute("data-id");
        handler(id);
      }
    });
  }

  bindShowOffline(handler) {
    document.getElementById("show-offline-btn").addEventListener("click", handler);
  }

  bindDeleteOffline(handler) {
    const storiesDiv = document.getElementById("stories");
    // Unbind event listener sebelumnya
    if (this._deleteOfflineHandler) {
      storiesDiv.removeEventListener("click", this._deleteOfflineHandler);
    }
    // Simpan handler baru
    this._deleteOfflineHandler = function (e) {
      if (e.target.classList.contains("delete-offline-btn")) {
        const id = e.target.getAttribute("data-id");
        handler(id);
      }
    };
    storiesDiv.addEventListener("click", this._deleteOfflineHandler);
  }

  showSuccess(msg) {
    alert(msg);
  }

  showError(msg) {
    alert(msg);
  }

  checkOnlineStatus() {
    if (!navigator.onLine) {
      document.getElementById("home-map").innerHTML = "<div style='text-align:center;color:#888;padding:2rem'>Peta tidak tersedia saat offline.</div>";
    }
  }
}
