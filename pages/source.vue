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
			<a-form :form="form">
				<a-form-item label="name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['name', {rules: [{ required: true, message: 'Please input name!' }]}]" />
				</a-form-item>
				<a-form-item label="description" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-textarea
						v-decorator="['description', {rules: [{ required: true, message: 'Please input description!' }]}]"
					/>
				</a-form-item>
				<a-form-item label="round_k" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input-number
						v-decorator="['round_k', {rules: [{ required: true, message: 'Please input round_k!' }]}]"
					/>
				</a-form-item>
				<a-form-item label="comment" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-textarea />
				</a-form-item>
				<a-form-item label="major" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input-number
						v-decorator="['major', {rules: [{ required: true, message: 'Please input major!' }]}]"
					/>
				</a-form-item>
				<a-form-item label="file" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['file', {rules: [{ required: true, message: 'Please input file!' }]}]" />
				</a-form-item>
				<a-form-item label="time" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-decorator="['time', {rules: [{ required: true, message: 'Please input time!' }]}]" />
				</a-form-item>
				<a-form-item label="type" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-radio-group name="type" :defaultValue="1">
						<a-radio value="民間企業">民間企業</a-radio>
						<a-radio value="政府單位">政府單位</a-radio>
						<a-radio value="教育機構">教育機構</a-radio>
						<a-radio value="其他">其他</a-radio>
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
	beforeCreate() {
		this.form = this.$form.createForm(this);
	},
	mounted() {
		this.fetchData();
	},
	data: () => ({
		data: [],
		loading: false,
		editItemDialog: false,
		editItemDialogLoading: false,
		editItemContent: null,
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
		showModal() {
			this.editItemDialog = true;
		},
		handleOk(e) {
			this.editItemDialogLoading = true;
			setTimeout(() => {
				this.editItemDialog = false;
				this.editItemDialogLoading = false;
			}, 2000);
		},
		handleCancel(e) {
			this.editItemDialog = false;
		}
	}
};
</script>