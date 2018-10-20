// const Database = require('../Database')
const Discord = require('discord.js');
const images = require('../images')
const Canvas = require('canvas')
const Logger = require('../Logger');
const canvas = Canvas.createCanvas(432, 680);
const ctx = canvas.getContext('2d');

// Locally get URLs
const getImage = async(hero, message) => {
  try {
    let url = images[hero];
    if (url === undefined) {
      return message.reply(`Hmm. Looks like I don't have an image for that hero yet.`);
    }
    const img = await Canvas.loadImage(url);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const image = new Discord.Attachment(canvas.toBuffer(), `${hero}.png`);
    Logger.success['withImage'](image, message);
  }
  catch(error) {
    console.log(error)
    message.reply('Uh oh, something went wrong. Please try again.')
  }
}

module.exports = {
  name: 'image',
  description: 'Get image for hero',
  args: true,
  execute (message, args) {
    if (args.length) {
      const input = args.length >= 2 ? args[0].concat(' ', args[1]) : args[0]
      const hero = input.toLowerCase()
      // Uncomment line below to get URLs from Airtable database.
      // Database.getImage(hero, message)
      return getImage(hero, message);
    }
  },
}