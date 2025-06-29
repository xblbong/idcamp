import StoryModel from "../data/story-model";
import AddStoryPresenter from "../presenters/add-story-presenter";
import AddStoryView from "../views/add-story-view";

export default class AddStoryPage {
  #presenter;
  #view;

  async render() {
    this.#view = new AddStoryView();
    return this.#view.render();
  }

  async afterRender() {
    this.#presenter = new AddStoryPresenter({
      view: this.#view,
      model: StoryModel,
    });

    await this.#presenter.initMap();

    document.getElementById("story-form").addEventListener(
      "submit",
      async (e) => {
        e.preventDefault();
        const { description, photo, lat, lon } = this.#view.getFormData();
        await this.#presenter.handleSubmit({ description, photo, lat, lon });
      },
      { once: true }
    );
  }
}
