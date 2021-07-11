<script lang="ts">
	import { Team } from '../types.ts';
	import Window from './Window.svelte';
	import Players from './Players.svelte';

	export let team: Team;
</script>

<div class="Team">
	<h2 class="Team_Name">{team.name}</h2>
	{#if team.picksMap}
		<p class="Team_Picks">Picks Map</p>
	{:else}
		<p class="Team_Picks">Picks Side</p>
	{/if}

	<Players players={team.players} />
</div>

<style type="scss">
	@import '../style/_variables';
	@import '../style/text';

	.Team {
		flex: 0 0 max-content;
		padding: 1rem 1.5rem;

		&_Name {
			color: $color-white;

			@include text_lg(normal);
		}

		&_Picks {
			color: darken($color-white, 15%);
			margin-bottom: 0.25rem;

			@include text_base(normal);
		}
	}
</style>
