<template>
	<a-layout id="layout">
		<a-layout-sider breakpoint="lg" collapsedWidth="0">
			<div class="logo">
				<img src="/icon.svg" />
			</div>
			<a-menu
				theme="dark"
				mode="inline"
				:defaultSelectedKeys="[$router.history.current.path]"
				@click="switchPage"
			>
				<template v-for="item in nav">
					<a-menu-item :key="item.to">
						<a-icon :type="item.icon " />
						<span>{{ item.title }}</span>
					</a-menu-item>
				</template>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<!--<a-layout-header :style="{ background: '#fff', padding: 0 }" />-->
			<a-layout-content :style="{ margin: '24px 16px 0' }">
				<div class="container">
					<nuxt />
				</div>
				<!--<div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
					<nuxt />
				</div>-->
			</a-layout-content>
			<a-layout-footer style="textAlign: center">Breach.tw ©2019 Created by Leko, gnehs</a-layout-footer>
		</a-layout>
	</a-layout>
</template>

<script>
export default {
	methods: {
		switchPage({ item, key, keyPath }) {
			this.$router.push(key);
		}
	},
	data: () => ({
		nav: [
			{
				title: "Home",
				icon: "home",
				to: "/"
			},
			{
				title: "Source",
				icon: "profile",
				to: "/source"
			},
			{
				title: "Item",
				icon: "table",
				to: "/item"
			},
			{
				title: "Log",
				icon: "desktop",
				to: "/log"
			}
		]
	})
};
</script>
<style lang="sass">
.container 
  	margin: 0 auto
  	min-height: 100vh
#layout .logo 
	max-height: 64px
	text-align: center
	img
		height: 64px
		filter: invert(1)
</style>