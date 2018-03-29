// creates the Introduction View
var initIntroView = function() {
	var view = {};
	view.name = 'intro';
	view.template = $('#intro-view').html();
	$('main').html(Mustache.render(view.template, {
		title: config_views.intro.title,
		text: config_views.intro.text,
		button: config_views.intro.buttonText
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
		title: config_views.instructions.title,
		text: config_views.instructions.text,
		button: config_views.instructions.buttonText
	}));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};

var initBeginExpView = function() {
	console.log('begin exp');
	var view = {};
	view.name = 'beginExp';
	view.template = $("#begin-exp-view").html();
	// renderts the template
	$('main').html(Mustache.render(view.template, {
		text: config_views.beginExp.text
	}));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};


var initReactionTimeView = function(index, trials) {
	var view = {};
	var trialInfo = trials[index];
	view.name = 'trial';
	view.template = $("#trial-view").html();
	// renderts the template
	$('main').html(Mustache.render(view.template, {
		text: 'Press SPACE when you see a shape on the screen'
	}));

	console.log(trialInfo);

	reactionTimeTask(trialInfo, 'trial');

	return view;
};

var initReactionTimePracticeView = function(index, trials) {
	var view = {};
	var trialInfo = cp.data.practice_trials[index];
	view.name = 'practice';
	view.template = $("#trial-view").html();
	// renderts the template
	$('main').html(Mustache.render(view.template, {
		title: 'Practice',
		text: 'Press SPACE when you see a shape on the screen'
	}));

	console.log(trialInfo);

	reactionTimeTask(trialInfo, 'practice');

	return view;
};

var reactionTimeTask = function(trialInfo, trialType) {
	// variables
	// stimulus: the stimulus html element
	var stimulus = $('#stimulus');
	// pause: assigns a random number between 1200 ms and 2700 ms
	var pause = Math.floor(Math.random()*(2700-1200+1)+1200);
	var dateStart, dateEnd, rt;

	// if the stimulus in this trial is a circle, turns the sqaure to a circle
	// by addid css border radius to the sqaure
	if (trialInfo['stimulus'] === 'circle') {
		stimulus.css('border-radius', '50%');
	}

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
		trial_data['reaction_time'] = rt;
		// pushes trial data to data.out list
		cp.data.out.push(trial_data);
		// moves to the next view
		cp.findNextView();
	};

	// checks whether the key pressed is SPACE
	// handleKeyUp() is called when a key is pressed
	var handleKeyUp = function(e) {
		if (e.which === 32) {
			// removes handleKeyUp event from the body
			$('body').off('keyup', handleKeyUp);
			if (trialType === 'practice') {
				cp.findNextView();
			} else if (trialType === 'trial') {
				recordData();
			} else {
				console.log('trialTypes can be either practice or trial');
			}
		}
	};

	// shows the stimulus after a some period of time (pause line 81)
	// records the time when the stimulus was displayed
	setTimeout(function() {
		$('#stimulus').removeClass('nodisplay');
		dateStart = Date.now();
		$('body').on('keyup', handleKeyUp);
	}, pause);

};


var initGoNoGoView = function(index, trials) {
	var view = {};
	view.name = 'trial';
	view.template = $("#trial-view").html();

	var trialInfo = trials[(trials.length / 3) + index];
	console.log(trialInfo);

	$('main').html(Mustache.render(view.template, {
		text: 'Press SPACE when you see a ' + trialInfo['target']
	}));

	goNoGoTask(trialInfo, 'trial');

	return view;
};


var initGoNoGoPracticeView = function(index, trials) {
	var view = {};
	view.name = 'practice';
	view.template = $("#trial-view").html();

	var trialInfo = cp.data.practice_trials[(cp.data.practice_trials.length / 3) + index];
	console.log(trialInfo);

	$('main').html(Mustache.render(view.template, {
		title: 'Practice',
		text: 'Press SPACE when you see a ' + trialInfo['target']
	}));

	goNoGoTask(trialInfo, 'practice');

	return view;
};


var goNoGoTask = function(trialInfo, trialType) {
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
	var recordData = function(correctness, event) {
		// sateEnd: records the time space was pressed
		dateEnd = Date.now();
		// rt: reaction time (starts when the stimulus appeared until the space is pressed)
		rt = dateEnd - dateStart;
		// adds a 'rt' key to trial_data
		trial_data['reaction_time'] = rt;
		// records response to trial_data
		trial_data['response'] = correctness;
		// event
		trial_data['event'] = event;
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
				if (trialType === 'practice') {
					cp.findNextView();	
				} else if (trialType === 'trial') {
					recordData('correct', 'space');
				}
			} else {
				if (trialType === 'practice') {
					cp.findNextView();	
				} else if (trialType === 'trial') {
					recordData('incorrect', 'space');
				}
			}
		}, function() {
			if (target === stimulus) {
				if (trialType === 'practice') {
					cp.findNextView();	
				} else if (trialType === 'trial') {
					recordData('incorrect', 'waited');
				}
			} else {
				if (trialType === 'practice') {
					cp.findNextView();	
				} else if (trialType === 'trial') {
					recordData('correct', 'waited');
				}
			}
		});

	}, pause);
};

