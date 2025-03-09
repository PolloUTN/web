document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchTeam');
    const mainContent = document.getElementById('mainContent');

    // Datos de ejemplo (deberías reemplazarlos con datos reales)
    const partidos = {
        "Belgrano": [
            { competicion: "Liga Cordobesa", jugados: 191, victoriasRival: 56, empates: 56, victoriasTalleres: 79, diferencia: 23 },
            { competicion: "Copas LCF", jugados: 21, victoriasRival: 8, empates: 7, victoriasTalleres: 6, diferencia: 2 },
            { competicion: "Unión Cordobesa", jugados: 2, victoriasRival: 2, empates: 0, victoriasTalleres: 0, diferencia: 2 },
            { competicion: "Primera", jugados: 24, victoriasRival: 5, empates: 14, victoriasTalleres: 5, diferencia: 0 },
            { competicion: "B Nacional", jugados: 16, victoriasRival: 5, empates: 6, victoriasTalleres: 5, diferencia: 0 },
            { competicion: "Copa Argentina", jugados: 1, victoriasRival: 0, empates: 0, victoriasTalleres: 1, diferencia: 1 },
        ],
        "Instituto": [
            { competicion: "Liga Cordobesa", jugados: 170, victoriasRival: 45, empates: 35, victoriasTalleres: 90, diferencia: 45 },
            { competicion: "Copas LCF", jugados: 5, victoriasRival: 3, empates: 0, victoriasTalleres: 2, diferencia: 1 },
            { competicion: "Provinciales", jugados: 1, victoriasRival: 1, empates: 0, victoriasTalleres: 0, diferencia: 1 },
            { competicion: "Primera", jugados: 31, victoriasRival: 11, empates: 8, victoriasTalleres: 12, diferencia: 1 },
            { competicion: "B Nacional", jugados: 20, victoriasRival: 8, empates: 4, victoriasTalleres: 8, diferencia: 0 },
        ],
    };

    function setupSearch() {
        searchButton.addEventListener('click', function() {
            const equipoBuscado = searchInput.value.trim();
            const partidosFiltrados = partidos[equipoBuscado];

            if (partidosFiltrados) {
                let tabla = `<table class="historial-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Jugados</th>
                            <th>${equipoBuscado}</th>
                            <th>Empates</th>
                            <th>Talleres</th>
                            <th>Diferencia</th>
                        </tr>
                    </thead>
                    <tbody>`;

                partidosFiltrados.forEach(partido => {
                    const diferenciaClass = partido.diferencia > 0 ? "cab" : partido.diferencia < 0 ? "cat" : "emp";
                    tabla += `<tr>
                        <td>${partido.competicion}</td>
                        <td>${partido.jugados}</td>
                        <td>${partido.victoriasRival}</td>
                        <td>${partido.empates}</td>
                        <td>${partido.victoriasTalleres}</td>
                        <td class="${diferenciaClass}">${partido.diferencia}</td>
                    </tr>`;
                });

                const totalJugados = partidosFiltrados.reduce((sum, partido) => sum + partido.jugados, 0);
                const totalvictoriasRival = partidosFiltrados.reduce((sum, partido) => sum + partido.victoriasRival, 0);
                const totalEmpates = partidosFiltrados.reduce((sum, partido) => sum + partido.empates, 0);
                const totalVictoriasTalleres = partidosFiltrados.reduce((sum, partido) => sum + partido.victoriasTalleres, 0);
                const totalDiferencia = totalVictoriasTalleres - totalvictoriasRival;
                const totalDiferenciaClass = totalDiferencia > 0 ? "cab" : totalDiferencia < 0 ? "cat" : "emp";

                tabla += `<tr>
                    <td>Total Oficiales</td>
                    <td>${totalJugados}</td>
                    <td>${totalvictoriasRival}</td>
                    <td>${totalEmpates}</td>
                    <td>${totalVictoriasTalleres}</td>
                    <td class="${totalDiferenciaClass}">${totalDiferencia}</td>
                </tr>`;

                tabla += `</tbody></table>`;

                const botonVolver = `<button id="volverButton" class="volver-button">X</button>`;

                mainContent.innerHTML = tabla + botonVolver;

                const volverButton = document.getElementById('volverButton');
                volverButton.addEventListener('click', function() {
                    mainContent.innerHTML = `
                        <div class="cuadro">
                            <h2 class="title">Historiales</h2>
                            <input type="search" id="searchTeam" placeholder="Busca un equipo...">
                            <button id="searchButton">Buscar</button>
                        </div>
                    `;
                    setupSearch();
                });
            } else {
                alert(`No se encontraron partidos contra ${equipoBuscado}.`);
            }
        });
    }

    setupSearch();
});