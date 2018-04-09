// generates the reaction time task 
// takes trialInfo (one trial) as an argument and trialType which can be
// either 'practice' (does not record the response) of 'trial' (records the response in exp.data.out).
var reactionTimeTask = function(trialInfo, trialType) {
	// variables
	// stimulus: the stimulus html element
	var stimulus = $('#stimulus');
	// pause: assigns a random number between 1200 ms and 2700 ms
	var pause = Math.floor(Math.random()*(2700-1200+1)+1200);
	var dateStart, rt;

	// if the stimulus in this trial is a circle, turns the sqaure to a circle
	// by addid css border radius to the sqaure
	if (trialInfo['stimulus'] === 'circle') {
		stimulus.css('border-radius', '50%');
	}

	// records the data and moves to the next view
	var recordData = function() {
		// rt: reaction time (starts when the stimulus appeared until the space is pressed)
		rt = Date.now() - dateStart;

		var trialData = {
			trial_number: trialInfo['trial_number'],
			block: trialInfo['block'],
			stimulus: trialInfo['stimulus'],
			reaction_time: rt,
			target: 'NA',
			response: 'NA',
			event: 'NA',
			f_target: 'NA',
			j_target: 'NA'
		};

		// pushes trial data to data.out list
		exp.data.out.push(trialData);
		// moves to the next view
		exp.findNextView();
	};

	// checks whether the key pressed is SPACE
	// handleKeyUp() is called when a key is pressed
	var handleKeyUp = function(e) {
		if (e.which === 32) {
			// removes handleKeyUp event from the body
			$('body').off('keyup', handleKeyUp);
			// if the slide is practice, moves to the next view
			if (trialType === 'practice') {
				exp.findNextView();
			// if the slide is trial, records the response and moves to the next view
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
			event: event,
			j_target: 'NA',
			f_target: 'NA'
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

var discriminationTask = function(trialInfo, trialType) {
	// variables
	var target = trialInfo['target'];
	var stimulus = trialInfo['stimulus'];
	// pause: assigns a random number between 1200 ms and 2700 ms
	var pause = Math.floor(Math.random()*(2700-1200+1)+1200);
	var dateStart, rt;

	// records the data and moves to the next view
	var recordData = function(correctness, key) {
		// rt: reaction time (starts when the stimulus appeared until the space is pressed)
		rt = Date.now() - dateStart;

		var trialData = {
			trial_number: trialInfo['trial_number'],
			block: trialInfo['block'],
			stimulus: trialInfo['stimulus'],
			target: 'NA',
			reaction_time: rt,
			response: correctness,
			event: key,
			f_target: trialInfo['f'],
			j_target: trialInfo['j']
		};

		exp.data.out.push(trialData);
		// moves to the next view
		exp.findNextView();
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
				exp.findNextView();
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
				exp.findNextView();
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
				exp.findNextView();
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
				exp.findNextView();
			} else if (trialType === 'trial') {
				recordData('incorrect', 'j');
			}
		} else {
			console.log('some other key pressed; nothing happens');
		}
	};
};
