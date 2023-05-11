const {GuildMember} = require('discord.js');

module.exports = {
  name: 'volume',
  description: 'Change the volume!',
  description: '更改音量大小',
  options: [
    {
      //name: 'volume',
      name: '音量',
      type: 4, // 'INTEGER' Type
      // description: 'Number between 0-200',
      description: '在0-200之间的数字',
      required: true,
    },
  ],
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        // content: 'You are not in a voice channel!',
        content: '⚠️ | 你不在一个语音频道里！',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        // content: 'You are not in my voice channel!',
        content: '⚠️ | 你不在我所在的语音频道里!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      /* return void interaction.followUp({
        content: '❌ | No music is being played!'
      }); */
      return void interaction.followUp({
        content: '❌ | 没有音乐在播放！'
      });

    var vol = interaction.options.get('vol').value;
    vol = Math.max(0, vol);
    vol = Math.min(200, vol);
    const success = queue.setVolume(vol);

    return void interaction.followUp({
      // content: success ? `🔊 | Volume set to ${volume}!` : '❌ | Something went wrong!',
      content: success ? `🔊 | 音量设置为  ${vol}!` : '❌ | 出了点问题！',
    });
  },
};
