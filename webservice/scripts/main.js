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

function Header() {
	this.createHeader = function(text) {
		this.item = document.createElement("h1");
		var textLabel = document.createTextNode(text);
		this.item.appendChild(textLabel);
	},
	this.addToDocument = function() {
		document.body.appendChild(this.item);
	}
}

function Button() {
	this.createButton = function(text, id, className) {
		this.item = document.createElement("button");
		this.item.setAttribute("id", id);
		this.item.setAttribute("class", className);
		this.item.innerHTML = text;
	},
	this.addEventHandler = function(handler, tempContainer) {
		this.item.onmouseup = function() {
			handler(tempContainer);
		}
	}
	this.addEventHandler2 = function(handler, tempContainer, tempTextBox) {
		this.item.onmouseup = function() {
			handler(tempContainer, tempTextBox);
		}
	}
}

function Input(){
	this.createInput = function(id){
		this.item = document.createElement("input");
		this.item.setAttribute("list", id);
	},
	this.addToDocument = function() {
		document.body.appendChild(this.item);
	}

}

function Datalist(){
	this.createDatalist = function(id){
		this.item = document.createElement("datalist");
		this.item.setAttribute("id", id);
	},
	this.addToDatalist = function(element) {
		this.item.appendChild(element);
	},
	this.addToDocument = function() {
		document.body.appendChild(this.item);
	}
}

