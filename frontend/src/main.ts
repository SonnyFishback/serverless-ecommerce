import './main.scss';
import { register, login } from './$lib/services/Authentication.ts';

interface Pages {
  [key: string]: () => Promise<any>;
}

const handleRegistrationSubmission = async (event: Event) => {
  try {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const props = Object.fromEntries(data);
    const { email, password } = props;

    const registration = await register(String(email), String(password));
    console.log(registration);
    

  } catch (error) {
    console.error(error);
  }
}

const handleLoginSubmission = async (event: Event) => {
  try {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const props = Object.fromEntries(data);
    const { email, password } = props;

    const authentication = await login(String(email), String(password));
    console.log(authentication);
    

  } catch (error) {
    console.error(error);
  }
}


(async () => {
  const pages: Pages = {
    home: () => import('./pages/home/home.ts'),
    product: () => import('./pages/product/product.ts'),
    cart: () => import('./pages/cart/cart.ts'),
  };

  const root = window.location.pathname.split('/')[3];

  if (pages[root]) {
    const page = await pages[root]();
    page.init && page.init();
  }

  const registration = document.querySelector('#registration-form');
  ( registration && registration instanceof HTMLFormElement ) && registration.addEventListener('submit', handleRegistrationSubmission)

  const login = document.querySelector('#login-form');
  ( login && login instanceof HTMLFormElement ) && login.addEventListener('submit', handleLoginSubmission)

  
})();