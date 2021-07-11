import { calculateDiff } from './utils';

export interface Rank extends Serializable<Rank> {
	numericValue: number;
}

type Serialized = Record<string, unknown> | string | number;
export interface Serializable<T> {
	serialize(): Serialized;
	deserialize(from: Serialized): T | undefined;
}

export class Team implements Serializable<Team> {
	public readonly players: [Player];
	public readonly name: string;
	public readonly picksMap: boolean;

	constructor(players: [Player], name: string, picksMap: boolean) {
		this.players = players;
		this.name = name;
		this.picksMap = picksMap;
	}

	// Serializable<Team>
	serialize(): Serialized {
		return {
			n: this.name,
			p: this.players.map((p) => p.serialize()),
			m: this.picksMap ? 1 : 0
		};
	}

	deserialize(data: Serialized): this | undefined {
		const name = data['n'];
		const players = data['p'].map((p) => Player.prototype.deserialize(p));
		const picksMap = data['m'] == 1;

		return new Team(players, name, picksMap);
	}
}

export class Player implements Serializable<Player> {
	public readonly name: string;
	public readonly rank: Rank;
	public isCaptain: boolean;

	constructor(name: string, rank: Rank, isCaptain = false) {
		this.name = name;
		this.rank = rank;
		this.isCaptain = isCaptain;
	}

	// Serializable<Player>
	serialize(): Record<string, unknown> {
		return {
			n: this.name,
			c: this.isCaptain,
			r: this.rank.serialize()
		};
	}

	deserialize(data: Serialized): this | undefined {
		const name = data['n'];
		const isCaptain = data['c'] ?? false;
		const rank = CompetitiveRank.prototype.deserialize(data['r']);
		console.log(data);

		return new Player(name, rank, isCaptain);
	}
}

export class CompetitiveRank implements Rank, Serializable<Rank> {
	public readonly id: string;
	private elo: number;

	constructor(id: string, elo: number) {
		this.id = id;
		this.elo = elo;
	}

	static Silver1: CompetitiveRank = new CompetitiveRank('s1', 100);
	static Silver2: CompetitiveRank = new CompetitiveRank('s2', 200);
	static Silver3: CompetitiveRank = new CompetitiveRank('s3', 300);
	static Silver4: CompetitiveRank = new CompetitiveRank('s4', 400);
	static SilverElite: CompetitiveRank = new CompetitiveRank('se', 500);
	static SilverEliteMaster: CompetitiveRank = new CompetitiveRank('sem', 600);
	static GoldNova1: CompetitiveRank = new CompetitiveRank('gn1', 700);
	static GoldNova2: CompetitiveRank = new CompetitiveRank('gn2', 800);
	static GoldNova3: CompetitiveRank = new CompetitiveRank('gn3', 900);
	static GoldNova4: CompetitiveRank = new CompetitiveRank('gn4', 1000);
	static MG1: CompetitiveRank = new CompetitiveRank('mg1', 1100);
	static MG2: CompetitiveRank = new CompetitiveRank('mg2', 1200);
	static MGE: CompetitiveRank = new CompetitiveRank('mge', 1300);
	static DMG: CompetitiveRank = new CompetitiveRank('dmg', 1400);
	static LE: CompetitiveRank = new CompetitiveRank('le', 1500);
	static LEM: CompetitiveRank = new CompetitiveRank('lem', 1600);
	static SM: CompetitiveRank = new CompetitiveRank('sm', 1700);
	static GE: CompetitiveRank = new CompetitiveRank('ge', 1800);
	static allRanks = [
		CompetitiveRank.Silver1,
		CompetitiveRank.Silver2,
		CompetitiveRank.Silver3,
		CompetitiveRank.Silver4,
		CompetitiveRank.SilverElite,
		CompetitiveRank.SilverEliteMaster,
		CompetitiveRank.GoldNova1,
		CompetitiveRank.GoldNova2,
		CompetitiveRank.GoldNova3,
		CompetitiveRank.GoldNova4,
		CompetitiveRank.MG1,
		CompetitiveRank.MG2,
		CompetitiveRank.MGE,
		CompetitiveRank.DMG,
		CompetitiveRank.LE,
		CompetitiveRank.LEM,
		CompetitiveRank.SM,
		CompetitiveRank.GE
	];

	get numericValue(): number {
		return this.elo;
	}

	// Serializable<Rank>
	serialize(): Record<string, unknown> | string | number {
		return this.id;
	}

	deserialize(data: Serialized): this | undefined {
		return CompetitiveRank.allRanks.find((r) => r.id == data);
	}
}

export class Match implements Serializable<Match> {
	public readonly teams: Array<Team>;
	private computedDiff: number | null;

	constructor(teams: Array<Team>) {
		this.teams = teams;
	}

	public get difference(): number {
		if (this.computedDiff !== null) {
			return this.computedDiff;
		}
		const diff = calculateDiff(
			this.teams[0].players.map((p) => p.rank.numericValue),
			this.teams[1].players.map((p) => p.rank.numericValue),
			this.teams[0].players.length
		);
		this.computedDiff = diff;

		return diff;
	}

	// Serializable<Match>
	serialize(): Record<string, unknown> {
		return {
			t: this.teams.map((t) => t.serialize())
		};
	}

	deserialize(data: Serialized): this | undefined {
		const teams = data['t'].map((t) => Team.prototype.deserialize(t));

		return new Match(teams);
	}
}
