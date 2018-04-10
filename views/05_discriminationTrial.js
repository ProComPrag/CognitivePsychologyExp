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

    $('.progress-bar-container').addClass('nodisplay');

    discriminationTask(trialInfo, 'practice');

    return view;
};

var initDiscriminationView = function(index) {
    var view = {};
    view.name = 'trial';
    view.template = $("#trial-view").html();
    var trialInfo = exp.data.trials[2][index];
    var filled = index * (180 / config_general.viewSteps[exp.currentViewCounter]);

    console.log(trialInfo);

    $('main').html(Mustache.render(view.template, {
        text: config_views.discriminationTrial.text_f + exp.data.f_target + " and " + config_views.discriminationTrial.text_j + exp.data.j_target + '.'
    }));

    $('#filled').css('width', filled);

    discriminationTask(trialInfo, 'trial');

    return view;
};