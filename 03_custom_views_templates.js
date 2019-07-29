const space_targets = _.shuffle(['circle', 'square']);
const space_target = space_targets[0];
const space_nontarget = space_targets[1];

const key_targets = _.shuffle(['circle', 'square']);
const f_target = key_targets[0];
const j_target = key_targets[1];


const space_mental = function(config) {
        babeUtils.view.inspector.missingData(config, "space press");
        babeUtils.view.inspector.params(config, "space press");
        const spacePress = {
            name: config.name,
            title: babeUtils.view.setter.title(config.title, ""),
            render: function(CT, babe) {
                let pause = Math.floor(Math.random()*(2700-1200+1)+1200);
                let startingTime;
                const question = babeUtils.view.setter.question(
                    config.data[CT].question
                );
                const QUD = babeUtils.view.setter.QUD(config.data[CT].QUD);
                const stimulus = config.data[CT].stimulus;
                const target = config.data[CT].target;

                const viewTemplate = `<div class="babe-view">
                    <h1 class='babe-view-title'>${this.title}</h1>
                    <p class='babe-view-question babe-view-qud'>${QUD}</p>
                    <div class='babe-view-stimulus-container'>
                        <div class='babe-view-stimulus babe-nodisplay'></div>
                    </div>
                </div>`;
                const answerContainerElem = `<div class='babe-view-answer-container'>
                        <p class='babe-view-question'>${question}</p>`;

                $("#main").html(viewTemplate);

                let timeoutID;

                const handleKeyPress = function(e) {
                    let RT;
                    let correctness;
                    let response;

                    const record_data = function() {
                        const trial_data = {
                            trial_type: config.trial_type,
                            trial_number: CT + 1,
                            correctness: correctness,
                            pause: pause,
                            response: response,
                            RT: RT
                        };

                        for (let prop in config.data[CT]) {
                            if (config.data[CT].hasOwnProperty(prop)) {
                                trial_data[prop] = config.data[CT][prop];
                            }
                        }

                        if (config.data[CT].picture !== undefined) {
                            trial_data.picture = config.data[CT].picture;
                        }

                        if (config.data[CT].canvas !== undefined) {
                            if (config.data[CT].canvas.canvasSettings !== undefined) {
                                for (let prop in config.data[CT].canvas.canvasSettings) {
                                    if (config.data[CT].canvas.canvasSettings.hasOwnProperty(prop)) {
                                        trial_data[prop] = config.data[CT].canvas.canvasSettings[prop];
                                    }
                                }
                                delete trial_data.canvas.canvasSettings;
                            }
                            for (let prop in config.data[CT].canvas) {
                                if (config.data[CT].canvas.hasOwnProperty(prop)) {
                                    trial_data[prop] = config.data[CT].canvas[prop];
                                }
                            }
                            delete trial_data.canvas;
                        }

                        babe.trial_data.push(trial_data);
                        $("body").off("keydown", handleKeyPress);
                        babe.findNextView();

                    };

                    if (e === 1000) {
                        RT = Date.now() - startingTime - pause; // measure RT before anything else
                        response = 'wait';
                        if (
                            config.data[CT].target !==
                            config.data[CT].stimulus
                        ) {
                            correctness = "correct";
                        } else {
                            correctness = "incorrect";
                        }
                        record_data();

                    }

                    if (e.which === 32) {
                        clearTimeout(timeoutID);
                        RT = Date.now() - startingTime - pause; // measure RT before anything else
                        response = "space";
                        if (
                            config.data[CT].target ===
                            config.data[CT].stimulus
                        ) {
                            correctness = "correct";
                        } else {
                            correctness = "incorrect";
                        }
                        record_data();
                    }

                };

                const enableResponse = function() {
                    $(".babe-view").append(answerContainerElem);
                    $("body").on("keydown", handleKeyPress);
                };

                if (config.trial_type === 'goNoGo_practice' ||  config.trial_type === 'goNoGo_main'){
                    timeoutID = setTimeout(function() {handleKeyPress(1000)},pause+2000);
                }

                startingTime = Date.now();

                // creates the DOM of the trial view
                babeUtils.view.createTrialDOM(
                    {
                        pause: pause,
                        fix_duration: config.fix_duration,
                        stim_duration: config.stim_duration,
                        data: config.data[CT],
                        evts: config.hook,
                        view: "space"
                    },
                    enableResponse
                );
            },
            CT: 0,
            trials: config.trials
        };

        return spacePress;
};


