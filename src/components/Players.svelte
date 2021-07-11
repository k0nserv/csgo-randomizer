<script lang="ts">
	import { Player } from '../types.ts';
	import Rank from './Rank.svelte';

	export let players: Array<Player>;
</script>

<ul class="Players">
	{#each players as player}
		<li class="Players_Item">
			<span class="Players_Item_Name"
				>{player.name}{#if player.isCaptain}*{/if}</span
			><Rank rank={player.rank} />
		</li>
	{/each}
</ul>

<style type="scss">
	@import '../style/_variables';
	@import '../style/text';

	.Players {
		list-style: none;
		padding: 0;
		margin: 0;

		&_Item {
			display: flex;
			flex: 1;
			flex-direction: row;
			justify-content: space-between;
			color: $color-primary;
			padding: 0.25rem 0;

			&_Name {
				margin-right: 0.5rem;
			}

			@include text_base();
		}
	}
</style>
