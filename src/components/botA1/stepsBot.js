

import AddGoal from './addStep/addStepComponent';
import React, {Component} from 'react';
import BotFunctions from './functionsBot/addStepBot';
import EditName from './functionsBot/editName';
import EditProfileImageBot from './functionsBot/editProfileImageBot';
import Chat from './chat/chat'

import ReportMain from './reports/reportMain/reportMain'



export const StepsBot = {


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

    dayPlan: [
        {
            id: '1',
            message: 'Hi! whats your priority for today?',
            trigger: '2'
        },
        {
            id: '2',
            user: true,
            trigger: '3'
        },
        {
            id: '3',
            message: 'and how do you plan on achieving it?',
            trigger: '4'
        },
        {
            id: '4',
            user: true,
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

}







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

