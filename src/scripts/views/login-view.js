export default class LoginView {
  render() {
    return `
        <a href="#main-content" class="skip-link">Skip to content</a>
      <section class="container-login" id="main-content">
        <h1>Login</h1>
        <form id="login-form">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Email" required />
        <label for="password">Password</label>
          <input type="password" id="password" placeholder="Password" required />
          
          <button type="submit">Login</button>
          <p>Belum punya akun? <a href="#/register">Daftar</a></p>
        </form>
        <div id="loading-overlay" hidden>
          <div class="spinner"></div>
        </div>

      </section>
    `;
  }

  getFormData() {
    return {
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value.trim(),
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

  redirectToHome() {
    window.location.hash = "#/home";
  }
}
