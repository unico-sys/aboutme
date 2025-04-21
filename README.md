# Sito Personale di Unico

Un sito web personale con design minimalista ispirato a guns.lol con effetti visivi moderni.

## Caratteristiche

- Design minimalista ispirato a guns.lol
- Schermata iniziale "click to enter"
- Effetto neve animato
- Cursore personalizzato
- Visualizzazione profilo semplice e moderna
- Compatibile con dispositivi mobili

## Come utilizzare

1. Clona questo repository
2. Apri il file `index.html` nel tuo browser

## Struttura del progetto

- `index.html` - Struttura principale del sito
- `css/style.css` - Tutti gli stili CSS
- `js/script.js` - Funzionalità JavaScript per animazioni e cursore personalizzato

## Personalizzazione

Puoi personalizzare facilmente questo sito modificando:

- I colori delle variabili CSS in `style.css`:
  ```css
  :root {
      --text-color: #ffffff;           /* Colore del testo */
      --text-color-darker: rgba(255, 255, 255, 0.5); /* Colore testo secondario */
      --bg-color: #000000;             /* Colore di sfondo */
      --container-color: rgba(255, 255, 255, 0.2); /* Colore del contenitore */
      --container-border: 2px solid rgba(255, 255, 255, 0.1); /* Bordo contenitore */
      --avatar-border: 2px solid rgba(255, 255, 255, 0.4); /* Bordo avatar */
  }
  ```

- Immagine dello sfondo della schermata di entrata in `style.css`:
  ```css
  .background-image {
      background-image: url('TUA_IMMAGINE.jpg');
  }
  ```

- Immagine dell'avatar in `index.html`
  ```html
  <img src="TUA_IMMAGINE.gif" alt="" class="avatar">
  ```

- Informazioni del profilo in `index.html`

## Tecnologie utilizzate

- HTML5
- CSS3 (con animazioni e transizioni)
- JavaScript (vanilla)
- Font Awesome per le icone
- Font Satoshi e Array da Fontshare 