import StoryModel from "../data/story-model";
import LoginPresenter from "../presenters/login-presenter";
import LoginView from "../views/login-view";


export default class LoginPage {
  #presenter;
  #view;

  async render() {
    this.#view = new LoginView();
    return this.#view.render();
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this.#view,
      model: StoryModel,
    });

    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const { email, password } = this.#view.getFormData();
      await this.#presenter.handleLogin({ email, password });
    });
  }
}
