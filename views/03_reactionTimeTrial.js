// creates the reaction time practice view, calls reactionTimeTask, does not record the response
var initReactionTimePracticeView = function(index) {
	var view = {};
	var trialInfo = exp.data.practice_trials[0][index];
	view.name = 'practice';
	view.template = $("#trial-view").html();
	// renderts the template
	$('main').html(Mustache.render(view.template, {
		title: 'Practice',
		text: config_views.reactionTimeTrial.text
	}));

	console.log(trialInfo);

	reactionTimeTask(trialInfo, 'practice');

	return view;
};


// creates the reaction time actual task, calls reaction time task, records the response
var initReactionTimeView = function(index) {
	var view = {};
	var trialInfo = exp.data.trials[0][index];
	view.name = 'trial';
	view.template = $("#trial-view").html();
	// renderts the template
	$('main').html(Mustache.render(view.template, {
		text: config_views.reactionTimeTrial.text
	}));

	console.log(trialInfo);

	reactionTimeTask(trialInfo, 'trial');

	return view;
};