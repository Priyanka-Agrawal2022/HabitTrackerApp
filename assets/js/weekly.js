function setStatus(status) {
    const habitId = status.id;
    const day = status.previousElementSibling.value;

    // console.log('day:', day);

    fetch(`/update-weekly-status?id=${habitId}&day=${day}&status=${status.value}`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                console.log(data.habit.days);
                setStatusColor();
            })
            .catch(err => console.log('Error: ', err));
}


// function setStatus() {
//     let habits = document.querySelectorAll('.habit');

//     for (let h of habits) {
//         const habitId = h.id;

//         let statuses = h.querySelectorAll('.status');
//         // let day = 0;

//         let day = h.querySelector('#hidden').value;
//         let status = statuses[day];

//         console.log('day:', day);
//         console.log('statuses[day]:', statuses[day]);

//         // for (let status of statuses) {
//         // let id = habitId + day;

//         // let habit = {
//         //     id: id,
//         //     status: status.value,
//         // };

//         // localStorage.setItem(id, JSON.stringify(habit));

        // fetch(`/update-weekly-status?id=${habitId}&day=${day}&status=${status.value}`, { method: 'POST' })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data.habit.days);
        //     })
        //     .catch(err => console.log('Error: ', err));

//         setStatusColor();
//         // day++;
//         // }
//     }
// }

window.onload = () => {
    let habits = document.querySelectorAll('.habit');

    for (let h of habits) {
        const habitId = h.id;

        let statuses = h.querySelectorAll('.status');
        // let day = 0;


        // for (let status of statuses) {
            // let habit = JSON.parse(localStorage.getItem(habitId + day));

            fetch(`/get-habit?id=${habitId}`)
                .then(res => res.json())
                .then(data => {
                    let habit = data.habit;

                    if (habit != null) {
                        let habitStatuses = habit.days;

                        for(let i=0; i<habitStatuses.length; i++) {
                            statuses[i].value = habitStatuses[i];
                            // console.log('i:', i);
                            // console.log('habitStatuses[i]:', habitStatuses[i]);
                            // console.log('habitStatuses:', habitStatuses);

                            let options = statuses[i].querySelectorAll('option');

                            for (let option of options) {
                                if (option.value == habitStatuses[i]) {
                                    option.setAttribute('selected', true);
                                    setStatusColor();
                                }
                            }
                        }
                    }
                })
                .catch(err => console.log('Error: ', err));

            // day++;
        // }

    }
}

function setStatusColor() {
    let habits = document.querySelectorAll('.habit');

    for (let habit of habits) {
        let statuses = habit.querySelectorAll('.status');

        for (let status of statuses) {
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
}