const circle_canvas = {
        sort: 'grid',
        elemSize: 100,
        total: 1,
        focalNumber: 1,
        focalShape: 'circle',
        focalColor: 'blue'
};

const square_canvas = {
        sort: 'grid',
        elemSize: 100,
        total: 1,
        focalNumber: 1,
        focalShape: 'square',
        focalColor: 'blue'
};


const canvas_dict = {
    keyPress: {
        circle: {
            key1: "f",
            key2: "j",
            f: f_target,
            j: j_target,
            canvas: circle_canvas,
            expected: 'circle' === f_target? f_target : j_target
        },
        square: {
            key1: "f",
            key2: "j",
            f: f_target,
            j: j_target,
            expected: 'square' === f_target? f_target : j_target,
            canvas: square_canvas
        }
    },
    reaction_p: {
        circle: {
            stimulus: 'circle',
            QUD: "Press SPACE when you see a shape on the screen",
            canvas: circle_canvas,
            target: 'circle'
        },
        square: {
            stimulus: 'square',
            QUD: "Press SPACE when you see a shape on the screen",
            target: 'square',
            canvas: square_canvas
        }
    },
    reaction: {
        circle: {
            stimulus: 'circle',
            canvas: circle_canvas,
            target: 'circle'
        },
        square: {
            stimulus: 'square',
            target: 'square',
            canvas: square_canvas
        }
    },
    goNoGo: {
        circle: {
            stimulus: 'circle',
            canvas: circle_canvas,
            target: space_target
        },
        square: {
            stimulus: 'square',
            target: space_target,
            canvas: square_canvas
        }
    },
    goNoGo_p: {
        circle: {
            stimulus: 'circle',
            QUD: `Press SPACE when you see a ${space_target}. Otherwise, just wait and do nothing.`,
            canvas: circle_canvas,
            target: space_target
        },
        square: {
            stimulus: 'square',
            QUD: `Press SPACE when you see a ${space_target}. Otherwise, just wait and do nothing.`,
            target: space_target,
            canvas: square_canvas
        }
    }
}


const task_reaction_info = {
    space_main:
        _.flattenDeep(babeUtils.views.loop([canvas_dict.reaction.circle, canvas_dict.reaction.square],10)),
    space_practice:
        _.flattenDeep(babeUtils.views.loop([canvas_dict.reaction_p.circle, canvas_dict.reaction_p.square],3))
}

const task_goNoGo_info = {
    goNoGo_main:
        _.flattenDeep(babeUtils.views.loop([canvas_dict.goNoGo.circle, canvas_dict.goNoGo.square],10)),
    goNoGo_practice:
        _.flattenDeep(babeUtils.views.loop([canvas_dict.goNoGo_p.circle, canvas_dict.goNoGo_p.square],3))
}

const task_discrimination_info = {
    keyPress_main:
        _.flattenDeep(babeUtils.views.loop([canvas_dict.keyPress.circle, canvas_dict.keyPress.square],10))
    ,
    keyPress_practice:
        _.flattenDeep(babeUtils.views.loop([canvas_dict.keyPress.circle, canvas_dict.keyPress.square],3))

}

// random shuffling of trial information
task_reaction_info.space_practice = _.shuffle(task_reaction_info.space_practice)
task_reaction_info.space_main = _.shuffle(task_reaction_info.space_main)
task_goNoGo_info.goNoGo_practice = _.shuffle(task_goNoGo_info.goNoGo_practice)
task_goNoGo_info.goNoGo_main = _.shuffle(task_goNoGo_info.goNoGo_main)
task_discrimination_info.keyPress_practice = _.shuffle(task_discrimination_info.keyPress_practice)
task_discrimination_info.keyPress_main = _.shuffle(task_discrimination_info.keyPress_main)
