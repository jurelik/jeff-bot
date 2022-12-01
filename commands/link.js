const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('link')
    .setDescription('Responds with link to Chorus and the current compo page.'),
  async execute(interaction) {
    let currentDate = new Date();
    let origDate = new Date();

    //Move origDate to the date of 2HTS250
    origDate.setFullYear(2019);
    origDate.setMonth(0);
    origDate.setDate(13);

    let diffMs = (currentDate - origDate); // Milliseconds between now & 2HTS250
    let diffDays = Math.floor(diffMs / 86400000); // Days

    let compoId = 250 + Math.floor(diffDays / 7);

    let result = 'Link to Chorus: <http://chorus.thasauce.net:8000/compo.m3u>\n' +
                 `Link to the latest compo: <http://compo.thasauce.net/rounds/view/2HTS${compoId}>`

    try {
      await interaction.reply(result);
    }
    catch (err) {
      console.error(`[ERROR]: ${err}`);
    }
  }
}
