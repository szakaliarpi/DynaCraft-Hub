<template>
	<div class="source-container">
		<AboutMe :component="component"/>
	</div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import {defineComponent} from "vue";
import AdminNavbar from "@/components/AdminNavbar.vue";
import AboutMe from "@/components/AboutMe.vue";
import {AboutMeType} from "@/components/types/AboutMeType";
import firebase from "firebase/compat/app";

export default defineComponent({
	components: {
		AboutMe,
		Navbar,
		AdminNavbar
	},
	props: {
		component: {
			type: String,
			required: false
		},
	},
	data() {
		return {
			abouts: [] as AboutMeType[],
		};
	},
	methods: {
		async getAboutMeFromFirebase() {
			const snapshot = await firebase.firestore().collection('about').get();
			this.abouts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as AboutMeType[];
		},
	},
});
</script>

<style scoped>

</style>
