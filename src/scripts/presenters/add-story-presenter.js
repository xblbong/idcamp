import L from "leaflet";

export default class AddStoryPresenter {
  #view;
  #model;
  #map = null;
  #marker = null;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async initMap() {
    const osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "&copy; OpenStreetMap",
        maxZoom: 19,
        minZoom: 3,
      }
    );

    const satellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      }
    );

    const dark = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; CartoDB",
      }
    );

    // Inisialisasi Leaflet map
    this.#map = L.map("map", {
      center: [-2.5489, 118.0149],
      zoom: 5,
      layers: [osm],
    });
    const baseLayers = {
      OpenStreetMap: osm,
      Satellite: satellite,
      Dark: dark,
    };
    L.control.layers(baseLayers).addTo(this.#map);

    // Get lokasi user saat ini
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          this.#map.setView([lat, lon], 13);
          this.#view.setLatLon(lat, lon);
          this.#marker = L.marker([lat, lon]).addTo(this.#map);
        },
        (err) => {
          this.#view.showError("Gagal mendapatkan lokasi: " + err.message);
        }
      );
    } else {
      this.#view.showError("Browser tidak mendukung geolocation.");
    }

    this.#map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      this.#view.setLatLon(lat, lng);
      if (this.#marker) {
        this.#marker.setLatLng([lat, lng]);
      } else {
        this.#marker = L.marker([lat, lng]).addTo(this.#map);
      }
    });
  }

  async handleSubmit({ description, photo, lat, lon }) {
    if (!description) return this.#view.showError("Deskripsi wajib diisi.");
    if (!photo) return this.#view.showError("Silakan pilih foto.");
    if (!lat || !lon || isNaN(parseFloat(lat)) || isNaN(parseFloat(lon))) {
      return this.#view.showError("Lokasi belum dipilih atau tidak valid.");
    }
    this.#view.showLoading();
    try {
      const result = await this.#model.addStory(description, photo, lat, lon);
      if (result && result.error === false) {
        this.#view.showSuccess("Cerita berhasil ditambahkan!");
        this.#view.redirectToHome();
      } else {
        this.#view.showError(result?.message || "Gagal menambahkan cerita.");
      }
    } catch (err) {
      this.#view.showError("Terjadi kesalahan server atau koneksi.");
    }
    this.#view.hideLoading();
  }
}
