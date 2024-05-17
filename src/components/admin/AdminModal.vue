<template>
	<div v-if="isOpen !== undefined && isOpen" class="modal">
		<div class="modal-content">
			<div v-show="component === 'case-studies'">
				<label for="title">Title</label>
				<input v-model="editedCaseStudy.title" placeholder="Title" type="text">
				<label for="description">Description</label>
				<textarea v-model="editedCaseStudy.description" class="" placeholder="Description"></textarea>
				<label for="Link">Link</label>
				<input v-model="editedCaseStudy.link" placeholder="Link" type="text">
				<label for="image">Image</label>
				<div v-if="isEditMode">
					<div class="modal-image-container">
						<img :src="editedCaseStudy.image" alt="case study image" class="modal-image"/>
						<img alt="upload" class="upload" src="../../assets/icons/upload.png"
							 @click="$refs.image_change.click()"/>
						<input ref="image_change" accept="image/*" class="d-none" type="file"
							   v-on:change="fileChanged($event)"/>
					</div>
				</div>
				<div v-else>
					<img v-show="!fileName" alt="upload" class="height-50" src="../../assets/icons/upload.png"
						 @click="$refs.image_upload.click()"/>
					<input ref="image_upload" accept="image/*" class="d-none" type="file"
						   v-on:change="fileChanged($event)"/>
					<div v-show="fileName" class="file-name">
						<div>
							{{ this.fileName }}
						</div>
						<img alt="delete" class="remove" src="../../assets/icons/red-trash.png" @click="removeImage()"/>
					</div>
				</div>
				<div class="text-center mt-30">
					<button class="button button--orange mr-50" @click="submitChanges">Save</button>
					<button class="button button--white" @click="closeModal">Cancel</button>
				</div>
			</div>

			<div v-show="component === 'posts'">
				<label for="title">Title</label>
				<input v-model="editedPost.title" placeholder="Title" type="text">
				<label for="description">Description</label>
				<textarea v-model="editedPost.description" class="" placeholder="Description"></textarea>
				<label for="Link">Date</label>
				<input v-model="editedPost.date" placeholder="Date" type="text">
				<label for="image">Link</label>
				<input v-model="editedPost.link" placeholder="Link" type="text">
				<div class="text-center mt-30">
					<button class="button button--orange mr-50" @click="submitChanges">Save</button>
					<button class="button button--white" @click="closeModal">Cancel</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import firebase from "firebase/compat/app";
import {CaseStudyType} from "@/components/types/CaseStudyType";
import {PostType} from "@/components/types/PostType";

// composition API in Vue.js with TypeScript,
export default defineComponent({
	props: {
		isOpen: {
			type: Boolean,
			required: true
		},
		caseStudy: {
			type: Object as () => CaseStudyType,
			default: () => ({
				id: "",
				title: "",
				description: "",
				link: "",
				image: ""
			})
		},
		post: {
			type: Object as () => PostType,
			default: () => ({
				id: "",
				title: "",
				description: "",
				date: "",
				link: ""
			})
		},
		isEditMode: {
			type: Boolean,
			required: true
		},
		component: {
			type: String,
			required: false
		},
	},
	data() {
		return {
			editedCaseStudy: {} as CaseStudyType,
			editedPost: {} as PostType,
			fileItem: null as File | null,
			fileName: '' as string,
			selectedFile: null as File | null,
			oldImageUrl: null as string | null,
		};
	},
	watch: {
		caseStudy(newCaseStudy: CaseStudyType) {
			this.editedCaseStudy = {...newCaseStudy};
			this.oldImageUrl = this.editedCaseStudy?.image;
		},
		post(newPost: PostType) {
			this.editedPost = {...newPost};
		}
	},
	methods: {
		closeModal() {
			this.fileItem = null;
			this.fileName = '';
			this.$emit("close");
		},
		async submitChanges() {
			if (this.isEditMode) {
				if (this.component === 'case-studies') {
					if (this.oldImageUrl === this.editedCaseStudy.image) {
						await firebase.firestore().collection('studies').doc(this.editedCaseStudy.id!).update({
							title: this.editedCaseStudy.title,
							description: this.editedCaseStudy.description,
							link: this.editedCaseStudy.link
						}).then(() => {
							this.$emit('changes-submitted');
						});
					} else {
						this.deleteImage(this.oldImageUrl as string);

						let storageRef = firebase.storage().ref("images/" + this.fileName);
						let uploadTask = storageRef.put(this.fileItem as any);

						uploadTask.on("state_changed", (snapshot) => {
							console.log(snapshot);
						}, (error) => {
							console.log(error);
						}, () => {
							uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
								await firebase.firestore().collection('studies').doc(this.editedCaseStudy.id!).update({
									title: this.editedCaseStudy.title,
									description: this.editedCaseStudy.description,
									link: this.editedCaseStudy.link,
									image: url
								}).then(() => {
									this.$emit('changes-submitted');
								});
							});
						});
					}
				} else if (this.component === 'posts') {
					await firebase.firestore().collection('posts').doc(this.editedPost.id!).update({
						title: this.editedPost.title,
						description: this.editedPost.description,
						date: this.editedPost.date,
						link: this.editedPost.link
					});
					this.$emit('changes-submitted');
				}
			} else {
				if (this.component === 'case-studies') {
					if (!this.fileItem) {
						console.error("No file selected for upload.");
						return;
					}
					let storageRef = firebase.storage().ref("images/" + this.fileName);
					let uploadTask = storageRef.put(this.fileItem);

					uploadTask.on("state_changed", (snapshot) => {
						console.log(snapshot);
					}, (error) => {
						console.log(error);
					}, () => {
						uploadTask.snapshot.ref.getDownloadURL().then((url) => {
							firebase.firestore().collection('studies').add({
								title: this.editedCaseStudy.title,
								description: this.editedCaseStudy.description,
								link: this.editedCaseStudy.link,
								image: url,
								timestamp: firebase.firestore.FieldValue.serverTimestamp()
							}).then(() => {
								this.$emit('changes-submitted');
								console.log("document successfully added");
							}).catch((error) => {
								console.error("Error adding document:", error);
							});
						});
					});
				} else if (this.component === 'posts') {
					firebase.firestore().collection('posts').add({
						title: this.editedPost.title,
						description: this.editedPost.description,
						date: this.editedPost.date,
						link: this.editedPost.link
					}).then(() => {
						this.$emit('changes-submitted');
						console.log("document successfully added");
					}).catch((error) => {
						console.error("Error adding document:", error);
					});
				}
			}
			this.closeModal();
		},
		fileChanged(event: any) {
			this.fileItem = event.target.files[0];
			this.fileName = this.fileItem?.name ?? '';
			const reader = new FileReader();
			reader.onload = () => {
				this.editedCaseStudy.image = reader.result as string;
			}
			reader.readAsDataURL(event.target.files[0]);
		},
		removeImage() {
			this.fileItem = null;
			this.fileName = '';
			this.editedCaseStudy.image = '';
		},
		deleteImage(imageUrl: string) {
			const imageRef = firebase.storage().refFromURL(imageUrl);
			imageRef.delete()
				.then(() => {
					console.log('Image deleted successfully.');
				})
				.catch((error) => {
					console.error('Error deleting image:', error);
				});
		},
	},
});
</script>

<style scoped>
/* Add your styles here */
</style>
