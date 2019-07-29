

import AddGoal from '../components/addGoal';
import React from 'react';
import BotFunctions from './botFunctions';
export const Steps =  {

    introduction: [
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
        {
            id: '5',
            options: [
                {value: true, label: 'Sure',},
                {value: false, label: 'maybe, later',},
            ],

        }
    ],

    makeaGoal: [
        {
            id: '1',
            message: 'What would you like to title your goal?',
            trigger: 'title',
        },
        {
            id: "title",
            user: true,
            trigger: "2"
        },
        {
            id: '2',
            message: " {previousValue}, I like it!",
            trigger: 'saveName'
        },
        {
            id: 'saveName',
            component: <BotFunctions/>,
            asMessage: true,
            trigger: '3'


        },
        {
            id: '3',
            message: 'how would you like to track your progress?',
            trigger: 'tracking'
        },
        {
            id: 'tracking',
            options: [
                {value: 'option1', label: 'Time (ex: 30 minutes)',},
                {value: 'option2', label: 'Daily Completion'},
            ],
        }



    ],

    makeGoalSimple: [
        {
            id: '1',
            message: 'To Create a goal just fill the form below and hit save',
            trigger: 'createGoal',
        },
        {
            id: 'createGoal',
            component: <AddGoal/>
        }



    ],




    missyou: [
        {
            id: '1',
            message: 'Who do you miss',
            trigger: 'title',
        },
        {
            id: "title",
            user: true,
            trigger: "2"
        },
        {
            id: '2',
            message: " I'm sure {previousValue} misses you too"
        }


    ],

};
