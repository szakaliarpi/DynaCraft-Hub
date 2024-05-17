<template>
	<div class="source-container">
		<Post :component="component"/>
	</div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import {defineComponent} from "vue";
import AdminNavbar from "@/components/admin/AdminNavbar.vue";
import Post from "@/components/dynamic-components/Post.vue";
import firebase from "firebase/compat/app";
import {PostType} from "@/components/types/PostType";

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
		return {
			Posts: [] as PostType[],
		};
	},
	methods: {
		async getPostsFromFirebase() {
			const snapshot = await firebase.firestore().collection('posts').get();
			this.Posts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as PostType[];
		},
	},
});
</script>

<style scoped>

</style>
