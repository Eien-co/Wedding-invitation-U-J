const tombol = document.getElementById ("bukaUndangan");

tombol.addEventListener("click", (event) => {
    event.preventDefault();

    setTimeout(() => {
        window.location.href = tombol.href;
    }, 1100);
})