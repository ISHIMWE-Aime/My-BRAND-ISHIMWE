const express = require("express")//import of express packages I have been downloaded.
const app = express();//creation of new express instance and save into app variable.

/*This app variable let us do everything we need to configure our REST API, like registering our routes, installing necessary middlewares, and much more.*/

app.listen(5000, () => {
	console.log("Server has started!");
})
