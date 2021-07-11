<script context="module">
	import { makeTeams } from '../randomizer.ts';
	import { Match } from '../types.ts';
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const config = page.query.get('t');
		const jsonConfig = JSON.parse(atob(config));
		const match = Match.prototype.deserialize(jsonConfig);
		console.dir(match);

		return {
			props: {
				match
			}
		};
	}
</script>

<script lang="ts">
	import Team from '../components/Team.svelte';
	import Window from '../components/Window.svelte';

	export let match;
</script>

<div class="Container">
	<Window title="Your teams">
		<div class="Teams">
			<Team team={match.teams[0]} />
			<div class="Teams_Spacer" />
			<Team team={match.teams[1]} />
		</div>
	</Window>
</div>

<style type="scss">
	.Container {
		display: flex;
		width: 100vw;
		height: 100vh;
		align-items: center;
		justify-content: center;
	}
	.Teams {
		display: flex;
		flex-direction: row;
		flex: 1;

		&_Spacer {
			width: 8rem;
		}
	}
</style>
