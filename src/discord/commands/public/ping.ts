import { createCommand, createResponder, ResponderType } from '#base'
import { createRow } from '@magicyan/discord'
import {
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  time,
} from 'discord.js'
import z from 'zod'

createResponder({
  customId: 'remind/:date',
  types: [ResponderType.Button],
  parse: z.object({
    date: z.coerce.date(),
  }).parse,
  cache: 'cached',
  async run(interaction, { date }) {
    await interaction.reply({
      flags,
      content: `You run ping command ${time(date, 'R')}`,
    })
  },
})

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
      flags,
      content: 'Pong 🏓',
      components: [row],
    })
  },
})
