<template>
	<div v-if="isOpen !== undefined && isOpen" class="modal">
		<div class="modal-content scrollbar">
			<div v-show="component === 'case-studies'">
				<label for="title">Title</label>
				<input v-model="editedCaseStudy.title" placeholder="Title" type="text">
				<label for="description">Description</label>
				<textarea v-model="editedCaseStudy.description" placeholder="Description"></textarea>
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
						<img alt="remove" class="remove" src="../../assets/icons/red-trash.png" @click="removeImage()"/>
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

			<div v-show="component === 'about-me'">
				<div v-if="isEditMode">
					<label>Title</label>
					<input v-model="editedAbouts.title" placeholder="Title" type="text">
					<label>Name</label>
					<input v-model="editedAbouts.name" placeholder="Name" type="text">
					<label>Introduction</label>
					<textarea v-model="editedAbouts.introduction" placeholder="Introduction"></textarea>
					<label for="Link">Tools</label>
					<div v-for="(item, index) in editedAbouts.tool" :key="index" class="chart-container">
						<input v-model="item.name" placeholder="name" type="text" class="mb-10">
						<input v-model="item.level" placeholder="0" type="number" class="mb-10">
					</div>
					<label>Skills</label>
					<div v-for="skill in editedAbouts.skill">
						<input v-model="skill.title" placeholder="Title" type="text" class="mb-10">
						<textarea v-model="skill.description" placeholder="Title" class="mb-30"></textarea>
					</div>
					<label>Soft skills</label>
					<textarea v-model="editedAbouts.soft_skill" placeholder="Title"></textarea>
					<label>Education</label>
					<div v-for="edu in editedAbouts.education">
						<input v-model="edu.year" placeholder="year" type="text" class="mb-10">
						<input v-model="edu.institution" placeholder="institution" type="text" class="mb-10">
						<input v-model="edu.location" placeholder="location" type="text" class="mb-10">
						<input v-model="edu.course" placeholder="course" type="text" class="mb-30">
					</div>
					<label>Languages</label>
					<div class="chart-container" v-for="language in editedAbouts.languages">
						<input v-model="language.name" placeholder="language" type="text" class="mb-10">
						<input v-model="language.level" placeholder="level" type="number" class="mb-10">
					</div>
					<label>Experience</label>
					<div v-for="experience in editedAbouts.experience">
						<input v-model="experience.firm" placeholder="firm" type="text" class="mb-10">
						<input v-model="experience.duration" placeholder="duration" type="text" class="mb-10">
						<input v-model="experience.role" placeholder="role" type="text" class="mb-10">
					</div>
					<label>Facts</label>
					<textarea v-model="editedAbouts.fact" placeholder="fact"></textarea>
				</div>
				<div v-else>
					<div>
						<label for="Link">Tools</label>
						<div v-for="tool in editedAbouts.tool" class="about-addition-container">
							<p class="mr-10">{{ tool.name }}</p>
							<p class="mr-10 is-orange">{{ tool.level }}</p>
							<img alt="remove" class="remove-item" src="../../assets/icons/red-trash.png" @click="removeItem(tool)"/>
						</div>
						<div v-show="isAddToolActive" class="chart-container">
							<input v-model="newTool.name" placeholder="name" type="text" class="mb-10">
							<input v-model="newTool.level" placeholder="0" type="number" class="mb-10">
						</div>
						<div v-show="!isAddToolActive" class="about-addition-box" >
							<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png" @click="isAddToolActive = true"/>
						</div>
					</div>

					<div>
						<label>Skills</label>
						<div v-for="skill in editedAbouts.skill" class="about-addition-container">
							<p>{{ skill.title }}</p>
							<img alt="remove" class="remove-item" src="../../assets/icons/red-trash.png" @click="removeItem(skill)"/>
						</div>
						<div v-show="isAddSkillActive">
							<input v-model="newSkill.title" placeholder="Title" type="text" class="mb-10">
							<textarea v-model="newSkill.description" placeholder="Title" class="mb-30"></textarea>
						</div>
						<div v-show="!isAddSkillActive" class="about-addition-box">
							<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png" @click="isAddSkillActive = true"/>
						</div>
					</div>

					<div>
						<label>Education</label>
						<div v-for="edu in editedAbouts.education" class="about-education-container">
							<p class="align-left">{{ edu.year }}</p>
							<p class="align-left">{{ edu.institution }}</p>
							<p class="align-left">{{ edu.location }}</p>
							<p class="align-left">{{ edu.course }}</p>
							<img alt="remove" class="remove-item-top" src="../../assets/icons/red-trash.png" @click="removeItem(edu)"/>
						</div>
						<div v-show="isAddEducationActive">
							<input v-model="newEducation.year" placeholder="year" type="text" class="mb-10">
							<input v-model="newEducation.institution" placeholder="institution" type="text" class="mb-10">
							<input v-model="newEducation.location" placeholder="location" type="text" class="mb-10">
							<input v-model="newEducation.course" placeholder="course" type="text" class="mb-30">
						</div>
						<div v-show="!isAddEducationActive" class="about-addition-box">
							<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png" @click="isAddEducationActive = true"/>
						</div>
					</div>

					<div>
						<label>Languages</label>
						<div v-for="language in editedAbouts.languages" class="about-addition-container">
							<p>{{ language.name }}</p>
							<p class="mr-10 is-orange">{{ language.level }}</p>
							<img alt="remove" class="remove-item" src="../../assets/icons/red-trash.png" @click="removeItem(language)"/>
						</div>
						<div v-show="isAddLanguageActive" class="chart-container">
							<input v-model="newLanguage.name" placeholder="language" type="text" class="mb-10">
							<input v-model="newLanguage.level" placeholder="0" type="number" class="mb-10">
						</div>
						<div v-show="!isAddLanguageActive" class="about-addition-box">
							<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png" @click="isAddLanguageActive = true"/>
						</div>
					</div>

					<div>
						<label>Experience</label>
						<div v-for="experience in editedAbouts.experience" class="about-education-container">
							<p class="align-left">{{ experience.firm }}</p>
							<p class="align-left">{{ experience.duration }}</p>
							<p class="align-left">{{ experience.role }}</p>
							<img alt="remove" class="remove-item-top" src="../../assets/icons/red-trash.png" @click="removeItem(experience)"/>
						</div>
						<div v-show="isAddExperienceActive">
							<input v-model="newExperience.firm" placeholder="firm" type="text" class="mb-10">
							<input v-model="newExperience.duration" placeholder="duration" type="text" class="mb-10">
							<input v-model="newExperience.role" placeholder="role" type="text" class="mb-10">
						</div>
						<div v-show="!isAddExperienceActive" class="about-addition-box">
							<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png"  @click="isAddExperienceActive = true"/>
						</div>
					</div>
				</div>
				<div class="text-center mt-30">
					<button class="button button--orange mr-50" @click="submitChanges">Save</button>
					<button class="button button--white" @click="closeModal">Cancel</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import firebase from "firebase/compat/app";
