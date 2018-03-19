var initExp = function() {
	var trials = {};

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

	// picks up a target shape for the go/noGo task
	var target = shuffleComb(['circle', 'square'])[0];
	// shuffles the stimuli list again to pick a stumulus for the f and j keys
	var keys = shuffleComb(['circle', 'square']);

	var trials_raw = [
		[
			{'block': 'rt', 'stimulus': 'circle'},
			{'block': 'rt', 'stimulus': 'circle'},
			{'block': 'rt', 'stimulus': 'circle'},
			{'block': 'rt', 'stimulus': 'square'},
			{'block': 'rt', 'stimulus': 'square'},
			{'block': 'rt', 'stimulus': 'square'}
		],
		[
			{'block': 'go/noGo', 'stimulus': 'circle', 'target': target},
			{'block': 'go/noGo', 'stimulus': 'circle', 'target': target},
			{'block': 'go/noGo', 'stimulus': 'circle', 'target': target},
			{'block': 'go/noGo', 'stimulus': 'square', 'target': target},
			{'block': 'go/noGo', 'stimulus': 'square', 'target': target},
			{'block': 'go/noGo', 'stimulus': 'square', 'target': target}
		],
		[
			{'block': 'discrimination', 'stimulus': 'circle', 'f': keys[0], 'j': keys[1]},
			{'block': 'discrimination', 'stimulus': 'circle', 'f': keys[0], 'j': keys[1]},
			{'block': 'discrimination', 'stimulus': 'circle', 'f': keys[0], 'j': keys[1]},
			{'block': 'discrimination', 'stimulus': 'square', 'f': keys[0], 'j': keys[1]},
			{'block': 'discrimination', 'stimulus': 'square', 'f': keys[0], 'j': keys[1]},
			{'block': 'discrimination', 'stimulus': 'square', 'f': keys[0], 'j': keys[1]}
		]
	];

	console.log(trials_raw);

	for (var i = 0; i < trials_raw.length; i++) {
		trials[i] = shuffleComb(trials_raw[i]);
	}

	console.log(trials)
	return trials;
};