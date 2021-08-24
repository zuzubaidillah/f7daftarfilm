var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },
  {
    path: '/cards-detail/',
    componentUrl: './pages/cards-detail.html',
  },
  {
    path: '/tentang/',
    url: './pages/tentang.html',
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