var discriminationTask = function(trialInfo, trialType) {
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
		trial_data['reaction_time'] = rt;
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

			if (trialType === 'practice') {
				cp.findNextView();
			} else if (trialType === 'trial') {
				recordData('correct', 'f');
			}
		} else if ((stimulus === trialInfo['j']) && (e.which === 70)) {
			// removes handleKeyUp event from the body
			$('body').off('keyup', handleKeyUp);
			// sateEnd: records the time space was pressed
			dateEnd = Date.now();
			// rt: reaction time (starts when the stimulus appeared until the space is pressed)
			rt = dateEnd - dateStart;

			if (trialType === 'practice') {
				cp.findNextView();
			} else if (trialType === 'trial') {
				recordData('incorrect', 'f');
			}
		} else if ((stimulus === trialInfo['j']) && (e.which === 74)) {
			// removes handleKeyUp event from the body
			$('body').off('keyup', handleKeyUp);
			// sateEnd: records the time space was pressed
			dateEnd = Date.now();
			rt = dateEnd - dateStart;

			if (trialType === 'practice') {
				cp.findNextView();
			} else if (trialType === 'trial') {
				recordData('correct', 'j');
			}
		} else if ((stimulus === trialInfo['f']) && (e.which === 74)) {
			// removes handleKeyUp event from the body
			$('body').off('keyup', handleKeyUp);
			// sateEnd: records the time space was pressed
			dateEnd = Date.now();
			// rt: reaction time (starts when the stimulus appeared until the space is pressed)
			rt = dateEnd - dateStart;

			if (trialType === 'practice') {
				cp.findNextView();
			} else if (trialType === 'trial') {
				recordData('incorrect', 'j');
			}
		} else {
			console.log('some other key pressed; nothing happens');
		}
	};
};

var initDiscriminationView = function(index, trials) {
	var view = {};
	view.name = 'trial';
	view.template = $("#trial-view").html();

	var trialInfo = trials[2*(trials.length / 3) + index];
	console.log(trialInfo);

	$('main').html(Mustache.render(view.template, {
		text: 'Press F when you see a ' + trialInfo['f'] + ' and J when you see a ' + trialInfo['j']
	}));

	discriminationTask(trialInfo, 'trial');

	return view;
};

var initDiscriminationPracticeView = function(index) {
	var view = {};
	view.name = 'trial';
	view.template = $("#trial-view").html();

	var trialInfo = cp.data.practice_trials[2*(cp.data.practice_trials.length / 3) + index];
	console.log(trialInfo);

	$('main').html(Mustache.render(view.template, {
		title: 'Practice',
		text: 'Press F when you see a ' + trialInfo['f'] + ' and J when you see a ' + trialInfo['j']
	}));

	discriminationTask(trialInfo, 'practice');

	return view;
};

// creates Pause View
var initPauseView = function(index, trials) {
	var view = {};
	view.name = 'pause';
	view.template = $("#pause-view").html();
	$('main').html(Mustache.render(view.template));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};

// creates Pause View
var initBlockInstructionsView = function(index, trials) {
	var view = {};
	view.name = 'pause';
	view.template = $("#block-instructions-view").html();
	var text;

	if (cp.blockInstructions === 'reaction') {
		text = "You will see a blank screen for a while. At some point a shape will appear on the screen. Your task is to press the <strong>SPACE</strong> bar on your keyboard as soon as the shape appears.";
		cp.blockInstructions = 'goNoGo'
	} else if (cp.blockInstructions === 'goNoGo') {
		text = "In this task, again, you will see a blank screen and a shape will appear. Your task is to press the <strong>SPACE</strong> bar only when you see <strong>" + cp.data.space_target + "</strong> and <strong>wait</strong> for the shape to disappear if it is not a <strong>" + cp.data.space_target + "</strong>."
		cp.blockInstructions = 'discrimination';
	} else if (cp.blockInstructions === 'discrimination') {
		text = "You will see a shape appearing on the screen. Press the key <strong>F</strong> on the keyboard when you see <strong>" + cp.data.f_target + "</strong> and the key <strong>J</strong> when you see <strong>" + cp.data.j_target + "</strong>.";
	} else {
		console.log('something wrong with block instructions');
	}

	console.log(trials[index]['block']);

	$('main').html(Mustache.render(view.template, {
		text: text
	}));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};

var initPostTestView = function() {
	var view = {};
	view.name = 'postTest';
	view.template = $('#post-test-view').html();

	$('main').html(Mustache.render(view.template, {
		title: config_views.postTest.title,
		text: config_views.postTest.text
	}));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};


var initThanksView = function() {
	var view = {};
	view.name = 'thanks';
	view.template = $('#thanks-view').html();

	$('main').html(Mustache.render(view.template, {
		message: config_views.thanks.message
	}));

	return view;
};