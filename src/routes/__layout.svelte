<slot />

<style type="scss">
	@import 'normalize';
	@import '../style/_variables';

	:global(body) {
		display: flex;
		height: 100vh;
		background: linear-gradient(180deg, #ced8e1 0%, #546e80 49.04%, #2d3035 100%);
		background-repeat: no-repeat;
		font-family: $font-family;
	}

	:global {
		@include normalize();
	}

	:global(html) {
		box-sizing: border-box;
	}

	:global(*) {
		box-sizing: inherit;

		&::before,
		&::after {
			box-sizing: inherit;
		}
	}
</style>
