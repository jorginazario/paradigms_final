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
	this.addRole = function(){
		document.body.setAttribute("role","alert"); //the class has to be "alert alert-primary"
	}
}