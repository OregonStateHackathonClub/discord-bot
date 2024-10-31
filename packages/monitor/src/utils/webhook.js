import { WebhookClient, EmbedBuilder } from 'discord.js'

export default hackathon => {

    const themes = []
    for (const theme in hackathon.themes) themes.push(theme.name)

    const webhook = process.env.WEBHOOK_URL
    const embed = new EmbedBuilder()
        .setTitle(hackathon.title)
        .setURL(hackathon.url)
        .addFields(
            { name: 'Hacking period', value: hackathon.submission_period_dates, inline: true },
            { name: 'Time left to submit', value: hackathon.time_left_to_submission, inline: true },
            { name: 'Host', value: hackathon.organization_name, inline: false },
            { name: 'Theme', value: themes.join(", "), inline: true },
            { name: 'Prize', value: `$${hackathon.prize_amount.replace(/[^\d,]/g, '')}`, inline: true },
        )
    
    (new WebhookClient({ url: webhook })).send({ embeds: [embed] })
  }