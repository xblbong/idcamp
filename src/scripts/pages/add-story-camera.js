import StoryModel from "../data/story-model";
import AddStoryCameraPresenter from "../presenters/add-story-camera-presenter";
import AddStoryCameraView from "../views/add-story-camera-view";

export default class AddStoryCameraPage {
  #presenter;
  #view;

  async render() {
    this.#view = new AddStoryCameraView();
    return this.#view.render();
  }

  async afterRender() {
    this.#presenter = new AddStoryCameraPresenter({
      view: this.#view,
      model: StoryModel,
    });

    await this.#presenter.initMap();
    await this.#presenter.startCamera();

    document.getElementById("take-photo").addEventListener("click", () => {
      this.#presenter.handleTakePhoto();
    });

    document.getElementById("story-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const { description, lat, lon } = this.#view.getFormData();
    await this.#presenter.handleSubmit({ description, lat, lon });
  });   
  }

  destroy() {
    if (this.#presenter) {
      this.#presenter.stopCamera();
    }
  }
}
