// function to render view corresponding to view dropdown value
function renderView() {
  let view = document.querySelector("#view");

  localStorage.setItem("view", view.value);

  window.location.href = view.value;
}

// making view dropdown value persistent on page reload
window.onload = () => {
  let viewRoute = localStorage.getItem("view");

  if (viewRoute != null) {
    let view = document.querySelector("#view");
    let options = view.querySelectorAll("option");

    for (let option of options) {
      if (option.value == viewRoute) {
        option.setAttribute("selected", true);
      }
    }
  }
};
