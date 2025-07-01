export default class RegisterView {
  render() {
    return `
    <a href="#main-content" class="skip-link">Skip to content</a>
      <section class="regist-content" id="main-content">
      <form id="register-form">
      <h1 style="font-family: poppins">Register</h1>
          <label style="font-family: poppins; color: #fff;" for="name">Nama</label>
          <input type="text" id="name" placeholder="Nama" required style="font-family: poppins;" />
          <label style="font-family: poppins; color: #fff;" for="email">Email</label>
          <input type="email" id="email" placeholder="Email" required style="font-family: poppins;" />
          <label style="font-family: poppins; color: #fff;" for="password">Password</label>
          <input type="password" id="password" placeholder="Password" required style="font-family: poppins;" />
          <button type="submit" style="margin-top: 0.8rem;">Register</button>
          <p style="font-family: poppins;">Sudah punya akun? <a href="#/" style="text-decoration:none; font-family: poppins; color: #fff;">Login</a></p>
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
