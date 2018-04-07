// creates Thanks View
var initThanksView = function() {
    var view = {};
    view.name = 'thanks';
    view.template = $('#thanks-view').html();

    // needed for private server
    var data = {
        'author': config_deploy.author,
        'experiment_id': config_deploy.experiment_id,
        'trials': exp.data.out,
        'description': config_deploy.description
    };

    // needed for the submission to MTurk's server
    if (config_deploy.is_MTurk) {
        var HITData = getHITData();

        // updates the fields in the hidden form with info for the MTurk's server
        $('main').html(Mustache.render(view.template, {
            thanksMessage: config_views.thanks.message,
            mturk_server: config_deploy.MTurk_server,
            assignmentId: HITData['assignmentId'],
            author: config_deploy.author,
            experimentId: config_deploy.experiment_id,
            trials: exp.data.out,
            description: config_deploy.description,
            workerId: HITData['workerId']
        }));

        // MTurk expects a key 'assignmentId' for the submission to work, that is why is it not consistent with the snake case that the other keys have
        data['assignmentId'] = HITData['assignmentId'];
        data['workerId'] = HITData['workerId'];
        data['HITId'] = HITData['HITId'];
    } else {
    	$('main').html(Mustache.render(view.template, {
    		thanksMessage: config_views.thanks.message
    	}));
    }

    // if the experiment is set to live (see config.js liveExperiment)
    // the results are sent to the server
    // if it is set to false
    // the results are displayed on the thanks slide
    if (config_deploy.liveExperiment) {
        console.log('submits');
        submitResults(config_deploy.contact_email, data);
    } else {
        console.log('debug mode');
        jQuery('<h3/>', {
            text: 'Debug Mode'
        }).appendTo($('.view'));
        jQuery('<p/>', {
        	class: 'debug-results',
            text: JSON.stringify(data)
        }).insertAfter($('h3'));
    }

    return view;
};