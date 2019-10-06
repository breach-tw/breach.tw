<template>
	<div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
		<a-form>
			<a-form-item label="資料類型">
				<a-radio-group @change="onChange" v-model="dataType">
					<a-radio :value="1">姓名 + 身分證字號</a-radio>
					<a-radio :value="2">姓名 + 身分證字號後六碼</a-radio>
					<a-radio :value="3">hash</a-radio>
				</a-radio-group>
			</a-form-item>
		</a-form>
	</div>
</template>
<style lang="sass">

</style>
<script>
export default {
	data: () => ({
		dataType: 1
	})
};
</script>