<template>
	<div v-if="isOpen" class="modal">
		<div class="modal-content">
			<label for="title">Title</label>
			<input v-model="editedCaseStudy.title" type="text" placeholder="Title">
			<label for="description">Description</label>
			<textarea v-model="editedCaseStudy.description" placeholder="Description"/>
			<label for="Link">Link</label>
			<input v-model="editedCaseStudy.link" type="text" placeholder="Link">
			<label for="image">Image URL</label>
			<input v-model="editedCaseStudy.image" type="text" placeholder="Image URL">
			<div class="text-center mt-30">
				<button class="button button--orange" @click="submitChanges">Save</button>
				<button class="button button--white" @click="closeModal">Cancel</button>
			</div>

		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import firebase from "firebase/compat/app";

export default defineComponent({
	props: {
		isOpen: {
			type: Boolean,
			required: true
		},
		caseStudy: {
			type: Object,
			default: () => ({
				id: "",
				title: "",
				description: "",
				link: "",
				image: ""
			})
		}
	},
	data() {
		return {
			editedCaseStudy: { ...this.caseStudy }
		};
	},
	methods: {
		closeModal() {
			this.$emit("close");
		},
		async submitChanges() {
			// Update the case study in the database
			await firebase.firestore().collection('studies').doc(this.editedCaseStudy.id).update({
				title: this.editedCaseStudy.title,
				description: this.editedCaseStudy.description,
				link: this.editedCaseStudy.link,
				image: this.editedCaseStudy.image
			});
			this.closeModal();
		}
	}
});
</script>

<style scoped>

</style>
