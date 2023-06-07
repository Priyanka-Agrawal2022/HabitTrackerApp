function renderView() {
    let view = document.querySelector('#view');

    if(view.value == 'daily') {
        fetch('/')
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log('Error: ', err));
    }
    else if(view.value == 'weekly') {
        fetch('/weekly')
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log('Error: ', err));
    }
}