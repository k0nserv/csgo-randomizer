import { Player, Team, Match } from './types';
import { calculateDiff } from './utils';

const NAME_COMPONENT_ONE: Array<string> = [
	'Jumping',
	'Creepy',
	'Tragic',
	'Flying',
	'Burning',
	'Cute',
	'Fuzzy',
	'Mischievous',
	'Scary',
	'Trippy',
	'Dangerous',
	'Hot',
	'Blissful',
	'Petite',
	'Gloomy',
	'Disgraceful',
	'Marvelous',
	'Somber',
	'Sleepy',
	'Colossal',
	'Dreamy',
	'Dreaming',
	'Flavourful',
	'Skimpy',
	'Drooling',
	'Confused',
	'Fugly',
	'Supple',
	'Sexy'
];

const NAME_COMPONENT_TWO: Array<string> = [
	'Bears',
	'Lions',
	'Heroes',
	'Porcupines',
	'Hippopotamuses',
	'Otters',
	'Roses',
	'Eagles',
	'Penguins',
	'Jocks',
	'Bimbos',
	'Dancers',
	'Lovers',
	'Bots',
	'X-Gods',
	'Riflers',
	'Snipers',
	'Butts',
	'Singers',
	'Royals',
	'Peasants',
	'Roadmen',
	'Strangers',
	'Bums',
	'Strangers',
	'Losers'
];

function combinations<T>(collection: Array<T>, n: number): Array<Array<T>> {
	if (collection.length < n) {
		return [];
	}

	const recur = (array, n) => {
		if (--n < 0) {
			return [[]];
		}
		const result = [];
		array = array.slice();
		while (array.length - n) {
			const value = array.shift();

			recur(array, n).forEach((combination) => {
				combination.unshift(value);
				result.push(combination);
			});
		}
		return result;
	};

	return recur(collection, n);
}

function setDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
	const _difference = new Set(setA);

	for (const elem of setB) {
		_difference.delete(elem);
	}
	return _difference;
}

function choose<T>(collection: Array<T> | null): T | null {
	if (!collection || collection.length === 0) {
		return null;
	}
	const index = Math.floor(Math.random() * collection.length);

	return collection[index];
}

function makeName(): string {
	const part_one = choose(NAME_COMPONENT_ONE);
	const part_two = choose(NAME_COMPONENT_TWO);

	return `The ${part_one} ${part_two}`;
}

export function makeTeams(players: Array<Player>, maxDifference: number): [number, Match] | null {
	const allPlayers = new Set(players);
	const teamSize = Math.floor(players.length / 2);

	const allPossibilties = combinations(players, teamSize)
		.map((team) => {
			const team_one = new Set(team);
			const team_two = setDifference(allPlayers, team_one);

			const difference = calculateDiff(
				[...team_one].map((p) => p.rank.numericValue),
				[...team_two].map((p) => p.rank.numericValue),
				teamSize
			);

			if (Math.abs(difference - 1.0) < maxDifference) {
				return [Math.abs(difference - 1.0), team_one.values(), team_two.values()];
			}

			return null;
		})
		.filter((x) => x != null);

	const possibleTeam = choose(allPossibilties);

	if (possibleTeam == null) {
		return null;
	}

	const team_one_picks_map = Math.random() < 0.5;

	const team_one = new Team([...possibleTeam[1]], makeName(), team_one_picks_map);
	const team_two = new Team([...possibleTeam[2]], makeName(), !team_one_picks_map);
	choose(team_one.players).isCaptain = true;
	choose(team_two.players).isCaptain = true;

	const match = new Match([team_one, team_two]);

	return [possibleTeam[0], match];
}
