// generates the go / no-go task 
// takes trialInfo (one trial) as an argument and trialType which can be
// either 'practice' (does not record the response) of 'trial' (records the response in exp.data.out).
var goNoGoTask = function(trialInfo, trialType) {
	// variables
	var target = trialInfo['target'];
	var stimulus = trialInfo['stimulus'];
	// pause: assigns a random number between 1200 ms and 2700 ms
	var pause = Math.floor(Math.random()*(2700-1200+1)+1200);
	var dateStart, rt;

	// records the data and moves to the next view
	var recordData = function(correctness, event) {
		// rt: reaction time (starts when the stimulus appeared until the space is pressed)
		rt = Date.now() - dateStart;

		var trialData = {
			trial_number: trialInfo['trial_number'],
			block: trialInfo['block'],
			stimulus: trialInfo['stimulus'],
			target: trialInfo['target'],
			reaction_time: rt,
			response: correctness,
			event: event
		};

		// pushes trial data to data.out list
		exp.data.out.push(trialData);
		// moves to the next view
		exp.findNextView();
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
					exp.findNextView();	
				} else if (trialType === 'trial') {
					recordData('correct', 'space');
				}
			} else {
				if (trialType === 'practice') {
					exp.findNextView();	
				} else if (trialType === 'trial') {
					recordData('incorrect', 'space');
				}
			}
		}, function() {
			if (target === stimulus) {
				if (trialType === 'practice') {
					exp.findNextView();	
				} else if (trialType === 'trial') {
					recordData('incorrect', 'waited');
				}
			} else {
				if (trialType === 'practice') {
					exp.findNextView();	
				} else if (trialType === 'trial') {
					recordData('correct', 'waited');
				}
			}
		});

	}, pause);
};

// creates go / no-go trial, calls goNoGoTask() and records the response
var initGoNoGoView = function(index) {
	var view = {};
	view.name = 'trial';
	view.template = $("#trial-view").html();

	var trialInfo = exp.data.trials[(exp.data.trials.length / 3) + index];
	console.log(trialInfo);

	$('main').html(Mustache.render(view.template, {
		text: 'Press SPACE when you see a ' + trialInfo['target']
	}));

	goNoGoTask(trialInfo, 'trial');

	return view;
};

// creates go / no-go practice trial, calls goNoGoTask() and does not records the response
var initGoNoGoPracticeView = function(index, trials) {
	var view = {};
	view.name = 'practice';
	view.template = $("#trial-view").html();

	var trialInfo = exp.data.practice_trials[(exp.data.practice_trials.length / 3) + index];
	console.log(trialInfo);

	$('main').html(Mustache.render(view.template, {
		title: 'Practice',
		text: 'Press SPACE when you see a ' + trialInfo['target']
	}));

	goNoGoTask(trialInfo, 'practice');

	return view;
};