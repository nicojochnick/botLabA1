

import AddGoal from '../components/addGoal';
import React from 'react';
import BotFunctions from './functions/addGoalBot';
import EditName from './functions/editName';
import EditProfileImageBot from './functions/editProfileImageBot';
export const Steps = {

    introduction: [
        {
            id: '1',
            message: 'What is your name?',
            trigger: 'name',
        },
        {
            id: 'name',
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
            component: <EditName/>,
            asMessage: true,
            trigger: '5'
        },

        {
            id: '5',
            message: "Let's add a photo to complete your profile",
            trigger: "upload"
        },
        {
            id: "upload",
            component: <EditProfileImageBot/>,
            asMessage: true
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
                {value: 'StartStudySession', label: 'Create a Goal', trigger: "createaGoal"},
                {value: 'searchGoals', label: 'Find a Goal', trigger: "findaGoal"},
                {value: 'Tip', label: 'Tip', trigger: "Tip"},
                {value: 'GetMotivated', label: 'Motivation', trigger: "Motivation"},
            ],


        },

        {
            id: 'createaGoal',
            message: 'What would you like to title your goal?',
            trigger: 'title',
        },
        {
            id: "title",
            user: true,
            trigger: "7"
        },
        {
            id: '7',
            message: " {previousValue}- I like it!",
            trigger: 'saveName'
        },
        {
            id: 'saveName',
            component: <BotFunctions/>,
            asMessage: true,
            trigger: '8'


        },
        {
            id: '8',
            message: 'how would you like to track your progress?',
            trigger: 'tracking'
        },
        {
            id: 'tracking',
            options: [
                {value: 'option1', label: 'Time (ex: 30 minutes)', trigger: "9"},
                {value: 'option2', label: 'Daily Completion', trigger: "9"},
            ],

        },
        {
            id: '9',
            message: "great, your goal is all setup!",
            end: true,
        },

        {
            id: "findaGoal",
            message: "What is the name of the class"
        },
        {
            id: "Motivation",
            message: "Meme Time Baby"
        },
        {
            id: "Tip",
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
            message: "great, your goal is all setup!",
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



