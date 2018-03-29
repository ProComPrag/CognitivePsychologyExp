var prepareData = function() {
	var trials = [];

	// function that shuffles the items in a list
	var shuffleComb = function(comb) {
		var counter = comb.length;

		while (counter > 0) {
			let index = Math.floor(Math.random() * counter);
			counter--;

			let temp = comb[counter];
			comb[counter] = comb[index];
			comb[index] = temp;
		}

		return comb;
	};

	// picks up a target shape for the go/no go task
	var space_target = shuffleComb(['circle', 'square'])[0];
	// shuffles the stimuli list again to pick a stumulus for the f and j keys
	var keys = shuffleComb(['circle', 'square']);
	var f_target = keys[0];
	var j_target = keys[1];

	var trials_raw = [
		[
			{'block': 'reaction', 'stimulus': 'circle'},
			{'block': 'reaction', 'stimulus': 'circle'},
			{'block': 'reaction', 'stimulus': 'circle'},
			{'block': 'reaction', 'stimulus': 'square'},
			{'block': 'reaction', 'stimulus': 'square'},
			{'block': 'reaction', 'stimulus': 'square'}
		],
		[
			{'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
			{'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
			{'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
			{'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
			{'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
			{'block': 'goNoGo', 'stimulus': 'square', 'target': space_target}
		],
		[
			{'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
			{'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
			{'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
			{'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
			{'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
			{'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target}
		]
	];

	var practice_trials = [
		{'block': 'reaction', 'stimulus': 'circle'},
		{'block': 'reaction', 'stimulus': 'square'},
		{'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
		{'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
		{'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
		{'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target}
	];

	// shuffles the items in each block and adds the items to a list holding all the trials
	// the items in trials are the following block order: reaction time task, go/noGo and discriminatio
	for (var i = 0; i < trials_raw.length; i++) {
		// shuffles the items in each list in 'trials_raw'
		var temp = shuffleComb(trials_raw[i]);

		// takes each item from each list in 'trials_raw'
		// and adds it to a list 'trials'
		for (var j = 0; j<temp.length; j++) {
			trials.push(temp[j]);
		}
	}

	// adds trial number to each object in 'trials'
	for (var i = 0; i<trials.length; i++) {
		trials[i]['trial_number'] = i + 1;
	}

	var data = {
		'space_target': space_target,
		'f_target': f_target,
		'j_target': j_target,
		'trials': trials,
		'practice_trials': practice_trials,
		'out': []
	}

	return data;
};