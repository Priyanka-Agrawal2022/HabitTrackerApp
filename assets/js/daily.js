function setStatus() {
  let statuses = document.querySelectorAll(".status");

  for (let status of statuses) {
    const habitId = status.id;

    fetch(`/update-status?id=${habitId}&status=${status.value}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        let habit = data.habit;
        setStatusColor();
      })
      .catch((err) => console.log("Error: ", err));
  }
}

window.onload = () => {
  let view = document.querySelector("#view");

  localStorage.setItem("view", view.value);

  let viewRoute = localStorage.getItem("view");

  if (viewRoute != null) {
    let options = view.querySelectorAll("option");

    for (let option of options) {
      if (option.value == viewRoute) {
        option.setAttribute("selected", true);
      }
    }
  }

  let statuses = document.querySelectorAll(".status");

  for (let status of statuses) {
    let habitId = status.id;

    fetch(`/get-habit?id=${habitId}`)
      .then((res) => res.json())
      .then((data) => {
        let habit = data.habit;

        if (habit != null) {
          let habitStatus = habit.status;

          let options = status.querySelectorAll("option");

          for (let option of options) {
            if (option.value == habitStatus) {
              option.setAttribute("selected", true);
              setStatusColor();
            }
          }
        }
      })
      .catch((err) => console.log("Error: ", err));
  }
};

function setStatusColor() {
  let habits = document.querySelectorAll(".habit");

  for (let habit of habits) {
    let status = habit.querySelector(".status");

    if (status.value == "done") {
      status.style.backgroundColor = "lightgreen";
    } else if (status.value == "not done") {
      status.style.backgroundColor = "red";
    } else if (status.value == "none") {
      status.style.backgroundColor = "lightgrey";
    }
  }
}