const keyPress_mental = function(config) {
        babeUtils.view.inspector.missingData(config, "key press");
        babeUtils.view.inspector.params(config, "key press");
        const keyPress = {
            name: config.name,
            title: babeUtils.view.setter.title(config.title, ""),
            render: function(CT, babe) {
                let pause = Math.floor(Math.random()*(2700-1200+1)+1200);
                let startingTime;
                const question = babeUtils.view.setter.question(
                    config.data[CT].question
                );
                const key1 = config.data[CT].key1;
                const key2 = config.data[CT].key2;
                const value1 = config.data[CT][key1];
                const value2 = config.data[CT][key2];
                const viewTemplate = `<div class="babe-view">
                    <h1 class='babe-view-title'>${this.title}</h1>
                    <p class='babe-response-keypress-header'><strong>${key1}</strong> = ${value1}, <strong>${key2}</strong> = ${value2}</p>
                    <div class='babe-view-stimulus-container'>
                        <div class='babe-view-stimulus babe-nodisplay'></div>
                    </div>
                </div>`;
                const answerContainerElem = `<div class='babe-view-answer-container'>
                        <p class='babe-view-question'>${question}</p>`;

                $("#main").html(viewTemplate);

                const handleKeyPress = function(e) {
                    const keyPressed = String.fromCharCode(
                        e.which
                    ).toLowerCase();

                    if (keyPressed === key1 || keyPressed === key2) {
                        let correctness;
                        const RT = Date.now() - startingTime - pause; // measure RT before anything else

                        if (
                            config.data[CT].expected ===
                            config.data[CT][keyPressed.toLowerCase()]
                        ) {
                            correctness = "correct";
                        } else {
                            correctness = "incorrect";
                        }

                        const trial_data = {
                            trial_type: config.trial_type,
                            trial_number: CT + 1,
                            key_pressed: keyPressed,
                            correctness: correctness,
                            pause: pause,
                            RT: RT
                        };

                        for (let prop in config.data[CT]) {
                            if (config.data[CT].hasOwnProperty(prop)) {
                                trial_data[prop] = config.data[CT][prop];
                            }
                        }

                        trial_data[config.data[CT].key1] =
                            config.data[CT][key1];
                        trial_data[config.data[CT].key2] =
                            config.data[CT][key2];

                        if (config.data[CT].picture !== undefined) {
                            trial_data.picture = config.data[CT].picture;
                        }

                        if (config.data[CT].canvas !== undefined) {
                            if (config.data[CT].canvas.canvasSettings !== undefined) {
                                for (let prop in config.data[CT].canvas.canvasSettings) {
                                    if (config.data[CT].canvas.canvasSettings.hasOwnProperty(prop)) {
                                        trial_data[prop] = config.data[CT].canvas.canvasSettings[prop];
                                    }
                                }
                                delete trial_data.canvas.canvasSettings;
                            }
                            for (let prop in config.data[CT].canvas) {
                                if (config.data[CT].canvas.hasOwnProperty(prop)) {
                                    trial_data[prop] = config.data[CT].canvas[prop];
                                }
                            }
                            delete trial_data.canvas;
                        }

                        babe.trial_data.push(trial_data);
                        $("body").off("keydown", handleKeyPress);
                        babe.findNextView();
                    }
                };

                const enableResponse = function() {
                    $(".babe-view").append(answerContainerElem);
                    $("body").on("keydown", handleKeyPress);
                };

                startingTime = Date.now();

                // creates the DOM of the trial view
                babeUtils.view.createTrialDOM(
                    {
                        pause: pause,
                        fix_duration: config.fix_duration,
                        stim_duration: config.stim_duration,
                        data: config.data[CT],
                        evts: config.hook,
                        view: "keyPress"
                    },
                    enableResponse
                );
            },
            CT: 0,
            trials: config.trials
        };

        return keyPress;
};
