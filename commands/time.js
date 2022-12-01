const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('time')
    .setDescription('Responds with time left until next 2HTS event.'),
  async execute(interaction) {
    let currentDate = new Date();
    let sundayDate = new Date();

    //Check if compo is running
    if (currentDate.getDay() == 0) {
      if (currentDate.getHours() >= 20 && currentDate.getHours() < 23) {
        await interaction.reply('2HTS is currently in progress!');
        return;
      }
    }

    //Move sundayDate to next Sunday
    sundayDate.setDate(sundayDate.getDate() + (0 + (7 - sundayDate.getDay())) % 7);
    sundayDate.setHours(20, 00, 00);

    let diffMs = (sundayDate - currentDate); // Milliseconds between now & Sunday
    let diffDays = Math.floor(diffMs / 86400000); // Days
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // Hours
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // Minutes

    let result = `Time until next 2HTS: ${diffDays} Days, ${diffHrs} Hours, ${diffMins} Minutes.`;

    await interaction.reply(result);
  }
}
