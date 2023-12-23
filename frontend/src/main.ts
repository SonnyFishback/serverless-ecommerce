import './main.scss';
import { register } from './$lib/services/Authentication.ts';

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

  const form = document.querySelector('#registration-form');
  ( form && form instanceof HTMLFormElement ) && form.addEventListener('submit', handleRegistrationSubmission)
  
})();