<template>
	<div class="source-container">
		<BackendImages :component="component"/>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Service from "@/components/dynamic-components/Service.vue";
import BackendImages from "@/components/dynamic-components/BackendImages.vue";

export default defineComponent({
	components: {
		BackendImages,
		Service
	},
	props: {
		component: {
			type: String,
			required: false
		},
	},
	data() {
		return {
		};
	},
	methods: {

	},
});
</script>

<style scoped>

</style>
