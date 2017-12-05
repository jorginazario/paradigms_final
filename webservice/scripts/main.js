function Label() {
	this.createLabel = function(text, id) {
		this.item = document.createElement("p");
		this.item.setAttribute("id", id);
		// this.item.setAttribute("class", className);
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

function RadioButton() {
	this.createRadioButton = function(name, labels, id) {
		this.item = document.createElement("form")
		this.name = name
		for (var x in labels) {
			var lx = labels[x]
			var tmp = document.createElement("input")
			tmp.setAttribute("type", "radio")
			tmp.setAttribute("name", name)
			tmp.setAttribute("value", lx)
			var ltmp = document.createElement("label")
			ltmp.setAttribute("id", id+"_label_"+x)
			ltmp.innerHTML = labels[x] + '<br>'
			this.item.appendChild(tmp)
			this.item.appendChild(ltmp)
		}
	},
	this.getValue = function() {
		var radios = this.item.elements[this.name]
		for (var i = 0; i < radios.length; i++) {
			var r = radios[i]
			if (r.checked) return r.value
		}
		return 'error'
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


// main div
mainContainer = new Container();
mainContainer.createContainer("container");
mainContainer.addID("main");
mainContainer.addToDocument();

// options div
optionsContainer = new Container();
optionsContainer.createContainer("options");
mainContainer.addToContainer(optionsContainer.item);

// options label
optionsLabel = new Label();
optionsLabel.createLabel("Choose option:", "options_label");
optionsContainer.addToContainer(optionsLabel.item);

// options radio button
optionsRadioButton = new RadioButton();
optionsRadioButton.createRadioButton("choice", ["Show all teams", "Show rankings", "Explore team stats", "Team match up"], "theOptionsRadioButton")
optionsContainer.addToContainer(optionsRadioButton.item)

// data div
dataContainer = new Container();
dataContainer.createContainer("data");
mainContainer.addToContainer(dataContainer.item);

// data label ** this is for testing
dataLabel= new Label();
dataLabel.createLabel("Data:", "data_label");
dataContainer.addToContainer(dataLabel.item);
