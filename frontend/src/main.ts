interface Pages {
  [key: string]: () => Promise<any>;
}


(async () => {
  const pages: Pages = {
    home: () => import("./pages/home/home.ts"),
  };

  const root = window.location.pathname.split("/")[3];

  if (!pages[root]) {
    return console.error(`Page ${root} not found.`);
  }

  const page = await pages[root]();
  page.init && page.init();
  
})();