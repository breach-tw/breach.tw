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
				icon: "database",
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
			},
			{
				title: "Import",
				icon: "cloud-upload",
				to: "/import"
			}
		],
		shotaImgs: [
			"https://i.imgur.com/zR42RRS.png",
			"https://i.imgur.com/yyrVPmy.png"
		]
	}),
	created() {
		let shotaDisplay = this.shotaImgs[
			Math.floor(Math.random() * this.shotaImgs.length)
		];
		this.$nextTick(() => {
			window.document.documentElement.style.setProperty(
				"--shota-img",
				`url('${shotaDisplay}')`
			);
		});
	}
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
.ant-modal-mask
	backdrop-filter: blur(1px)
.ant-layout-sider-children 
	height: 100vh
body:before
	background-image: var(--shota-img,'https://i.imgur.com/zR42RRS.png')
	content: ''
	pointer-events: none
	position: fixed
	z-index: 999
	width: 200px
	height: 380px
	left: 10px
	bottom: 5px
	background-size: contain
	background-position: 100% 100%
	background-repeat: no-repeat
	opacity: 0.9
	transition: transform .4s ease
	transform: translateX(0px) scaleX(-1)
@media screen and (max-width:992px) 
	body:before
		transform: translateX(-200px) scaleX(-1)
</style>