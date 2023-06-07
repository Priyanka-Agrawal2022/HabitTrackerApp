function setStatus() {
    let statuses = document.querySelectorAll('.status');

    for (let status of statuses) {
        const habitId = status.id;

        let habit = {
            id: habitId,
            status: status.value
        };

        localStorage.setItem(habitId, JSON.stringify(habit));


        fetch(`/update-status?id=${habitId}&status=${status.value}`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                setStatusColor();
            })
            .catch(err => console.log('Error: ', err));
    }
}

window.onload = () => {
    let statuses = document.querySelectorAll('.status');

    for (let status of statuses) {
        let habitId = status.id;

        let habit = JSON.parse(localStorage.getItem(habitId));

        if (habit != null) {
            let habitStatus = habit.status;

            let options = status.querySelectorAll('option');

            for (let option of options) {
                if (option.value == habitStatus) {
                    option.setAttribute('selected', true);
                    setStatusColor();
                }
            }
        }
    }
}

function setStatusColor() {
    let habits = document.querySelectorAll('.habit');

    for (let habit of habits) {
        let status = habit.querySelector('.status');

        if (status.value == 'done') {
            status.style.backgroundColor = 'lightgreen';
        }
        else if (status.value == 'not done') {
            status.style.backgroundColor = 'red';
        }
        else if (status.value == 'none') {
            status.style.backgroundColor = 'lightgrey';
        }
    }
}

function removeHabit(habitId) {
    console.log('called');
    let habit = JSON.parse(localStorage.getItem(habitId));

    if (habit != null) {
        localStorage.removeItem(habitId);
    }
}