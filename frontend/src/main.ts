import './style.css';

interface Pages {
    [key: string]: () => Promise<any>;
}

const pages: Pages = {
    home: () => import('./pages/home/home.ts')
}

const namespace = window.location.pathname.split('/')[3];
if ( pages[namespace] ) {
      const { init } = await pages[namespace]();
      init();
}