// creates the Introduction View
var initIntroView = function() {
	var view = {};
	view.name = 'intro';
	view.template = $('#intro-view').html();
	$('main').html(Mustache.render(view.template, {
		title: config.intro.title,
		logo: config.intro.logo,
		text: config.intro.text,
		button: config.intro.button
	}));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};

// creates Instruction View
var initInstructionsView = function() {
	var view = {};
	view.name = 'instructions';
	view.template = $("#instructions-view").html();
	$('main').html(Mustache.render(view.template, {
		title: config.instructions.title,
		text: config.instructions.text,
		button: config.instructions.button
	}));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};

// creates Trial View
var initTrialView = function(trialInfo) {
	var view = {};
	view.name = 'trial';
	view.template = $("#trial-view").html();
	$('main').html(Mustache.render(view.template, {
	}));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};

// creates Pause View
var initPauseView = function() {
	var view = {};
	view.name = 'pause';
	view.template = $("#pause-view").html();
	$('main').html(Mustache.render(view.template, {
	}));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};