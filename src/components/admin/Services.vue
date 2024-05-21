<template>
	<div class="source-container">
		<Service :component="component"/>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Service from "@/components/dynamic-components/Service.vue";

export default defineComponent({
	components: {
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
