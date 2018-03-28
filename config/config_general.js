var config_general = {

	// obligatory settings for any experiment
	'viewFunctions': [
			'initIntroView',
			'initInstructionsView',
			'initReactionTimePracticeView',
			'initBeginExpView',
			'initReactionTimeView',
			'initPauseView',
			'initGoNoGoPracticeView',
			'initBeginExpView',
			'initGoNoGoView',
			'initPauseView',
			'initDiscriminationPracticeView',
			'initBeginExpView',
			'initDiscriminationView',
			'initPostTestView',
			'initThanksView' ], // the order in which views are shown during the experiment

	'viewSteps': [1,1,3,1,8,1,3,1,8,1,3,1,8,1,1] // how many steps (slides/trials/...) belong to each view
		// 'viewSteps': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] 
};