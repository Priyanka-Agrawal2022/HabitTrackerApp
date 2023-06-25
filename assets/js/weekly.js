// function to update status of a habit on a particular week day in UI and in DB
function setStatus(status) {
  const habitId = status.id;
  const day = status.previousElementSibling.value;

  fetch(
    `/update-weekly-status?id=${habitId}&day=${day}&status=${status.value}`,
    { method: "POST" }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.habit.days);
      setStatusColor();
    })
    .catch((err) => console.log("Error: ", err));
}

// making view dropdown value and habit status persistent on page reload
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

  let habits = document.querySelectorAll(".habit");

  for (let h of habits) {
    const habitId = h.id;

    let statuses = h.querySelectorAll(".status");

    fetch(`/get-habit?id=${habitId}`)
      .then((res) => res.json())
      .then((data) => {
        let habit = data.habit;

        if (habit != null) {
          let habitStatuses = habit.days;

          for (let i = 0; i < habitStatuses.length; i++) {
            statuses[i].value = habitStatuses[i];

            let options = statuses[i].querySelectorAll("option");

            for (let option of options) {
              if (option.value == habitStatuses[i]) {
                option.setAttribute("selected", true);
                setStatusColor();
              }
            }
          }
        }
      })
      .catch((err) => console.log("Error: ", err));
  }
};

// function to set color corresponding to habit status
function setStatusColor() {
  let habits = document.querySelectorAll(".habit");

  for (let habit of habits) {
    let statuses = habit.querySelectorAll(".status");

    for (let status of statuses) {
      if (status.value == "done") {
        status.style.backgroundColor = "lightgreen";
      } else if (status.value == "not done") {
        status.style.backgroundColor = "red";
      } else if (status.value == "none") {
        status.style.backgroundColor = "lightgrey";
      }
    }
  }
}
