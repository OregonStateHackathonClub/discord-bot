import { WebhookClient, EmbedBuilder } from 'discord.js'

export default product => {
    let first = ''; let second = ''
    if( product.sizes.length > 8 ) { 
        first = product.sizes.slice(0, Math.round(product.sizes.length / 2)).join('')
        second = product.sizes.slice(Math.round(product.sizes.length / 2)).join('')
    } else {
        first = product.sizes.join('')
        second = '\u200b'
    }
    const webhooks = [ process.env.brickBot ]
    const embed = new EmbedBuilder()
        .setColor('#FFFFFF')
        .setAuthor({ name: 'https://www.asos.com/us', url: 'https://www.asos.com/us' })
        .setTitle(`${product.title} - ${product.price}`)
        .setURL(`https://www.asos.com/us/~/~/prd/${product.pid}`)
        .addFields(
            { name: 'Sizes Instock', value: first, inline: true },
            { name: '\u200b', value: second, inline: true }
        )
    webhooks.forEach( webhook => {
        (new WebhookClient({ url: webhook })).send({ embeds: [embed] })
    })
  }