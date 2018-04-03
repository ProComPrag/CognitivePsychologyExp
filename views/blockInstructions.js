// creates Block Instructions View
var initBlockInstructionsView = function(index, trials) {
	var view = {};
	view.name = 'pause';
	view.template = $("#block-instructions-view").html();
	var text;

	if (cp.blockInstructions === 'reaction') {
		text = "You will see a blank screen for a while. At some point a shape will appear on the screen. Your task is to press the <strong>SPACE</strong> bar on your keyboard as soon as the shape appears.";
		cp.blockInstructions = 'goNoGo'
	} else if (cp.blockInstructions === 'goNoGo') {
		text = "In this task, again, you will see a blank screen and a shape will appear. Your task is to press the <strong>SPACE</strong> bar only when you see <strong>" + cp.data.space_target + "</strong> and <strong>wait</strong> for the shape to disappear if it is not a <strong>" + cp.data.space_target + "</strong>."
		cp.blockInstructions = 'discrimination';
	} else if (cp.blockInstructions === 'discrimination') {
		text = "You will see a shape appearing on the screen. Press the key <strong>F</strong> on the keyboard when you see <strong>" + cp.data.f_target + "</strong> and the key <strong>J</strong> when you see <strong>" + cp.data.j_target + "</strong>.";
	} else {
		console.log('something wrong with block instructions');
	}

	console.log(trials[index]['block']);

	$('main').html(Mustache.render(view.template, {
		text: text
	}));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};