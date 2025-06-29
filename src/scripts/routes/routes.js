import AddStoryCameraPage from "../pages/add-story-camera";
import AddStoryPage from "../pages/add-story-page";
import HomePage from "../pages/home-page";
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";



const routes = {
  '/': () => new LoginPage(),
  '/home': () => new HomePage(),
  '/add-story': () => new AddStoryPage(),
  '/add-story-camera': () => new AddStoryCameraPage(),
  '/register': () => new RegisterPage(),
};

export default routes;
