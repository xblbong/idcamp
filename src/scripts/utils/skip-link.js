export default class SkipLink {
  async render() {
    return `
        <h1 class="story-title">Tambah Cerita Baru</h1>

    `}
}

document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.querySelector("#main-content");
  const skipLink = document.querySelector(".skip-link");
  if (skipLink && mainContent) {
    skipLink.addEventListener("click", function (event) {
      event.preventDefault();
      skipLink.blur();
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
      mainContent.scrollIntoView();
      setTimeout(() => mainContent.removeAttribute("tabindex"), 1000);
    });
  }
});