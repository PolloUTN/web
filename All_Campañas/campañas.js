document.addEventListener('DOMContentLoaded', function() {
    const yearSelect = document.getElementById('year');
    const tournamentSelect = document.getElementById('tournament');
    const searchButton = document.getElementById('searchButton');
    const warningMessage = document.getElementById('warningMessage');

    yearSelect.addEventListener('change', function() {
        const selectedYear = yearSelect.value;
        tournamentSelect.innerHTML = '';

        if (selectedYear) {
            fetch(`./${selectedYear}/`)
                .then(response => response.text())
                .then(data => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    const links = doc.querySelectorAll('a');
                    links.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href.endsWith('.html')) {
                            const fileName = decodeURIComponent(href.split('/').pop()); 
                            const option = document.createElement('option');
                            option.value = fileName;
                            option.textContent = fileName.replace('.html', '');
                            tournamentSelect.appendChild(option);
                        }
                    });
                })
                .catch(error => console.error('Error fetching tournaments:', error));
        }
    });

    for (let year = 1934; year <= 2025; year++) {
        if (year !== 1935 && year !== 1936 && year !==1947) { 
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
    }

    searchButton.addEventListener('click', function() {
        const selectedYear = yearSelect.value;
        const selectedTournament = tournamentSelect.value;

        if (selectedYear && selectedTournament) {
            const filePath = `${selectedYear}/${selectedTournament}`;
            window.location.href = filePath;
        } else {
            warningMessage.classList.remove('hidden');
        }
    });
});