<template>
	<div class="home">
		<el-button    type="primary" size="default">你好呀</el-button>
	</div>
</template>

<script>
export default {
	name: 'HomeView',
	data() {
		return {
			loading: false,
		};
	},
	mounted() {
		this.loading = true;
		this.$message('加载好啦');
	},
};
</script>
