const folders = document.querySelectorAll(".folder");
const bookList = document.getElementById("book-list");
const booksContainer = document.getElementById("books");
const categoryTitle = document.getElementById("category-title");
const backButton = document.getElementById("back-button");

const books = {
    libros: [
        { title: "Libro Centenario", author: "Gabriel Incardona", url: "centenario/centenario.html" }
    ],
    "El Grafico": [
        { title: "El Gráfico: 2605 [09-09-69]", author: "Revista El Gráfico", url: "grafico/grafico.html" },
        { title: "El Gráfico: Los 100 mejores futbolistas", author: "Revista El Gráfico", url: "libros/100-mejores-futbolistas.html" },
        { title: "El Gráfico: Historia del fútbol argentino", author: "Revista El Gráfico", url: "libros/historia-futbol-argentino.html" }
    ],
    "Los Principios": [
        { title: "Los Principios: [09-09-69]", author: "Diario"},
    ],

    "La Voz": [
        { title: "La Voz del Interior: [09-09-69]", author: "Diario"},
    ],
};

folders.forEach((folder) => {
    folder.addEventListener("click", () => {
        const category = folder.dataset.category;
        showBooks(category);
    });
});

backButton.addEventListener("click", () => {
    bookList.classList.add("hidden");
    document.querySelector(".folders").classList.remove("hidden");
});

function showBooks(category) {
    document.querySelector(".folders").classList.add("hidden");
    bookList.classList.remove("hidden");
    categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);

    booksContainer.innerHTML = "";
    books[category].forEach((book) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `
            <img src="https://api.iconify.design/lucide:book.svg" alt="Book icon">
            <div>
                <h3>${book.title}</h3>
                <p>${book.author}</p>
            </div>
        `;
        // Redirigir al hacer clic
        bookElement.addEventListener("click", () => {
            window.location.href = book.url;
        });

        booksContainer.appendChild(bookElement);
    });
}