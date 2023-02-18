import { Markup,Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { Command } from './command.class';


export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      console.log(ctx.session);
      ctx.reply("Вам понравился курс?", Markup.inlineKeyboard([
        Markup.button.callback("+", "like"),
        Markup.button.callback("-", "dislike")
      ]));
    })

    this.bot.action("like", (ctx) => {
      ctx.session.like = true;
      ctx.editMessageText("Хорошо!");
    })

    this.bot.action("dislike", (ctx) => {
      ctx.session.like = false;
      ctx.editMessageText("Жаль!");
    })

  }
}