<template>
	<div>
		<a-row :gutter="16">
			<a-col :span="8" v-for="task in tasks" :key="task.id">
				<a-card size="small" :title="task.id">
					<span>總進度</span>
					<a-progress :percent="task.data.output_line/task.data.input_line*100" />
					<a-statistic title="Account Balance (CNY)" :precision="2" :value="112893" />
					<div v-if="Object.keys(task.data.pps.s1).length>0">
						<a-divider orientation="left">s1</a-divider>
						<div v-for="pps of task.data.pps.s1" :key="JSON.stringify(pps)">
							<span>
								<b>{{pps.name}}</b>
								<br />
								{{pps.filtered}}
							</span>
						</div>
					</div>
					<div v-if="Object.keys(task.data.pps.s2).length>0">
						<a-divider orientation="left">s2</a-divider>
						<div v-for="pps of task.data.pps.s2" :key="JSON.stringify(pps)">
							<span>
								<b>{{pps.name}}</b>
								<br />
								{{pps.filtered}}
							</span>
						</div>
					</div>
					<a-divider orientation="left">其他資訊</a-divider>

					<a-collapse :bordered="false">
						<a-collapse-panel header="raw data" key="1">
							<pre>{{task.data}}</pre>
						</a-collapse-panel>
					</a-collapse>
				</a-card>
			</a-col>
		</a-row>
	</div>
</template>
<style lang="sass">

</style>
<script>
export default {
	head: () => ({
		title: "Task"
	}),
	mounted() {
		this.fetchData();
		this.timeOutRefresh = setInterval(() => this.fetchData(), 4000);
	},
	data: () => ({
		tasks: [],
		timeOutRefresh: null
	}),
	destroyed() {
		if (this.timeOutRefresh) {
			clearInterval(this.timeOutRefresh);
		}
	},
	methods: {
		async fetchData() {
			let tasklist = (await this.$axios.get("/api/import/tasklist")).data;
			let tasks = [];
			for (let task of tasklist) {
				tasks.push({
					id: task,
					data: (await this.$axios.get(`/api/import/task?id=${task}`))
						.data
				});
			}
			this.tasks = tasks;
		}
	}
};
</script>