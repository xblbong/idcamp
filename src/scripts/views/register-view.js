export default class RegisterView {
  render() {
    return `
    <button>
    <a href="#main-content" class="skip-link">Skip to content</a>
    </button>
      <section class="regist-content" id="main-content">
      <form id="register-form">
      <h1>Register</h1>
          <label for="name">Nama</label>
          <input type="text" id="name" placeholder="Nama" required />
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Email" required />
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Password" required />
          <button type="submit" style="margin-top: 0.8rem;">Register</button>
          <p>Sudah punya akun? <a href="#/">Login</a></p>
        </form>
        <div id="loading-overlay" hidden>
          <div class="spinner"></div>
        </div>

      </section>
    `;
  }

  getFormData() {
    return {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
    };
  }

  showLoading() {
    document.getElementById("loading-overlay").hidden = false;
  }
  hideLoading() {
    document.getElementById("loading-overlay").hidden = true;
  }
  showSuccess(msg) {
    alert(msg);
  }
  showError(msg) {
    alert(msg);
  }
  redirectToLogin() {
    window.location.hash = "#/";
  }
}
