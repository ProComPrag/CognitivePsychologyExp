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