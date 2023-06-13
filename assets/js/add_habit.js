function setHidden() {
    let hidden = document.querySelector('#hidden');
    let view = document.querySelector('#view');

    localStorage.setItem('view', view.value);

    hidden.value = localStorage.getItem('view');
}

setHidden();

function goBack() {
    let view = document.querySelector('#view');

    localStorage.setItem('view', view.value);
    
    window.location.href = localStorage.getItem('view');
}