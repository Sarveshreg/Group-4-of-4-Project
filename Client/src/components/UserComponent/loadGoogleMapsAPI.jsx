export default function loadGoogleMapsAPI() {

    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve(window.google.maps);
          return;
        }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });
}
  