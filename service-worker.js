if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([{"revision":"9f5ee428e1a2d794bfa33995ac30868b","url":"android-chrome-192x192.png"},{"revision":"5dcbe3bceb5942e59ef35c18d33cf482","url":"android-chrome-512x512.png"},{"revision":"5fb8625a0d1f3f89884cc51446db8b54","url":"apple-touch-icon.png"},{"revision":"96e5b3e58177a52b29140fd0c70435d5","url":"favicon-16x16.png"},{"revision":"f075b6cd2032f27ef7a0c01acb108da9","url":"favicon-32x32.png"},{"revision":"9a3a9001b74f08be3f5558e0b652a697","url":"index.html"},{"revision":"ecc1072ab7fec601e83463a8c9010a3d","url":"logo1024.jpg"},{"revision":"b7e353c9b9ece24e40b991520dc1a0e8","url":"logo192.jpg"},{"revision":"c29943cc5d929c9c202a23a4a96b227b","url":"logo512.jpg"},{"revision":"0144e3f5cfddc7794fa09a96ee306994","url":"static/css/main.7fcb4807.css"},{"revision":"4b1b8f90efc0cf2400a2d702a668a8cd","url":"static/js/787.c67eddf0.chunk.js"},{"revision":"b4b842002182a5d9c7161489bd86595b","url":"static/js/main.5fbe05d4.js"},{"revision":"f794a3546371e1e6c7818be5c8aa1709","url":"static/media/2.8f7aef419a7ee65b8d96.png"},{"revision":"62eb4e339bfb9a688b56241568f3ea83","url":"static/media/3.476a04c895b3e4230945.png"},{"revision":"73314ce136b118d9efa8b07fee2dbbbb","url":"static/media/4.aeb12ef4f204f05984cd.png"},{"revision":"21efb0e55165212f0a58c105735bd4f3","url":"static/media/5.42d79397283ea8607e48.png"},{"revision":"e9b495887a22a7a451702262448838ff","url":"static/media/6.9aee1a739cc66fee6ada.png"},{"revision":"991d0642a64fdaad5331298d590cb1be","url":"static/media/7.fca9f3a63c46cc83d50c.png"},{"revision":"544b932dc7185d4582b9678ff9204105","url":"static/media/8.27b3ec15658a414f1449.png"},{"revision":"806add9ee9d6ca7daca8095f573dc223","url":"static/media/9.c2ade75b1d04faf311ce.png"},{"revision":"80a241784f2baa191be3e1f5fb543d29","url":"static/media/aAssassinNinja.557040dfc945219c8261.ttf"},{"revision":"460ca5def163d293c207f566f5c96cb3","url":"static/media/aAssassinNinja.f42c14392520b8b323df.otf"},{"revision":"1b4da4ee32d899242b3e8194542f8ac9","url":"static/media/back.b338c1f36b17c3ed8e9d.png"},{"revision":"b92b4c2774a318379f499a6be113f9db","url":"static/media/back.bb83a2ea8622e1eb6aa6.jpg"},{"revision":"f7173da1068d7cda86d869ad0dab6cff","url":"static/media/beverage-1.ebceb0df95325d39b340.jpg"},{"revision":"f57dc6ac62455a9a84627211a70bc0c0","url":"static/media/beverage-2.d81a574b897ae0eca65e.jpg"},{"revision":"b6ba8d47596f6462b778122006cfa622","url":"static/media/beverage-3.f9237f9d05707745e320.jpg"},{"revision":"0e53067429000410ef7e61d8d2322eb3","url":"static/media/beverage-4.34bdd270fcfd77a7ebde.jpg"},{"revision":"5d15bf6f5d1a711274d04d68f86bc6bd","url":"static/media/beverage-5.f3aee08c01a8d61480b1.jpg"},{"revision":"76395a913f37bd764ed6f732b1b33f41","url":"static/media/beverage-6.94bedfaf458bc7a48d30.jpg"},{"revision":"6c33d889e15f96f16a14c91f51a57a7f","url":"static/media/beverage-7.1d370cc0f4bcc6e4ff19.jpg"},{"revision":"07c3e8ec0e72286e84020a3ebe013736","url":"static/media/beverage-8.d846abc4170a9bc6e502.jpg"},{"revision":"a452f57ca326ba4eadf99e3cbf9258c6","url":"static/media/beverage-9.0a3d53aeee5eec4dcb41.jpg"},{"revision":"8629aa442cbc929fc65ae53449166f83","url":"static/media/beverage.1d95684fa22d5f69c649.png"},{"revision":"089c7ea3fbf5c4424da977ddbffefd5b","url":"static/media/dark.3b05e632ea43d19ebea9.png"},{"revision":"e28dafb45b132ea689ede377b3fed13b","url":"static/media/food-1.a2c54ca951802e9b0a9e.jpg"},{"revision":"c9abaf97176582a02ed1165bbdd2059e","url":"static/media/food-2.8495ae6cafff5f13f41a.jpg"},{"revision":"8ac34554e2128286ffa108fb4af8513a","url":"static/media/food-3.5e2ef5ca3b31944f4059.jpg"},{"revision":"7db4e52f780de93da0f6b1d077ee2e1c","url":"static/media/food-4.e60e43806399e3316078.jpg"},{"revision":"fac1ed65c95913719937524e6d646432","url":"static/media/food-5.a4e3b13c210b1f80c64c.jpg"},{"revision":"9ffd05aff426f5a3d023a05fb30e35a3","url":"static/media/food-6.57d74670e9d639c11c8c.jpg"},{"revision":"0e2b6c0497727ba9fe07cd7ac86bbd3d","url":"static/media/food-7.dca2c87058d6f53937ed.jpg"},{"revision":"b998364b67cb41a777302e04143e468d","url":"static/media/food-8.55d6d2e5471fb1b2a908.jpg"},{"revision":"3981b06d6f9cdab0ebb320075c5784cb","url":"static/media/food-9.26f1b0a60d7bb8a69a69.jpg"},{"revision":"18794613bc1b1e61a039e13fe861db2e","url":"static/media/food.291588b551f5e3ecb507.png"},{"revision":"1a3aef68d32f0d0e0cdc155715916ff2","url":"static/media/Hikari Playing Board with Items.1fbe314f282aadfa6bb0.png"},{"revision":"8426aa76e1346a6c364427cea34e1266","url":"static/media/incense-1.387330a3677427b3cd3e.jpg"},{"revision":"98de934a111173fca22aadbfb97ae38d","url":"static/media/incense-2.f2c910379a130969550e.jpg"},{"revision":"892688b8c33a1014f42a78be007a21be","url":"static/media/incense-3.e56bd8dfb1013f23c0a2.jpg"},{"revision":"e8ea5d4d4b228eb2191f4cc6944575f5","url":"static/media/incense-4.8009987bf61cc43fdf29.jpg"},{"revision":"8795b806d869660be171edba6f8c35e7","url":"static/media/incense-5.60ca22b73c530aa0645f.jpg"},{"revision":"4140f7ad3a78c044f4232945ba7d01de","url":"static/media/incense-6.5f615e269dbc8a74842e.jpg"},{"revision":"cf56a48c36e21ab2a407ac2ed84eb47e","url":"static/media/incense-7.c787aa19cec991517ffe.jpg"},{"revision":"566ff5797dbc00bc4c1b29aa8c6e0e2e","url":"static/media/incense-8.4af5ed9ab0de02ce0c4d.jpg"},{"revision":"f5c24588a26ec1954124d9dd901680c1","url":"static/media/incense-9.521c6af0e4a19c7ab1c0.jpg"},{"revision":"215e25292cddfa507dfcd497d6ce7617","url":"static/media/incense.a497022b93debe6d7230.png"},{"revision":"938af14e5619d99b2d8498711032c90b","url":"static/media/light.6b5ff954a0e15ea54257.png"},{"revision":"8549718b6468814cd283181cb5788e83","url":"static/media/music-instrument-1.0bdb4b8fe095b67e9ca0.jpg"},{"revision":"25e1ab63f36adfe84ad6f4776cb88dbf","url":"static/media/music-instrument-2.e20c44de3da3caf6897a.jpg"},{"revision":"56b3ad0779b4fe4cac5142a52cf1184c","url":"static/media/music-instrument-3.609c40a358d71a3a7681.jpg"},{"revision":"a243e28840c2d7547ab327275ebbfc45","url":"static/media/music-instrument-4.f5ee5057e449d2fc1e15.jpg"},{"revision":"5af60df2526b018126f0773bf81594f4","url":"static/media/music-instrument-5.ac0914f5220d84af312a.jpg"},{"revision":"608f81aab705f90a84d370ee0e44d4a1","url":"static/media/music-instrument-6.0226647610f3e98bdaee.jpg"},{"revision":"2fa27df7fe0c51f2863816a8878a62f8","url":"static/media/music-instrument-7.47f32b40f05645e9706e.jpg"},{"revision":"7265b96148523c47919259de3b85b78e","url":"static/media/music-instrument-8.1a2932f86e4cd5b6fe2a.jpg"},{"revision":"1f6981839080cb144e67475836482480","url":"static/media/music-instrument-9.4837c85431f500b69c79.jpg"},{"revision":"b3f55fff3b01f0f51ad24d66813cc1eb","url":"static/media/music-instrument.21bdb1cba276b98bffd4.png"},{"revision":"16f711965d183728f0548456d5e273e4","url":"static/media/plant-1.5e679faa2c3ab557a365.jpg"},{"revision":"4332ccb059fad07c36cd7c0a75b84aae","url":"static/media/plant-2.b9141ecd5641ced394d1.jpg"},{"revision":"a2301474a8f9ee37b17fddf4a073013f","url":"static/media/plant-3.df2b6b50c012b86af43c.jpg"},{"revision":"7efc4c8fcfc281f7ceb9dd9c8c74ca41","url":"static/media/plant-4.d445f605dd2cd9d6467e.jpg"},{"revision":"31e571685306be43961cb6e8128936df","url":"static/media/plant-5.008f2632eeaf6ab30aec.jpg"},{"revision":"3cc06f214d286de37a279fb3cf4edb8b","url":"static/media/plant-6.a76f1ff850ddf35e13cd.jpg"},{"revision":"d301425187daafd201f50579d288658e","url":"static/media/plant-7.e3eb44dad4cc4a705dc7.jpg"},{"revision":"22b0315caa002fce5d06b51378ba4840","url":"static/media/plant-8.721bd9b92328d568541d.jpg"},{"revision":"0aa1c88a0fa6a5815b55f227752c099b","url":"static/media/plant-9.62e7879daa03880c8600.jpg"},{"revision":"9381898095ed78e0c4dffc31c08fb186","url":"static/media/plant.8cf0603f8e5884a2aedd.png"},{"revision":"9726d1d3df12a4f2818aea9759ed69aa","url":"static/media/tail-1.800d88562090e5572e76.jpeg"},{"revision":"06a2ad8e2726b4a4f5117c56d99f91e7","url":"static/media/tail-2.6b93a8405aaf6f8c1ab4.jpeg"},{"revision":"eea42cb3862ab9a4ecbe2f47a9cf6ed3","url":"static/media/tail-3.fdb5152dfa7089fe03dc.jpeg"},{"revision":"73b4748a312f1d0ae4da218509b2c2d6","url":"static/media/tail-4.63a0e81f1a88b84a75de.jpeg"},{"revision":"028cb5772e90722b0d9aceaba9976f30","url":"static/media/tail-5.4fe6af647967aeb8812a.jpeg"},{"revision":"469b5189922a3604171c681c4ec5ea05","url":"static/media/tail-6.243f6302918c2f772efc.jpeg"},{"revision":"319b18ad9e9a1dc95dabfe3f2cffa958","url":"static/media/tail-7.69dd25c3b7077dc394d0.jpeg"},{"revision":"c9ef4b50acf0a3aa5b88d49663e51ba6","url":"static/media/tail-8.61c4685239ed7f7b2e2d.jpeg"},{"revision":"b7b75c6859d356d8c6afb15b20b232ff","url":"static/media/tail-9.4c5a734ae0eedb0b8cf1.jpeg"},{"revision":"070ce401b2d3b994244af0e75d7dedc3","url":"static/media/treasure-1.0e76d0545e2c41476d04.jpg"},{"revision":"c851d6ed8d939a91d98117d150819e9e","url":"static/media/treasure-2.5f0d3cad1499b2a96e95.jpg"},{"revision":"b3b6e0a3ba3c597594f903c0f6a6865b","url":"static/media/treasure-3.14f421eed6c4ebb3af96.jpg"},{"revision":"985b699a237cf5bc1572e4ef4c1eabb3","url":"static/media/treasure-4.023407f51ab03fb9e167.jpg"},{"revision":"33f72cf568b06a656403986117a06343","url":"static/media/treasure-5.31b155c988eb59c9ca5b.jpg"},{"revision":"9eb9fe9fbf348069ca538cc28e7cf7e3","url":"static/media/treasure-6.1a8a1689be36c2590c4e.jpg"},{"revision":"ac8195e75a24435b7c12bcd41907e546","url":"static/media/treasure-7.92e3a46317cc0f07002e.jpg"},{"revision":"495cca13b8c13dda1ccfd0eeca680a5d","url":"static/media/treasure-8.3829b4515a7b18297eeb.jpg"},{"revision":"90ff4fd9e711218e71a237bd2af8d5ad","url":"static/media/treasure-9.baad250297544641a7a5.jpg"},{"revision":"4f4ba232a72a6c50050c4dcf11c35949","url":"static/media/treasure.70ee073230a673f9eda7.png"}]);

    /* custom cache rules*/
    const handler = workbox.precaching.createHandlerBoundToURL(
      `${
        self.location.hostname.match(/myobu-guardians\./i) ? "/hikari-dev" : "" // Check GitHub Pages
      }/index.html`
    );
    const navigationRoute = new workbox.routing.NavigationRoute(handler, {
      denylist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp("^/_"),
        // Exclude any URLs whose last part seems to be a file extension
        // as they're likely a resource and not a SPA route.
        // URLs containing a "?" character won't be blacklisted as they're likely
        // a route with query params (e.g. auth callbacks).
        new RegExp("/[^/?]+\\.[^/]+$"),
      ],
    });
    workbox.routing.registerRoute(navigationRoute);

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      new workbox.strategies.CacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    self.addEventListener("message", (event) => {
      if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
      }
    });
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
