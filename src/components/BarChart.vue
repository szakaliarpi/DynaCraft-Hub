<template>
	<div>
		<div class="pl-90 bar-chart-grid">
			<div>
				<p v-if="isTool" class="semi-bold">{{ toolName }}</p>
				<p v-else class="semi-bold">{{ languages }}</p>
			</div>
			<div>
				<div class="bar-chart">
					<div v-if="isTool" class="content" :style="{ width: `${toolLevel}%` }"></div>
					<div v-else class="content" :style="{ width: `${languageLevel}%` }"></div>
				</div>
			</div>
		</div>
	</div>

</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
	props: {
		toolName: {
			type: String,
			required: true,
		},
		toolLevel: {
			type: Number,
			required: true,
		},
		languages: {
			type: String,
			required: true,
		},
		languageLevel: {
			type: Number,
			required: true,
		},
		isTool: {
			type: Boolean,
			required: true,
		},
	},
});
</script>

<style scoped>

</style>
