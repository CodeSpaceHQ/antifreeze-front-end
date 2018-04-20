function show() {
  self.registration.showNotification('SW Title', {
    body: 'testing',
  });
}

self.addEventListener('install', () => {
  setTimeout(show, 5000);
});
