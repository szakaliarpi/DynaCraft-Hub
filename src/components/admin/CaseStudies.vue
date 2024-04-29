<template>
	<div>
		<div class="source-container">
			<CaseStudy/>

		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import CaseStudy from "@/components/case-study/CaseStudy.vue";

export default defineComponent({
	components: {
		CaseStudy,
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
