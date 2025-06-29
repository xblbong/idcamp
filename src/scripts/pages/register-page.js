import StoryModel from "../data/story-model";
import RegisterPresenter from "../presenters/register-presenter";
import RegisterView from "../views/register-view";


export default class RegisterPage {
  #presenter;
  #view;
  #submitHandler;

  async render() {
    this.#view = new RegisterView();
    return this.#view.render();
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this.#view,
      model: StoryModel,
    });

    this.#submitHandler = async (e) => {
      e.preventDefault();
      const { name, email, password } = this.#view.getFormData();
      await this.#presenter.handleRegister({ name, email, password });
    };

    document.getElementById("register-form").addEventListener("submit", this.#submitHandler);
  }

  destroy() {
    if (this.#submitHandler) {
      document.getElementById("register-form").removeEventListener("submit", this.#submitHandler);
      this.#submitHandler = null;
    }
  }
}