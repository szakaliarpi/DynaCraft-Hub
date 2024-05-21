<template>
	<div class="source-container">
		<CaseStudy :component="component"/>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import CaseStudy from "@/components/dynamic-components/CaseStudy.vue";
import firebase from "firebase/compat/app";
import AdminModal from "@/components/modals/AdminModal.vue";
import {CaseStudyType} from "@/components/types/CaseStudyType";

export default defineComponent({
	components: {
		CaseStudy,
		AdminModal,
	},
	props: {
		component: {
			type: String,
			required: false
		},
	},
	data() {
		return {
			caseStudies: [] as CaseStudyType[],
		};
	},
	methods: {
		async getCaseStudiesFromFirebase() {
			const snapshot = await firebase.firestore().collection('studies').get();
			this.caseStudies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CaseStudyType[];
		},
	},
});
</script>

<style scoped>

</style>
