import { createCommand } from '#base'
import { createRow } from '@magicyan/discord'
import { ApplicationCommandType, ButtonBuilder, ButtonStyle } from 'discord.js'

createCommand({
  name: 'ping',
  description: 'Replies with pong 🏓',
  type: ApplicationCommandType.ChatInput,
  async run(interaction) {
    const row = createRow(
      new ButtonBuilder({
        customId: `remind/${new Date().toISOString()}`,
        label: 'Ping',
        style: ButtonStyle.Success,
      }),
    )
    await interaction.reply({
      flags: ['Ephemeral'],
      content: 'Pong 🏓',
      components: [row],
    })
  },
})
