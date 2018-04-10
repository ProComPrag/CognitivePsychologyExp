var config_views = {
	// intro view
	"intro": {
		// introduction title
		"title": "Welcome!",
		// introduction text
		"text": "Thank you for participating in our study. This study consists of <b>3 parts</b>. Each part starts with instructions. Please <strong>read each block's instructions very carefully</strong>. After the instructions there will be a few practice rounds before the main part of each block begins. It is very important for this study that you <strong>put your undivided attention to the task</strong>. The study will take at most 10 minutes, so please switch off messaging services or any other things (like background music) that might distract you. Thank you for your cooperation!",
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
		"text": "This experiment is about reaction times. We will show you pictures of geometrical shapes and ask you to respond in different ways. In the first part, you should simply press a button as soon as you see anything. In the second part, you should press a button when you see a particular shape but not when you see another. In the third part, you should press one button for one shape and another button for another shape. It is important that you try to <strong>BE AS FAST AS POSSIBLE</strong>, but also that you <strong>MAKE NO MISTAKES</strong>. There will be breaks between each part during which you can relax and refocus. We will give you detailed instructions and some practice trials at the beginning of each part.",
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
		"text_f": "Press F for ", // + f_target (discriminationTrial lines 114 and 131)
		"text_j": "and J for " // // + j_target (see discriminationTrial lines 114 and 131)
	},

	// begin experiment view
	"beginExp": {
		"text": "Now that you have acquainted yourself with the procedure of the task, the actual experiment will begin."
	},

	// subject info view
	"postTest": {
		"title": "Additional Information",
		"text": "Please fill in your student ID and answer the following questions. Leaving a comment is optional."
	},

	// thanks view
	"thanks": {
		"message": "Thank you for taking part in this experiment!"
	}
}
