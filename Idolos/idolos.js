const menuHamburguesa = document.querySelector('.menu_hamburguesa');
        const nav = document.querySelector('.nav');

        menuHamburguesa.addEventListener('click', () => {
            nav.classList.toggle('nav--active');
        });

        const idols = [
            {
            name: "José Omar Reinaldi",
            birthDate: "27-05-1949",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/ReinaldiTalleres.jpg",
            description:
                "Conocido como 'El Tata', Reinaldi es uno de los máximos goleadores en la historia de Talleres. Su habilidad para definir y su lealtad al club lo convirtieron en un ídolo indiscutido.",
            fullDescription:
                "José Omar Reinaldi, apodado 'El Tata', es una leyenda viviente del Club Atlético Talleres. Nacido el 10 de septiembre de 1962, Reinaldi dejó una huella imborrable en la historia del club. Con su excepcional habilidad goleadora, se convirtió en uno de los máximos anotadores en la historia de Talleres. Su capacidad para definir en momentos cruciales y su lealtad inquebrantable al club lo elevaron al estatus de ídolo. Reinaldi no solo era un goleador nato, sino también un líder dentro y fuera del campo, inspirando a sus compañeros y ganándose el corazón de la afición. Su compromiso con la camiseta albiazul y su contribución al éxito del equipo durante su etapa como jugador lo han convertido en un referente para las generaciones futuras de Talleres.",
            },
            {
            name: "Miguel Ángel Oviedo",
            birthDate: "12-10-1950",
            image: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/OV34TCO7RVGFJN77YAULT5F2XI.jpg",
            description:
                "Oviedo es considerado uno de los mejores defensores en la historia de Talleres. Su liderazgo y entrega en el campo lo convirtieron en un referente para el club.",
            fullDescription:
                "Miguel Ángel Oviedo, nacido el 12 de octubre de 1950, es una figura emblemática en la historia del Club Atlético Talleres. Reconocido como uno de los mejores defensores que ha vestido la camiseta albiazul, Oviedo se destacó por su extraordinaria capacidad defensiva, su visión táctica y su inquebrantable espíritu de lucha. Su liderazgo natural tanto dentro como fuera del campo lo convirtió en un verdadero capitán y referente para sus compañeros y para la afición. Oviedo no solo era un defensor sólido, sino también un jugador que entendía el juego de una manera única, contribuyendo significativamente a la organización del equipo. Su entrega incondicional en cada partido y su identificación con los colores del club lo elevaron al estatus de ídolo. La carrera de Oviedo en Talleres dejó un legado duradero, estableciendo un estándar de excelencia y compromiso para las futuras generaciones de defensores del club.",
            },
            {
            name: "Daniel Alberto Willington",
            birthDate: "01-09-1942",
            image: "https://www.clubtalleres.com.ar/wp-content/uploads/2022/09/willington2.jpg",
            description:
                "Conocido como 'El Loco', Willington es considerado uno de los mejores jugadores en la historia de Talleres. Su habilidad técnica y visión de juego lo hicieron inolvidable.",
            fullDescription:
                "Daniel Alberto Willington, nacido el 1 de septiembre de 1942, es una leyenda indiscutible del Club Atlético Talleres y del fútbol argentino en general. Apodado 'El Loco' por su impredecible y genial estilo de juego, Willington es ampliamente considerado como uno de los mejores jugadores en la historia del club. Su extraordinaria habilidad técnica, combinada con una visión de juego excepcional, lo convirtieron en un mediocampista ofensivo de elite. Willington no solo era capaz de crear oportunidades de gol con pases precisos, sino que también poseía un notable instinto goleador. Su capacidad para controlar el ritmo del juego y su creatividad en el campo lo hicieron un jugador inolvidable para la afición de Talleres. A lo largo de su carrera, Willington demostró una lealtad inquebrantable al club, rechazando ofertas de equipos más grandes para continuar siendo el ídolo de la T. Su legado trasciende las estadísticas, ya que inspiró a generaciones de jugadores y dejó recuerdos imborrables en todos los que tuvieron el privilegio de verlo jugar.",
            },
            {
            name: "Horacio Salvatelli",
            birthDate: "Desconocido",
            image: "idolo/Salvatelli.jpg",
            description:
                "Fue miembro de la emblematíca familia que más partidos jugó en Talleres; arrancó en 1914 y se retiró en 1926. Las hizo todas.",
            fullDescription:
                "Agrega más wachin.",
            },
        ]

        function createIdolCard(idol) {
            const card = document.createElement("div")
            card.className = "idol-card"
            card.innerHTML = `
                <img src="${idol.image}" alt="${idol.name}" class="idol-image">
                <div class="idol-info">
                    <h2 class="idol-name">${idol.name}</h2>
                    <p class="idol-birth">Fecha de nacimiento: ${idol.birthDate}</p>
                    <p class="idol-description">${idol.description}</p>
                    <a href="#" class="read-more" data-idol="${idol.name}">Leer más</a>
                </div>
            `
            return card
        }

        function displayIdols(idolsToDisplay) {
            const container = document.getElementById("idols-container")
            container.innerHTML = ""
            idolsToDisplay.forEach((idol) => {
            container.appendChild(createIdolCard(idol))
            })
        }

        function searchIdols() {
            const searchTerm = document.getElementById("search-input").value.toLowerCase()
            const filteredIdols = idols.filter(
            (idol) => idol.name.toLowerCase().includes(searchTerm) || idol.description.toLowerCase().includes(searchTerm),
            )
            displayIdols(filteredIdols)
        }

        document.getElementById("search-btn").addEventListener("click", searchIdols)
        document.getElementById("search-input").addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
            searchIdols()
            }
        })

        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("read-more")) {
            event.preventDefault()
            const idolName = event.target.getAttribute("data-idol")
            const idol = idols.find((i) => i.name === idolName)
            showModal(idol)
            }
        })

        function showModal(idol) {
            const modal = document.getElementById("modal")
            const modalInfo = document.getElementById("modal-info")
            modalInfo.innerHTML = `
                <h2>${idol.name}</h2>
                <p><strong>Fecha de nacimiento:</strong> ${idol.birthDate}</p>
                <img src="${idol.image}" alt="${idol.name}" style="max-width: 100%; margin: 10px 0;">
                <p>${idol.fullDescription}</p>
            `
            modal.style.display = "block"
        }

        document.querySelector(".close").addEventListener("click", () => {
            document.getElementById("modal").style.display = "none"
        })

        window.addEventListener("click", (event) => {
            if (event.target === document.getElementById("modal")) {
            document.getElementById("modal").style.display = "none"
            }
        })

        displayIdols(idols)

