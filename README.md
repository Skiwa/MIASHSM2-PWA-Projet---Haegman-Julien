# MIASHS-M2-TP3-Projet

Haegman Julien - M2 MIASHS WIC

---

<div align="center">
  <p align="center"><img src="https://jhaegman.com/host/files/todolistimg.jpg"></p>
</div>


## Fonctionnalités ajoutées

-   Sérialisation / désérialisation des données localement (Local Storage) - Pour sauvegarder les données localement
    
-   Undo / Redo (Annuler / Refaire)
    
-   Effacer Tout
    
-   Copie de listes par QR-code


## Installation et lancement


-   Site déployé : [https://skiwa.github.io/MIASHSM2-PWA-Projet---Haegman-Julien/](https://skiwa.github.io/MIASHSM2-PWA-Projet---Haegman-Julien/)
    

ou

```bash
git clone https://github.com/Skiwa/MIASHSM2-PWA-Projet---Haegman-Julien
npm install
ng serve
```

## Détails

-   Utilisation des librairies [qrcode](https://www.npmjs.com/package/qrcode) et [qrcode-parser](https://www.npmjs.com/package/qrcode-parser) pour la génération et la lecture d'un QR-Code (au format image).
    
-   Tentative d'ajout de Firebase dans la branche `firebase-implementation` mais non réussi à cause d'un code trop complexe et de conflits avec le chargement en local.