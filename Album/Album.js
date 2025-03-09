document.addEventListener("DOMContentLoaded", () => {
    const yearContainer = document.getElementById("yearContainer");
    const photoContainer = document.getElementById("photoContainer");
    const searchButton = document.getElementById("searchButton");
    const yearSearch = document.getElementById("yearSearch");
    const folderButtons = document.querySelectorAll(".folder");
    const showAllYearsButton = document.getElementById("showAllYears");
    const photoModal = document.getElementById("photoModal");
    const modalImage = document.getElementById("modalImage");
    const modalDescription = document.getElementById("modalDescription");
    const closeModalButton = document.getElementById("closeModal");

    const photosPerYear = {
        1913: 4,
        1914: 1,
        1915: 4,
        1916: 1,
        1917: 2,
        1918: 1,
        1920: 1,
        1922: 1,
        1924: 2,
        1931: 1,
        1934: 2,
        1938: 3,
        1939: 4,
        1941: 1,
        1944: 2,
        1945: 4,
        1947: 2,
        1948: 3,
        1949: 2,
        1950: 1,
        1951: 2,
        1953: 3,
        1956: 2,
        1955: 2,
        1958: 1,
        1959: 1,
        1960: 10,
        1961: 1,
        1963: 2,
        1964: 5,
        1966: 3,
        1967: 3,
        1969: 9,
        1970: 3,
        1971: 2,
        1972: 2,
        1973: 4,
        1974: 22,
        1975: 12,
        1976: 7,
        2024: 2, 
        2023: 3, 
    };

    const photoDescriptions = {
        "fotos/1913/foto1.jpg": "El hombre clave en la fundación de Talleres. Gestor de la idea, propulsor de los primeros partidos y reuniones. Fue presidente y jugador.",
        "fotos/1913/foto2.jpg": "Las primeras reuniones para fundar el club se desarrollaron en la Biblioteca Vélez Sársfield, en la esquina de Lima y Félix Frías.",
        "fotos/1913/foto3.jpg": "Los empleados del ferrocarril, la mayoría de ellos jugadores del, por aquel entonces, Central Córdoba, posan elegantemente vestidos.",
        "fotos/1913/foto4.jpg": "Los talleres del Ferrocarril Central Córdoba fueron el ámbito donde germinó Talleres; todos los empleados se asociaron al club a instancias de la empresa.",

        "fotos/1914/foto1.jpg": "El primero de los siete Salvatelli que jugarían al menos un partido oficial para Talleres. Formó parte del equipo el dia del debut en 1914.",

        "fotos/1915/foto1.jpg": "Pioneros. Una de las primeras imágenes con la formación de lo que todavía era Central Córdoba. Es del 25 de julio de 1915, en la previa del triunfo ante Belgrano. Arriba: G. García. L Salvatelli, N. Serrichio, A. Forelli, P. Andrade, Marcelo Martinez. Abajo: Prax, Manuel Martinez, Castro, H. Salvatelli y Allberti.",
        "fotos/1915/foto2.jpg": "La imagen muestra a los jugadores de Central Córdoba que enfrentaron en un amistoso a Belgrano el 28 de febrero de 1915. El detalle es que jugaron con una camiseta celeste y blanca.",
        "fotos/1915/foto3.jpg": "El 28 de marzo de 1915 aparece la primera imagen de los colores azul y blanco en la camiseta de Talleres. Fue en un amistoso contra Juniors.",
        "fotos/1915/foto4.jpg": "Otra joyita de la época. La foto de la primera delegación de Talleres que viajó para jugar fuera de Córdoba. El 25 de abril de 1915, golearon en Tucumán.",

        "fotos/1917/foto1.jpg": "El equipo de 1917 posando en lo que fue verdaderamente la primera cancha del club en la calle Roma, esquina Catamarca, cerca del hospital italiano.",
        "fotos/1917/foto2.jpg": "Talleres de finales de la década del ´10. En la foto se aprecia un banderín con uno de los primeros escudos del club.",

        "fotos/1920/foto1.jpg": "Julio de 1920. En la segunda fila del palco se destacan Juan Findlay y Enrique France rodeado de autoridades provinciales y dirigentes xeneizes. Fue el primera amistoso contra Boca en el parque Sarmiento.",

        "fotos/1922/foto1.jpg": "El campeón del Gath and Cháves 1922. Parados: Bernabé Ponce, Félix Rossetti, Gardella, José Contreras, Fernández y Carballo. Agachados: Juan Prax, Pimentel, Horacio Salvatelli, Pereyra y Sibona.",

        "fotos/1924/foto1.jpg": "Joya fotográfica que nos muestra la formación de Talleres que obtuvo el torneo de 1924. Lo integraban: Ramírez, Ponce, Romanelli, Contreras, Falco, Pieri, Sibona y Bustos.",
        "fotos/1924/foto2.jpg": "Parte del plantel de 1924 que ganó cuatro torneos anuales consecutivos: Domingo Sibona, Bernabé Ponce, Antonio Pimentel. José Contreras, Juan Prax, Roqué, Félix Rossetti, Peralta, Carballo, Ernesto Pieri y Emiliano Fernández.",

        "fotos/1931/foto1.jpg": "El primer once de Talleres que pisó el césped del nuevo estadio, los jugadores fueron definidos en el acta del 8 de octubre de 1931.",

        "fotos/1934/foto1.jpg": "Talleres campeón de la Copa Beccar Varela.",
        "fotos/1934/foto2.jpg": "El equipo que salió a la cancha en la útilma fehca del Oficial de 1934: Allbano; Moreno, Bertolino; Aguirre, ... y Ortiz; Dell´Aqua, Castro, Manzoli, Ludueña y Ferrer.",

        "fotos/1938/foto1.jpg": "Paolucci. Los diarios de la época comentan elogiosamente las actuaciones de este guardamenta, insistiendo en que se convirtió en uno de los mejores del certamen. Paolucci fue el respaldo ideal para un Talleres que pretendía el Torneo Prepración y que luego obtuvo.",
        "fotos/1938/foto2.jpg": "El equipo que le ganó 4 a 3 a Belgrano y dio la vuelta en Barrio Jardín. Arriba: Ricardo Ceballos, Vicente Galindez, Joaquín Dhagatti, Domingo Miguel Bertolino, Alfonso Paolucci y Eduardo Zárate. Abajo: Rafael Catalá, Ángel Miranda, Miguel Ángel Ludueña, Alberto Beyli y Luis Oviedo.",
        "fotos/1938/foto3.jpg": "Todos los trofeos que Talleres ganó en diferentes disciplinas durante sus primeros 25 años de vida.",

        "fotos/1939/foto1.jpg": "Momento en que se realiza la Asamblea del año 1939, en que son elegidas las autoridades de Talleres. En la oportunidad fue reelecto Miguel Angel Tobler, en una época de éxitos y halagos para el instituto del Barrio Jardin. Tobler ejerció un mandato recordado por años.",
        "fotos/1939/foto2.jpg": "Miguel Angel Tobler, el hombre que dirigió los destinos de Talleres en años de lucha y de logros excepcionales. Tobler es uno de los que hoy recordamos porque Talleres actual es el que, seguramente, él soñó.",
        "fotos/1939/foto3.jpg": "Talleres campeón oficial del año. Otro año de halagos. En la foto y para el eterno recuerdo, los protagonistas de aquella hazaña. Paolucci, Dagatti, Bertolino, Betbezé, Liendo, Ortiz, Heredia, Miranda, Ceballos, el negro Farías y Oviedo",
        "fotos/1939/foto4.jpg": "En las escaleras de los vestuarios del estadio posan para la foto los campeones de 1939. Se destacan: Pedro Farías. Dagatti, Bertolino, Miranda, Zárate, Paolucci, Ceballos, entre otros.",
        "fotos/1939/foto5.jpg": "Fines de la década del ´30, entre dirigentes de Talleres y River aparecen: Vicente Rosella, Miguel Ángel Tobler, Alfonso Carrasco Gómez, Luis María Zapata, Francisco Pérez Marcén y José León Chércoles. El detalle es que distintos momentos todos fueron presidentes del club.",

        "fotos/1941/foto1.jpg": "Albarracín lleva con elegancia el balón ante la marca de un defensa de Lavalle. Este partido pertenece al torneo de Liga de 1941. Ganó Talleres 2-1 con dos goles de Albarracín.",

        "fotos/1944/foto1.jpg": "Saludos previos al 7 a 3 que Talleres le propinó a Boca en 1944. Los capitanes Lazatti (Boca) y Bertolino (Talleres) junto a dirigentes xeneizes. También aparecen Poviña Padilla, presidente de LCF, y Calors Molina presidente albiazul.",
        "fotos/1944/foto2.jpg": "Gran parte del plantel que obtuvo el Oficial de 1944. Se puede ver a Albella, Bresoli, Héctor Calderón, Jorge Campos, Antonio Gambino, Betbezé, Bútori, Horacio Bustos, Alejandro Carballo, Silva, Bellucci, Riquelme y Dante Degliangioli.",

        "fotos/1945/foto1.jpg": "Formación de Talleres en 1945. El equipo se consagra campeón del Torneo Oficial con 24 puntos, aventajado por cuatro a Universitario y por 5 a Racing. Convirtieron 47 goles en 16 partidos",
        "fotos/1945/foto2.jpg": "Centro de Gambino que pretenden agarrar Luna y Silva, durante el partido en que Talleres vence por 3-2 a San Martín de Tucumán, campeón de la Republica en 1945",
        "fotos/1945/foto3.jpg": "Talleres-Universitario. El último partido del año 1945, en el que el conjunto albiazul se impone por 4-1 y se consagra campeón del Toneo Oficial. Gambino, Riquelme y Luna fueron los jugadores que marcaron goles en ese partido.",
        "fotos/1945/foto4.jpg": "Parados: Horacio Salvatelli, Luis Betbezé, Alejandro Carballo, Domingo Bertolino, Ramón Bersoli, Héctor Calderón, Fernandez, Dante. Agachados: Emilio Silva, Raúl Riquelme, Gustavo Albella, Jorge Campos y Antonio Gambino.",

        "fotos/1947/foto1.jpg": "Secuencia del partido que Talleres venció a Boca por 4-1 en el año 1947. Ya que en el ´44 lo habia vencido por 7-3.",
        "fotos/1947/foto2.jpg": "Secuencia del partido que Talleres venció a Boca por 4-1 en el año 1947. Ya que en el ´44 lo habia vencido por 7-3.",

        "fotos/1948/foto1.jpg": "Imagen de la fuerza ofensiva de Talleres en 1948. Peralta, en hábil jugada habilita a Silva y golazo. Fue 4-2 a Lavalle.",
        "fotos/1948/foto2.jpg": "Imagen de la fuerza ofensiva de Talleres en 1948. Peralta, en hábil jugada habilita a Silva y golazo. Fue 4-2 a Lavalle. Gordillo festejando su conquista.",
        "fotos/1948/foto3.jpg": "El plantel de Talleres que obtuvo el torneo Oficial de 1948. Mendoza, Gordillo, Willington, Rodríguez, Bresoli, Ferreyra, Alzamora, Belucci, Guaita, Disandro, Pinarolli, Peralta, Sena, Lobo, Bustos, Allende, Silva, Calnderón. Garra y firmeza para ganar un dificil torneo con un equipo compacto y muy bien equilibrado.",

        "fotos/1949/foto1.jpg": "Talleres campeón del Oficial de 1949. El equipo cumple una campaña extraodinaria al jugar 16 partidos, ganando 13, empatando sólo 2 y cayendo en una oportunidad. Los números son más que elocuentes.",
        "fotos/1949/foto2.jpg": "El equipo posa para la posteridad el 13 de noviembre del 49 cuando se consagra campeón al vencer a Instituto en el partido final del torneo. Le sacó un punto de ventaja a Belgrano y ocho a Racing y Universitario.",

        "fotos/1950/foto1.jpg": "Orfilio Pinaroli, Rogelio Cuello, Amable López, Horacio Bustos y Antonio Gambino. Entre los cinco metieron 70 goles en los 25 partidos oficiales de 1950 (el equipo totalizó 94).",

        "fotos/1951/foto1.jpg": "Talleres en el año 1951. Lo integraban Belucci, Ponce, López, Mansilla, Motta, Moreno, Rodríguez, Calderón, Vega, Digliangoli, Willington, Pinaroli, Cuello, Sena, López, Godoy y Gambino. Bútori era el técnico y Juan Domingo el preprador físico.",
        "fotos/1951/foto2.jpg": "Los protagonistas, cada uno con us formas, que le ganaron la final por el Preparación 51 a Belgrano, Parados: Bútori, Atilio Willington, Miguel Ponce, Motta, López, Mansilla, Calderón y Dante Degliangioli. Abajo: Pinaroli, Cuello, Amable López, Godoy y Gambino.",
        "fotos/1951/foto3.jpg": "La foto del momento preciso en el que Gambino mete uno de sus habituales goles olimpicos; fue contra Instituto en 1951 y los compañeros se la regalaron con dedicatorias incluidas.",

        "fotos/1953/foto1.jpg": "Talleres de 1953. Ganador del Oficial de ese año, con un punto de ventaja sobre Belgrano y dos sobre Instituto. De los 16 partidos que jugó en el certamen, ganó 9, empato en 4 y perdio en los 3 restantes. En el partido final, venció a Racing por dos a uno.",
        "fotos/1953/foto2.jpg": "Talleres de 1953. Ganador del Oficial de ese año, con un punto de ventaja sobre Belgrano y dos sobre Instituto. De los 16 partidos que jugó en el certamen, ganó 9, empato en 4 y perdio en los 3 restantes. En el partido final, venció a Racing por dos a uno.",
        "fotos/1953/foto3.jpg": "El equipo que ganó el Oficial de 1953. Arriba: José Fernández, Ribotta, Atilio Willington, Jorge Campos, Atilio Garlatti(DT), Blanco, Mansilla y Tirza. Abajo: Héctor Calderón, Sosa, Rogelio Cuello, Savino, ... y Antonio Gambino. Junto a Savino aparece Daniel Willington.",

        "fotos/1955/foto1.jpg": "El que se mandó al fondo del arco es Miguel Antonio Romero, lo sufrió Juniors el 9 de octubre de 1955, su primer año en el club (cuando hizo 18 goles).",
        "fotos/1955/foto2.jpg": "Los capitanes en el tradicional saludo previo al partido intercambiando banderines: Miguel Antonio Romero con el de Talleres y Amadeo Carrzo con el de River.",

        "fotos/1956/foto1.jpg": "En la formación: Belgramone, Sierra, M. Ponce, P. Ponce, Campos, Roda, Amable López (DT), Belucci (PF), Acevedo, Cuello, Romero, Flamini y Tanquia.",

        "fotos/1958/foto1.jpg": "Equipo campeoón del año 1958. Están el DT. R. Butori y los jugadores Miguel Ponce, Beltramone, Campos, Serra, Rodas y Kasperián. Agachados: Contrera, Rivero, Romeo, Cuello y Masochi.",

        "fotos/1959/foto1.jpg": "En la foto el equipo que actuó en el campeonato de 1959: Beltramone, Miguel Ponce, Lezcano, Joaquín, Campos, Taboada, Carballo, Vargas, Kasperián y A. Willington (DT).",

        "fotos/1960/foto1.jpg": "Conjunto que conquistó el certamen local, pocos años antes de la proyección internacional. En la foto aparecen Ivanchich (preparador fisico), Kasparian, Deglianjoli, Belgramonte, Sala, Cortez, Wescheta, Taboada, Campos, Romero, Sánchez, Contessi y Joaquín",
        "fotos/1960/foto2.jpg": "Don Vicente Rosella, presidente de los albiazules en 1960. Talleres, bajo su mandato realizó notables campañas.",
        "fotos/1960/foto3.jpg": "Integrantes del plantel de 1960. Kasparián, Denardi, Cortez, Campos, Serra, Ponce, Taborda, Weschta, Romero, Sánchez y Contreras. Dueños de los torneos.",
        "fotos/1960/foto4.jpg": "Talleres ingresa en el campo como campeón junto a Sportivo Belgrano. En 1960. Escena final de un año brillante.",
        "fotos/1960/foto5.jpg": "Alberto Heredia, defensor albiazul en los primeros años de la década del 60.",
        "fotos/1960/foto6.jpg": "Vargas, jugador que marcó una revolución del fútbol cordobés con la aparición de grandes figuras.",
        "fotos/1960/foto8.jpg": "Charras, jugador que marcó una revolución del fútbol cordobés con la aparición de grandes figuras.",
        "fotos/1960/foto7.jpg": "Tres puntales de la defensa de Talleres en los años 60. Taboada, Ponce y Kasperián. Baluartes en la foto.",
        "fotos/1960/foto9.jpg": "Talleres poseía en 1960 jugadores de gran prestigio, que siguen siendo recordados a través del tiempo. En la foto: Sánchez, Wanora Romero y Weschta, integrantes de una delantera respetada y eficaz.",
        "fotos/1960/foto10.jpg": "Beltramone, Rodríguez y Flamini conversan animadamente en un aparte del entrenamiento.",

        "fotos/1961/foto1.jpg": "El 28 de enero de 1961 fue una fecha histórica para el estadio de Barrio Jardín porque por primera vez se jugó un partido nocturno. Para inaugurar el sistema luminico, Talleres invitó al Flamengo de Brasil, que no tuvo la más minima consideración por los festejos y le propinó al Matador un lapidario 5 a 0. Una de las imagenes de aquella recordada noche es esta en la que el arquero albiazul Carlos Taboada se queda con la pelota ante la atenta mirada de su compañero Miguel Ponce.",

        "fotos/1963/foto1.jpg": "Jesús Gallegos y Miguel Antonio Romero festejan la recordada consagración de Talleres en 1963, el año del 50 aniversario del club.",
        "fotos/1963/foto2.jpg": "El equipo que le ganó a Instituto en Alta Córdoba y dio la vuelta. Parados: Gambino Martines (masajista), Amable López (DT), Miguel Ponce, Jorge Campos, Cazuza, Gallegos, Cortéz, Kasparián e Ivanshich. Agachados: Dante Degliangoli, Roque Taborda, Villegas, Romero, Armenante y Reynonoso.",

        "fotos/1964/foto1.jpg": "La alineación de Talleres, que si bien en 164 no conquistó el certamen, hizo que la Institución de Barrio Jardín fuera la que mejores recaudaciones lograra en la temporada. Un fútbol definido y atractivo.",
        "fotos/1964/foto2.jpg": "Nicolás Jorge Campos lo frena a Pelé para sacarse una foto antes del partido que se jugó el 8 de marzo de 1964 eb Barrio Jardín.",
        "fotos/1964/foto3.jpg": "Rodolfo Joaquín Jesus Fallegos y Andrés Kasparián. Los defensores bautizados como las hermanas Legrand y el arquero apodado Tarzán.",
        "fotos/1964/foto4.jpg": "Van 20 del complemento, Roque Taborda ya recibío el pase entrecortado de Villegas, derechazo al primer palo de Balverli y a cobrar.",
        "fotos/1964/foto5.jpg": "Antes de salir a jugar el partido contra el Santos de Pelé. Ahí están, arriba: Adelfio Pernazaza, Osvaldo Caro, Miguel Ponce, Félix Curtino, Andrés Kasparián, Hugo Ivansich, Francisco Cabasés, Carlos Cazuza, Ismael Villegas, Fráncisco Armante y Victor Robledo. Abajo: Jesús Gallegos, Antonio Avila, Reynoso, Roberto Cortéz, Héctor Riquelme, Ramón Roque Taborda, Miguel Antonio Romero, ..., Rodolfo Joaquín y Hueller.",
        

        "fotos/1966/foto1.jpg": "Uno de los zagueros que le dio a Talleres un buen número de satisfacciones fue Massetani, que integró el equipo albiazul desde 1966.",
        "fotos/1966/foto2.jpg": "La formación de Talleres de 1966, que desempeñó un brillante papel en el torneo Competencia de ese año. En los partidos definitorios de ese campeonato derrotó a Belgrano por 3-2 y a Racing por 4-2.",
        "fotos/1966/foto3.jpg": "Alberto Flamini es otro de los volantes que se ha ganado un lugar en la galería de los recordados jugadores de Talleres. En la década del ´60 ocupó el puesto de mediocampista derecho, llevando sobre sus espaldas el número 8.",

        "fotos/1967/foto1.jpg": "Talleres con su alineación de 1967. El equipo de Barrio Jardín fue escolta de Racing en el único torneo jugado ese año, pero volvió a ser primero en las recaudaciones del año. En 18 partidos, de los cuales jugó 9 de local, recaudó más de seis millones y medio de esa época.",
        "fotos/1967/foto2.jpg": "Juan Carlos Atampi, delantero tallarin desde 1967. Talleres cuenta con una generosa lista de recordados jugadores, en distintas etapas de su vida, que fueron baluartes y que hoy pertenecen a la galería de auténticos forjadores de una realidad.",
        "fotos/1967/foto3.jpg": "El 24 de marzo del ´67, José López sale festejando su gol después de una aplidada a la defensa de San Lorenzo, lo persiguen Luis Gómez y Tello.",


        "fotos/1969/foto1.jpg": "Lezcano. Veloz puntero derecho integrante del equipo en 1969, cuando Talleres recorría el arduo camino hacia su consagración: el Campeonato Nacional.",
        "fotos/1969/foto2.jpg": "Chorras fue otro de los que transitó el camino hacia el Nacional, conquistando el pasaporte en 1969.",
        "fotos/1969/foto3.jpg": "Los tres centrales de Talleres en 1969. De Luca era el número cuatro, Cortez el cinco y Del Rio el seis. Factores fundamentales en los dos partidos frente a Chaco For Ever por la clasificación.",
        "fotos/1969/foto4.jpg": "Talleres en el fútbol grande. Primer paso por el Campeonato Nacional de AFA, integrado por Carlos Griguol, Fonseca, Sofranciuk, Del Río, Cortez, De Luca, Frullinghi, Rodríguez, Beaulieu, Armenante y Rivarola.",
        "fotos/1969/foto5.jpg": "Trilogia de puntales para los albiazules en el Nacional de 1969. Frullinghi, Rodríguez y Beaullen mezclados con apellidos que hasta ese momento parecían lejanos, pero que posteriormente debieron luchar fuerte.",
        "fotos/1969/foto6.jpg": "Los albiazules lucen una muy distinguida vestimenta, cuando ya se codea con los ´cucos´ del fútbol grande. El equipo cumple en ese año una etapa de fogeo, fundamental para cimentar lo que posteriormente fue trascendente.",
        "fotos/1969/foto7.jpg": "La tradicional popular pirata pintada de azul y blanco. Talleres festeja el Oficial después de ganarle a Instituto en la cancha de Belgrano.",
        "fotos/1969/foto8.jpg": "Los once que le ganaron a Chaco For Ever la final del Regional. Arriba: Fonseca, Del Rio, Charras, Massetani, Cortéz, y Deluca. Abajo: Frullinghi, Márquez, Millicay, Armenante y Rivarola. Usaron la remera con rayas horizontales solos unos minutos y la tuvieron que cambiar porque se confundia con la de los rivales.",
        "fotos/1969/foto9.jpg": "Martín Fonseca corta el avance de Oscar Más, atrás llegan Carlos Griguol y Jorge Guyón. Fue por la sexta fecha del Nacional 69 cuando Talleres y River empataron 2 a 2 en la Boutique.",


        "fotos/1970/foto1.jpg": "El marco de las tribunas habla del fervor con que Talleres fue apoyado por su gente en 1970, y por aquellos que encontraron en la camiseta azul y blanca un motivo para asistir al fútbol cordobés frente a los equipos ya consagrados.",
        "fotos/1970/foto2.jpg": "El ataque tallarin que tuvo a Taborda a su eje y comando. Talleres ya era un conjunto respetado y Córdoba contaba con una representación futbolística de jerarquía.",
        "fotos/1970/foto3.jpg": "Ya partio el derechazo de Antonio del Río que se clava en el ángulo de Trucchia. Un gol que valió el pase al Nacional de 1970.",

        "fotos/1971/foto1.jpg": "La alineación de Talleres en 1971, año que no dará triunfos ni festejos de torneos, pero que significó la necesidad de cambiar. El cambio ya está en camino...",
        "fotos/1971/foto2.jpg": "Frattara se incorporó a Talleres procedente de Atlanta en 1971, cuando contaba con 23 años.",

        "fotos/1972/foto1.jpg": "Carlos Griguol, marcador central de esos que son especiales para marcar en zona.",
        "fotos/1972/foto2.jpg": "Talleres cumplió una campaña muy opaca. La institución ya necesitaba una revolución que posteriormente llegó.",

        "fotos/1973/foto1.jpg": "Final de una racha adversa y el retorno de un hijo pródigio del Barrio Jardin: Daniel Willington. He aquí la primera foto con el equipo a su regreso a casa. Lo que vendría sería memorable.",
        "fotos/1973/foto2.jpg": "Arriba: Eduardo Astudillo, Binello, Rossi Galván, Deluca y Avellaneda. Abajo: De Sá, Sarquis, Willington, Patire y Pereyra. Nuccetelli desde afuera ya operaba.",
        "fotos/1973/foto3.jpg": "Amadeo Nuccetelli y Ángel Labruna, presidente y director técnico, dos de los que empezaron a cambiar la historia de Talleres.",
        "fotos/1973/foto4.jpg": "Vestido con los colores de la Liga Cordobesam el equipo que le ganó 7 a 1 a Racing. Arriba: Artico, Comelles, Quiroga, Galván, Rivadero y Avellaneda. Abajo: Patire, Ludueña, Bravo, Willington y Pereyra.",

        "fotos/1974/foto1.jpg": "El equipo de 1974. Un Talleres distinto que marca un huella imborrable a través de la campaña desempeñada ese año. Angel Labruna era el técnico y Taborda, Ludueña, Comelles, Artico, Galván y Quiroga los jugadores que apuntalaron su desempeño.",
        "fotos/1974/foto3.jpg": "Facchetti. En su puesto conformo un amdamiaje, firme y de fútbol creador, aguerrido y efectivo. Talleres ya era el equipo respetado por todos los participantes del Nacional, que tenían referencias de su desempeño en los torneos locales.",
        "fotos/1974/foto4.jpg": "Artico. En su puesto conformo un amdamiaje, firme y de fútbol creador, aguerrido y efectivo. Talleres ya era el equipo respetado por todos los participantes del Nacional, que tenían referencias de su desempeño en los torneos locales.",
        "fotos/1974/foto5.jpg": "Muggione, Valiente y Pereyra. En sus diferentes puestos conformaron un amdamiaje, firme y de fútbol creador, aguerrido y efectivo. Talleres ya era el equipo respetado por todos los participantes del Nacional, que tenían referencias de su desempeño en los torneos locales.",
        "fotos/1974/foto6.jpg": "A principios de 1974, Angel Labruna estaba tratando su incorporacion a la conducción técnica de River Plate, pero Talleres ya se habia fijado la meta de que éste ocupara es epuesto en la entidad albiazul.",
        "fotos/1974/foto7.jpg": "Galvan en la definición del campeonato vs Belgrano.",
        "fotos/1974/foto8.jpg": "Oscar Quiroga, el arquero inamovible en esta etapa inicial hacia una gran meta. El arquero cumplió un ciclo de real valor en 1974.",
        "fotos/1974/foto9.jpg": "La goleada del año. El registro fotográfico del equipo que goleó a Huracán de San Rafael en el Nacional. Un 6-0 que confirmó virtudes.",
        "fotos/1974/foto10.jpg": "Las dos variantes de Talleres. Entraba jugando Taborda para ser reemplazado por Daniel Willington. Una maniobra que dio buenos dividendos y resultados valiosos en el Nacional.",
        "fotos/1974/foto11.jpg": "El esquema del equipo cabiada fundamentalmente.",
        "fotos/1974/foto12.jpg": "Con la casaca ahora. La trasferencia de quince millones de pesos que pagó Talleres a San Lorenzo. Ahora la oportunidad de mostrarse en este Nacional en la espectacular campaña de Talleres. El fútbol indócil de su origen que se va equilibrando con la obligación. Buen manejo. Vocación ofensiva y buena pegada.",
        "fotos/1974/foto15.jpg": "Con el padre, don Pedro Ludueña. El mejor biógrafo de la trayectoria de su hijo. Cuando Hachita abandonó la escuela celebraron un pacto... O jugador o NADA. Y ya está casi el cumplido el pacto. Aunque don Pedro afirma que nunca tuvo dudas.",
        "fotos/1974/foto16.jpg": "River 1-1 Talleres (Avellaneda) Talleres se acostumbró a terminar festejando. Comelles, Ocaño, Patire, Galván.",
        "fotos/1974/foto17.jpg": "River 1-1 Talleres (Avellaneda) El abrazo de Willington a Labruna el día del empate con Rivr en Avellaneda. El reconocimiento de Daniel a la confianza que le brindó su técnico.",
        "fotos/1974/foto18.jpg": "River 1-1 Talleres (Avellaneda) Artico en el área de River. Para Labruna pilar del equipo en toda la cancha..",
        "fotos/1974/foto19.jpg": "Un festejo vibrante, emocionado. Un premio al sacrificio y a un fútbol jugado con ganas y talento. Talleres le gana a River por 2-1 y toda la provincia de Córdoba lo festeja en un grito. Los jugadores albiazules aprietan sus brazos y su corazón. Una imagen que  quedará grabada por mucho tiempo en la retina y en el efecto de los adictos a la entidad de Barrio Jardin. Todo un símbolo.",
        "fotos/1974/foto20.jpg": "Ese título fue mucho más que ganar el campeonato contra el rival de toda la vida y en su cancha, fue el comienzo de la era dorada.",
        "fotos/1974/foto21.jpg": "El club seguía y el boca en boca era un hecho: llenaba estadios.",
        "fotos/1974/foto22.jpg": "El que empató con River en Avellaneda. Arriba: Artico, Comelles, Quiroga, Ocaño, Galván y Rivadero. Abajo: Dante Degliangioli, Patire, Muggione, Fachetti, Taborda y Pereyra.",

        "fotos/1975/foto1.jpg": "Hasta fines de 1975, Adolfo Pedernera estaba decidido a alejarse del fútbol como entrenador. Amadeo Nuccetelli, luego de tres o cuatro reuniones con el técnico, anuncia a la presa que Pedernera  ya era el comandante del barco.",
        "fotos/1975/foto2.jpg": "Binello, Quiroga, Astudillo, Ludueña, Ocaño, Oviedo. Abajo: Boccanelli, Muggione, Facchetti, Rivadero y Alderete.",
        "fotos/1975/foto3.jpg": "La proyección y el dribbling de un puntero al que le costó ganarse la hinchada. Bocanelli fue dando, poco a poco, todo de sí hasta que los aplausos comenzaron a alentarlo.",
        "fotos/1975/foto4.jpg": "Otra formación en 1975, con la inclusión de Daniel Valencia. Posa: Binello, Quiroga, Moreno, Rivadero, Galván, Astudillo, Bocanelli, Ludueña, Patire, Alderte y Valencia.",
        "fotos/1975/foto6.jpg": "Talleres en uno de sus grandes compromisos: River Plate. En la primera fecha de la serie final del 75, ganan los millonarios con gol de Passarella.",
        "fotos/1975/foto5.jpg": "Dos idolos que serán recordados por mucho tiempo. Ludueña junto a Muggione, compañeros en Talleres hasta 1975. Con estos apellidos y ese talento se escriben páginas de gloria.",
        "fotos/1975/foto7.jpg": "Arriba: Binello, Quiroga, Ludueña, Eduardo Astudillo, Ocaño, Galván, Rivadero, Avellaneda y Osvaldo Salas. Abajo: Fchetti, Bocanelli, Muggione, Bravo, Taborda, Cherini y Pignani.",
        "fotos/1975/foto8.jpg": "El córner con la marca registrada de Daniel desde la izquierda es conectado por Victor Binello, que le da el riunfo a Talleres sobre Belgrano en la primera fecha del Nacional.",
        "fotos/1975/foto9.jpg": "En andas, Ludueña después de sus tres goles a Juventud Antoniana en Salta. De fondo la tribuna visitante colmada de cordobeses que invaden el campo para abrazarlo.",
        "fotos/1975/foto10.jpg": "Daniel Willington, de tiro libre desde 30 metros, con chanfle puso el 2 a 0 contra Atlanta para encaminar el rumbo a la ronda final del Nacional 75.",
        "fotos/1975/foto11.jpg": "Daniel Willington y Humberto Taborda curiosamente nacieron el mismo día (1 de septiembre del 42), compartieron equipo en el 59-60 y después entre el 73 y 75.",
        "fotos/1975/foto12.jpg": "Con el 3 a 0 ante Atlanta, Talleres se clasificó a las finales del Nacional. 15mil cordobeses viajaron a Villa Crespo y algunos de ellos se metieron al campo para celebrar.",

        "fotos/1976/foto1.jpg": "El plantel que condujo Rubén Bravo: Binello, Quiroga, Oviedo, Galván, Astudillo, Carlomagno, Salas, Gherini, Lucco, Ludueña, Bravo, Valencia, Alderete, Willington y Cabrera.",
        "fotos/1976/foto2.jpg": "Luego de su paso por Indpendiente de Santa Fe y el Monaco, Ruben Bravo llega a Talleres. Miles de gargantas que habian gritado sus goles como jugador y que habían coreado su nombre en Talleres silenciaron en agosto de 1977, cuando Ruben Bravo falleció en Guatemala durante la gira que los albiazules realizaban por aquellos lugares.",
        "fotos/1976/foto3.jpg": "La formación de 1976, un año con una gran cantidad de halagos. Un equipo que arrasa con los torneos locales y que expone un fútbol de jerarquía en el Nacional. Sus jugadores son ya altamente cotizados y codiciados en el país y en el exterior.",
        "fotos/1976/foto4.jpg": "Valencia, futbol brilllante en el ataque cordobés.",
        "fotos/1976/foto5.jpg": "Talleres 1-2 Newells. Todos los diarios y revistas de ese año, derraman generosamente grandes cantidades de tinta dedicadas a Talleres. Es que a partir de la quinta jornada, el equipo de Barrio Jardín, se convierte en la sensación del torneo, logrando resultados categoricos.",
        "fotos/1976/foto6.jpg": "Newells 0-2 Talleres. En las recaudaciones de 1976, Talleres pelea el primer lugar junto a River y a Boca. Nunca un equipo del interior había logrado semejante hazaña. Para todos ya es un brillante negocio jugar con los albiazules.",
        "fotos/1976/foto7.jpg": "Fuerza, goles, amor y contundencia puesta de manifiesto en las estadisticas. Talleres estuvo muy cerca de la meta prefijada. Mejor dicha, cada día está a menos distancia del titulo nacional.",
        

        "fotos/2024/foto1.jpg": "Esta es la descripción de la foto 1 del año 2024.",
        "fotos/2024/foto2.jpg": "Esta es la descripción de la foto 2 del año 2024.",

        "fotos/2023/foto1.jpg": "Esta es la descripción de la foto 1 del año 2023.",
        "fotos/2023/foto2.jpg": "Esta es la descripción de la foto 2 del año 2023.",
        "fotos/2023/foto3.jpg": "Esta es la descripción de la foto 3 del año 2023.",
    };

    function openModal(imageSrc, description) {
        modalImage.src = imageSrc;
        modalDescription.textContent = description;
        photoModal.style.display = "flex"; 
    }

    function closeModal() {
        photoModal.style.display = "none";
    }

    closeModalButton.addEventListener("click", closeModal);
    photoModal.addEventListener("click", (event) => {
        if (event.target === photoModal) {
            closeModal();
        }
    });

    function createYearItem(year) {
        const yearItem = document.createElement("div");
        yearItem.className = "year-item";
        const coverImage = document.createElement("img");
        coverImage.src = `fotos/${year}/portada.jpg`;
        coverImage.alt = `Portada del año ${year}`;
        coverImage.className = "cover-image";
        coverImage.addEventListener("click", () => showYearAlbum(year));

        const yearText = document.createElement("p");
        yearText.textContent = year;
        yearItem.appendChild(coverImage);
        yearItem.appendChild(yearText);

        return yearItem;
    }

    function showYearAlbum(year) {
        photoContainer.innerHTML = ""; 

        const numberOfPhotos = photosPerYear[year] || 0; 

        for (let i = 1; i <= numberOfPhotos; i++) {
            const img = document.createElement("img");
            const imagePath = `fotos/${year}/foto${i}.jpg`; 
            img.src = imagePath;
            img.alt = `Foto ${i} del año ${year}`;
            img.className = "photo";

            const description = photoDescriptions[imagePath] || "Descripción no disponible.";

            img.addEventListener("click", () => {
                openModal(img.src, description);
            });

            photoContainer.appendChild(img);
        }

        if (numberOfPhotos === 0) {
            const noPhotosMessage = document.createElement("p");
            noPhotosMessage.textContent = `No hay fotos disponibles para el año ${year}.`;
            noPhotosMessage.style.color = "#04162B";
            noPhotosMessage.style.textAlign = "center";
            photoContainer.appendChild(noPhotosMessage);
        }
        
        photoContainer.scrollIntoView({behavior: "smooth"});
    }

    function displayYears(startYear, endYear) {
        yearContainer.innerHTML = "";
        for (let year = startYear; year <= endYear; year++) {
            yearContainer.appendChild(createYearItem(year));
        }
    }

    function showDecade(decade) {
        const startYear = decade;
        const endYear = decade + 9;
        const folderContainer = document.createElement("div");
        folderContainer.className = "folder-container";

        for (let year = startYear; year <= endYear; year++) {
            const yearButton = document.createElement("button");
            yearButton.className = "folder-year";
            yearButton.textContent = year;
            yearButton.addEventListener("click", () => showYearAlbum(year));
            folderContainer.appendChild(yearButton);
        }

        yearContainer.innerHTML = "";
        yearContainer.appendChild(folderContainer);

        folderContainer.classList.add("active");
    }

    function searchPhotos() {
        const year = Number.parseInt(yearSearch.value);
        if (year >= 1913 && year <= 2025) {
            yearContainer.innerHTML = "";
            yearContainer.appendChild(createYearItem(year));
            showYearAlbum(year);
        } else {
            alert("Por favor, introduce un año entre 1913 y 2025.");
        }
    }

    searchButton.addEventListener("click", searchPhotos);
    folderButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const decade = Number.parseInt(this.getAttribute("data-decade"));
            if (!isNaN(decade)) {
                showDecade(decade);
            }
        });
    });

    showAllYearsButton.addEventListener("click", () => {
        displayYears(1913, 2025);
        photoContainer.innerHTML = ""; 
    });

    displayYears(1913, 2025);
});