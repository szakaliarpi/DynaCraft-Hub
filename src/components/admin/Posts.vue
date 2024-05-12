<template>
	<div class="source-container">
		<Post :component="component"/>
	</div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import {defineComponent} from "vue";
import AdminNavbar from "@/components/AdminNavbar.vue";
import Post from "@/components/Post.vue";

export default defineComponent({
	components: {
		Navbar,
		AdminNavbar,
		Post,
	},
	props: {
		component: {
			type: String,
			required: false
		},
	},
	data() {
		return {};
	},
	methods: {},
});
</script>

<style scoped>

</style>
