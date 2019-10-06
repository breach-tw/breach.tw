<template>
	<div>
		<div :style="{ padding: '16px', background: '#fff' }">
			<img src="/icon.svg" width="128px" :style="{float:'left'}" />
			<h1 class="title">breach.tw</h1>
			<h2
				class="subtitle"
			>A service that can track data breaches like &#34;Have I Been Pwned&#34;, but it is specific for Taiwan.</h2>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style>
	.title {
		font-weight: 300;
		font-size: 48px;
		color: #35495e;
	}

	.subtitle {
		font-weight: 300;
		font-size: 18px;
		color: #526488;
	}
</style>
