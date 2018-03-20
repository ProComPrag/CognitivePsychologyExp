// creates the Introduction View
var initIntroView = function() {
	var view = {};
	view.name = 'intro';
	view.template = $('#intro-view').html();
	$('main').html(Mustache.render(view.template, {
		title: config.intro.title,
		logo: config.intro.logo,
		text: config.intro.text,
		button: config.intro.button
	}));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};

// creates Instruction View
var initInstructionsView = function() {
	var view = {};
	view.name = 'instructions';
	view.template = $("#instructions-view").html();
	$('main').html(Mustache.render(view.template, {
		title: config.instructions.title,
		text: config.instructions.text,
		button: config.instructions.button
	}));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};

var initReactionTimeView = function(trialInfo, CT) {
	var view = {};
	view.name = 'reaction';
	view.template = $("#trial-view").html();
	console.log(view.template);
	// renderts the template
	$('main').html(Mustache.render(view.template, {
		text: 'Press SPACE when you see an image on the screen'
	}));

	// variables
	var dateStart, dateEnd, rt;
	// stimulus: the stimulus html element
	var stimulus = $('#stimulus');
	// pause: assigns a random number between 1200 ms and 2700 ms
	var pause = Math.floor(Math.random()*(2700-1200+1)+1200);

	// if the stimulus in this trial is a circle, turns the sqaure to a circle
	// by addid css border radius to the sqaure
	if (trialInfo['stimulus'] === 'circle') {
		stimulus.css('border-radius', '50%');
	}

	// shows the stimulus after a some period of time (pause line 81)
	// records the time when the stimulus was displayed
	setTimeout(function() {
		$('#stimulus').removeClass('nodisplay');
		dateStart = Date.now();
		$('body').on('keyup', handleKeyUp);
	}, pause);

	// checks whether the key pressed is SPACE
	// handleKeyUp() is called when a key is pressed
	var handleKeyUp = function(e) {
		if (e.which === 32) {
			// removes handleKeyUp event from the body
			$('body').off('keyup', handleKeyUp);
			// dateEnd: records the time space was pressed
			dateEnd = Date.now();
			// rt: reaction time (starts when the stimulus appeared until the space is pressed)
			rt = dateEnd - dateStart;
			// adds a reading time (rt) key to the object
			cp.data[CT].rt = rt;
			// moves to the next view
			cp.findNextView();
		}
	};

	return view;
};

var initGoNoGoView = function(trialInfo, CT) {
	var view = {};
	view.name = 'goNoGo';
	view.template = $("#trial-view").html();
	$('main').html(Mustache.render(view.template, {
		text: 'Press SPACE when you see a ' + trialInfo['target']
	}));

	// variables
	var target = trialInfo['target'];
	var stimulus = trialInfo['stimulus'];
	// pause: assigns a random number between 1200 ms and 2700 ms
	var pause = Math.floor(Math.random()*(2700-1200+1)+1200);
	var dateStart, dateEnd, rt;

	// if the stimulus in this trial is a circle, turns the sqaure to a circle
	// by addid css border radius to the sqaure
	if (trialInfo['stimulus'] === 'circle') {
		$('#stimulus').css('border-radius', '50%');
	}

	// shows the stimulus after a some period of time (pause line 47)
	// records the time when the stimulus was displayed
	setTimeout(function() {
		$('#stimulus').removeClass('nodisplay');
		dateStart = Date.now();

		$('body').on('keyup', handleKeyUp);

		if (stimulus !== target) {
			setTimeout(function() {
				// records response
				cp.data[CT].response = 'correct';
				cp.findNextView();
			}, 2000);			
		}

	}, pause);

	// checks whether the key pressed is SPACE
	// handleKeyUp() is called when a key is pressed
	var handleKeyUp = function(e) {
		// if enter was pressed and the reposne is correct
		if ((e.which === 32) && (stimulus === target)) {
			// removes handleKeyUp event fro the body
			$('body').off('keyup', handleKeyUp);
			// sateEnd: records the time space was pressed
			dateEnd = Date.now();
			// rt: reaction time (starts when the stimulus appeared until the space is pressed)
			rt = dateEnd - dateStart;
			// adds a 'rt' key to the object
			cp.data[CT].rt = rt;
			// records response
			cp.data[CT].response = 'correct';
			// moves to the next view
			cp.findNextView();
		// if space is pressed but response was incorrect
		} else if ((e.which === 32) && !(stimulus === target)) {
			// removes handleKeyUp event fro the body
			$('body').off('keyup', handleKeyUp);
			// sateEnd: records the time space was pressed
			dateEnd = Date.now();
			// rt: reaction time (starts when the stimulus appeared until the space is pressed)
			rt = dateEnd - dateStart;
			// adds a 'rt' key to the object
			cp.data[CT].rt = rt;
			// records response
			cp.data[CT].response = 'incorrect';
			// moves to the next view
			cp.findNextView();
		}
	};

	return view;
};


var initDiscriminationView = function(trialInfo, CT) {
	var view = {};
	view.name = 'goNoGo';
	view.template = $("#trial-view").html();
	$('main').html(Mustache.render(view.template, {
		text: 'Press F when you see a ' + trialInfo['f'] + ' and J when you see a ' + trialInfo['j']
	}));

	// variables
	var target = trialInfo['target'];
	var stimulus = trialInfo['stimulus'];
	// pause: assigns a random number between 1200 ms and 2700 ms
	var pause = Math.floor(Math.random()*(2700-1200+1)+1200);
	var dateStart, dateEnd, rt;
}

// creates Pause View
var initPauseView = function(pauseNumber) {
	var view = {};
	view.name = 'pause';
	view.template = $("#pause-view").html();

	$('main').html(Mustache.render(view.template, {
/*		text: text
*/	}));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};