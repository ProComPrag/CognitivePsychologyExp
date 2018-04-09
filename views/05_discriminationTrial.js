var initDiscriminationPracticeView = function(index) {
	var view = {};
	view.name = 'trial';
	view.template = $("#trial-view").html();

	var trialInfo = exp.data.practice_trials[2][index];
	console.log(trialInfo);

	$('main').html(Mustache.render(view.template, {
		title: 'Practice',
		text: config_views.discriminationTrial.text_f + exp.data.f_target + " and " + config_views.discriminationTrial.text_j + exp.data.j_target + '.'
	}));

	discriminationTask(trialInfo, 'practice');

	return view;
};

var initDiscriminationView = function(index) {
	var view = {};
	view.name = 'trial';
	view.template = $("#trial-view").html();

	var trialInfo = exp.data.trials[2][index];
	console.log(trialInfo);

	$('main').html(Mustache.render(view.template, {
		text: config_views.discriminationTrial.text_f + exp.data.f_target + " and " + config_views.discriminationTrial.text_j + exp.data.j_target + '.'
	}));

	discriminationTask(trialInfo, 'trial');

	return view;
};