import { createCommand } from '#base'
import { evaluateDiceExpression } from '#functions'
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from 'discord.js'

createCommand({
  name: 'roll',
  description: 'Roll dice',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'expressão',
      description: 'Expressão de dados a ser avaliada (Ex: 1d6+2)',
      type: ApplicationCommandOptionType.String,
      required: true,
      maxLength: 100,
    },
  ],
  async run(interaction) {
    const expression = interaction.options.getString('expressão', true)
    const diceRollResult = evaluateDiceExpression(expression)

    if (!diceRollResult) {
      await interaction.reply({
        content: 'Expressão de dados inválida.',
        flags,
      })

      return
    }

    await interaction.reply(diceRollResult.detailedResult)
  },
})
