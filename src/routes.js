import Base from './components/Base.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    }

  ]
};

export default routes;
