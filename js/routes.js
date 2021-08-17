var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },
  {
    path: '/cards/',
    url: './pages/cards.html',
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
