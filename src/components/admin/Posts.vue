<template>
	<div class="source-container">
		<Post :component="component"/>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Post from "@/components/dynamic-components/Post.vue";


export default defineComponent({
	components: {
		Post,
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
