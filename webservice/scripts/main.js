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
	this.addEventHandler = function(handler, tempContainer) {
		this.item.onmouseup = function() {
			handler(tempContainer);
		}
	}
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
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

//Server Request Handler 
function get_valid_teams(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:" + MOVIE_PORT + "/teams/", true); //need to edit resource to return valid teams
																					//also need to add the changes to the cherrypy
	xhr.onload = function(e) {
		valid_teams_dict = JSON.parse(xhr.responseText);
		for (var key in valid_teams_dict){
			valid_label = new Label();
			valid_label.createLabel("Valid Teams:", "valid_label");
			dataContainer.addToContainer(valid_label.item);
		}

	}
	xhr.onerror = function(e) {
		console.error(xhr.statusText);
	}
	xhr.send(null)
}


//Event Handler: Show Teams
function show_teams(tempContainer){
	while (tempContainer.firstChild) {
		tempContainer.removeChild(tempContainer.firstChild)
	}

	valid_label = new Label();
	valid_label.createLabel("Valid Teams:", "valid_label");
	dataContainer.addToContainer(valid_label.item);
	
	//call get_valid_teams and this returns a dictionary

	invalid_label = new Label();
	invalid_label.createLabel("Invalid Teams:", "invalid_label");
	dataContainer.addToContainer(invalid_label.item);
}

//Event Handler: Show Ranking
function show_ranking(tempContainer){
	while (tempContainer.firstChild) {
		tempContainer.removeChild(tempContainer.firstChild)
	}
	rankingLabel = new Label();
	rankingLabel.createLabel("Ranking:", "ranking_label");
	dataContainer.addToContainer(rankingLabel.item);
}

//Event Handler: Show Stats
function show_stats(tempContainer){
	while (tempContainer.firstChild) {
		tempContainer.removeChild(tempContainer.firstChild)
	}
	statsLabel = new Label();
	statsLabel.createLabel("Explore Stats:", "stats_label");
	dataContainer.addToContainer(statsLabel.item);
}

//Event Handler: Show Match
function show_match(tempContainer){
	while (tempContainer.firstChild) {
		tempContainer.removeChild(tempContainer.firstChild)
	}
	matchupLabel = new Label();
	matchupLabel.createLabel("Team Match Up:", "matchup_label");
	dataContainer.addToContainer(matchupLabel.item);
}

// main div
mainContainer = new Container();
mainContainer.createContainer("container");
mainContainer.addID("main_container");
mainContainer.addToDocument();

// options div
optionsContainer = new Container();
optionsContainer.createContainer("options");
mainContainer.addToContainer(optionsContainer.item);

// data div
dataContainer = new Container();
dataContainer.createContainer("data");
mainContainer.addToContainer(dataContainer.item);

// options label
optionsLabel = new Label();
optionsLabel.createLabel("Choose option:", "options_label");
optionsContainer.addToContainer(optionsLabel.item);

//options buttons
optionsButton1 = new Button;
optionsButton1.createButton("Show all teams", "teams_button");
optionsContainer.addToContainer(optionsButton1.item);

optionsButton2 = new Button;
optionsButton2.createButton("Show rankings", "rankings_button");
optionsContainer.addToContainer(optionsButton2.item);

optionsButton3 = new Button;
optionsButton3.createButton("Explore team stats", "stats_button");
optionsContainer.addToContainer(optionsButton3.item);

optionsButton4 = new Button;
optionsButton4.createButton("Team match up", "match_button");
optionsContainer.addToContainer(optionsButton4.item);

//button event handlers
optionsButton1.addEventHandler(show_teams, dataContainer.item);
optionsButton2.addEventHandler(show_ranking, dataContainer.item);
optionsButton3.addEventHandler(show_stats, dataContainer.item);
optionsButton4.addEventHandler(show_match, dataContainer.item);


// options radio button
//optionsRadioButton = new RadioButton();
//optionsRadioButton.createRadioButton("choice", ["Show all teams", "Show rankings", "Explore team stats", "Team match up"], "theOptionsRadioButton")
//optionsContainer.addToContainer(optionsRadioButton.item)
//optionsRadioButton.getValue()
