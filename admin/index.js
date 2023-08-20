import "./build/breeze-menu-admin.js";

const getFormData = (form) => {
  const divider = 2;
  const formElements = Array.from(form.querySelectorAll('[name]'));
  const data = Array.from({ length: formElements.length / divider }, () => ({}));
  formElements.forEach((elem, index) => {
    const group = Math.floor(index / divider);
    // TODO: need to add name property to breeze-text-field and breeze-select
    data[group][elem.getAttribute('name')] = elem.value;
  });

  return data;
}

document.querySelector('form[name=breeze-menu-admin-form]').addEventListener('submit', function(event) {
  event.preventDefault();
  // const formData = getFormData(this);
  const formData = new FormData(this);
  // 'application/x-www-form-urlencoded'
  // console.log(formData.get('test'));
  console.log(formData);
  fetch('/wp-json/breeze-menu-api/v1/test', {
    method: 'POST',
    body: formData,
  })
  .then(function(response) {
      if (response.ok) {
          return response.text();
      } else {
          throw new Error('Form submission failed');
      }
  })
  .then(function(data) {
      // Handle the response from the server
      // Do something with the response
  })
  .catch(function(error) {
      // Handle any errors that occurred during the form submission
      console.error(error);
  });
});