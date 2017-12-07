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
	this.addRole = function(){
		document.body.setAttribute("role","alert"); //the class has to be "alert alert-primary"
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
	},
	this.addEventHandler3 = function(handler, tempContainer, tempTextBox1, tempTextBox2) {
		this.item.onmouseup = function() {
			handler(tempContainer, tempTextBox1, tempTextBox2);
		}
	},
	this.addEventHandler4 = function(handler, tempContainer, team_name_input, team_wins_input, team_losses_input, team_draws_input, team_scoresFor_input, team_scoresAgainst_input) {
		this.item.onmouseup = function() {
			handler(tempContainer, team_name_input, team_wins_input, team_losses_input, team_draws_input, team_scoresFor_input, team_scoresAgainst_input);
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
var SPORTS_PORT = "51019";
///////////////////////

function getMovieRecommendation(user_id, image, movieInfoTable) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:" + SPORTS_PORT + "/recommendations/" + user_id, true);
	xhr.onload = function(e) {
		recommendationResponse= JSON.parse(xhr.responseText);
		newMovieID = recommendationResponse["movie_id"];
		var xhr2 = new XMLHttpRequest();
		xhr2.open("GET", "http://student04.cse.nd.edu:"+SPORTS_PORT+"/movies/"+newMovieID, true);
		xhr2.onload = function(g) {
			newMovieResponse = JSON.parse(xhr2.responseText);
			newMovieTitle = newMovieResponse["title"];
			newMovieImage = "http://student04.cse.nd.edu/skumar5/images" + newMovieResponse["img"];
			movieInfoTable.editRow1(newMovieTitle);
			image.createImage(newMovieImage);
			movieInfoTable.editRow2(image.item);

			var xhr3 = new XMLHttpRequest();
			xhr3.open("GET", "http://student04.cse.nd.edu:"+SPORTS_PORT+"/ratings/"+newMovieID, true);
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
	validLabel.createLabel("Premier League Teams:", "valid_label");
	validLabel.item.innerHTML = validLabel.item.innerHTML.bold();
	dataContainer.addToContainer(validLabel.item);

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:" + SPORTS_PORT + "/valid/", true);
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
	invalidLabel.createLabel("Past Premier League Teams:", "invalid_label");
	invalidLabel.item.innerHTML = invalidLabel.item.innerHTML.bold();
	dataContainer.addToContainer(invalidLabel.item);

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:" + SPORTS_PORT + "/invalid/", true);
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
	xhr.open("GET", "http://student04.cse.nd.edu:" + SPORTS_PORT + "/rankings/", true);
	xhr.onload = function(e) {
		rankingTeamsResponse = JSON.parse(xhr.responseText);
		rankingTeams = rankingTeamsResponse["teams"];

		tempArray = []
		for (x in rankingTeams) {
			for (key in rankingTeams[x]) {
				tempArray.push([rankingTeams[x][key], key])
			}
		}
		tempArray.sort(function(a, b) {return a[0] - b[0]})
		for (i in tempArray) {
			tempLabel = new Label();
			tempLabel.createLabel(tempArray[i][0] + "." + "\t" + tempArray[i][1], "ranking_teams_label");
			dataContainer.addToContainer(tempLabel.item)
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
	xhr.open("GET", "http://student04.cse.nd.edu:" + SPORTS_PORT + "/valid/", true);
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
	searchButton.createButton("Search", "search_button", "btn1");
	dataContainer.addToContainer(searchButton.item);

	//add event handler
	searchButton.addEventHandler2(more_stats, dataContainer.item, myInput.item);

}

//Event Handler: Show More Stats (Wins, Losses, Draws) when a team is selected in the textbox
function more_stats(tempContainer, tempTextBox){
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

	var xhr2 = new XMLHttpRequest();
	xhr2.open("GET", "http://student04.cse.nd.edu:" + SPORTS_PORT + "/valid/", true);
	xhr2.onload = function(e) {
		validTeamsResponse = JSON.parse(xhr2.responseText);
		validTeams = validTeamsResponse["teams"];
		for (var i = 0; i < validTeams.length; i++) {
			//options go inside datalist
			myOption1 = new Option;
			myOption1.createOption(validTeams[i]);
			myDatalist.addToDatalist(myOption1.item);

		}
	}
	xhr2.onerror = function(e) {
		console.error(xhr.statusText);
	}
	xhr2.send(null)
	dataContainer.addToContainer(myDatalist.item);
	//Create search Button
	searchButton = new Button();
	searchButton.createButton("Search", "search_button", "btn1");
	dataContainer.addToContainer(searchButton.item);

	//add event handler
	searchButton.addEventHandler2(more_stats, dataContainer.item, myInput.item);

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:" + SPORTS_PORT + "/teams/" + tempTextBox.value, true);
	xhr.onload = function(e) {
		stats = JSON.parse(xhr.responseText);
		wins = stats["wins"];
		losses = stats["losses"];
		draws = stats["draws"];
		scoresFor = stats["scoresFor"]; 
		scoresAgainst = stats["scoresAgainst"];
		name = stats["name"];

		myStatsList = [];
		myStatsList.push(name);
		myStatsList.push(wins);
		myStatsList.push(losses);
		myStatsList.push(draws);
		myStatsList.push(scoresFor);
		myStatsList.push(scoresAgainst);
		

		myStatsListKeys = [];
		myStatsListKeys.push("Team Name: ");
		myStatsListKeys.push("Wins: ");
		myStatsListKeys.push("Lossess: ");
		myStatsListKeys.push("Draws: ");
		myStatsListKeys.push("Total Goals Scored: ");
		myStatsListKeys.push("Total Goals Allowed: ");

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

	statsLabel = new Label();
	statsLabel.createLabel("Team 1:", "team1_label");
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
	xhr.open("GET", "http://student04.cse.nd.edu:" + SPORTS_PORT + "/valid/", true);
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


	statsLabel2 = new Label();
	statsLabel2.createLabel("Team 2:", "team2_label");
	statsLabel2.item.innerHTML = statsLabel2.item.innerHTML.bold();
	dataContainer.addToContainer(statsLabel2.item);

	//input
	myInput2 = new Input();
	myInput2.createInput("teams");

	//datalist
	myDatalist2 = new Datalist();
	myDatalist2.createDatalist("teams");

	dataContainer.addToContainer(myInput2.item);

	var xhr2 = new XMLHttpRequest();
	xhr2.open("GET", "http://student04.cse.nd.edu:" + SPORTS_PORT + "/valid/", true);
	xhr2.onload = function(e) {
		validTeamsResponse2 = JSON.parse(xhr2.responseText);
		validTeams2 = validTeamsResponse2["teams"];
		for (var i = 0; i < validTeams2.length; i++) {
			//options go inside datalist
			myOption2 = new Option;
			myOption2.createOption(validTeams[i]);
			myDatalist2.addToDatalist(myOption2.item);

		}
	}
	xhr2.onerror = function(e) {
		console.error(xhr.statusText);
	}
	xhr2.send(null)
	dataContainer.addToContainer(myDatalist2.item);

	//Create search Button
	searchButton = new Button();
	searchButton.createButton("Search", "search_button", "btn1");
	dataContainer.addToContainer(searchButton.item);

	//add event handler
	searchButton.addEventHandler3(show_winner, dataContainer.item, myInput.item, myInput2.item);
}

function show_winner(tempContainer, tempTextBox1, tempTextBox2) {
	while (tempContainer.firstChild) {
		tempContainer.removeChild(tempContainer.firstChild)
	}
	matchupLabel = new Label();
	matchupLabel.createLabel("Team Match Up:", "matchup_label");
	matchupLabel.item.innerHTML = matchupLabel.item.innerHTML.bold();
	dataContainer.addToContainer(matchupLabel.item);

	statsLabel = new Label();
	statsLabel.createLabel("Team 1:", "team1_label");
	statsLabel.item.innerHTML = statsLabel.item.innerHTML.bold();
	dataContainer.addToContainer(statsLabel.item);

	//input
	myInput = new Input();
	myInput.createInput("teams");

	//datalist
	myDatalist = new Datalist();
	myDatalist.createDatalist("teams");

	dataContainer.addToContainer(myInput.item);

	var xhr3 = new XMLHttpRequest();
	xhr3.open("GET", "http://student04.cse.nd.edu:" + SPORTS_PORT + "/valid/", true);
	xhr3.onload = function(e) {
		validTeamsResponse = JSON.parse(xhr3.responseText);
		validTeams = validTeamsResponse["teams"];
		for (var i = 0; i < validTeams.length; i++) {
			//options go inside datalist
			myOption1 = new Option;
			myOption1.createOption(validTeams[i]);
			myDatalist.addToDatalist(myOption1.item);

		}
	}
	xhr3.onerror = function(e) {
		console.error(xhr3.statusText);
	}
	xhr3.send(null)
	dataContainer.addToContainer(myDatalist.item);


	statsLabel2 = new Label();
	statsLabel2.createLabel("Team 2:", "team2_label");
	statsLabel2.item.innerHTML = statsLabel2.item.innerHTML.bold();
	dataContainer.addToContainer(statsLabel2.item);

	//input
	myInput2 = new Input();
	myInput2.createInput("teams");

	//datalist
	myDatalist2 = new Datalist();
	myDatalist2.createDatalist("teams");

	dataContainer.addToContainer(myInput2.item);

	var xhr4 = new XMLHttpRequest();
	xhr4.open("GET", "http://student04.cse.nd.edu:" + SPORTS_PORT + "/valid/", true);
	xhr4.onload = function(e) {
		validTeamsResponse2 = JSON.parse(xhr4.responseText);
		validTeams2 = validTeamsResponse2["teams"];
		for (var i = 0; i < validTeams2.length; i++) {
			//options go inside datalist
			myOption2 = new Option;
			myOption2.createOption(validTeams[i]);
			myDatalist2.addToDatalist(myOption2.item);

		}
	}
	xhr4.onerror = function(e) {
		console.error(xhr4.statusText);
	}
	xhr4.send(null)
	dataContainer.addToContainer(myDatalist2.item);

	//Create search Button
	searchButton = new Button();
	searchButton.createButton("Search", "search_button", "btn1");
	dataContainer.addToContainer(searchButton.item);

	//add event handler
	searchButton.addEventHandler3(show_winner, dataContainer.item, myInput.item, myInput2.item);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://student04.cse.nd.edu:" + SPORTS_PORT + "/recommendations/" + tempTextBox1.value + "_" + tempTextBox2.value, true);
	xhr.onload = function(e) {
		recommendation = JSON.parse(xhr.responseText);
		winner = recommendation["recommendation"];
		console.log(winner)

		// for most likely winner
		tempLabel = new Label();
		tempLabel.createLabel("Most Likely to Win...", "winner_title_label");
		tempLabel2 = new Label();
		tempLabel2.createLabel(winner, "winner_label");
		dataContainer.addToContainer(tempLabel.item);
		dataContainer.addToContainer(tempLabel2.item);
	}
	xhr.onerror = function(e) {
		console.error(xhr.statusText);
	}
	xhr.send(null)

}

function edit_team(tempContainer) {
	while (tempContainer.firstChild) {
		tempContainer.removeChild(tempContainer.firstChild)
	}
	matchupLabel = new Label();
	matchupLabel.createLabel("Edit Team Data:", "edit_data_label");
	matchupLabel.item.innerHTML = matchupLabel.item.innerHTML.bold();
	dataContainer.addToContainer(matchupLabel.item);

	statsLabel = new Label();
	statsLabel.createLabel("Team Name:", "team_name_label");
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
	xhr.open("GET", "http://student04.cse.nd.edu:" + SPORTS_PORT + "/valid/", true);
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

	winsLabel = new Label();
	winsLabel.createLabel("Wins:", "wins_label");
	winsLabel.item.innerHTML = winsLabel.item.innerHTML.bold();
	dataContainer.addToContainer(winsLabel.item);
	myWinsInput = new Input();
	myWinsInput.createInput("wins");
	dataContainer.addToContainer(myWinsInput.item);

	lossesLabel = new Label();
	lossesLabel.createLabel("Losses:", "losses_label");
	lossesLabel.item.innerHTML = lossesLabel.item.innerHTML.bold();
	dataContainer.addToContainer(lossesLabel.item);
	myLossesInput = new Input();
	myLossesInput.createInput("losses");
	dataContainer.addToContainer(myLossesInput.item);

	drawsLabel = new Label();
	drawsLabel.createLabel("Draws:", "draws_label");
	drawsLabel.item.innerHTML = drawsLabel.item.innerHTML.bold();
	dataContainer.addToContainer(drawsLabel.item);
	myDrawsInput = new Input();
	myDrawsInput.createInput("draws");
	dataContainer.addToContainer(myDrawsInput.item);

	scoresFor = new Label();
	scoresFor.createLabel("Goals Scored:", "goals_scored_label");
	scoresFor.item.innerHTML = scoresFor.item.innerHTML.bold();
	dataContainer.addToContainer(scoresFor.item);
	myScoresForInput = new Input();
	myScoresForInput.createInput("scoresFor");
	dataContainer.addToContainer(myScoresForInput.item);

	scoresAgainst = new Label();
	scoresAgainst.createLabel("Goals Allowed:", "goals_allowed_label");
	scoresAgainst.item.innerHTML = scoresAgainst.item.innerHTML.bold();
	dataContainer.addToContainer(scoresAgainst.item);
	myScoresAgainstInput = new Input();
	myScoresAgainstInput.createInput("scoresAgainst");
	dataContainer.addToContainer(myScoresAgainstInput.item);


	//Create search Button
	searchButton = new Button();
	searchButton.createButton("Save Changes", "edit_teams_button", "btn1");
	dataContainer.addToContainer(searchButton.item);

	//add event handler
	searchButton.addEventHandler4(save_edit_team_data, dataContainer.item, myInput.item, myWinsInput.item, myLossesInput.item, myDrawsInput.item, myScoresForInput.item, myScoresAgainstInput.item);
}

function save_edit_team_data(tempContainer, team_name_input, team_wins_input, team_losses_input, team_draws_input, team_scoresFor_input, team_scoresAgainst_input) {
	var xhr5 = new XMLHttpRequest();
	xhr5.open("PUT", "http://student04.cse.nd.edu:"+SPORTS_PORT+"/teams/"+team_name_input.value, true);
	xhr5.onload = function(m) {

	}
	xhr5.onerror = function(m) {
		console.error(xhr5.statusText);
	}
	data = {"W": team_wins_input.value, "L": team_losses_input.value, "D": team_draws_input.value, "SFor": team_scoresFor_input.value, "SAgainst": team_scoresAgainst_input.value}
	var json = JSON.stringify(data);
	xhr5.send(json);
}

function add_new_team(tempContainer) {
	while (tempContainer.firstChild) {
		tempContainer.removeChild(tempContainer.firstChild)
	}
	matchupLabel = new Label();
	matchupLabel.createLabel("Add a New Team:", "new_team_label");
	matchupLabel.item.innerHTML = matchupLabel.item.innerHTML.bold();
	dataContainer.addToContainer(matchupLabel.item);

	statsLabel = new Label();
	statsLabel.createLabel("New Team Name:", "team_name_label");
	statsLabel.item.innerHTML = statsLabel.item.innerHTML.bold();
	dataContainer.addToContainer(statsLabel.item);

	//input
	myInput = new Input();
	myInput.createInput("teams");

	dataContainer.addToContainer(myInput.item);

	winsLabel = new Label();
	winsLabel.createLabel("Wins:", "wins_label");
	winsLabel.item.innerHTML = winsLabel.item.innerHTML.bold();
	dataContainer.addToContainer(winsLabel.item);
	myWinsInput = new Input();
	myWinsInput.createInput("wins");
	dataContainer.addToContainer(myWinsInput.item);

	lossesLabel = new Label();
	lossesLabel.createLabel("Losses:", "losses_label");
	lossesLabel.item.innerHTML = lossesLabel.item.innerHTML.bold();
	dataContainer.addToContainer(lossesLabel.item);
	myLossesInput = new Input();
	myLossesInput.createInput("losses");
	dataContainer.addToContainer(myLossesInput.item);

	drawsLabel = new Label();
	drawsLabel.createLabel("Draws:", "draws_label");
	drawsLabel.item.innerHTML = drawsLabel.item.innerHTML.bold();
	dataContainer.addToContainer(drawsLabel.item);
	myDrawsInput = new Input();
	myDrawsInput.createInput("draws");
	dataContainer.addToContainer(myDrawsInput.item);

	scoresFor = new Label();
	scoresFor.createLabel("Goals Scored:", "goals_scored_label");
	scoresFor.item.innerHTML = scoresFor.item.innerHTML.bold();
	dataContainer.addToContainer(scoresFor.item);
	myScoresForInput = new Input();
	myScoresForInput.createInput("scoresFor");
	dataContainer.addToContainer(myScoresForInput.item);

	scoresAgainst = new Label();
	scoresAgainst.createLabel("Goals Allowed:", "goals_allowed_label");
	scoresAgainst.item.innerHTML = scoresAgainst.item.innerHTML.bold();
	dataContainer.addToContainer(scoresAgainst.item);
	myScoresAgainstInput = new Input();
	myScoresAgainstInput.createInput("scoresAgainst");
	dataContainer.addToContainer(myScoresAgainstInput.item);

	//Create search Button
	searchButton = new Button();
	searchButton.createButton("Save Changes", "edit_teams_button", "btn1");
	dataContainer.addToContainer(searchButton.item);

	//add event handler
	searchButton.addEventHandler4(save_edit_team_data, dataContainer.item, myInput.item, myWinsInput.item, myLossesInput.item, myDrawsInput.item, myScoresForInput.item, myScoresAgainstInput.item);
}


// main div
mainContainer = new Container();
mainContainer.createContainer("container");
mainContainer.addID("main_container");
mainContainer.addToDocument();

// LEFT CONTAINER options div
optionsContainer = new Container();
optionsContainer.createContainer("options");
optionsContainer.addID("parent");
mainContainer.addToContainer(optionsContainer.item);

// RIGHT CONTAINER data div
dataContainer = new Container();
dataContainer.createContainer("data");
mainContainer.addToContainer(dataContainer.item);

//CURRENTLY HEREEEEEE
//parentContainer = new Container();
//parentContainer.createContainer("")


// options label
optionsHeader = new Header();
optionsHeader.createHeader("Choose option:");
optionsContainer.addToContainer(optionsHeader.item);

//options buttons
optionsButton1 = new Button();
optionsButton1.createButton("Premier League Teams 2017", "valid_teams_button", "btn");
optionsContainer.addToContainer(optionsButton1.item);

optionsButton2 = new Button();
optionsButton2.createButton("Explore Past Premier League Teams", "invalid_teams_button", "btn");
optionsContainer.addToContainer(optionsButton2.item);

optionsButton3 = new Button();
optionsButton3.createButton("Show rankings", "rankings_button", "btn child");
optionsContainer.addToContainer(optionsButton3.item);

optionsButton4 = new Button();
optionsButton4.createButton("Explore team stats", "stats_button", "btn child");
optionsContainer.addToContainer(optionsButton4.item);

optionsButton5 = new Button();
optionsButton5.createButton("Team match up", "match_button", "btn");
optionsContainer.addToContainer(optionsButton5.item);

optionsButton6 = new Button();
optionsButton6.createButton("Edit Team Data", "edit_teams_button", "btn");
optionsContainer.addToContainer(optionsButton6.item);

optionsButton7 = new Button();
optionsButton7.createButton("Add New Team", "add_teams_button", "btn");
optionsContainer.addToContainer(optionsButton7.item);

//button event handlers
optionsButton1.addEventHandler(show_valid_teams, dataContainer.item);
optionsButton2.addEventHandler(show_invalid_teams, dataContainer.item);
optionsButton3.addEventHandler(show_ranking, dataContainer.item);
optionsButton4.addEventHandler(show_stats, dataContainer.item);
optionsButton5.addEventHandler(show_match, dataContainer.item);
optionsButton6.addEventHandler(edit_team, dataContainer.item);
optionsButton7.addEventHandler(add_new_team, dataContainer.item);

// options radio button
//optionsRadioButton = new RadioButton();
//optionsRadioButton.createRadioButton("choice", ["Show all teams", "Show rankings", "Explore team stats", "Team match up"], "theOptionsRadioButton")
//optionsContainer.addToContainer(optionsRadioButton.item)
//optionsRadioButton.getValue()
