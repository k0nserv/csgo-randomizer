<script type="ts">
	import { CompetitiveRank } from '../types.ts';

	export let rank: CompetitiveRank;
</script>

<div class="Rank">
	<div class="Rank_Image Rank--{rank.id}" />
</div>

<style type="scss">
	@use 'sass:map';
	@use 'sass:math';

	$ranks: (
		/* Col 0 */ 's1':
			(
				'row': 0,
				'col': 0
			),
		's2': (
			'row': 1,
			'col': 0
		),
		's3': (
			'row': 2,
			'col': 0
		),
		's4': (
			'row': 3,
			'col': 0
		),
		'se': (
			'row': 4,
			'col': 0
		),
		'sem': (
			'row': 5,
			'col': 0
		),
		/* Col 1 */ 'gn1':
			(
				'row': 0,
				'col': 1
			),
		'gn2': (
			'row': 1,
			'col': 1
		),
		'gn3': (
			'row': 2,
			'col': 1
		),
		'gn4': (
			'row': 3,
			'col': 1
		),
		'mg1': (
			'row': 4,
			'col': 1
		),
		'mg2': (
			'row': 5,
			'col': 1
		),
		/* Col 2 */ 'mge':
			(
				'row': 0,
				'col': 2
			),
		'dmg': (
			'row': 1,
			'col': 2
		),
		'le': (
			'row': 2,
			'col': 2
		),
		'lem': (
			'row': 3,
			'col': 2
		),
		'sm': (
			'row': 4,
			'col': 2
		),
		'ge': (
			'row': 5,
			'col': 2
		)
	);

	$scale: 0.3;

	@mixin set_position($pos, $scale) {
		$row: map.get($pos, 'row');
		$col: map.get($pos, 'col');

		background-position: ((-10px - $col * 210px) * $scale) ((-10px - $row * 90px) * $scale);
	}

	.Rank {
		&_Image {
			background: url(../assets/rank-sprites.png);
			background-repeat: no-repeat;
			background-position: -10px -10px;
			background-size: 640px * $scale 550px * $scale;
			width: 12.5rem * $scale;
			height: 5rem * $scale;
		}
		@each $rank, $pos in $ranks {
			& :global(.Rank--#{$rank}) {
				@include set_position($pos, $scale);
			}
		}
	}
</style>
