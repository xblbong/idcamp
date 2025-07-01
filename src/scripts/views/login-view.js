export default class LoginView {
  render() {
    return `
        <a href="#main-content" class="skip-link">Skip to content</a>
      <section class="container-login" id="main-content">
        <h1 style="font-family: poppins">Login</h1>
        <form id="login-form">
        <label for="email" style="font-family: poppins;">Email</label>
        <input type="email" id="email" placeholder="Email" required style="font-family: poppins;" />
        <label for="password" style="font-family: poppins;">Password</label>
          <input type="password" id="password" placeholder="Password" required style="font-family: poppins;" />
          
          <button type="submit">Login</button>
          <p style="font-family: poppins;">Belum punya akun? <a href="#/register" style="text-decoration:none; font-family: poppins; color: #fff;">Daftar</a></p>
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
