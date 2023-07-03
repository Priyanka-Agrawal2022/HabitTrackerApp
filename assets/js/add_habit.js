// function to set the value of hidden input element
// to be sent to controller to handle the view display
function setHidden() {
  let hidden = document.querySelector("#hidden");
  hidden.value = localStorage.getItem("view");
}

setHidden();

// function to redirect to the previous view
function goBack() {
  let view = document.querySelector("#view");

  localStorage.setItem("view", view.value);

  window.location.href = localStorage.getItem("view");
}
