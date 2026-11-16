var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var cors = require('cors')

app.use(
	express.json({ limit: "5mb" }),
	cors({
		origin: [
			"https://dashblocks.org",
			"https://www.dashblocks.org",
			"https://gh.dashblocks.org",
			"https://neo-mod.github.io",
			"https://diamondcatgroup.github.io"
		]
	})
)

module.exports = {
    express,
    app,
    expressWs
}