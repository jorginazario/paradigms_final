function Label() {
	this.createLabel = function(text, id) {
		this.item = document.createElement("p");
		this.item.setAttribute("id", id);
		this.item.setAttribute("class", className);
		var textLabel = document.createTextNode(text);
		this.item.appendChild(textLabel);
	},
	this.setText = function(text) {
		this.item.innerHTML = text;
	},
	this.addToDocument = function() {
		document.body.appendChild(this.item);
	}
}

function Container() {
	this.createContainer = function(className) {
		this.item = document.createElement("div");
		this.item.setAttribute("class", className);
	},
	this.addID = function(id) {
		this.item.setAttribute("id", id);
	},
	this.addToContainer = function(element) {
		this.item.appendChild(element);
	},
	this.addToDocument = function() {
		document.body.appendChild(this.item);
	}
}

function Button() {
	this.createButton = function(text, id) {
		this.item = document.createElement("button");
		this.item.setAttribute("id", id);
		this.item.innerHTML = text;
	},
	this.addVoteHandler = function(handler, image, movieInfoTable) {
		this.item.onmouseup = function() {
			handler(image, movieInfoTable);
		}
	}
}	

function Table() {
	this.createTable = function() {
		this.item = document.createElement("table");
		this.row1 = document.createElement("tr");
		this.row2 = document.createElement("tr");
		this.row3 = document.createElement("tr");
		this.item.appendChild(this.row1);
		this.item.appendChild(this.row2);
		this.item.appendChild(this.row3);
	},
	this.editRow1 = function(titleOfMovie) {
		this.row1.innerHTML = titleOfMovie + "<br>" + "<br>";
		this.row1.setAttribute("align", "center");
	},
	this.editRow2 = function(image) {
		while (this.row2.firstChild) this.row2.removeChild(this.row2.firstChild)
		this.row2.setAttribute("align", "center");
		this.row2.appendChild(image);
	},
	this.editRow3 = function(ratingOfMovie) {
		this.row3.innerHTML = "<br>" + ratingOfMovie;
		this.row3.setAttribute("align", "center");
	}
}

function Image() {
	this.createImage = function(path) {
		this.item = document.createElement("img");
		this.item.setAttribute("src", path)
	}
}

// MOVIE PORT NUMBER //
var MOVIE_PORT = "51019";
///////////////////////

function getMovieRecommendation(user_id, image, movieInfoTable) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:" + MOVIE_PORT + "/recommendations/" + user_id, true);
	xhr.onload = function(e) {
		recommendationResponse= JSON.parse(xhr.responseText);
		newMovieID = recommendationResponse["movie_id"];
		var xhr2 = new XMLHttpRequest();
		xhr2.open("GET", "http://student04.cse.nd.edu:"+MOVIE_PORT+"/movies/"+newMovieID, true);
		xhr2.onload = function(g) {
			newMovieResponse = JSON.parse(xhr2.responseText);
			newMovieTitle = newMovieResponse["title"];
			newMovieImage = "http://student04.cse.nd.edu/skumar5/images" + newMovieResponse["img"];
			movieInfoTable.editRow1(newMovieTitle);
			image.createImage(newMovieImage);
			movieInfoTable.editRow2(image.item);

			var xhr3 = new XMLHttpRequest();
			xhr3.open("GET", "http://student04.cse.nd.edu:"+MOVIE_PORT+"/ratings/"+newMovieID, true);
			xhr3.onload = function(h) {
				newMovieResponse = JSON.parse(xhr3.responseText);
				newMovieRating = newMovieResponse["rating"];
				movieInfoTable.editRow3(newMovieRating);
			}
			xhr3.onerror = function(h) {
				console.error(xhr3.statusText);
			}
			xhr3.send(null);

		}
		xhr2.onerror = function(g) {
			console.error(xhr2.statusText);
		}
		xhr2.send(null);
	}
	xhr.onerror = function(e) {
		console.error(xhr.statusText);
	}
	xhr.send(null);
}


function sendUpVote(image, movieInfoTable) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:"+MOVIE_PORT+"/recommendations/1", true);
	xhr.onload = function(n) {
		currentMovieResponse = JSON.parse(xhr.responseText);
		currentMovieID = currentMovieResponse["movie_id"];

		var xhr2 = new XMLHttpRequest();
		xhr2.open("PUT", "http://student04.cse.nd.edu:"+MOVIE_PORT+"/recommendations/1", true);
		xhr2.onload = function(m) {
			getMovieRecommendation("1", image, movieInfoTable);
		}
		xhr2.onerror = function(m) {
			console.error(xhr2.statusText);
		}
		data = {"rating": "5", "movie_id": currentMovieID};
		var json = JSON.stringify(data);
		xhr2.send(json);

	}
	xhr.onerror = function(n) {
		console.error(xhr.statusText);
	}
	xhr.send(null);
}

function sendDownVote() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:"+MOVIE_PORT+"/recommendations/1", true);
	xhr.onload = function(n) {
		currentMovieResponse = JSON.parse(xhr.responseText);
		currentMovieID = currentMovieResponse["movie_id"];

		var xhr2 = new XMLHttpRequest();
		xhr2.open("PUT", "http://student04.cse.nd.edu:"+MOVIE_PORT+"/recommendations/1", true);
		xhr2.onload = function(m) {
			getMovieRecommendation("1", image, movieInfoTable);
		}
		xhr2.onerror = function(m) {
			console.error(xhr2.statusText);
		}
		data = {"rating": "1", "movie_id": currentMovieID};
		var json = JSON.stringify(data);
		xhr2.send(json);

	}
	xhr.onerror = function(n) {
		console.error(xhr.statusText);
	}
	xhr.send(null);
}


// main div
mainContainer = new Container();
mainContainer.createContainer("container");
mainContainer.addID("main");
mainContainer.addToDocument();

// voteUp div
voteUpContainer = new Container();
voteUpContainer.createContainer("voteUp");
mainContainer.addToContainer(voteUpContainer.item);

// voteUp Button
voteUpButton = new Button();
voteUpButton.createButton("UP", "upButton");
voteUpContainer.addToContainer(voteUpButton.item);

// movieInfo div
movieInfoContainer = new Container();
movieInfoContainer.createContainer("movieInfo");
mainContainer.addToContainer(movieInfoContainer.item);

// movieInfo Table
movieInfoTable = new Table();
movieInfoTable.createTable();
movieInfoContainer.addToContainer(movieInfoTable.item);

// voteDown div
voteDownContainer = new Container();
voteDownContainer.createContainer("voteDown");
mainContainer.addToContainer(voteDownContainer.item);

// voteDown Button
voteDownButton = new Button();
voteDownButton.createButton("DOWN", "downButton");
voteDownContainer.addToContainer(voteDownButton.item);

// image
image = new Image();

// add button functionality
voteUpButton.addVoteHandler(sendUpVote, image, movieInfoTable);
voteDownButton.addVoteHandler(sendDownVote);

// get initial movie recommendation
getMovieRecommendation("1", image, movieInfoTable);