function Option(){
	this.createOption = function(value){
		this.item = document.createElement("option");
		this.item.setAttribute("value", value);
	},
	this.addToDocument = function() {
		document.body.appendChild(this.item);
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

//Event Handler: Show Valid Teams
function show_valid_teams(tempContainer){
	while (tempContainer.firstChild) {
		tempContainer.removeChild(tempContainer.firstChild)
	}

	validLabel = new Label();
	validLabel.createLabel("Valid Teams:", "valid_label");
	validLabel.item.innerHTML = validLabel.item.innerHTML.bold();
	dataContainer.addToContainer(validLabel.item);

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:" + MOVIE_PORT + "/valid/", true);
	xhr.onload = function(e) {
		validTeamsResponse = JSON.parse(xhr.responseText);
		validTeams = validTeamsResponse["teams"];
		for (var i = 0; i < validTeams.length; i++) {
			tempLabel = new Label();
			tempLabel.createLabel(validTeams[i], "valid_teams_label");
			dataContainer.addToContainer(tempLabel.item)
		}
	}
	xhr.onerror = function(e) {
		console.error(xhr.statusText);
	}
	xhr.send(null)
}

//Event Handler: Show Invalid Teams
function show_invalid_teams(tempContainer) {
	while (tempContainer.firstChild) {
		tempContainer.removeChild(tempContainer.firstChild)
	}

	invalidLabel = new Label();
	invalidLabel.createLabel("Invalid Teams:", "invalid_label");
	invalidLabel.item.innerHTML = invalidLabel.item.innerHTML.bold();
	dataContainer.addToContainer(invalidLabel.item);

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:" + MOVIE_PORT + "/invalid/", true);
	xhr.onload = function(e) {
		invalidTeamsResponse = JSON.parse(xhr.responseText);
		invalidTeams = invalidTeamsResponse["teams"];
		for (var i = 0; i < invalidTeams.length; i++) {
			tempLabel = new Label();
			tempLabel.createLabel(invalidTeams[i], "invalid_teams_label");
			dataContainer.addToContainer(tempLabel.item)
		}
	}
	xhr.onerror = function(e) {
		console.error(xhr.statusText);
	}
	xhr.send(null)

}

//Event Handler: Show Ranking
function show_ranking(tempContainer){
	while (tempContainer.firstChild) {
		tempContainer.removeChild(tempContainer.firstChild)
	}

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:" + MOVIE_PORT + "/rankings/", true);
	xhr.onload = function(e) {
		rankingTeamsResponse = JSON.parse(xhr.responseText);
		rankingTeams = rankingTeamsResponse["teams"];
		for (i in rankingTeams) {
			team = rankingTeams[i];
			for (teamName in team) {
				tempLabel = new Label();
				tempLabel.createLabel(team[teamName] + "." + "\t" + teamName, "ranking_teams_label");
				dataContainer.addToContainer(tempLabel.item)
			}
		}
	}
	xhr.onerror = function(e) {
		console.error(xhr.statusText);
	}
	xhr.send(null)

	rankingLabel = new Label();
	rankingLabel.createLabel("Ranking:", "ranking_label");
	rankingLabel.item.innerHTML = rankingLabel.item.innerHTML.bold();
	dataContainer.addToContainer(rankingLabel.item);
}

//Event Handler: Show Stats
function show_stats(tempContainer){
	while (tempContainer.firstChild) {
		tempContainer.removeChild(tempContainer.firstChild)
	}

	statsLabel = new Label();
	statsLabel.createLabel("Explore Team Statistics:", "stats_label");
	statsLabel.item.innerHTML = statsLabel.item.innerHTML.bold();
	dataContainer.addToContainer(statsLabel.item);

	//input
	myInput = new Input();
	myInput.createInput("teams");

	//datalist
	myDatalist = new Datalist();
	myDatalist.createDatalist("teams");

	dataContainer.addToContainer(myInput.item);

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:" + MOVIE_PORT + "/valid/", true);
	xhr.onload = function(e) {
		validTeamsResponse = JSON.parse(xhr.responseText);
		validTeams = validTeamsResponse["teams"];
		for (var i = 0; i < validTeams.length; i++) {
			//options go inside datalist
			myOption1 = new Option;
			myOption1.createOption(validTeams[i]);
			myDatalist.addToDatalist(myOption1.item);

		}
	}
	xhr.onerror = function(e) {
		console.error(xhr.statusText);
	}
	xhr.send(null)
	dataContainer.addToContainer(myDatalist.item);

	//Create search Button
	searchButton = new Button();
	searchButton.createButton("Search", "search_button", "btn");
	dataContainer.addToContainer(searchButton.item);

	//add event handler
	searchButton.addEventHandler2(more_stats, dataContainer.item, myInput.item);

}

//Event Handler: Show More Stats (Wins, Losses, Draws) when a team is selected in the textbox
function more_stats(tempContainer, tempTextBox){
	//!!!!!STILL NEED TO DELETE THE PREVIOUS VALUES
	//for (var i = 0; i < myStatsList.length; i++) {
	//	var elem = document.getElementById(myStatsList);
	//	elem.parentNode.removeChild(elem);
	//}

	///////////////////////////
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:" + MOVIE_PORT + "/teams/" + tempTextBox.value, true);
	xhr.onload = function(e) {
		stats = JSON.parse(xhr.responseText);
		wins = stats["wins"];
		losses = stats["losses"];
		draws = stats["draws"];
		scoresFor = stats["scoresFor"]; 
		scoresAgainst = stats["scoresAgainst"];
		name = stats["name"];

		myStatsList = [];
		myStatsList.push(wins);
		myStatsList.push(losses);
		myStatsList.push(draws);
		myStatsList.push(scoresFor);
		myStatsList.push(scoresAgainst);

		myStatsListKeys = [];
		myStatsListKeys.push("Wins: ");
		myStatsListKeys.push("Lossess: ");
		myStatsListKeys.push("Draws: ");
		myStatsListKeys.push("Total Goals Scored: ");
		myStatsListKeys.push("Total Goals Allowed: ");

		console.log(myStatsList)

		for (var i = 0; i < myStatsList.length; i++) {
			//options go inside datalist
			tempLabel = new Label();
			tempLabel.createLabel(myStatsListKeys[i]+myStatsList[i], myStatsList[i]+"_stats_label_" + i);
			dataContainer.addToContainer(tempLabel.item);
		}
	}
	xhr.onerror = function(e) {
		console.error(xhr.statusText);
	}
	xhr.send(null)
	

}

//Event Handler: Show Match
function show_match(tempContainer){
	while (tempContainer.firstChild) {
		tempContainer.removeChild(tempContainer.firstChild)
	}
	matchupLabel = new Label();
	matchupLabel.createLabel("Team Match Up:", "matchup_label");
	matchupLabel.item.innerHTML = matchupLabel.item.innerHTML.bold();
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
optionsHeader = new Header();
optionsHeader.createHeader("Choose option:");

optionsContainer.addToContainer(optionsHeader.item);

//options buttons
optionsButton1 = new Button();
optionsButton1.createButton("Premiere League Teams 2017", "valid_teams_button", "btn");
optionsContainer.addToContainer(optionsButton1.item);

optionsButton2 = new Button();
optionsButton2.createButton("Explore Past Premier League Teams", "invalid_teams_button", "btn");
optionsContainer.addToContainer(optionsButton2.item);

optionsButton3 = new Button();
optionsButton3.createButton("Show rankings", "rankings_button", "btn");
optionsContainer.addToContainer(optionsButton3.item);

optionsButton4 = new Button();
optionsButton4.createButton("Explore team stats", "stats_button", "btn");
optionsContainer.addToContainer(optionsButton4.item);

optionsButton5 = new Button();
optionsButton5.createButton("Team match up", "match_button", "btn");
optionsContainer.addToContainer(optionsButton5.item);

//button event handlers
optionsButton1.addEventHandler(show_valid_teams, dataContainer.item);
optionsButton2.addEventHandler(show_invalid_teams, dataContainer.item);
optionsButton3.addEventHandler(show_ranking, dataContainer.item);
optionsButton4.addEventHandler(show_stats, dataContainer.item);
optionsButton5.addEventHandler(show_match, dataContainer.item);

// options radio button
//optionsRadioButton = new RadioButton();
//optionsRadioButton.createRadioButton("choice", ["Show all teams", "Show rankings", "Explore team stats", "Team match up"], "theOptionsRadioButton")
//optionsContainer.addToContainer(optionsRadioButton.item)
//optionsRadioButton.getValue()
