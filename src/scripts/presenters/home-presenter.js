import * as idb from "../utils/idb.js";

export default class HomePresenter {
  #view;
  #model;
  #map = null;
  #marker = null;
  #userMarker = null;
  #storyMarkers = [];
  #stories = [];

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showStories() {
    this.#view.showLoading();
    try {
      const stories = await this.#model.getStories();
      this.#stories = stories;
      this.#view.showStories(stories, false);
      await this.initMap();
      this.showStoryMarkers(stories);
      this.#view.bindSaveOffline(this.saveStoryOffline.bind(this));
      this.#view.bindShowOffline(this.showOfflineStories.bind(this));
      this.#view.bindDeleteOffline(this.deleteOfflineStory.bind(this));
    } catch (err) {
      this.#view.showError('Gagal memuat story.');
    }
    this.#view.hideLoading();
  }

  async saveStoryOffline(id) {
    const story = this.#stories.find((s) => s.id === id);
    if (story) {
      await idb.saveStory(story);
      this.#view.showSuccess("Story disimpan ke offline!");
    }
  }

  async showOfflineStories() {
    this.#view.showLoading();
    const stories = await idb.getAllStories();
    this.#view.showStories(stories, true);
    this.#view.bindDeleteOffline(this.deleteOfflineStory.bind(this));
    this.#view.hideLoading();
  }

  async deleteOfflineStory(id) {
    await idb.deleteStory(id);
    this.#view.showSuccess("Story offline dihapus!");
    this.showOfflineStories();
  }

  async initMap() {
    if (this.#map) return;

    const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
      minZoom: 3,
    });
    const satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    const dark = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; CartoDB'
    });

    this.#map = L.map("home-map", {
      center: [-2.5489, 118.0149],
      zoom: 5,
      layers: [osm]
    });

    const baseLayers = {
      "OpenStreetMap": osm,
      "Satellite": satellite,
      "Dark": dark
    };
    L.control.layers(baseLayers).addTo(this.#map);

    // Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          this.#view.setLatLon(lat, lon);
          this.#map.setView([lat, lon], 13);
          this.#marker = L.marker([lat, lon]).addTo(this.#map);
        },
        (err) => console.warn(err)
      );
    }
  }

  showStoryMarkers(stories) {
    this.#storyMarkers.forEach(marker => marker.remove());
    this.#storyMarkers = [];
    stories.forEach(story => {
      if (story.lat && story.lon) {
        const marker = L.marker([story.lat, story.lon])
          .addTo(this.#map)
          .bindPopup(`<b>${story.name || "Story"}</b><br>${story.description || ""}`);
        this.#storyMarkers.push(marker);
      }
    });
  }
}
