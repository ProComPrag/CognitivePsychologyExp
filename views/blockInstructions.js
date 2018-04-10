// creates Block Instructions View
var initBlockInstructionsView = function(index) {
    var view = {};
    view.name = 'pause';
    view.template = $("#block-instructions-view").html();
    var text;

    if (exp.blockInstructions === 'reaction') {
	part = "1"
	text = "You will see a blank screen for a while. At some point a shape will appear on the screen. Your task is to press the <strong>SPACE</strong> bar on your keyboard as soon as the shape appears.";
    } else if (exp.blockInstructions === 'goNoGo') {
	part = "2"
	text = "In this task, again, you will see a blank screen and a shape will appear. Your task is to press the <strong>SPACE</strong> bar only when you see <strong>" + exp.data.space_target + "</strong>. If you see a " + exp.data.space_nontarget + ", do not press anything and just <strong>wait for the " + exp.data.space_nontarget + " to disappear</strong>."
    } else if (exp.blockInstructions === 'discrimination') {
	part = "3"
	text = "You will see a shape appearing on the screen. Press the key <strong>F</strong> on the keyboard when you see <strong>" + exp.data.f_target + "</strong> and the key <strong>J</strong> when you see <strong>" + exp.data.j_target + "</strong>.";
    } else {
	console.log('something wrong with block instructions');
    }

    $('main').html(Mustache.render(view.template, {
	part: part,
	text: text
    }));

    $('#next').on('click', function() {
	exp.findNextView();
    });

    return view;
};
