<template>
	<div>
		<div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
			<a-button type="primary" icon="plus" @click="showModal()">Add</a-button>
			<br />
			<br />
			<a-table :columns="columns" :dataSource="data" :loading="loading" :scroll="{ x: 900 }">
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
					<a-popconfirm title="確定要刪除嗎？" @confirm="delSource(record)" okText="Yes" cancelText="No">
						<a-button icon="delete" />
					</a-popconfirm>
				</template>
			</a-table>
		</div>
		<a-modal
			:title="(editItemContent.id>0?'Edit':'Add')+' source'"
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
				<a-form-item label="round_k" :min="0" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input-number v-model="editItemContent.round_k" />
				</a-form-item>
				<a-form-item label="comment" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-textarea v-model="editItemContent.comment" />
				</a-form-item>
				<a-form-item label="file" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-radio-group v-model="editItemContent.file" name="file" :defaultValue="1">
						<a-radio :value="0">false</a-radio>
						<a-radio :value="1">true</a-radio>
					</a-radio-group>
				</a-form-item>
				<a-form-item label="time" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-date-picker v-model="editItemContent.time" />
				</a-form-item>
				<a-form-item label="type" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-radio-group v-model="editItemContent.type" name="type" :defaultValue="1">
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
import moment from "moment";
const columns = [
	{
		title: "id",
		dataIndex: "id",
		sorter: (a, b) => a.id - b.id
	},
	{
		title: "type",
		dataIndex: "type",
		filters: [
			{
				text: "民間企業",
				value: "民間企業"
			},
			{
				text: "政府單位",
				value: "政府單位"
			},
			{
				text: "教育機構",
				value: "教育機構"
			},
			{
				text: "其他",
				value: "其他"
			}
		],
		onFilter: (value, record) => record.type.indexOf(value) === 0
	},
	{
		title: "name",
		dataIndex: "name"
	},
	{
		title: "round_k",
		dataIndex: "round_k",
		sorter: (a, b) => a.round_k - b.round_k
	},
	{
		title: "time",
		dataIndex: "time",
		customRender: (text, record, index) => moment(text).format("YYYY-MM-DD")
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
		title: "action",
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
		deepCopy: x => Object.assign({}, x),
		async fetchData() {
			this.loading = true;
			try {
				let { data } = await this.$axios.get("/api/source");
				this.data = data;
				this.loading = false;
			} catch (err) {
				this.$notification.error({
					message: `fetch error`,
					description: err
				});
				this.loading = false;
			}
		},
		showModal(
			x = {
				id: -1,
				name: "",
				description: "",
				round_k: 0,
				comment: "",
				time: new Date(),
				file: 0,
				type: ""
			}
		) {
			this.editItemContent = this.deepCopy(x);
			this.editItemContent.time = moment(
				this.editItemContent.time,
				"YYYY/MM/DD"
			);

			this.editItemDialog = true;
		},
		async delSource(x) {
			try {
				await this.$axios.delete("/api/source", { data: { id: x.id } });
				this.$message.success({
					message: `刪除「${x.name}」成功`
				});
				await this.fetchData();
			} catch (err) {
				this.$notification.error({
					message: `刪除「${x.name}」失敗`,
					description: err
				});
			}
		},
		async handleOk(e) {
			this.editItemDialogLoading = true;
			let data;
			let reqData = this.deepCopy(this.editItemContent);
			if (reqData.id == -1) delete reqData.id;
			delete reqData.isTrusted; //i dont know where it comes from
			reqData.time = moment(reqData.time).format("YYYY-MM-DD HH:mm:ss");
			try {
				if (this.editItemContent.id > 0)
					await this.$axios.patch(`/api/source`, {
						update: reqData,
						filter: { id: this.editItemContent.id }
					});
				else await this.$axios.post("/api/source", reqData);
			} catch (err) {
				this.editItemDialogLoading = false;
				this.editItemDialog = false;
				this.$notification.error({
					message: `編輯或新增失敗`,
					description: err
				});
			}
			await this.fetchData();
			this.editItemDialogLoading = false;
			this.editItemDialog = false;
		},
		handleCancel(e) {
			this.editItemDialog = false;
		}
	}
};
</script>