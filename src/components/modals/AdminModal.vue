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
						<img alt="upload" class="upload ml-20" src="../../assets/icons/upload.png"
							 @click="$refs.image_change.click()"/>
						<input ref="image_change" accept="image/*" class="d-none" type="file"
							   v-on:change="fileChanged($event, 'case-study')"/>
					</div>
				</div>
				<div v-else>
					<img v-show="!caseStudyFileName" alt="upload" class="upload" src="../../assets/icons/upload.png"
						 @click="$refs.image_upload.click()"/>
					<input ref="image_upload" accept="image/*" class="d-none" type="file"
						   v-on:change="fileChanged($event, 'case-study')"/>
					<div v-show="caseStudyFileName" class="file-name">
						<div>
							{{ this.caseStudyFileName }}
						</div>
						<img alt="remove" class="remove" src="../../assets/icons/red-trash.png" @click="removeImage()"/>
					</div>
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
						<input v-model="language.level" placeholder="0" type="number" class="mb-10">
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
							<img alt="remove" class="remove-item" src="../../assets/icons/red-trash.png" @click="removeTool(tool)"/>
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
							<img alt="remove" class="remove-item" src="../../assets/icons/red-trash.png" @click="removeSkill(skill)"/>
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
							<img alt="remove" class="remove-item-top" src="../../assets/icons/red-trash.png" @click="removeEducation(edu)"/>
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
							<img alt="remove" class="remove-item" src="../../assets/icons/red-trash.png" @click="removeLanguage(language)"/>
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
							<img alt="remove" class="remove-item-top" src="../../assets/icons/red-trash.png" @click="removeExperience(experience)"/>
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
			</div>

			<div v-show="component === 'services'">
				<label for="title">Title</label>
				<input v-model="editedServices.title" placeholder="Title" type="text">
				<label for="description">Description</label>
				<textarea v-model="editedServices.description" placeholder="Description"></textarea>
				<label for="image">Image</label>
				<div v-if="isEditMode">
					<div class="modal-image-container">
						<img :src="editedServices.image" alt="services image" class="modal-image"/>
						<img alt="upload" class="upload ml-20" src="../../assets/icons/upload.png" @click="$refs.service_image.click()"/>
						<input ref="service_image" accept="image/*" class="d-none" type="file" v-on:change="fileChanged($event, 'services')"/>
					</div>
				</div>
				<div v-else>
					<img v-show="!serviceFileName" alt="upload" class="upload" src="../../assets/icons/upload.png" @click="$refs.service_upload.click()"/>
					<input ref="service_upload" accept="image/*" class="d-none" type="file" v-on:change="fileChanged($event, 'services')"/>
					<div v-show="serviceFileName" class="file-name">
						<div>{{ serviceFileName }}</div>
						<img alt="remove" class="remove" src="../../assets/icons/red-trash.png" @click="removeImage()"/>
					</div>
				</div>
				<label for="boxes">Boxes <mark>(press enter to add more)</mark></label>
				<div class="box-container">
					<div v-for="box in editedServices.boxes" :key="box.id">
						<div class="services-shadowed-boxes">
							<img alt="cross" src="../../assets/icons/cross.png" class="cross" @click="removeBox(box.id, editedServices.id)"/>
							{{ box.name }}
						</div>
					</div>
				</div>
				<div v-show="isAddBoxActive">
					<input v-model="newBox.name" placeholder="box name" type="text" class="mb-10 mt-10" @keydown.enter="addBox">
				</div>
				<div v-show="!isAddBoxActive" class="about-addition-box">
					<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png" @click="isAddBoxActive = true"/>
				</div>
			</div>

			<div v-show="component === 'backend'">
				<label for="boxes">Upload image<br></label>
				<img v-show="!backendFileName" alt="upload" class="upload" src="../../assets/icons/upload.png"
					 @click="$refs.backend_image_upload.click()"/>
				<input ref="backend_image_upload" accept="image/*" class="d-none" type="file"
					   v-on:change="fileChanged($event, 'backend')"/>
				<div v-show="backendFileName" class="file-name">
					<div>
						{{ this.backendFileName }}
					</div>
					<img alt="remove" class="remove" src="../../assets/icons/red-trash.png" @click="removeImage()"/>
				</div>

				<label for="Link">Link</label>
				<input v-model="editedImages.link" placeholder="Link" type="text">
			</div>

			<div class="text-center mt-30">
				<button class="button button--orange mr-50" :class="{'disabled' : saveDisabled}" :disabled="saveDisabled" @click="submitChanges">Save</button>
				<button class="button button--white" @click="closeModal">Cancel</button>
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
import {ServiceType} from "@/components/types/ServiceType";
import {BackendType} from "@/components/types/BackendType";
import {BoxType} from "@/components/types/BoxType";
import {db} from "@/main";

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
		service: {
			type: Object as PropType<ServiceType>,
			required: false,
		},
		backend: {
			type: Object as PropType<BackendType>,
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
			editedServices: {} as ServiceType,
			editedImages: {} as BackendType,
			fileItem: null as File | null,
			caseStudyFileName: '' as string,
			serviceFileName: '' as string,
			selectedFile: null as File | null,
			oldStudyImageUrl: null as string | null,
			oldServiceImageUrl: null as string | null,
			oldBackendImageImageUrl: null as string | null,
			isAddToolActive: false as boolean,
			isAddExperienceActive: false as boolean,
			isAddLanguageActive: false as boolean,
			isAddSkillActive: false as boolean,
			isAddEducationActive: false as boolean,
			isAddBoxActive: false as boolean,
			newTool: {} as ToolType,
			newExperience: {} as ExperienceType,
			newLanguage: {} as LanguageType,
			newSkill: {} as SkillType,
			newEducation: {} as EducationType,
			newBox: {} as BoxType,
			updatedTools: [] as ToolType[],
			updatedSkills: [] as SkillType[],
			updatedEducations: [] as EducationType[],
			updatedLanguages: [] as LanguageType[],
			updatedExperiences: [] as ExperienceType[],
			updatedBoxes: [] as BoxType[],
			originalCaseStudy: {} as CaseStudyType,
			originalPost: {} as PostType,
			originalAbouts: {} as AboutMeType,
			originalServices: {} as ServiceType,
			originalBackend: {} as BackendType,
			backendFileName: '' as string,
		};
	},
	watch: {
		caseStudy(newCaseStudy: CaseStudyType) {
			this.editedCaseStudy = {...newCaseStudy};
			this.originalCaseStudy = { ...newCaseStudy };
			this.oldStudyImageUrl = this.editedCaseStudy?.image;
		},
		post(newPost: PostType) {
			this.editedPost = {...newPost};
			this.originalPost = { ...newPost };
		},
		about(newAbout: AboutMeType) {
			this.editedAbouts = {...newAbout};
			this.originalAbouts = JSON.parse(JSON.stringify(newAbout)); // Deep copy
		},
		service(newService: ServiceType) {
			this.editedServices = { ...newService };
			this.originalServices = { ...newService };
			this.oldServiceImageUrl = this.editedServices.image;
		},
		backend (newImage: BackendType) {
			this.editedImages = { ...newImage };
			this.originalBackend = { ...newImage };
			this.oldServiceImageUrl = this.editedImages.image;
		}
	},
	computed: {
		saveDisabled() :any {
			return !this.isModified;
		},
		isModified() :any {
			switch (this.component) {
				case 'case-studies':
					return JSON.stringify(this.originalCaseStudy) !== JSON.stringify(this.editedCaseStudy);
				case 'posts':
					return JSON.stringify(this.originalPost) !== JSON.stringify(this.editedPost);
				case 'about-me':
					console.log(this.originalAbouts);
					console.log(this.editedAbouts);
					return !this.deepEqual(this.originalAbouts, this.editedAbouts); // Use deepEqual
				case 'services':
					return JSON.stringify(this.originalServices) !== JSON.stringify(this.editedServices);
				case 'backend':
					return JSON.stringify(this.originalBackend) !== JSON.stringify(this.editedImages);
				default:
					break;
			}
		}
	},
	methods: {
		closeModal() {
			this.fileItem = null;
			this.caseStudyFileName = '';
			this.serviceFileName = '';
			this.isAddToolActive = false;
			this.isAddEducationActive = false;
			this.isAddSkillActive = false;
			this.isAddLanguageActive = false;
			this.isAddExperienceActive = false;
			this.isAddBoxActive = false;
			this.$emit("close");
		},
		async submitChanges() { //edit
			if (this.isEditMode) {
				if (this.component === 'case-studies') {
					if (this.oldStudyImageUrl === this.editedCaseStudy.image) {
						await firebase.firestore().collection('studies').doc(this.editedCaseStudy.id!).update({
							title: this.editedCaseStudy.title,
							description: this.editedCaseStudy.description,
							link: this.editedCaseStudy.link
						}).then(() => {
							this.$emit('changes-submitted');
						});
					} else {
						this.deleteImage(this.oldStudyImageUrl as string);

						let storageRef = firebase.storage().ref("images/" + this.caseStudyFileName);
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
				} else if (this.component === 'services') {
					if (this.oldServiceImageUrl === this.editedServices.image) {
						await firebase.firestore().collection('services').doc(this.editedServices.id!).update({
							title: this.editedServices.title,
							description: this.editedServices.description,
						}).then(() => {
							this.$emit('changes-submitted');
						});
					} else {
						this.deleteImage(this.oldServiceImageUrl as string);

						let storageRef = firebase.storage().ref("images/" + this.serviceFileName);
						let uploadTask = storageRef.put(this.fileItem as any);

						uploadTask.on("state_changed", (snapshot) => {
							console.log(snapshot);
						}, (error) => {
							console.log(error);
						}, () => {
							uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
								await firebase.firestore().collection('services').doc(this.editedServices.id!).update({
									title: this.editedServices.title,
									description: this.editedServices.description,
									image: url
								}).then(() => {
									this.$emit('changes-submitted');
								});
							});
						});
					}
					if (this.newBox.name) {
						this.newBox.id = this.generateId();
						await firebase.firestore().collection('services').doc(this.editedServices.id).update({
							boxes: firebase.firestore.FieldValue.arrayUnion(this.newBox)
						}).then(() => {
							this.$emit('changes-submitted');
							console.log("box successfully added");
						}).catch((error) => {
							console.error("Error adding box:", error);
						});
					}
				}
			} else { //addition
				if (this.component === 'case-studies') { //Studies
					if (!this.fileItem) {
						console.error("No file selected for upload.");
						return;
					}
					let storageRef = firebase.storage().ref("images/" + this.caseStudyFileName);
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
				} else if (this.component === 'posts') { //Posts
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
				} else if (this.component === 'about-me') { //About
					if (this.newTool.name && this.newTool.level) {
						this.newTool.id = this.generateId();
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
						this.newLanguage.id = this.generateId();
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
						this.newEducation.id = this.generateId();
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
				} else if (this.component === 'services') { //Services
					if (!this.fileItem) {
						console.error("No file selected for upload.");
						return;
					}
					let storageRef = firebase.storage().ref("images/" + this.serviceFileName);
					let uploadTask = storageRef.put(this.fileItem);
					let boxesArray: BoxType[] = [];

					if (this.newBox.name) {
						this.newBox.id = this.generateId();
						boxesArray.push(this.newBox);
					}
					uploadTask.on("state_changed", (snapshot) => {
						console.log(snapshot);
					}, (error) => {
						console.log(error);
					}, () => {
						uploadTask.snapshot.ref.getDownloadURL().then((url) => {
							firebase.firestore().collection('services').add({
								title: this.editedServices.title,
								description: this.editedServices.description,
								image: url,
								boxes: boxesArray,
								timestamp: firebase.firestore.FieldValue.serverTimestamp()
							}).then(() => {
								this.$emit('changes-submitted');
								console.log("document successfully added");
							}).catch((error) => {
								console.error("Error adding document:", error);
							});
						});
					});
				} else if (this.component === 'backend') { //Backend images
					if (!this.fileItem) {
						console.error("No file selected for upload.");
						return;
					}
					let storageRef = firebase.storage().ref("images/" + this.backendFileName);
					let uploadTask = storageRef.put(this.fileItem);
					let autoId = db.collection("backend").doc().id;

					uploadTask.on("state_changed", (snapshot) => {
						console.log(snapshot);
					}, (error) => {
						console.log(error);
					}, () => {
						uploadTask.snapshot.ref.getDownloadURL().then((url) => {
							db.collection("backend").doc(autoId).set({
								id: autoId,
								image: url,
								link: this.editedImages.link,
								timestamp: firebase.firestore.FieldValue.serverTimestamp()
							}).then(() => {
								this.$emit('changes-submitted');
								console.log("document successfully added");
							}).catch((error) => {
								console.error("Error adding document:", error);
							});
						});
					});
				}
			}
			this.closeModal();
		},
		fileChanged(event: any, type: string) {
			this.fileItem = event.target.files[0];
			if (type === 'case-study') {
				this.caseStudyFileName = this.fileItem?.name ?? '';
				const reader = new FileReader();
				reader.onload = () => {
					this.editedCaseStudy.image = reader.result as string;
				}
				reader.readAsDataURL(event.target.files[0]);
			} else if (type === 'services') {
				this.serviceFileName = this.fileItem?.name ?? '';
				const reader = new FileReader();
				reader.onload = () => {
					this.editedServices.image = reader.result as string;
				}
				reader.readAsDataURL(event.target.files[0]);
			} else {
				this.backendFileName = this.fileItem?.name ?? '';
				const reader = new FileReader();
				reader.onload = () => {
					this.editedImages.image = reader.result as string;
				}
				reader.readAsDataURL(event.target.files[0]);
			}
		},
		removeImage() {
			this.fileItem = null;
			this.caseStudyFileName = '';
			this.editedCaseStudy.image = '';
			this.serviceFileName = '';
			this.editedServices.image = '';
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
		generateId() : string{
			const length = 20;
			const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			let result = '';
			for (let i = 0; i < length; i++) {
				const randomIndex = Math.floor(Math.random() * characters.length);
				result += characters.charAt(randomIndex);
			}
			return result;
		},
		async removeTool(tool: ToolType) {
			const snapshot = await firebase.firestore().collection('about').get();
			const about = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as AboutMeType[];
			this.updatedTools = about[0].tool.filter(item => item.id !== tool.id);
			await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
				tool: this.updatedTools
			}).then(() => {
				this.editedAbouts.tool = this.updatedTools;
				this.$emit('changes-submitted');
				console.log("Tool successfully deleted");
			}).catch((error) => {
				console.error("Error deleting tool:", error);
			});
		},
		async removeSkill(skill: SkillType) {
			const snapshot = await firebase.firestore().collection('about').get();
			const about = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as AboutMeType[];
			this.updatedSkills = about[0].skill.filter(item => item.id !== skill.id);
			await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
				skill: this.updatedSkills
			}).then(() => {
				this.editedAbouts.skill = this.updatedSkills;
				this.$emit('changes-submitted');
				console.log("Skill successfully deleted");
			}).catch((error) => {
				console.error("Error deleting skill:", error);
			});
		},
		async removeEducation(education: EducationType) {
			const snapshot = await firebase.firestore().collection('about').get();
			const about = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as AboutMeType[];
			this.updatedEducations = about[0].education.filter(item => item.id !== education.id);
			await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
				education: this.updatedEducations
			}).then(() => {
				this.editedAbouts.education = this.updatedEducations;
				this.$emit('changes-submitted');
				console.log("Educations successfully deleted");
			}).catch((error) => {
				console.error("Error deleting educations:", error);
			});
		},
		async removeExperience(experience: ExperienceType) {
			const snapshot = await firebase.firestore().collection('about').get();
			const about = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as AboutMeType[];
			this.updatedExperiences = about[0].experience.filter(item => item.id !== experience.id);
			await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
				experience: this.updatedExperiences
			}).then(() => {
				this.editedAbouts.experience = this.updatedExperiences;
				this.$emit('changes-submitted');
				console.log("Tool successfully deleted");
			}).catch((error) => {
				console.error("Error deleting experience:", error);
			});
		},
		async removeLanguage(language: LanguageType) {
			const snapshot = await firebase.firestore().collection('about').get();
			const about = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as AboutMeType[];
			this.updatedLanguages = about[0].languages.filter(item => item.id !== language.id);
			await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
				languages: this.updatedLanguages
			}).then(() => {
				this.editedAbouts.languages = this.updatedLanguages;
				this.$emit('changes-submitted');
				console.log("Language successfully deleted");
			}).catch((error) => {
				console.error("Error deleting language:", error);
			});
		},
		async removeBox(boxId: string, serviceId: string) {
			try {
				// Reference to the specific service document
				const serviceRef = firebase.firestore().collection('services').doc(serviceId);
				// Get the document
				const doc = await serviceRef.get();
				if (doc.exists) {
					// Get the service data
					const serviceData = doc.data();
					// Check if serviceData and serviceData.boxes are defined
					if (serviceData && Array.isArray(serviceData.boxes)) {
						// Filter out the box to be removed
						const updatedBoxes = serviceData.boxes.filter((box: any) => box.id !== boxId);

						// Update the document with the new array
						await serviceRef.update({ boxes: updatedBoxes });

						// Update local state
						this.editedServices.boxes = this.editedServices.boxes.filter((box: any) => box.id !== boxId);

						console.log(`Box with id ${boxId} removed successfully`);
						this.$emit('changes-submitted');
					} else {
						console.error('Service data or boxes array is undefined');
					}
				} else {
					console.log('Service document does not exist');
				}
			} catch (error) {
				console.error('Error removing box: ', error);
				alert(error);
			}
		},
		addBox() {
			if (this.newBox.name.trim() !== '') {
				this.editedServices.boxes.push({ id: this.generateId(), name: this.newBox.name });
				this.newBox.name = '';
				this.isAddBoxActive = false;
			}
		},
		deepEqual(obj1: any, obj2: any) {
			if (obj1 === obj2) return true;
			if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;

			const keys1 = Object.keys(obj1);
			const keys2 = Object.keys(obj2);

			if (keys1.length !== keys2.length) return false;

			for (const key of keys1) {
				if (!keys2.includes(key)) return false;
				if (!this.deepEqual(obj1[key], obj2[key])) return false;
			}
			return true;
		},

	}
});
</script>

<style scoped>
/* Add your styles here */
</style>
