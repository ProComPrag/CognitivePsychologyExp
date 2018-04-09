var config_views = {
	// intro view
	"intro": {
		// introduction title
		"title": "Welcome!",
		// introduction text
		"text": "Thank you for participating in our study. In this study, you will ..",
		// text that asks for ID (used when the config_deploy.deployMethod is Prolific, directLink)
		"IDtext": "Please enter your Prolific ID:",
		// instroduction's slide proceeding button
		"buttonText": "Begin experiment"
	},

	// instructions view
	"instructions": {
		// instruction's title
		"title": "Instructions",
		// instruction's text
		"text": "...",
		// instuction's slide proceeding button text
		"buttonText": "Next"
	},

	"reactionTimeTrial": {
		"text": "Press SPACE when you see a shape on the screen."
	},

	"goNoGoTrial": {
		"text": "Press SPACE when you see a " // + space_target (discriminationTrial lines 114 and 133)
	},

	"discriminationTrial": {
		"text_f": "Press F when you see a ", // + f_target (discriminationTrial lines 114 and 131)
		"text_j": "J when you see a " // // + j_target (see discriminationTrial lines 114 and 131)
	},

	// begin experiment view
	"beginExp": {
		"text": "Now that you have acquainted yourself with the procedure of the task, the actual experiment will begin."
	},

	// subject info view
	"postTest": {
		"title": "Additional Information",
		"text": "Answering the following questions is optional, but will help us understand your answers."
	},

	// thanks view
	"thanks": {
		"message": "Thank you for taking part in this experiment!"
	}
}