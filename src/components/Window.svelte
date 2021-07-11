<script lang="ts">
	export let title: string;
</script>

<section class="Window">
	<nav class="Window_Header">
		<h1 class="Window_Header_Title">{title}</h1>
	</nav>

	<div class="Window_Content">
		<slot />
	</div>
</section>

<style type="scss">
	@import '../style/_variables';
	@import '../style/text';

	.Window {
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #323a45b2 0%, #303942b2 100%, #1b242ab2 100%);
		background-repeat: no-repeat;
		box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
		border-radius: 0.25rem;
		backdrop-filter: blur(5px);
	}

	.Window_Header {
		padding: 1.25rem 2rem;
		background: #2d37407f;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 0.25rem;
		backdrop-filter: blur(5px);

		&_Title {
			margin: 0;
			color: $color-primary;
			@include text_xl(normal);
		}
	}

	.Window_Content {
		display: flex;
		flex-direction: row;
		padding: 0.5rem 1.5rem;
		border-radius: 0.25rem;
	}
</style>
