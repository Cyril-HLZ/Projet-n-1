document.addEventListener("DOMContentLoaded", function () {
    const checkboxListes = document.getElementById('checkbox_listes');
    const checkboxCartes = document.getElementById('checkbox_cartes');
    const apprenantsRow = document.getElementById('apprenants_row');

    // Fonction pour afficher les données sous forme de tableau
    function afficherTableau(data) {
        apprenantsRow.innerHTML = ''; // Effacer le contenu précédent
        // Créer une table
        let table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-bordered');
        // Créer l'en-tête du tableau
        let thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Ville</th>
            </tr>
        `;
        table.appendChild(thead);

        // Créer le corps du tableau
        let tbody = document.createElement('tbody');
        data.apprenants.forEach(apprenant => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${apprenant.nom}</td>
                <td>${apprenant.prenom}</td>
                <td>${apprenant.ville}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        apprenantsRow.appendChild(table);
    }

    // Fonction pour afficher les données sous forme de cartes
    function afficherCartes(data) {
        apprenantsRow.innerHTML = ''; // Effacer le contenu précédent
        data.apprenants.forEach(apprenant => {
            let apprenantDiv = document.createElement('div');
            apprenantDiv.classList.add('col-md-4', 'mb-4');
            apprenantDiv.innerHTML = `
                <div class="apprenant card h-100">
                    <div class="card-body">
                        <h3 class="card-title">${apprenant.prenom} ${apprenant.nom}</h3>
                        <p class="card-text">Ville: ${apprenant.ville}</p>
                        <img src="ressources/${apprenant.avatar}" alt="Avatar de ${apprenant.prenom}" class="img-fluid">
                    </div>
                </div>
            `;
            apprenantsRow.appendChild(apprenantDiv);
        });
    }

    // Fonction pour charger et afficher les données en fonction des cases cochées
    function chargerEtAfficherDonnées() {
        fetch('New_promo.json')
            .then(response => response.json())
            .then(data => {
                if (checkboxListes.checked) {
                    afficherTableau(data);
                } else if (checkboxCartes.checked) {
                    afficherCartes(data);
                } else {
                    apprenantsRow.innerHTML = ''; // Si aucune case n'est cochée, effacer le contenu
                }
            })
            .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
    }

    // Ajouter des écouteurs d'événements aux cases à cocher
    checkboxListes.addEventListener('change', function () {
        // Assurer qu'un seul checkbox est coché à la fois
        if (checkboxListes.checked) {
            checkboxCartes.checked = false;
        }
        chargerEtAfficherDonnées();
    });

    checkboxCartes.addEventListener('change', function () {
        // Assurer qu'un seul checkbox est coché à la fois
        if (checkboxCartes.checked) {
            checkboxListes.checked = false;
        }
        chargerEtAfficherDonnées();
    });

    // Charger les données initialement selon l'état des cases à cocher
    chargerEtAfficherDonnées();
});
