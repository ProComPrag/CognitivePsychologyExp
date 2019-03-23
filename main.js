// initialises a babe experiment with babeInit
$("document").ready(function() {
    // prevent scrolling when space is pressed
    window.onkeydown = function(e) {
        if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
    };

    // calls babeInit
    babeInit({
        views_seq: [
            intro,
            instructions,
            instructions_reaction,
            begin_real_reaction,
            pause_reaction,
            instructions_goNoGo,
            begin_real_goNoGo,
            pause_goNoGo,
            instructions_discrimination,
            practice_discrimination,
            begin_real_discrimination,
            task_discrimination,
            post_test,
            thanks
        ],
        deploy: {
            experimentID: "INSERT_A_NUMBER",
            serverAppURL: "https://babe-demo.herokuapp.com/api/submit_experiment/",
            deployMethod: "debug",
            contact_email: "YOUREMAIL@wherelifeisgreat.you",
            prolificURL: "https://app.prolific.ac/submissions/complete?cc=SAMPLE1234"
        },
        progress_bar: {
            in: [
                // list the view-names of the views for which you want a progress bar
                "task_one",
                "task_two"
            ],
            style: "separate",
            width: 100
        }
    });
});
