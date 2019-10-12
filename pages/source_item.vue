<template>
	<div>
		<div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
			<a-table :columns="columns" :dataSource="source" :loading="loading" :scroll="{ x: 900 }">
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
			:title="(editItemContent.id>0?'Edit':'Add')+' source'"
			:visible="editItemDialog"
			@ok="handleOk"
			:confirmLoading="editItemDialogLoading"
			@cancel="handleCancel"
		>
			<a-form>
				<a-form-item label="name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-input v-model="editItemContent.name" disabled />
				</a-form-item>
				<a-form-item label="description" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-textarea v-model="editItemContent.description" disabled />
				</a-form-item>
				<a-form-item label="item" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
					<a-select
						mode="multiple"
						placeholder="Please select"
						v-model="editItemContent.item"
						style="width: 100%"
					>
						<a-select-option v-for="i in item" :key="i.id" :value="i.id">({{i.id}}){{i.name}}</a-select-option>
					</a-select>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<style lang="sass">

</style>
<script>
import moment from "moment";
let item;
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
		title: "item",
		dataIndex: "item",
		customRender: x =>
			x
				.map(x => item.filter(i => i.id == x)[0])
				.map(d => `(${d.id})${d.name}`)
				.join("、")
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
		source: [],
		item: [],
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
				item = (await this.$axios.get("/api/item")).data;
				this.item = item;
				let source_item = (await this.$axios.get("/api/source_item"))
					.data;
				let source = (await this.$axios.get("/api/source")).data;
				for (let s of source) {
					s.item = source_item
						.filter(x => x.source == s.id)
						.map(x => x.item)
						.sort((a, b) => a - b);
				}
				this.source = source;
				this.loading = false;
			} catch (err) {
				this.$notification.error({
					message: `fetch error`,
					description: err
				});
				this.loading = false;
			}
		},
		showModal(x) {
			this.editItemContent = this.deepCopy(x);
			this.editItemContent.ortItem = Array.from(x.item);
			this.editItemDialog = true;
		},
		async handleOk(e) {
			this.editItemDialogLoading = true;
			this.editItemContent.ortItem.map(async x => {
				if (!this.editItemContent.item.includes(x))
					//不存在表示被刪掉了，所以也要刪除
					await this.$axios.delete("/api/source_item", {
						data: { source: this.editItemContent.id, item: x }
					});
			});
			this.editItemContent.item.map(async x => {
				if (!this.editItemContent.ortItem.includes(x))
					//不存在表示是新增的
					await this.$axios.post("/api/source_item", {
						sourceId: this.editItemContent.id,
						itemId: x
					});
			});
			this.editItemDialogLoading = false;
			this.editItemDialog = false;
			this.fetchData();
		},
		handleCancel(e) {
			this.editItemDialog = false;
		}
	}
};
</script>