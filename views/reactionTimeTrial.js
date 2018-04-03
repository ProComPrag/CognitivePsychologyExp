// generates the reaction time task 
// takes trialInfo (one trial) as an argument and trialType which can be
// either 'practice' (does not record the response) of 'trial' (records the response in cp.data.out).
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
			// if the slide is practice, moves to the next view
			if (trialType === 'practice') {
				cp.findNextView();
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

// creates the reaction time practice view, calls reactionTimeTask, does not record the response
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


// creates the reaction time actual task, calls reaction time task, records the response
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