<template>
	<div class="source-container">
		<AboutMe :component="component"/>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AboutMe from "@/components/dynamic-components/AboutMe.vue";

export default defineComponent({
	components: {
		AboutMe,
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

});
</script>

<style scoped>

</style>
