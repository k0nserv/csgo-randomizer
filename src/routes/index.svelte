<script>
	import { makeTeams } from '../randomizer.ts';
	import { Player, CompetitiveRank } from '../types.ts';

	const players = [
		new Player('Connor', CompetitiveRank.DMG),
		new Player('K0nserv', CompetitiveRank.DMG),
		new Player('Leah', CompetitiveRank.MGE),
		new Player('Roon', CompetitiveRank.LE),
		new Player('Gra', CompetitiveRank.DMG),
		new Player('Lou', CompetitiveRank.MGE),
		new Player('Luke', CompetitiveRank.LE),
		new Player('Mr Gangster', CompetitiveRank.LE),
		new Player('Cashm8', CompetitiveRank.DMG),
		new Player('Furkan', CompetitiveRank.LEM)
	];

	const [_, match] = makeTeams(players, 0.1);

	console.log(btoa(JSON.stringify(match.serialize())));
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
