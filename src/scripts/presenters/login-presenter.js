import * as auth from "../utils/auth.js";

export default class LoginPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async handleLogin({ email, password }) {
    this.#view.showLoading();
    try {
      const result = await this.#model.login(email, password);
      if (result && result.error === false) {
        auth.setAccessToken(result.loginResult.token);
        auth.setIsLoggedIn(true);

        this.#view.showSuccess("Login berhasil!");
        this.#view.redirectToHome();
      } else {
        this.#view.showError(result?.message || "Login gagal.");
      }
    } catch (err) {
      this.#view.showError("Terjadi kesalahan saat login.");
    }
    this.#view.hideLoading();
  }
}
