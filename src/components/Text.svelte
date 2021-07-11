<script lang="ts">
	export let tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'li' = 'p';

	const render = () => `
    <${tag} class="Text"><slot></${tag}>
  `;
</script>

{@html render()}

<style>
	.Text {
		color: red;
	}
</style>
