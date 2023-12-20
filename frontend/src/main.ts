interface Pages {
  [key: string]: () => Promise<any>;
}

(async () => {
  const pages: Pages = {
    home: () => import("./pages/home/home.ts"),
  };

  const namespace = window.location.pathname.split("/")[3];

  if (!pages[namespace]) {
    return console.error(`Page ${namespace} not found`);
  }

  const page = await pages[namespace]();
  page.init && page.init();
  
})();