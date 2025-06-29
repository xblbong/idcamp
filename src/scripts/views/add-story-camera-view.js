export default class AddStoryCameraView {
  render() {
    return `
    <a href="#main-content" class="skip-link">Skip to content</a>
      <section class="story-container" id="main-content">
        <h1 class="story-title ">Tambah Story Kamera</h1>
        <div class="tab-container">
          <a id="file-tab" class="tab-button active" href="#/add-story">Pilih Foto dari File</a>
          <a id="camera-tab" class="tab-button" href="#/add-story-camera">Pilih Foto dengan Kamera</a>
        </div>
        <label for="photo">Foto</label>
        <video id="camera" autoplay></video>
        <button id="take-photo" class="story-btn-submit" type="button">Ambil Foto</button>
        <img id="preview-photo" alt="gambar" style="display:none; max-width:100%;" />
        <form id="story-form">
          <div class="story-form-group">
          <label for="description">Deskripsi</label>
          <input type="text" id="description" placeholder="Deskripsi" required />
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
          <div id="map" style="height:300px;"> </div>
          </div>
          <button class="story-btn-submit" type="submit">Kirim</button>
        </form>
        <div id="loading-overlay" hidden>
          <div class="spinner"></div>
        </div>

      </section>
    `;
  }

  setLatLon(lat, lon) {
    document.getElementById("lat").value = lat;
    document.getElementById("lon").value = lon;
  }

  getFormData() {
    return {
      description: document.getElementById("description").value.trim(),
      lat: document.getElementById("lat").value,
      lon: document.getElementById("lon").value,
    };
  }

  showCamera(stream) {
    const video = document.getElementById("camera");
    video.srcObject = stream;
  }

  async capturePhoto() {
    const video = document.getElementById("camera");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    return await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg"));
  }

  stopCamera() {
    const video = document.getElementById("camera");
    video.srcObject = null;
  }

  async capturePhoto() {
    const video = document.getElementById("camera");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    return await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg"));
  }

  showPreview(blob) {
    const preview = document.getElementById("preview-photo");
    preview.src = URL.createObjectURL(blob);
    preview.style.display = "block";
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
