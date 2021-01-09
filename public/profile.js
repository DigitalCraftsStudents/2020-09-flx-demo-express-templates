// find button
const deleteButton = document.getElementById('deleteButton');
// listen for click events
// when click happens on delete button
deleteButton.addEventListener('click', (e) => {
  // create message variable
  const message = "Are you sure you want to delete this user?"
  // show confirmation with message
  if (!confirm(message)) {
    // if they cancel, prevent the link from continuing to the delete route
    e.preventDefault();
  }
})