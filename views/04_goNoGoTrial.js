// creates go / no-go trial, calls goNoGoTask() and records the response
var initGoNoGoView = function(index) {
	var view = {};
	view.name = 'trial';
	view.template = $("#trial-view").html();

	var trialInfo = exp.data.trials[1][index];
	console.log(trialInfo);

	$('main').html(Mustache.render(view.template, {
		text: ""
	}));

	goNoGoTask(trialInfo, 'trial');

	return view;
};

// creates go / no-go practice trial, calls goNoGoTask() and does not records the response
var initGoNoGoPracticeView = function(index) {
	var view = {};
	view.name = 'practice';
	view.template = $("#trial-view").html();

	var trialInfo = exp.data.practice_trials[1][index];
	console.log(trialInfo);

	$('main').html(Mustache.render(view.template, {
		title: 'Practice',
		text: config_views.goNoGoTrial.text + exp.data.space_target + ". Otherwise, just wait and do nothing."
	}));

	goNoGoTask(trialInfo, 'practice');

	return view;
};
