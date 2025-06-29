export default class AddStoryView {
  render() {
    return `
    <a href="#main-content" class="skip-link">Skip to content</a>
      <section class="story-container" id="main-content">
        <h1 class="story-title">Tambah Story</h1>
        <div class="tab-container">
          <a id="file-tab" class="tab-button active" href="#/add-story">Pilih Foto dari File</a>
          <a id="camera-tab" class="tab-button" href="#/add-story-camera">Pilih Foto dengan Kamera</a>
        </div>
        <form id="story-form">
        <label for="photo">Foto</label>
        <div class="story-form-group">
        <input type="file" id="photo" accept="image/*" required />
        <label for="description">Deskripsi</label>
        <textarea id="description" placeholder="Deskripsi" required></textarea>
          <div style="display:flex; width:100%; gap:10px;">
        <span>
          <label for="lat">Latitude</label>
          <input type="text" id="lat" placeholder="Latitude" required />
          </span>
          <span>
          <label for="lon">Longitude</label>
          <input type="text" id="lon" placeholder="Longitude" required />
          </span>
          </div>
          <div id="map" style="height:300px;"></div>
          </div>
          <button class="story-btn-submit" type="submit">Kirim</button>
        </form>
        <div id="loading-overlay" hidden>
          <div class="spinner"></div>
        </div>

        <a href="#main-content" class="skip-link">Skip to content</a>
      </section>
    `;
  }


  getLatLon() {
    return {
      lat: document.getElementById("lat").value,
      lon: document.getElementById("lon").value,
    };
  }

  getFormData() {
    return {
      description: document.getElementById("description").value.trim(),
      photo: document.getElementById("photo").files[0],
      ...this.getLatLon(),
    };
  }
  
  setLatLon(lat, lon) {
  document.getElementById("lat").value = lat;
  document.getElementById("lon").value = lon;
}

  showLoading() {
    document.getElementById("loading-overlay").hidden = false;
  }

  hideLoading() {
    document.getElementById("loading-overlay").hidden = true;
  }

  showError(msg) {
    alert(msg);
  }

  showSuccess(msg) {
    alert(msg);
  }
   redirectToHome() {
    window.location.hash = "#/home";
  }
}
