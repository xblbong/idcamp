import "./utils/skip-link.js";
import routes from "./routes/routes.js";
import { getActiveRoute } from "./routes/url-parser.js";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  currentPage = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
    window.addEventListener("hashchange", () => this.renderPage());
    window.addEventListener("load", () => this.renderPage());
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
        }
      });
    });
  }

  async renderPage() {
    if (this.currentPage && typeof this.currentPage.destroy === "function") {
      this.currentPage.destroy();
    }

    const mainContent = this.#content;

    // Sembunyikan dulu dengan animasi keluar
    await mainContent.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(30px)" },
      ],
      {
        duration: 250,
        fill: "forwards",
      }
    ).finished;

    // Render halaman baru
    if (document.startViewTransition) {
      await document.startViewTransition(async () => {
        await this.#renderPageContent();
      });
    } else {
      await this.#renderPageContent();
    }

    // Tampilkan dengan animasi masuk
    mainContent.animate(
      [
        { opacity: 0, transform: "translateY(-30px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 350,
        fill: "forwards",
      }
    );
  }

  async #renderPageContent() {
    const url = getActiveRoute();
    const route = routes[url];

    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    const hideHeaderFooter = url === "/" || url === "/register";
    if (header && footer) {
      header.style.display = hideHeaderFooter ? "none" : "";
      footer.style.display = hideHeaderFooter ? "none" : "";
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn && url !== "/" && url !== "/register") {
      alert("Silakan login terlebih dahulu.");
      window.location.replace("#/");
      return;
    }

    if (isLoggedIn && url === "/") {
      window.location.replace("#/home");
      return;
    }

    if (route) {
      const page = route();
      this.currentPage = page;
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    } else {
      this.#content.innerHTML = `
      <section class="not-found">
        <h2>Oops! Halaman tidak ditemukan.</h2>
        <p>URL yang kamu akses tidak tersedia.</p>
        <a href="#/home" class="back-home">Kembali ke Beranda</a>
      </section>
    `;
    }

    // Attach logout event
    document.getElementById("logout-btn")?.addEventListener("click", () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLoggedIn");
      // redirect pakai replace supaya back button tidak bisa kembali ke halaman sebelumnya
      window.location.replace("#/");
    });
  }
}

export default App;
