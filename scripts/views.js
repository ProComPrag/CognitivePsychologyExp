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
	// renderts the template
	$('main').html(Mustache.render(view.template, {
		text: 'Press SPACE when you see an image on the screen'
	}));

	// variables
	// stimulus: the stimulus html element
	var stimulus = $('#stimulus');
	// pause: assigns a random number between 1200 ms and 2700 ms
	var pause = Math.floor(Math.random()*(2700-1200+1)+1200);
	var dateStart, dateEnd, rt;

	console.log(trialInfo);

	// the data that will be appended to data.out
	// after recordData() adds more information to it
	var trial_data = {
		'trial_number': trialInfo['trial_number'],
		'block': trialInfo['block'],
		'stimulus': trialInfo['stimulus']
	};

	// records the data and moves to the next view
	var recordData = function() {
		// sateEnd: records the time space was pressed
		dateEnd = Date.now();
		// rt: reaction time (starts when the stimulus appeared until the space is pressed)
		rt = dateEnd - dateStart;
		// adds a 'rt' key to trial_data
		trial_data['reading_time'] = rt;
		// pushes trial data to data.out list
		cp.data.out.push(trial_data);
		// moves to the next view
		cp.findNextView();
	};

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
			recordData();
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

	// the data that will be appended to data.out
	// after recordData() adds more information to it
	var trial_data = {
		'trial_number': trialInfo['trial_number'],
		'block': trialInfo['block'],
		'stimulus': trialInfo['stimulus'],
		'target': trialInfo['target']
	}

	// records the data and moves to the next view
	var recordData = function(correctness) {
		// sateEnd: records the time space was pressed
		dateEnd = Date.now();
		// rt: reaction time (starts when the stimulus appeared until the space is pressed)
		rt = dateEnd - dateStart;
		// adds a 'rt' key to trial_data
		trial_data['reading_time'] = rt;
		// records response to trial_data
		trial_data['response'] = correctness;
		// pushes trial data to data.out list
		cp.data.out.push(trial_data);
		// moves to the next view
		cp.findNextView();
	};

	var startCycle = function(onSpace, onWait) {
		var timeoutID = setTimeout(function() {
			$('body').off('keyup', spaceListener);
			onWait();
		}, 2000);

		console.log('set timeout: ' + timeoutID);

		var spaceListener = function(e) {
			if (e.which === 32) {
				console.log('space pressed');
				console.log('to clear: ' + timeoutID)
				clearTimeout(timeoutID);
				console.log('cleared: ' + timeoutID);
				$('body').off('keyup', spaceListener);
				onSpace();
			}
		};

		$('body').on('keyup', spaceListener);
	};

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

		// first function: space pressed
		// second function: waited until the image disappeared
		startCycle(function() {
			if (target === stimulus) {
				recordData('correct');
			} else {
				recordData('incorrect');
			}
		}, function() {
			if (target === stimulus) {
				recordData('incorrect');
			} else {
				recordData('correct');
			}
		});

	}, pause);

	return view;
};


var initDiscriminationView = function(trialInfo, CT) {
	var view = {};
	view.name = 'discrimination';
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

	// the data that will be appended to data.out
	// after recordData() adds more information to it
	var trial_data = {
		'trial_number': trialInfo['trial_number'],
		'block': trialInfo['block'],
		'stimulus': trialInfo['stimulus'],
		'f_target': trialInfo['f'],
		'j_target': trialInfo['j']
	}

	// records the data and moves to the next view
	var recordData = function(correctness, key) {
		// sateEnd: records the time space was pressed
		dateEnd = Date.now();
		// rt: reaction time (starts when the stimulus appeared until the space is pressed)
		rt = dateEnd - dateStart;
		// adds a 'rt' key to trial_data
		trial_data['reading_time'] = rt;
		// records response to trial_data
		trial_data['response'] = correctness;
		// key pressed
		trial_data['pressed'] = key;
		// pushes trial data to data.out list
		cp.data.out.push(trial_data);
		// moves to the next view
		cp.findNextView();
	};

	// if the stimulus in this trial is a circle, turns the sqaure to a circle
	// by addid css border radius to the sqaure
	if (trialInfo['stimulus'] === 'circle') {
		$('#stimulus').css('border-radius', '50%');
	}

	// shows the stimulus after a some period of time (pause line 81)
	// records the time when the stimulus was displayed
	setTimeout(function() {
		$('#stimulus').removeClass('nodisplay');
		dateStart = Date.now();
		$('body').on('keyup', handleKeyUp);
	}, pause);

	var handleKeyUp = function(e) {
		if ((stimulus === trialInfo['f']) && (e.which === 70))  {
			// removes handleKeyUp event from the body
			$('body').off('keyup', handleKeyUp);
			// sateEnd: records the time space was pressed
			dateEnd = Date.now();
			// rt: reaction time (starts when the stimulus appeared until the space is pressed)
			rt = dateEnd - dateStart;
			recordData('correct', 'f');
		} else if ((stimulus === trialInfo['j']) && (e.which === 70)) {
			// removes handleKeyUp event from the body
			$('body').off('keyup', handleKeyUp);
			// sateEnd: records the time space was pressed
			dateEnd = Date.now();
			// rt: reaction time (starts when the stimulus appeared until the space is pressed)
			rt = dateEnd - dateStart;
			recordData('incorrect', 'f');
		} else if ((stimulus === trialInfo['j']) && (e.which === 74)) {
			// removes handleKeyUp event from the body
			$('body').off('keyup', handleKeyUp);
			// sateEnd: records the time space was pressed
			dateEnd = Date.now();
			recordData('correct', 'j');
		} else if ((stimulus === trialInfo['f']) && (e.which === 74)) {
			// removes handleKeyUp event from the body
			$('body').off('keyup', handleKeyUp);
			// sateEnd: records the time space was pressed
			dateEnd = Date.now();
			// rt: reaction time (starts when the stimulus appeared until the space is pressed)
			rt = dateEnd - dateStart;
			recordData('incorrect', 'j');
		} else {
			console.log('some other key pressed; nothing happens');
		}
	};

	return view;
};

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