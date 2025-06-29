export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async handleRegister({ name, email, password }) {
    if (!name || !email || !password) return this.#view.showError('Semua field wajib diisi.');
    this.#view.showLoading();
    try {
      const result = await this.#model.register(name, email, password);
      if (result && !result.error) {
        this.#view.showSuccess('Registrasi berhasil! Silakan login.');
        this.#view.redirectToLogin();
      } else {
        this.#view.showError(result?.message || 'Registrasi gagal.');
      }
    } catch (err) {
      this.#view.showError('Terjadi kesalahan server atau koneksi.');
    }
    this.#view.hideLoading();
  }
}
