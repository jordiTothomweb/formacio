# Formació Accessibilitat Web

Aquest projecte conté exemples pràctics d'accessibilitat web, incloent-hi components, formularis, sliders, carrousels i bones pràctiques d'HTML, CSS i JS.

## Estructura del projecte

- `pages/` — Exemples de components i pàgines d'accessibilitat
- `exercise/` — Exercicis pràctics d'accessibilitat
- `img/` — Imatges d'exemple
- `style.css` — Full d'estils principal
- `.gitignore` — Fitxer per ignorar arxius innecessaris al repositori
- `TO_DO.md` — Llista de tasques pendents

## Comandes bàsiques de git

```sh
git status         # Mostra l'estat dels fitxers
git add .          # Afegeix tots els canvis a l'index
git commit -m "Missatge"   # Desa els canvis amb un missatge
git pull           # Actualitza el repositori local
git push           # Puja els canvis al repositori remot
```

## Gestió de branques

El projecte utilitza dues branques principals:

- **main**: branca de producció, utilitzada per a GitHub Pages. Només s'hauria d'actualitzar amb canvis estables i revisats.
- **develop**: branca de desenvolupament, on es fan els canvis, proves i noves funcionalitats.

### Comandes útils per gestionar branques

```sh
git checkout develop           # Canvia a la branca develop
git checkout main              # Canvia a la branca main
git pull origin develop        # Actualitza la branca develop
git pull origin main           # Actualitza la branca main
git checkout -b nova-branca    # Crea i canvia a una branca nova
git merge develop              # Fusiona develop a la branca actual
git merge main                 # Fusiona main a la branca actual
git push origin develop        # Puja els canvis a develop
git push origin main           # Puja els canvis a main
```

### Flux de treball recomanat

1. Fes els canvis i proves a la branca **develop**.
2. Quan els canvis siguin estables, fusiona **develop** a **main**:
   ```sh
   git checkout main
   git merge develop
   git push origin main
   ```
3. La branca **main** és la que es publica a GitHub Pages i hauria de reflectir només la versió estable del projecte.
