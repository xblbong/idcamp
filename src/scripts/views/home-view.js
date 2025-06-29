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
        <div id="home-map" style="height:300px; margin-bottom:1rem;"></div>
        <div id="stories"></div>

      </section>
    `;
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

  showStories(stories) {
    const html = stories
      .map(
        (story) => `
      <div class="story-card">
        <img src="${story.photoUrl}" alt="${story.name}" class="story-img" />
        <h3>${story.name}</h3>
        <p>${story.description}</p>
        <p>${story.createdAt}</p>
      </div>
    `
      )
      .join("");
    document.getElementById(
      "stories"
    ).innerHTML = `<div class="stories-list">${html}</div>`;
  }

  bindAddStory(handler) {
    document.getElementById("add-story-btn").addEventListener("click", handler);
  }

  showError(msg) {
    alert(msg);
  }
}
