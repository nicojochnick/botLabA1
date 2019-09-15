

import AddGoal from '../addStep/addStepComponent';
import React from 'react';
import BotFunctions from './functionsBot/addStepBot';
import EditName from './functionsBot/editName';
import EditProfileImageBot from './functionsBot/editProfileImageBot';
import Chat from './chat/chat'

import ReportMain from '../reports/reportMain/reportMain'


export const StepsBot = {

    report: [
        {
            id: '1',
            message: "Hey!",
            trigger: 'input'
        },
        {
            id: "input",
            user: true,
            trigger: "3"
        },
        {
            id: "3",
            component: <Chat/>,
            asMessage: true
        }
    ],












    introduction: [
        {
            id: '1',
            message: 'Hi! what is your name?',
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
            message: "Let's add a photo to complete your beautiful profile",
            trigger: "upload"
        },
        {
            id: "upload",
            component: <EditProfileImageBot/>,
            asMessage: true
        }

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
            trigger: '4',
        },

        {
            id: '4',
            message: "{previousValue} - I like your name",
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
                {value: 'blank', label: 'Analyze', trigger: "analyze"},
                {value: 'blank', label: 'Coach', trigger: "coach"},
            ],

        },
        {
            id: "analyze",
            message: "blank"

        },

        {
            id: "coach",
            message: "blank"

        }

    ],







    oldMenu: [
        {
            id: "1",
            message: 'how can I help?',
            trigger: "menuItems"
        },

        {
            id: "menuItems",
            options: [
                {value: 'blank', label: 'Analyze', trigger: "createaGoal"},
                {value: 'blank', label: 'Find a Goal', trigger: "findaGoal"},
                {value: 'blank', label: 'Tip', trigger: "Tip"},
                {value: 'blank', label: 'Motivation', trigger: "Motivation"},
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
            end: true
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
};




//TODO add intro

// Hi! What’s your name
//
// Nice to meet you ___,
//     I’m Acy, your personal
// coach.
//
//     To start, tell me something
// you would like to improve
// upon, it can be vague like
// “be more relaxed” or specific
// like 2x my annual income.
//
//     Ok, great. Now tell me just
// one thing you can start doing
// everyday to help you get
// closer to that goal. You can
// of course change this later.
//
//     We are going to track this, and
// see if its really helping you get
// closer to your goal. Improvement
// is an iterative process, and
// were going to work together
// to find the system that works
// for you.
//
//         Click below to see
// this live on your home page. "

