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

var initDiscriminationPracticeView = function(index) {
	var view = {};
	view.name = 'trial';
	view.template = $("#trial-view").html();

	var trialInfo = exp.data.practice_trials[2][index];
	console.log(trialInfo);

	$('main').html(Mustache.render(view.template, {
		title: 'Practice',
		text: config_views.discriminationTrial.text_f + exp.data.f_target + " and " + config_views.discriminationTrial.text_j + exp.data.j_target + '.'
	}));

	discriminationTask(trialInfo, 'practice');

	return view;
};

var initDiscriminationView = function(index) {
	var view = {};
	view.name = 'trial';
	view.template = $("#trial-view").html();

	var trialInfo = exp.data.trials[2][index];
	console.log(trialInfo);

	$('main').html(Mustache.render(view.template, {
		text: config_views.discriminationTrial.text_f + exp.data.f_target + " and " + config_views.discriminationTrial.text_j + exp.data.j_target + '.'
	}));

	discriminationTask(trialInfo, 'trial');

	return view;
};