
const TelegramBot = require('node-telegram-bot-api');

// Токен твоего бота
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// WebApp-ссылка
const webAppUrl = 'https://avaddon48.github.io/zayavka-form';

// При любом сообщении — шлём кнопку
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Открой форму заявки 👇', {
        reply_markup: {
            keyboard: [[{
                text: '📝 Открыть форму',
                web_app: { url: webAppUrl }
            }]],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    });
});

// Получение данных из WebApp
bot.on('web_app_data', (msg) => {
    const data = msg.web_app_data.data;
    bot.sendMessage(msg.chat.id, `📩 Заявка получена:
${data}`);
});
