var config_general = {

	// obligatory settings for any experiment
	'viewFunctions': [
			'initIntroView',
			'initInstructionsView',
			'initReactionTimeView',
			'initBeginExpView',
			'initReactionTimeView',
			'initPauseView',
			'initGoNoGoView',
			'initBeginExpView',
			'initGoNoGoView',
			'initPauseView',
			'initDiscriminationView',
			'initBeginExpView',
			'initDiscriminationView',
			'initPostTestView',
			'initThanksView' ], // the order in which views are shown during the experiment

	'viewSteps': [1,1,2,1,6,1,2,1,6,1,2,1,6,1,1] // how many steps (slides/trials/...) belong to each view
		// 'viewSteps': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] 
};