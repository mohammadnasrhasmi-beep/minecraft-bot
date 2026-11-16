const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')

// ---- Configuration ----
// Le port s'affiche dans le chat quand tu ouvres ton monde au LAN.
const bot = mineflayer.createBot({
  host: 'localhost',
  port: 12345,
  username: 'ZehefBot',
  auth: 'offline',
})

// Le plugin pathfinder donne au bot la capacité de se déplacer tout seul :
// il calcule un chemin, contourne les obstacles et saute quand il faut.
bot.loadPlugin(pathfinder)

// ---- Connexion ----
bot.once('spawn', () => {
  console.log('Bot connecté.')
  bot.pathfinder.setMovements(new Movements(bot))
  bot.chat('Salut, je suis en ligne !')
})

// ---- Commandes dans le chat ----
bot.on('chat', (pseudo, message) => {
  // On ignore ses propres messages, sinon il se répond à lui-même.
  if (pseudo === bot.username) return

  // Le joueur qui a écrit le message, pour les commandes qui le visent.
  const joueur = bot.players[pseudo]?.entity

  if (message === 'salut') {
    bot.chat(`Salut ${pseudo} !`)
  }

  if (message === 'ou es-tu') {
    const p = bot.entity.position
    bot.chat(`Je suis à x=${Math.round(p.x)} y=${Math.round(p.y)} z=${Math.round(p.z)}`)
  }

  if (message === 'saute') {
    bot.setControlState('jump', true)
    setTimeout(() => bot.setControlState('jump', false), 500)
  }

  if (message === 'suis-moi') {
    if (!joueur) return bot.chat('Je ne te vois pas, approche-toi.')
    // Le « true » garde l'objectif actif : le bot se replace quand tu bouges.
    bot.pathfinder.setGoal(new goals.GoalFollow(joueur, 2), true)
    bot.chat(`Je te suis, ${pseudo} !`)
  }

  if (message === 'viens') {
    if (!joueur) return bot.chat('Je ne te vois pas, approche-toi.')
    const p = joueur.position
    // GoalNear : aller à cet endroit une seule fois, puis s'arrêter.
    bot.pathfinder.setGoal(new goals.GoalNear(p.x, p.y, p.z, 1))
    bot.chat('J\'arrive !')
  }

  if (message === 'stop') {
    bot.pathfinder.setGoal(null)
    bot.chat('J\'arrête.')
  }
})

// ---- Erreurs ----
bot.on('kicked', (raison) => console.log('Expulsé :', raison))
bot.on('error', (erreur) => console.log('Erreur :', erreur.message))
bot.on('end', () => console.log('Déconnecté.'))