import {CaseStudyType} from "@/components/types/CaseStudyType";
import {PostType} from "@/components/types/PostType";
import {AboutMeType} from "@/components/types/AboutMeType";
import {ToolType} from "@/components/types/ToolType";
import {SkillType} from "@/components/types/SkillType";
import {EducationType} from "@/components/types/EducationType";
import {LanguageType} from "@/components/types/LanguageType";
import {ExperienceType} from "@/components/types/ExperienceType";

// composition API in Vue.js with TypeScript,
export default defineComponent({
	props: {
		isOpen: {
			type: Boolean,
			required: true
		},
		caseStudy: {
			type: Object as PropType<CaseStudyType>,
			required: false,
		},
		post: {
			type: Object as PropType<PostType>,
			required: false,
		},
		about: {
			type: Object as PropType<AboutMeType>,
			required: false,
		},
		isEditMode: {
			type: Boolean,
			required: false
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
			editedAbouts: {} as AboutMeType,
			fileItem: null as File | null,
			fileName: '' as string,
			selectedFile: null as File | null,
			oldImageUrl: null as string | null,
			isAddToolActive: false as boolean,
			isAddExperienceActive: false as boolean,
			isAddLanguageActive: false as boolean,
			isAddSkillActive: false as boolean,
			isAddEducationActive: false as boolean,
			newTool: {} as ToolType,
			newExperience: {} as ExperienceType,
			newLanguage: {} as LanguageType,
			newSkill: {} as SkillType,
			newEducation: {} as EducationType,
		};
	},
	watch: {
		caseStudy(newCaseStudy: CaseStudyType) {
			this.editedCaseStudy = {...newCaseStudy};
			this.oldImageUrl = this.editedCaseStudy?.image;
		},
		post(newPost: PostType) {
			this.editedPost = {...newPost};
		},
		about(newAbout: AboutMeType) {
			this.editedAbouts = {...newAbout};
		}
	},
	methods: {
		closeModal() {
			this.fileItem = null;
			this.fileName = '';
			this.isAddToolActive = false;
			this.isAddEducationActive = false;
			this.isAddSkillActive = false;
			this.isAddLanguageActive = false;
			this.isAddExperienceActive = false;
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
				} else if (this.component === 'about-me') {
					console.log(this.editedAbouts.tool);
					await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
						education: this.editedAbouts.education,
						experience: this.editedAbouts.experience,
						fact: this.editedAbouts.fact,
						introduction: this.editedAbouts.introduction,
						languages: this.editedAbouts.languages,
						name: this.editedAbouts.name,
						skill: this.editedAbouts.skill,
						soft_skill: this.editedAbouts.soft_skill,
						title: this.editedAbouts.title,
						tool: this.editedAbouts.tool,
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
				} else if (this.component === 'about-me') {
					if (this.newTool.name && this.newTool.level) {
						await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
							tool: firebase.firestore.FieldValue.arrayUnion(this.newTool)
						}).then(() => {
							this.$emit('changes-submitted');
							console.log("Tool successfully added");
						}).catch((error) => {
							console.error("Error adding tool:", error);
						});
					}
					if (this.newLanguage.name && this.newLanguage.level) {
						await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
							languages: firebase.firestore.FieldValue.arrayUnion(this.newLanguage)
						}).then(() => {
							this.$emit('changes-submitted');
							console.log("Language successfully added");
						}).catch((error) => {
							console.error("Error adding language:", error);
						});
					}
					if (this.newEducation.year && this.newEducation.institution && this.newEducation.location && this.newEducation.course) {
						await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
							education: firebase.firestore.FieldValue.arrayUnion(this.newEducation)
						}).then(() => {
							this.$emit('changes-submitted');
							console.log("Education successfully added");
						}).catch((error) => {
							console.error("Error adding education:", error);
						});
					}
					if (this.newExperience.firm && this.newExperience.duration && this.newExperience.role) {
						await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
							experience: firebase.firestore.FieldValue.arrayUnion(this.newExperience)
						}).then(() => {
							this.$emit('changes-submitted');
							console.log("Experience successfully added");
						}).catch((error) => {
							console.error("Error adding experience:", error);
						});
					}
					if (this.newSkill.title && this.newSkill.description) {
						await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
							skill: firebase.firestore.FieldValue.arrayUnion(this.newSkill)
						}).then(() => {
							this.$emit('changes-submitted');
							console.log("Skill successfully added");
						}).catch((error) => {
							console.error("Error adding skill:", error);
						});
					}
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
		removeItem(item: ToolType | SkillType | EducationType | LanguageType | ExperienceType) {

		},

	},
});
</script>

<style scoped>
/* Add your styles here */
</style>
