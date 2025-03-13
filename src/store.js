
import { writable } from 'svelte/store';

class Team {
    constructor(id, name, title, lastTime, never) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.lastTime = lastTime;
        this.never = never;
    }
}

class Clock {
    constructor(years, days, hours, minutes, seconds) {
        this.years = years;
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }
}

class TeamSelect {
    constructor(id, team) {
        this.id = id;
        this.team = team;
    }
}

export let outputTeam = writable(new Team("", "", "", "", ''));

export let clock = writable(new Clock(0, 0, 0, 0, 0));

export let MLBoptions = writable(new TeamSelect(0, ""));
export let NFLoptions = writable(new TeamSelect(0, ""));
export let NHLoptions = writable(new TeamSelect(0, ""));
export let NBAoptions = writable(new TeamSelect(0, ""));

