/** import telegraf module */
const { Telegraf } = require("telegraf");
/** initialize dotenv */
require("dotenv").config();
/** create new bot instants from telegraf */
const bot = new Telegraf(process.env.BOT_TOKEN);
/** import functions */
const {
	startCommandFunction,
	helpCommandFunction,
	settingsCommandFunction,
	customStartCommandFunction,
	toolsCommandFunction,
	activeIntervalCommandFunction,
	removeIntervalFunction,
	nodeJsHearsFunction,
	messageHearsFunction,
	messageRemoverFunction,
	voiceMessageEventFunction,
	lockStatusMiddlewareFunction,
	lockCommandFunction,
	unlockCommandFunction,
	stickerEventFunction,
	photoEventFunction,
} = require("./functions");

/**
 * manage bot start command behavior.
 * using this method you can manage and handle your
 * bot behavior when a user press the start or sends
 * thb start command
 */
bot.start(startCommandFunction);

/**
 * manage bot help command behavior.
 */
bot.help(helpCommandFunction);

/**
 * manage bot settings command behavior
 */
bot.settings(settingsCommandFunction);

/**
 * command method allows you to define you own personal command
 * or even use the existing command, for example here we have
 * implanted a custom start command behavior using the command
 * method.
 *
 */
bot.command("start_command", customStartCommandFunction);

/**
 * create a custom help command using command method
 */
bot.command("help_custom", helpCommandFunction);

/**
 * using command method to create a single response for
 * deferent type of the command, for example if we want
 * to send the same response to the commands bellow then
 * we can define the commands as and array of strings in
 * command's method input section
 * [tool, tools, Tool, Tools, TOOL, TOOLS]
 */
bot.command(
	["tool", "tools", "Tool", "Tools", "TOOL", "TOOLS"],
	toolsCommandFunction
);

/**
 * using command method to create a custom command which
 * is a simple interval registerer that send a message to
 * the user every seconds
 */
bot.command("active_interval", activeIntervalCommandFunction);

/**
 * using command method to create a custom command which
 * will remove the interval that has been activated with
 * the activation command
 */
bot.command("remove_interval", removeIntervalFunction);

/**
 * define a listening for the node.js keyword.
 * hears are a type of the command that listen
 * to the message and if a certain keyword was
 * called then send a response in return.
 * for example in this command, if the user send
 * the keyword node.js then they\ll receive in
 * return.
 */
bot.hears("node.js", nodeJsHearsFunction);

/**
 * define a listener for message keyword.
 * in this example with the usage of regex
 * power we defines a rule which will send
 * a replay if the chosen keyword has been
 * sued in a sentence.
 */
bot.hears(/.message./, messageHearsFunction);

/**
 * Define a listener that is sensitive to a
 * specific list of words and will remove
 * messages containing that word and send
 * a warning.
 */
bot.hears([/\bshit\b/, /\bbasted\b/, /\bfuck\b/], messageRemoverFunction);

/**
 * Define an event listener for the bot.
 * this event listener, listen for the event
 * of sending a voice in the chat, and response
 * to them with the chosen response.
 */
bot.on("voice", voiceMessageEventFunction);

/**
 * define event listener for stickers.
 */
bot.on("sticker", stickerEventFunction);

/**
 * define event listener for photo.
 */
bot.on("photo", photoEventFunction);

/**
 * define a middleware to check group chat
 * lock status
 */
bot.use(lockStatusMiddlewareFunction);

/**
 * define a custom command to lock sending message in the chat
 */
bot.command("lock", lockCommandFunction);

/**
 * define a custom command to unlock sending message in the chat
 */
bot.command("unlock", unlockCommandFunction);

/** launch the bot */
bot.launch();
