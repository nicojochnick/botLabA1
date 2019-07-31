

import AddGoal from '../components/addGoal';
import React from 'react';
import BotFunctions from './functions/addGoalBot';
import EditName from './functions/editName';
export const Steps = {

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
            message: "I'm your avatar, what would you like to call me?",
            trigger: 'name'

        },
        {
            id: 'name',
            user: true,
            trigger: '5'

        },
        {
            id: "5",
            component: <EditName/>,
            asMessage: true,
            trigger: '6'
        },
        {
            id: '6',
            message: "now give me a face, you can upload any picture",
            end: true
        }
    ],

    newOne: [
        {
            id: '1',
            message: "Hi Builders! I'm an A.I that helps people achieve their goals faster"

        }
    ],


    washingtonBuilders:  [
        {
            id: '1',
            message: "'Hi Washington Builders!",
            trigger: '2'
        },
        {
            id: '1',
            message: "I'm an A.I. that helps people achieve their goals faster"
        },
    ],

    newIntro: [
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
            user: true,
            trigger: '4'
        },
        {
            id: '4',
            message: "{previousValue} - few thanks, I like it.",
            trigger: '5'
        },
        {
            id: "5",
            message: "I also need a face, you can give me any face you want, just upload it below!"
        }
    ],

    mainMenu: [
        {
            id: "1",
            message: 'how can I help?',
            trigger: "menuItems"
        },

        {
            id: "menuItems",
            options: [
                {value: 'StartStudySession', label: 'Start a Study Session', trigger: "startSesh"},
                {value: 'AddaClass', label: 'Add a Class', trigger: "AddClass"},
                {value: 'GetMotivated', label: 'Give me Motivation', trigger: "Motivate"},
                {value: 'GetMotivated', label: 'Give me a Study Tip', trigger: "StudyTip"},
            ],


        },
        {
            id: "startSesh",
            message: "For what class are you studying for?"
        },
        {
            id: "AddClass",
            message: "What is the name of the class"
        },
        {
            id: "Motivate",
            message: "Meme Time Baby"
        },
        {
            id: "StudyTip",
            message: "Simple: Start by Turning off your phone"
        },
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
            message: " {previousValue}- I like it!",
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
                {value: 'option1', label: 'Time (ex: 30 minutes)', trigger: "4"},
                {value: 'option2', label: 'Daily Completion', trigger: "4"},
            ],
        },
        {
            id: '4',
            message: "great",
            end: true,
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
        }],


    test: [
        {
            id: '1',
            message: "done",
            end: true
        },],

    test2: [
        {
            id: '1',
            message: "change",
            trigger: "2"
        },
        {
            id: '2',
            message: "okay",
        }

    ]


};



