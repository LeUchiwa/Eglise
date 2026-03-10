import json
import os

# Données minimales pour la Bible Louis Segond (quelques livres pour test)
bible_data = [
    {
        "book": "Genèse",
        "chapters": [
            ["Au commencement, Dieu créa les cieux et la terre.",
             "La terre était informe et vide: il y avait des ténèbres à la surface de l'abîme, et l'Esprit de Dieu se mouvait au-dessus des eaux.",
             "Dieu dit: Que la lumière soit! Et la lumière fut."]
        ]
    },
    {
        "book": "Jean",
        "chapters": [
            ["Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.",
             "Elle était au commencement avec Dieu.",
             "Toutes choses ont été faites par elle, et rien de ce qui a été fait n'a été fait sans elle."]
        ]
    }
]

# Écrire dans un fichier JSON
with open('C:/Users/macbook/Documents/Eglise/src/data/louis-segond.json', 'w', encoding='utf-8') as f:
    json.dump(bible_data, f, ensure_ascii=False, indent=2)

print("✅ Fichier JSON généré avec succès!")