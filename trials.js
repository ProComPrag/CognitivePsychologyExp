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
    reaction_p: {
        circle: {
            stimulus: 'circle',
            QUD: "Press SPACE when you see a shape on the screen",
            canvas: {
                sort: 'grid',
                elemSize: 100,
                total: 1,
                focalNumber: 1,
                focalShape: 'circle',
                focalColor: 'blue'
            },
            target: 'circle'
        },
        square: {
            stimulus: 'square',
            QUD: "Press SPACE when you see a shape on the screen",
            target: 'square',
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
        circle: {
            stimulus: 'circle',
            canvas: {
                sort: 'grid',
                elemSize: 100,
                total: 1,
                focalNumber: 1,
                focalShape: 'circle',
                focalColor: 'blue'
            },
            target: 'circle'
        },
        square: {
            stimulus: 'square',
            target: 'square',
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
    goNoGo: {
        circle: {
            stimulus: 'circle',
            canvas: {
                sort: 'grid',
                elemSize: 100,
                total: 1,
                focalNumber: 1,
                focalShape: 'circle',
                focalColor: 'blue'
            },
            target: space_target
        },
        square: {
            stimulus: 'square',
            target: space_target,
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
    goNoGo_p: {
        circle: {
            stimulus: 'circle',
            QUD: `Press SPACE when you see a ${space_target}. Otherwise, just wait and do nothing.`,
            canvas: {
                sort: 'grid',
                elemSize: 100,
                total: 1,
                focalNumber: 1,
                focalShape: 'circle',
                focalColor: 'blue'
            },
            target: space_target
        },
        square: {
            stimulus: 'square',
            QUD: `Press SPACE when you see a ${space_target}. Otherwise, just wait and do nothing.`,
            target: space_target,
            canvas: {
                sort: 'grid',
                elemSize: 100,
                total: 1,
                focalNumber: 1,
                focalShape: 'square',
                focalColor: 'blue'
            }
        }
    }
}



const task_reaction_info = {
    space_main:
        _.flattenDeep(babeUtils.views.loop([babeUtils.views.loop(canvas_dict.reaction.circle, 3), babeUtils.views.loop(canvas_dict.reaction.square,3)],5)),
    space_practice:
        _.flattenDeep(babeUtils.views.loop([babeUtils.views.loop(canvas_dict.reaction_p.circle, 1), babeUtils.views.loop(canvas_dict.reaction_p.square,2)],2))
}

const task_goNoGo_info = {
    goNoGo_main:
        _.flattenDeep(babeUtils.views.loop([babeUtils.views.loop(canvas_dict.goNoGo.circle, 2), babeUtils.views.loop(canvas_dict.goNoGo.square,2)],9)),
    goNoGo_practice:
        _.flattenDeep(babeUtils.views.loop([babeUtils.views.loop(canvas_dict.goNoGo_p.circle, 1), babeUtils.views.loop(canvas_dict.goNoGo_p.square,1)],3))
}

const task_discrimination_info = {
    keyPress_main:
        _.flattenDeep(babeUtils.views.loop([babeUtils.views.loop(canvas_dict.keyPress.circle, 3), babeUtils.views.loop(canvas_dict.keyPress.square,2)],6))
    ,
    keyPress_practice:
        _.flattenDeep(babeUtils.views.loop([babeUtils.views.loop(canvas_dict.keyPress.circle, 2), babeUtils.views.loop(canvas_dict.keyPress.square,2)],3))

}

// random shuffling of trial information
task_reaction_info.space_practice = _.shuffle(task_reaction_info.space_practice)
task_reaction_info.space_main = _.shuffle(task_reaction_info.space_main)
task_goNoGo_info.goNoGo_practice = _.shuffle(task_goNoGo_info.goNoGo_practice)
task_goNoGo_info.goNoGo_main = _.shuffle(task_goNoGo_info.goNoGo_main)
task_discrimination_info.keyPress_practice = _.shuffle(task_discrimination_info.keyPress_practice)
task_discrimination_info.keyPress_main = _.shuffle(task_discrimination_info.keyPress_main)
