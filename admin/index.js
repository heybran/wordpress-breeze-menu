import "./build/breeze-menu-admin.js";

document.querySelector('form[name=breeze-menu-admin-form]').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  console.log(formData);
  fetch('/wp-json/breeze-menu-api/v1/menu-items', {
    method: 'POST',
    body: formData,
  })
  .then((response) => {
    if (response.ok) {
      return response.text();
    } else {
      return Promise.reject(new Error('Form submission failed'));
    }
  })
  .catch((error) => {
    console.error(error);
  });
});