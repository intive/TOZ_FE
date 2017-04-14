var express = require("express"),
    app = express(),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 4567,
    publicDir = process.argv[2] || __dirname + '/',
    path = require('path');

app.get("/", function (req, res) {
   res.sendFile(path.join(publicDir, "/index.html"));
});

app.use(express.static(publicDir));


console.log("Simple static server showing %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);