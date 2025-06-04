import { bootstrap } from '#base'
import { ActivityType } from 'discord.js'

await bootstrap({
  meta: import.meta,
  whenReady(client) {
    client.user.setActivity({
      name: 'Dungeons and Dragons',
      type: ActivityType.Playing,
    })
  },
})
