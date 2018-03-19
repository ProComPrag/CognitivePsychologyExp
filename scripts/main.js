// when the DOM is created and JavaScript code can run safely,
// the experiment initialisation is called
$('document').ready(function() {
	cp.init();

	// prevents scrolling when space is pressed (firefox does it)
	window.onkeydown = function(e) {
		if (e.keyCode == 32 && e.target == document.body) {
			e.preventDefault();
		}
	};
});

// an object cp (from cognitive psychology)
var cp = {};

// keeps track of the views and decided which one to show next
// called at the end of each view in views.js
cp.findNextView = function() {
	if (this.view.name === 'intro') {
		this.view = initInstructionsView();
	} else if (this.view.name === 'instructions') {
		this.view = initTrialView(this.exp[this.block][this.CT]);

		console.log(this.block);
		console.log(this.CT);
		console.log(this.exp[this.block][this.CT]);

		this.CT ++;
	} else if (this.view.name === 'trial' && this.block === 2 && this.CT + 1 === this.exp[2].length) {
		console.log('end');

	} else if ((this.view.name === 'trial') && (this.CT + 1 === this.exp[this.block].length) && (this.block <= 2)){
		this.block++;
		this.CT = 0;

		console.log(this.block);
		console.log(this.CT);
		console.log('pause');

		this.view = initPauseView();
	} else if (this.view.name === 'pause') {
		this.view = initTrialView(this.exp[this.block][this.CT]);

		console.log(this.block);
		console.log(this.CT);
		console.log(this.exp[this.block][this.CT]);

		this.CT++;
	} else if ((this.view.name === 'trial') && !(this.CT + 1 === this.exp[this.block].length)) {
		this.view = initTrialView(this.exp[this.block][this.CT]);

		console.log(this.block);
		console.log(this.CT);
		console.log(this.exp[this.block][this.CT]);

		this.CT++;
	}
 };

// creates and sets variables when the page is loaded.
// called by document ready function on lines 3-12
cp.init = function() {
	this.view = initIntroView();
	this.exp = initExp();
	this.block = 0; // up to 2 (3 overall)
	// CT - current trial in a block
	this.CT = 0; // up to as many as there are in the block strarting from 0
};