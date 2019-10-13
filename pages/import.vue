<template>
	<div :style="{ padding: '24px', background: '#fff' }">
		<a-form layout="horizontal">
			<a-form-item label="s1pps" v-if="pps" :label-col="{ span: 4 }" :wrapper-col=" { span: 14 }">
				<a-select mode="multiple" v-model="form.s1pps">
					<a-select-option v-for="(item, index) in pps.s1" :key="index" :value="index">{{item.name}}</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item label="s2pps" v-if="pps" :label-col="{ span: 4 }" :wrapper-col=" { span: 14 }">
				<a-select mode="multiple" v-model="form.s2pps">
					<a-select-option v-for="(item, index) in pps.s2" :key="index" :value="index">{{item.name}}</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item label="source" v-if="source" :label-col="{ span: 4 }" :wrapper-col=" { span: 14 }">
				<a-select
					showSearch
					placeholder="Select a person"
					optionFilterProp="children"
					style="width: 200px"
					v-model="form.source"
				>
					<a-select-option
						v-for="(item, index) in source"
						:key="index"
						:value="item.id"
					>({{item.id}}){{item.name}}</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item label="檔案匯入方式" :label-col="{ span: 4 }" :wrapper-col=" { span: 14 }">
				<a-radio-group v-model="form.fileType">
					<a-radio value="txt">透過純文字檔</a-radio>
					<a-radio value="input">透過輸入框</a-radio>
					<a-radio value="url">提供檔案路徑</a-radio>
				</a-radio-group>
			</a-form-item>
			<a-form-item
				v-if="form.fileType=='input'"
				label="透過輸入框匯入"
				:label-col="{ span: 4 }"
				:wrapper-col=" { span: 14 }"
			>
				<a-textarea placeholder="王大明A123456789" v-model="form.text" :autosize="{ minRows: 10 }" />
			</a-form-item>
			<a-form-item
				v-if="form.fileType=='txt'"
				label="透過純文字檔匯入"
				:label-col="{ span: 4 }"
				:wrapper-col=" { span: 14 }"
			>
				<input type="file" id="file" ref="myFiles" class="custom-file-input" />
			</a-form-item>
			<a-form-item
				v-if="form.fileType=='url'"
				label="提供檔案路徑"
				:label-col="{ span: 4 }"
				:wrapper-col=" { span: 14 }"
			>
				<a-input placeholder="檔案路徑" v-model="form.filePath" />
			</a-form-item>
			<a-form-item v-if="form.fileType" :label-col="{ span: 4 }" :wrapper-col="{ span: 8, offset: 4 }">
				<a-button type="primary" @click="submit">上傳</a-button>
				<!--<span>檔案路徑：</span>-->
			</a-form-item>
		</a-form>
	</div>
</template>
<style lang="sass">

</style>
<script>
export default {
	head: () => ({
		title: "Import"
	}),
	data: () => ({
		pps: null,
		source: null,
		form: {
			s1pps: [],
			s2pps: [],
			fileType: null,
			text: null, //透過輸入框匯入
			file: null,
			source: null,
			filePath: null //上傳後才拿到
		},
		taskId: null
	}),
	mounted() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			this.pps = (await this.$axios.get(`/api/import/pps`)).data;
			this.source = (await this.$axios.get(`/api/source`)).data;
		},
		async submit() {
			switch (this.form.fileType) {
				case "txt":
					this.form.file = this.$refs.myFiles.files[0];
					this.postFile();
					break;
				case "input":
					this.form.file = new Blob([this.form.text], {
						type: "text/plain"
					});
					this.postFile();
					break;
				case "url":
					this.postPPS();
					break;
			}
		},
		async postFile() {
			let formData = new FormData();
			formData.append("file", this.form.file);
			try {
				this.form.filePath = (await this.$axios.post(
					`/api/import/upload`,
					formData,
					{
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						}
					}
				)).data;
				this.$notification.open({
					message: "上傳完畢",
					description: `您的檔案路徑是：${this.form.filePath}`
				});
			} catch (error) {
				this.$notification.open({
					message: "上傳失敗",
					description: error
				});
			}
			this.postPPS();
		},
		async postPPS() {
			// source, filePath, s1pps, s2pps
			let { s1pps, s2pps, filePath, source } = this.form;
			this.taskId = (await this.$axios.post(`/api/import/process`, {
				filePath,
				s1pps,
				s2pps,
				source
			})).data;
			this.$notification.open({
				message: "任務已新增",
				description: `您的任務 id 是：${this.taskId}`
			});
		}
	}
};
</script>