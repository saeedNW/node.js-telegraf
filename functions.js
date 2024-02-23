function startCommandFunction(ctx) {
	/**
	 * send a simple replay to user when start button was pressed.
	 */
	ctx.reply("Welcome to my bot. From simple reply");

	/**
	 * send a replay to user when start button was pressed using telegram object.
	 * in this method you have to use the chat's ID in order to send the reply.
	 */
	ctx.telegram.sendMessage(
		ctx.chat.id,
		"Welcome to my bot. From telegram object"
	);
}

function helpCommandFunction(ctx) {
	ctx.reply(
		"To use the robot, read the following guide" +
			"\n\n" +
			"Main commands" +
			"\n" +
			"/start - to run the application" +
			"\n" +
			"/help - to see the help menu" +
			"\n" +
			"/settings - bot settings" +
			"\n\n" +
			"Custom commands #1" +
			"\n" +
			"/start_command - custom start command" +
			"\n" +
			"/help_custom - custom help command" +
			"\n\n" +
			"Custom commands #2" +
			"\n" +
			"/tool - custom tool command" +
			"\n" +
			"/tools - custom tool command" +
			"\n" +
			"/Tool - custom tool command" +
			"\n" +
			"/Tools - custom tool command" +
			"\n" +
			"/TOOL - custom tool command" +
			"\n" +
			"/TOOLS - custom tool command" +
			"\n\n" +
			"Custom commands #3" +
			"\n" +
			"/active_interval - 10 seconds interval activation" +
			"\n" +
			"/remove_interval - 10 seconds interval deactivation" +
			"\n\n" +
			"Middleware" +
			"\n" +
			"/lock all - send this command to lock sending message in group" +
			"\n" +
			"/unlock all - send this command to unlock sending message in group" +
			"\n\n" +
			"Events" +
			"\n" +
			"voice - send a voice message to receive the related response" +
			"\n" +
			"sticker - send a sticker message to receive the related response" +
			"\n" +
			"photo - send a photo message to receive the related response" +
			"\n\n" +
			"Hears" +
			"\n" +
			"node.js - send node.js keyword to receive its definition" +
			"\n\n" +
			"* message * - send message keyword in a sentence to receive a reply" +
			"\n\n" +
			'Remove profanity - If you use one of the words "shit", "basted" or "fuck", the message will be deleted'
	);
}

function settingsCommandFunction(ctx) {
	ctx.reply("bot settings management");
}

function customStartCommandFunction(ctx) {
	ctx.reply("Welcome to my bot. From command method");
}

function toolsCommandFunction(ctx) {
	ctx.reply(
		"You used one of the tool commands. " +
			"These commands are all managed by " +
			"the same method and have the same response"
	);
}

const intervalsList = {};

function activeIntervalCommandFunction(ctx) {
	/** get the user's chat id */
	const chatId = ctx.chat.id.toString();

	/** check if the interval has been activated already */
	if (Object.keys(intervalsList).includes(chatId)) {
		return ctx.reply("interval is already activated");
	}

	/** set interval to send message every 10 seconds */
	intervalsList[chatId] = setInterval(() => {
		ctx.telegram.sendMessage(chatId, "you have activated 10 seconds interval");
	}, 10 * 1000);

	/** reply with success message */
	return ctx.reply("interval activated successfully");
}

function removeIntervalFunction(ctx) {
	/** get the user's chat id */
	const chatId = ctx.chat.id.toString();

	/** check if the interval has been removed already */
	if (!Object.keys(intervalsList).includes(chatId)) {
		return ctx.reply("interval is already removed");
	}

	/** clear the interval */
	clearInterval(intervalsList[chatId]);

	/** remove the interval from intervals list */
	delete intervalsList[chatId];

	/** reply with success message */
	return ctx.reply("interval removed successfully");
}

function nodeJsHearsFunction(ctx) {
	ctx.reply(
		"Node.js is a cross-platform, " +
			"open - source JavaScript runtime environment."
	);
}

function messageHearsFunction(ctx) {
	ctx.reply("you have sent the message keyword");
}

function messageRemoverFunction(ctx) {
	const username = ctx.from.username;
	ctx.deleteMessage();
	ctx.reply(`@${username}, this is a warning. Don't use such words`);
}

function voiceMessageEventFunction(ctx) {
	ctx.reply("So, you found out that you can send voices??");
}

function stickerEventFunction(ctx) {
	ctx.reply("👍");
}

function photoEventFunction(ctx) {
	ctx.reply("You have sent a photo");
}

/**  Initialize lockStatus as false, indicating chats are unlocked */
let lockStatus = false;

function lockStatusMiddlewareFunction(ctx, next) {
	/** Split the message text into command and option */
	const [command, option] = ctx.message.text.split(" ");

	/** If lockStatus is false, allow command execution */
	if (!lockStatus) {
		return next();
	}

	/**
	 * If lockStatus is true and the command is to unlock all,
	 * allow command execution
	 */
	if (lockStatus && command === "/unlock" && option === "all") {
		return next();
	}

	/**
	 *  If lockStatus is true and command is not unlock all,
	 * delete the message and prevent execution
	 */
	ctx.deleteMessage();
	return false;
}

function lockCommandFunction(ctx) {
	const lockOption = ctx.payload;

	/**
	 * If lockOption is 'all', set lockStatus to true
	 */
	if (lockOption === "all") {
		lockStatus = true;
	}

	/** Reply with a message indicating that all chats have been locked */
	ctx.reply("all chats have been locked");
}

function unlockCommandFunction(ctx) {
	const lockOption = ctx.payload;

	/**  If lockOption is 'all', set lockStatus to false */
	if (lockOption === "all") {
		lockStatus = false;
	}

	/** Reply with a message indicating that all chats have been unlocked */
	ctx.reply("all chats have been unlocked");
}

module.exports = {
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
};
