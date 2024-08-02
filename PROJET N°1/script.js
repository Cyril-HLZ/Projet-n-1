
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('Formulaire_theme');
    const colorWhite = document.getElementById('color_white');
    const colorBlack = document.getElementById('color_black');
    const checkboxListes = document.getElementById('checkbox_listes');
    const checkboxCartes = document.getElementById('checkbox_cartes');

            // Charger les préférences enregistrées
            const savedColor = localStorage.getItem('themeColor');
            const savedDisplay = localStorage.getItem('displayMode');

            if (savedColor) {
                if (savedColor === 'white') {
                    colorWhite.checked = true;
                } else if (savedColor === 'black') {
                    colorBlack.checked = true;
                }
            }

            if (savedDisplay) {
                if (savedDisplay === 'list') {
                    checkboxListes.checked = true;
                    checkboxCartes.checked = false;
                } else if (savedDisplay === 'cards') {
                    checkboxCartes.checked = true;
                    checkboxListes.checked = false;
                }
            }

            // Enregistrer les préférences lors de la soumission du formulaire
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                
                const selectedColor = colorWhite.checked ? 'white' : 'black';
                const selectedDisplay = checkboxListes.checked ? 'list' : 'cards';

                localStorage.setItem('themeColor', selectedColor);
                localStorage.setItem('displayMode', selectedDisplay);

                alert('Préférences enregistrées!');
            });

            // S'assurer qu'une seule case à cocher est sélectionnée à la fois
            checkboxListes.addEventListener('change', function () {
                if (checkboxListes.checked) {
                    checkboxCartes.checked = false;
                }
            });

            checkboxCartes.addEventListener('change', function () {
                if (checkboxCartes.checked) {
                    checkboxListes.checked = false;
                }
            });
    });