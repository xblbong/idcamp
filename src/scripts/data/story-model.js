import { addStory, addStoryGuest, getStories, login, register } from "./api.js";


const StoryModel = {
  getStories,
  addStory,
  addStoryGuest,
  login,
  register,
};

export default StoryModel;