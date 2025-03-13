import { outputTeam, clock, MLBoptions, NFLoptions, NHLoptions, NBAoptions } from './store.js';
import teamsData from './teams.json';

setInterval(DoClock, 1000);
setInterval(DoRandomTeam, 10000);

class Team {
    constructor(id, name, title, lastTime, never, color) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.lastTime = lastTime;
        this.never = never;
        this.color = color;
    }
}

/*
export function isMobileDevice() {
	const agent = navigator.userAgent;
	if (agent.indexOf('Android') > -1 || agent.indexOf('iPhone') > -1) {
 		clockDiv = document.getElementById('MainTeamClock');
		clockDiv.style.paddingTop = "85%";
		console.log('adjusted');
	}
	else
		console.log('not adjusted');
}
*/

// JSON Code //
let teamsArray = null;
let lastTime = "";

export async function readJson() {
    return new Promise((resolve, reject) => {
        try {
            teamsArray = teamsData.map((team) => {
                return new Team(team.id, team.name, team.title, team.lastTime, team.never, team.color);
            });

            BuildTeamSelects();
            const TeamID = GetTeamID();
            lastTime = SetOutputTeam(TeamID);
            DoClock();
            resolve();
        } catch (error) {
            console.error('Error loading JSON:', error);
            reject(error);
        }
    });
}

function GetTeamID() {
    let TeamID = -1;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${"TitleTickerTeam"}=`);
    if (parts.length === 2)
        TeamID = parts.pop().split(';').shift();
    else
        TeamID = Math.floor(Math.random() * teamsArray.length);
    return TeamID;
}

export function StartFromSelect(TeamID) {
    // const date = new Date();
    // date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    // let expires = "; expires=" + date.toUTCString();
    // document.cookie = `TitleTickerTeam=${TeamID}${expires}; path=/; SameSite=Lax`;
    lastTime = SetOutputTeam(TeamID);
    DoClock();
}

function DoRandomTeam() {
	let TeamID = Math.floor(Math.random() * teamsArray.length);
	lastTime = SetOutputTeam(TeamID);
	DoClock();
}

function SetOutputTeam(TeamID) {
    TeamID = parseInt(TeamID);
if (teamsArray && Array.isArray(teamsArray)) {
    for (let i = 0; i < teamsArray.length; i++) {
        if (teamsArray[i].id === TeamID) {
            outputTeam.set(new Team(teamsArray[i].id, teamsArray[i].name, teamsArray[i].title, teamsArray[i].lastTime, teamsArray[i].never));

            document.documentElement.style.setProperty(
                "--root-bg-color",
                teamsArray[i].color,
            );
            return teamsArray[i].lastTime;
            break;
        }
    }
}
}

function BuildTeamSelects() {
    let _MLBoptions = [];
    let _NFLoptions = [];
    let _NHLoptions = [];
    let _NBAoptions = [];

    for (let i = 0; i < teamsArray.length; i++) {
        switch (teamsArray[i].title) {
            case "World Series":
                _MLBoptions.push({ value: teamsArray[i].id, label: teamsArray[i].name });
                break;
            case "Super Bowl":
                _NFLoptions.push({ value: teamsArray[i].id, label: teamsArray[i].name });
                break;
            case "Stanley Cup":
                _NHLoptions.push({ value: teamsArray[i].id, label: teamsArray[i].name });
                break;
            case "NBA Finals":
                _NBAoptions.push({ value: teamsArray[i].id, label: teamsArray[i].name });
                break;
        }
    }

    _MLBoptions.sort((a, b) => a.label.localeCompare(b.label));
    MLBoptions.set(_MLBoptions);
    _NFLoptions.sort((a, b) => a.label.localeCompare(b.label));
    NFLoptions.set(_NFLoptions);
    _NHLoptions.sort((a, b) => a.label.localeCompare(b.label));
    NHLoptions.set(_NHLoptions);
    _NBAoptions.sort((a, b) => a.label.localeCompare(b.label));
    NBAoptions.set(_NBAoptions);
}


// CLOCK Code //

class Clock {
    constructor(years, days, hours, minutes, seconds) {
        this.years = years;
        this.days = days;
        this.hours = this.leadZero(hours);
        this.minutes = this.leadZero(minutes);
        this.seconds = this.leadZero(seconds);
    }
    leadZero(x) {
        if (x < 10) return "0" + x;
        else return x;
    }
}

function DoClock() {
    const oneMinute = 1000 * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const startDate = new Date(lastTime);
    const diff = new Date() - startDate;

    clock.set(new Clock(
        Math.floor(diff / oneDay / 365),
        Math.floor(diff / oneDay) % 365,
        Math.floor((diff % oneDay) / oneHour),
        Math.floor((diff % oneHour) / oneMinute),
        Math.floor((diff % oneMinute) / 1000)
    ));
}
