# Bot Minecraft

Un bot qui se connecte à un monde Minecraft et répond à des commandes écrites dans le chat.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

Construit avec [Mineflayer](https://github.com/PrismarineJS/mineflayer), une librairie Node.js qui permet de contrôler un joueur Minecraft par code.

## Commandes

| Dans le chat | Ce que le bot fait |
|---|---|
| `salut` | Répond en saluant le joueur par son nom |
| `ou es-tu` | Donne ses coordonnées |
| `saute` | Saute |

## Lancer le bot

Prérequis : **Node.js 22+** et **Minecraft Java Edition**.

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Dans Minecraft, ouvrir un monde solo, puis **Échap → Ouvrir au LAN → Démarrer**. Le chat affiche un numéro de port.
3. Mettre ce port dans `bot.js` (variable `port`).
4. Lancer le bot :
   ```bash
   node bot.js
   ```

Le bot apparaît dans le monde et répond aux commandes du tableau.
