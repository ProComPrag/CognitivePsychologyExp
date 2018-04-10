var initBeginExpView = function() {
    console.log('begin exp');
    var view = {};
    view.name = 'beginExp';
    view.template = $("#begin-exp-view").html();

    if (exp.blockInstructions === 'reaction') {
	reminder = ""
        exp.blockInstructions = 'goNoGo'
    } else if (exp.blockInstructions === 'goNoGo') {
	reminder = "Remember to press the <strong>SPACE</strong> bar only when you see <strong>" + exp.data.space_target + "</strong> and <strong>wait</strong> for the shape to disappear if it is a <strong>" + exp.data.space_nontarget + "</strong>."
	exp.blockInstructions = 'discrimination';
    } else if (exp.blockInstructions === 'discrimination') {
	reminder = "Remember to press the key <strong>F</strong> on the keyboard when you see <strong>" + exp.data.f_target + "</strong> and the key <strong>J</strong> when you see <strong>" + exp.data.j_target + "</strong>.";
    } else {
	console.log('something wrong with Begin-Experiment instructions');
    }
    
    $('main').html(Mustache.render(view.template, {
	text: config_views.beginExp.text,
	reminder: reminder
    }));

    $('#next').on('click', function() {
	exp.findNextView();
    });

    return view;
};
