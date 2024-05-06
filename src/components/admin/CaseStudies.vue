<template>
	<div>
		<div class="source-container">
			<CaseStudy/>
		</div>

		<AdminModal :is-open="isAdminModalOpen"
					:case-study="caseStudies[0]"
					:is-edit-mode="true"
					@changes-submitted="getCaseStudiesFromFirebase"
					@close="closeModal('admin')"/>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import CaseStudy from "@/components/case-study/CaseStudy.vue";
import firebase from "firebase/compat/app";
import AdminModal from "@/components/admin/AdminModal.vue";

interface CaseStudy {
	id: string;
	title: string;
	description: string;
	link: string;
	image: string;
}

export default defineComponent({
	components: {
		CaseStudy,
		AdminModal,
	},
	data() {
		return {
			isAdminModalOpen: false,
			caseStudies: [] as CaseStudy[],
		};
	},
	methods: {
		async getCaseStudiesFromFirebase() {
			const snapshot = await firebase.firestore().collection('studies').get();
			this.caseStudies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CaseStudy[];
		},
		openModal() {
			this.isAdminModalOpen = true;
		},
		closeModal() {
			this.isAdminModalOpen = false;
		},
	},
});
</script>

<style scoped>

</style>
