# Errors

## General
- [ ] A vegades el contigut està centrat i a vegades a l'esquerra de tot.
- [ ] Fer els exemples genèrics, per tal de que puguin servir per a tot tipus de clients.
- [ ] Revisar format unitari, hi ha pantalles que no segueixen el mateix format de les altres

## Home

- [x] Trauria la fletxa de retorn que està deshabilitada al costat de Pàgina d'inici.
- [x] "Exemples d'Accessibilitat" hauria de ser un H1 i trauria "Pàgina d'Inici". Aleshores "Estructura i Idioma", "ARIA", "Teclat", ... quedarien com H2. => he tret Exemples accessibilitat per a mantenir estructrua similar a les altres pagines on el header conté l'h1. 

## Sliders
- [ ] S'hauria de poder cancel·lar el punter.
- [x] Afegir una àrea d'acció de `24px` com a mínim.
- [x] Falta un `cursor pointer`.
- [ ] Revisar exemples: els valors d'ARIA només són necessaris per a components personalitzats, no per als `input[type=range]` natius.

# Millores

## Carrusel
- [ ] Les fletxes potser s'haurien de posar a l'estil de la majoria dels carrusels, una a la dreta i l'altra a l'esquerra de la imatge i de forma centrada. I en aquest cas d'exemple tot i que les fletxes tenen contrast, posaria un fons per les fletxes més marcat respecte al fons de la imatge.

## Divs vs Botons
- [ ] El comptador no es veu perquè està massa a la part inferior.

## Icones i Imatges
- [x] Potser posaria algun exemple de les icones de xarxes socials, perquè quedi més clar que en aquest cas serien icones funcionals, o sigui amb atribut `alt`.
- [x] Afegiria: ...les icones internes han de tenir aria-hidden="true": per evitar duplicar la informació als lectors de pantalla.  
      **Exemple:** Si el contenidor (enllaç, botó, etc.) ja té una descripció accessible (`aria-label`, `aria-labelledby`, text visible, etc.), les icones internes han de portar `aria-hidden="true"` per evitar que el lector de pantalla les llegeixi com a redundants.

# Propostes
- [ ] Fer un footer centrat i potser més complet amb la info de TOTHOMweb.Fer un footer centrat i potser més complet amb la info de tothomweb.
- [ ] Potser estaria bé seguir els colors corporatius de TOTHOMweb.
- [ ] Revisar responsiveness.
- [ ] Afegir un Fil d'Ariadna, per saber on s'està i retornar a la categoria corresponent.

# ARIA Exemples i Accessibilitat

- [ ] Exemple 4 (`aria-hidden`): Aclarir que oculta l'element a tots els productes de suport, no només als lectors de pantalla.
- [ ] Exemple 7 (icones): Recordar que només aporta indicació visual, no funcionalitat. Si està `disabled`, no hauria de ser tabulable.
- [ ] Exemple 8 (`role="menuitem"`): Si s'utilitza aquest rol, cal permetre la navegació amb fletxes.
- [ ] Exemple 2 (pestanyes amb `role="tablist"`): La pestanya ha de rebre focus perquè no té cap element interactiu.
- [ ] Exemple de pestanyes de teclat: El focus ha d'anar a la pestanya.
- [ ] Cards, botó de favorits: Si té `aria-pressed`, l'etiqueta ha de ser la mateixa sempre (no canviar el text). Si es vol canviar el text, no cal `aria-pressed`.
- [ ] Cards, botó de favorits: Es poden fer servir tres mètodes vàlids:
      1. Botó "Afegir a favorits" sense `aria-pressed` però amb `aria-live`.
      2. Botó que canvia a "Eliminar de favorits" sense `aria-pressed` ni `aria-live`.
      3. Botó amb `aria-pressed` que canvia d'estat, sense `aria-live`.
- [ ] Cards, preus: No utilitzar `aria-label` als preus, millor fer servir `.sr-only` per afegir context.
- [ ] Llistes: El cas correcte ha d'enviar el focus a l'element nou.