import StoryModel from "../data/story-model";
import HomePresenter from "../presenters/home-presenter";
import HomeView from "../views/home-view";

export default class HomePage {
  #presenter;
  #view;

  async render() {
    this.#view = new HomeView();
    return this.#view.render();
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this.#view,
      model: StoryModel,
    });
    await this.#presenter.showStories();
  }
}
