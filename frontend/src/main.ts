interface Pages {
    [key: string]: () => Promise<any>;
}

// Dynamically import the page based on the URL
// e.g. if the URL is /home, then import the home page
const pages: Pages = {
    home: () => import('./pages/home/home.ts')
}

const namespace = window.location.pathname.split('/')[3];
if ( pages[namespace] ) {
      const { init } = await pages[namespace]();
      init();
}