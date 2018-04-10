var config_general = {

	// obligatory settings for any experiment
	'viewFunctions': [
			'initIntroView',
			'initInstructionsView',
			'initBlockInstructionsView',
			'initReactionTimePracticeView',
			'initBeginExpView',
			'initReactionTimeView',
			'initPauseView',
			'initBlockInstructionsView',
			'initGoNoGoPracticeView',
			'initBeginExpView',
			'initGoNoGoView',
			'initPauseView',
			'initBlockInstructionsView',
			'initDiscriminationPracticeView',
			'initBeginExpView',
			'initDiscriminationView',
			'initPostTestView',
			'initThanksView' ], // the order in which views are shown during the experiment

    'viewSteps': [1, // intro
		  1, // instructions
		  1, // block instructions 1
		  5, // practice block 1
		  1, // begin block 1
		  20, // main trials block 1
		  1, // pause view
		  1, // block instructions 2
		  5, // practice block 2
		  1, // begin block 2
		  20, // main trials block 2
		  1, // pause view
		  1, // block instructions 3
		  5, // practice block 3
		  1, // begin block 3
		  20, // main trials block 3
		  1, // post survey
		  1  // thanks view
		 ] // how many steps (slides/trials/...) belong to each view
	 // 'viewSteps': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
};
