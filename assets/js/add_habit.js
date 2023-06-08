function setHidden() {
    let hidden = document.querySelector('#hidden');
    hidden.value = localStorage.getItem('view');
}

setHidden();

function goBack() {
    window.location.href = localStorage.getItem('view');
}