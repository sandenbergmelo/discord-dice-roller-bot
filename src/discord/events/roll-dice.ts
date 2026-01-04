import { createEvent } from '#base'
import { evaluateDiceExpression } from '#functions'

createEvent({
  name: 'Roll dice',
  event: 'messageCreate',
  once: false,
  async run(interaction) {
    if (interaction.author.bot) return

    const diceRollResult = evaluateDiceExpression(interaction.content)
    if (!diceRollResult) return

    await Promise.all([
      interaction.react('🎲'),
      interaction.reply(diceRollResult.detailedResult),
    ])
  },
})
