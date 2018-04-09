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

// creates the reaction time practice view, calls reactionTimeTask, does not record the response
var initReactionTimePracticeView = function(index) {
	var view = {};
	var trialInfo = exp.data.practice_trials[0][index];
	view.name = 'practice';
	view.template = $("#trial-view").html();
	// renderts the template
	$('main').html(Mustache.render(view.template, {
		title: 'Practice',
		text: config_views.reactionTimeTrial.text
	}));

	console.log(trialInfo);

	reactionTimeTask(trialInfo, 'practice');

	return view;
};


// creates the reaction time actual task, calls reaction time task, records the response
var initReactionTimeView = function(index) {
	var view = {};
	var trialInfo = exp.data.trials[0][index];
	view.name = 'trial';
	view.template = $("#trial-view").html();
	// renderts the template
	$('main').html(Mustache.render(view.template, {
		text: config_views.reactionTimeTrial.text
	}));

	console.log(trialInfo);

	reactionTimeTask(trialInfo, 'trial');

	return view;
};