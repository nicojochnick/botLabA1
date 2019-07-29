

export const introduction = [
    {
        id: '1',
        message: 'What is your name?',
        trigger: '2',
    },
    {
        id: '2',
        user: true,
        trigger: '3',
    },
    {
        id: '3',
        message: 'Hi {previousValue}, nice to meet you!',
        trigger: '4'
    },
    {
        id: '4',
        message: 'do you have a minute to get to know each other a little better?',
        trigger: '5'

    },
    {   id: '5',
        options: [
            { value: true, label: 'Sure',  },
            { value: false, label: 'maybe, later',},
        ],

    }
];

export const makeaGoal = [
    {
        id: '1',
        message: 'What would you like to title your goal?',
        trigger: '2',
    },



];
