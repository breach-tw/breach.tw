<template>
	<div>
		<div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
			<a-button type="primary" icon="plus" @click="showModal">Add</a-button>
			<br />
			<br />
			<a-table :columns="columns" :dataSource="data" :loading="loading">
				<div slot="expandedRowRender" slot-scope="record" style="margin: 0">
					<h6>description</h6>
					{{record.description}}
					<span v-if="record.comment">
						<br />
						<br />
						<h6>comment</h6>
						{{record.comment}}
					</span>
				</div>
				<template slot="edit" slot-scope="text, record, index">
					<a-button icon="edit" @click="showModal(record)" />
				</template>
			</a-table>
		</div>
		<a-modal
			title="編輯或新增"
			:visible="editItemDialog"
			@ok="handleOk"
			:confirmLoading="editItemDialogLoading"
			@cancel="handleCancel"
		>
			<a-form>
				<a-form-item label="name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-model="editItemContent.name" />
				</a-form-item>
				<a-form-item label="description" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-textarea v-model="editItemContent.description" />
				</a-form-item>
				<a-form-item label="round_k" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input-number v-model="editItemContent.round_k" />
				</a-form-item>
				<a-form-item label="comment" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-textarea v-model="editItemContent.comment" />
				</a-form-item>
				<a-form-item label="file" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-model="editItemContent.file" />
				</a-form-item>
				<a-form-item label="time" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-model="editItemContent.time" />
				</a-form-item>
				<a-form-item label="type" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-radio-group name="type" :defaultValue="1">
						<a-radio v-model="editItemContent.type" value="民間企業">民間企業</a-radio>
						<a-radio v-model="editItemContent.type" value="政府單位">政府單位</a-radio>
						<a-radio v-model="editItemContent.type" value="教育機構">教育機構</a-radio>
						<a-radio v-model="editItemContent.type" value="其他">其他</a-radio>
					</a-radio-group>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<style lang="sass">

</style>
<script>
const columns = [
	{
		title: "id",
		dataIndex: "id",
		sorter: true
	},
	{
		title: "type",
		dataIndex: "type"
	},
	{
		title: "name",
		dataIndex: "name"
	},
	{
		title: "round_k",
		dataIndex: "round_k"
	},
	{
		title: "time",
		dataIndex: "time"
	},
	{
		title: "major",
		dataIndex: "major"
	},
	{
		title: "file",
		dataIndex: "file"
	},
	{
		title: "edit",
		dataIndex: "edit",
		scopedSlots: { customRender: "edit" }
	}
];
export default {
	mounted() {
		this.fetchData();
	},
	data: () => ({
		data: [],
		loading: false,
		editItemDialog: false,
		editItemDialogLoading: false,
		editItemContent: {
			id: -1,
			name: "",
			description: "",
			round_k: 0,
			comment: "",
			time: "",
			file: 0,
			type: ""
		},
		columns
	}),
	methods: {
		deepCopy: x => JSON.parse(JSON.stringify(x)),
		async fetchData() {
			this.loading = true;
			try {
				let { data } = await this.$axios.get("/api/source");
				this.data = data;
				this.loading = false;
			} catch (err) {
				this.$message.error("fetch error");
				this.$message.error(err);
				this.loading = false;
			}
		},
		showModal(x) {
			if (x) this.editItemContent = this.deepCopy(x);
			this.editItemDialog = true;
		},
		async handleOk(e) {
			this.editItemDialogLoading = true;
			let data;
			if (this.editItemContent.id > 0)
				data = (await this.$axios.patch(
					`/api/source?id=${this.editItemContent.id}`,
					this.editItemContent
				)).data;
			else
				data = (await this.$axios.post(
					"/api/source",
					this.editItemContent
				)).data;
			console.log(data);
			this.editItemDialog = false;
			this.editItemDialogLoading = false;
		},
		handleCancel(e) {
			this.editItemDialog = false;
			this.editItemContent = this.deepCopy({
				id: -1,
				name: "",
				description: "",
				round_k: 0,
				comment: "",
				time: "",
				major: 0,
				file: 0,
				type: ""
			});
		}
	}
};
</script>