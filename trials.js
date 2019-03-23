const canvas_dict = {
    keyPress: {
        circle: {
            key1: "f",
            key2: "j",
            f: f_target,
            j: j_target,
            canvas: {
                sort: 'grid',
                elemSize: 100,
                total: 1,
                focalNumber: 1,
                focalShape: 'circle',
                focalColor: 'blue'
            },
            expected: 'circle' === f_target? f_target : j_target
        },
        square: {
            key1: "f",
            key2: "j",
            f: f_target,
            j: j_target,
            expected: 'square' === f_target? f_target : j_target,
            canvas: {
                sort: 'grid',
                elemSize: 100,
                total: 1,
                focalNumber: 1,
                focalShape: 'square',
                focalColor: 'blue'
            }
        }
    },
    reaction: {

    }
}



const task_reaction = {
    reaction: [
        {
            question: "What's on the bread?",
            picture: "images/question_mark_02.png",
            option1: 'jam',
            option2: 'ham'
        },
        {
            question: "What's the weather like?",
            picture: "images/weather.jpg",
            option1: "shiny",
            option2: "rainbow"
        }
    ],
}

const task_discrimination_info = {
    keyPress_main: [
        _.flattenDeep(babeUtils.views.loop([babeUtils.views.loop(canvas_dict.keyPress.circle, 3), babeUtils.views.loop(canvas_dict.keyPress.square,2)],6))
    ],
    keyPress_practice: [
        _.flattenDeep(babeUtils.views.loop([babeUtils.views.loop(canvas_dict.keyPress.circle, 2), babeUtils.views.loop(canvas_dict.keyPress.square,2)],3))
    ]
}

// random shuffling of trial information
task_discrimination_info.keyPress_practice = _.shuffle(task_discrimination_info.keyPress_practice)
task_discrimination_info.keyPress_main = _.shuffle(task_discrimination_info.keyPress_main)
