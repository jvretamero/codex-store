let removeButtons = document.getElementsByClassName("remove-book");

Array.prototype.forEach.call(removeButtons, function (removeButton) {
    removeButton.addEventListener("click", function (event) {
        let element = event.target;
        let id = element.dataset.ref;

        fetch("/livros/" + id, { method: 'DELETE' })
            .then(function () {
                let tr = element.closest("tr");
                tr.remove();
            })
            .catch(function (error) {
                console.error(error);
            });
    });
});