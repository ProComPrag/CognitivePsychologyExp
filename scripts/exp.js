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
    var shuffledShapes = shuffleComb(['circle', 'square']);
    var space_target = shuffledShapes[0];
    var space_nontarget = shuffledShapes[1];
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
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'square'},
        ],
        [
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
        ],
        [
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
        ]
    ];

    // have to be the same number for each task
    var practice_trials = [
        [
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'circle'},
            {'block': 'reaction', 'stimulus': 'square'},
            {'block': 'reaction', 'stimulus': 'square'},
        ],
        [
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'square', 'target': space_target},
            {'block': 'goNoGo', 'stimulus': 'circle', 'target': space_target},
        ],
        [
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'circle', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
            {'block': 'discrimination', 'stimulus': 'square', 'f': f_target, 'j': j_target},
        ]
    ];

    // shuffles the items in each block and adds the items to a list holding all the trials
    // the items in trials are the following block order: reaction time task, go/noGo and discriminatio
    for (var i = 0; i < trials_raw.length; i++) {
        // for each block adds a new list to trials that will be filled with the shuffled trials
        trials.push([]);
        // shuffles the items in each list in 'trials_raw'
        var temp = shuffleComb(trials_raw[i]);

        // takes each item from each list in 'trials_raw'
        // and adds it to a list 'trials'
        for (var j = 0; j<temp.length; j++) {
            trials[i].push(temp[j]);

            if (i === 0) {
                trials[i][j]['trial_number'] = j+1;
            } else if (i === 1) {
                trials[i][j]['trial_number'] = trials[i-1].length + j+1;
            } else if (i === 2) {
                trials[i][j]['trial_number'] = trials[i-2].length + trials[i-1].length + j+1;           
            } else {
                console.log('there are more than 3 blocks in trials_raw');
            }

        }
    }

    var data = {
        // info used in the texts of the slides
        'space_target': space_target,
        'space_nontarget': space_nontarget,
        'f_target': f_target,
        'j_target': j_target,

        // lists used for passing and collecting the data
        'trials': trials,
        'practice_trials': practice_trials,
        'out': []
    }

    return data;
};
