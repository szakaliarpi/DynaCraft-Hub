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
							{{ truncateContent(caseStudyFileName) }}
						</div>
						<img alt="remove" class="remove" src="../../assets/icons/red-trash.png" @click="removeImage"/>
					</div>
				</div>
			</div>

			<div v-show="component === 'posts'">
				<label for="title">Title</label>
				<input v-model="editedPost.title" placeholder="Title" type="text"/>
				<label for="description">Description</label>
				<textarea v-model="editedPost.description" class="" placeholder="Description"></textarea>
				<label for="Link">Date</label>
				<input v-model="editedPost.date" placeholder="Date" type="text"/>
				<label for="image">Link</label>
				<input v-model="editedPost.link" placeholder="Link" type="text"/>
			</div>

			<div v-show="component === 'about-me'">
				<div v-if="isEditMode">
					<label>Title</label>
					<input v-model="editedAbouts.title" placeholder="Title" type="text"/>
					<label>Name</label>
					<input v-model="editedAbouts.name" placeholder="Name" type="text"/>
					<label>Introduction</label>
					<textarea v-model="editedAbouts.introduction" placeholder="Introduction"></textarea>
					<label for="Link">Tools</label>
					<div v-for="(item, index) in editedAbouts.tool" :key="index" class="chart-container">
						<input v-model="item.name" placeholder="name" type="text" class="mb-10"/>
						<input v-model="item.level" placeholder="0" type="number" class="mb-10"/>
					</div>
					<label>Skills</label>
					<div v-for="skill in editedAbouts.skill">
						<input v-model="skill.title" placeholder="Title" type="text" class="mb-10"/>
						<textarea v-model="skill.description" placeholder="Title" class="mb-30"></textarea>
					</div>
					<label>Soft skills</label>
					<textarea v-model="editedAbouts.soft_skill" placeholder="Title"></textarea>
					<label>Education</label>
					<div v-for="edu in editedAbouts.education">
						<input v-model="edu.year" placeholder="year" type="text" class="mb-10"/>
						<input v-model="edu.institution" placeholder="institution" type="text" class="mb-10"/>
						<input v-model="edu.location" placeholder="location" type="text" class="mb-10"/>
						<input v-model="edu.course" placeholder="course" type="text" class="mb-30"/>
					</div>
					<label>Languages</label>
					<div class="chart-container" v-for="language in editedAbouts.languages">
						<input v-model="language.name" placeholder="language" type="text" class="mb-10"/>
						<input v-model="language.level" placeholder="0" type="number" class="mb-10"/>
					</div>
					<label>Experience</label>
					<div v-for="experience in editedAbouts.experience">
						<input v-model="experience.firm" placeholder="firm" type="text" class="mb-10"/>
						<input v-model="experience.duration" placeholder="duration" type="text" class="mb-10"/>
						<input v-model="experience.role" placeholder="role" type="text" class="mb-10"/>
					</div>
					<label>Facts</label>
					<textarea v-model="editedAbouts.fact" placeholder="fact"></textarea>
				</div>
				<div v-else>
					<div>
						<label for="Link">Tools</label>
						<div v-for="(tool, index) in editedAbouts.tool" :class="{'about-addition-container' : index !== editedAbouts.tool.length-1 || !newToolAdded }">
							<p v-if="index !== editedAbouts.tool.length-1 || !newToolAdded" class="mr-10">{{ tool.name }}</p>
							<p v-if="index !== editedAbouts.tool.length-1 || !newToolAdded" class="mr-10 is-orange">{{ tool.level }}</p>
							<img v-if="index !== editedAbouts.tool.length-1 || !newToolAdded" alt="remove" class="remove-item" src="../../assets/icons/red-trash.png" @click="removeTool(tool)"/>

							<div v-if="index === editedAbouts.tool.length-1 && newToolAdded" class="chart-container">
								<input v-model="editedAbouts.tool[index].name"  placeholder="name" type="text" class="mb-10"/>
								<input v-model="editedAbouts.tool[index].level" @input="validateLevel(index)"
									   min=0 max=100 placeholder="0" type="number" class="mb-10"/>
							</div>
						</div>

						<div class="about-addition-box" >
							<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png" @click="addNewItem('tool')"/>
						</div>
					</div>

					<div>
						<label>Skills</label>
						<div v-for="(skill, index) in editedAbouts.skill" :class="{'about-education-container' : index !== editedAbouts.skill.length-1 || !newSkillAdded }">
							<p v-if="index !== editedAbouts.skill.length-1 || !newSkillAdded" class="mb-10">{{ skill.title }}</p>
							<p v-if="index !== editedAbouts.skill.length-1 || !newSkillAdded">{{ skill.description }}</p>
							<img v-if="index !== editedAbouts.skill.length-1 || !newSkillAdded" alt="remove" class="remove-item-top" src="../../assets/icons/red-trash.png" @click="removeSkill(skill)"/>

							<div v-if="index === editedAbouts.skill.length-1 && newSkillAdded">
								<input v-model="editedAbouts.skill[index].title" placeholder="Title" type="text" class="mb-10"/>
								<textarea v-model="editedAbouts.skill[index].description" placeholder="description" class="mb-10"></textarea>
							</div>
						</div>

						<div class="about-addition-box">
							<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png" @click="addNewItem('skill')"/>
						</div>
					</div>

					<div>
						<label>Education</label>
						<div v-for="(edu, index) in editedAbouts.education" :class="{'about-education-container' : index !== editedAbouts.education.length-1 || !newEducationAdded }">
							<p v-if="index !== editedAbouts.education.length-1 || !newEducationAdded" class="align-left">{{ edu.year }}</p>
							<p v-if="index !== editedAbouts.education.length-1 || !newEducationAdded" class="align-left">{{ edu.institution }}</p>
							<p v-if="index !== editedAbouts.education.length-1 || !newEducationAdded" class="align-left">{{ edu.location }}</p>
							<p v-if="index !== editedAbouts.education.length-1 || !newEducationAdded" class="align-left">{{ edu.course }}</p>
							<img v-if="index !== editedAbouts.education.length-1 || !newEducationAdded" alt="remove" class="remove-item-top" src="../../assets/icons/red-trash.png" @click="removeEducation(edu)"/>

							<div v-if="index === editedAbouts.education.length-1 && newEducationAdded">
								<input v-model="editedAbouts.education[index].year" placeholder="year" type="text" class="mb-10"/>
								<input v-model="editedAbouts.education[index].institution" placeholder="institution" type="text" class="mb-10"/>
								<input v-model="editedAbouts.education[index].location" placeholder="location" type="text" class="mb-10"/>
								<input v-model="editedAbouts.education[index].course" placeholder="course" type="text" class="mb-30"/>
							</div>
						</div>

						<div class="about-addition-box">
							<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png"  @click="addNewItem('education')"/>
						</div>
					</div>

					<div>
						<label>Languages</label>
						<div v-for="(language, index) in editedAbouts.languages" :class="{'about-addition-container' : index !== editedAbouts.languages.length-1 || !newLanguageAdded }">
							<p v-if="index !== editedAbouts.languages.length-1 || !newLanguageAdded">{{ language.name }}</p>
							<p v-if="index !== editedAbouts.languages.length-1 || !newLanguageAdded" class="mr-10 is-orange">{{ language.level }}</p>
							<img v-if="index !== editedAbouts.languages.length-1 || !newLanguageAdded" alt="remove" class="remove-item" src="../../assets/icons/red-trash.png" @click="removeLanguage(language)"/>

							<div v-if="index === editedAbouts.languages.length-1 && newLanguageAdded" class="chart-container">
								<input v-model="editedAbouts.languages[index].name" placeholder="language" type="text" class="mb-10"/>
								<input v-model="editedAbouts.languages[index].level" placeholder="0" min=0 max=100 @input="validateLevel(index)" type="number" class="mb-10"/>
							</div>
						</div>

						<div class="about-addition-box">
							<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png" @click="addNewItem('language')"/>
						</div>
					</div>

					<div>
						<label>Experience</label>
						<div v-for="(experience, index) in editedAbouts.experience" :class="{'about-education-container' : index !== editedAbouts.experience.length-1 || !newExperienceAdded }">
							<p v-if="index !== editedAbouts.experience.length-1 || !newExperienceAdded" class="align-left">{{ experience.firm }}</p>
							<p v-if="index !== editedAbouts.experience.length-1 || !newExperienceAdded" class="align-left">{{ experience.duration }}</p>
							<p v-if="index !== editedAbouts.experience.length-1 || !newExperienceAdded" class="align-left">{{ experience.role }}</p>
							<img v-if="index !== editedAbouts.experience.length-1 || !newExperienceAdded" alt="remove" class="remove-item-top" src="../../assets/icons/red-trash.png" @click="removeExperience(experience)"/>

							<div v-if="index === editedAbouts.experience.length-1 && newExperienceAdded">
								<input v-model="editedAbouts.experience[index].firm" placeholder="firm" type="text" class="mb-10"/>
								<input v-model="editedAbouts.experience[index].duration" placeholder="duration" type="text" class="mb-10"/>
								<input v-model="editedAbouts.experience[index].role" placeholder="role" type="text" class="mb-10"/>
							</div>
						</div>

						<div class="about-addition-box">
							<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png" @click="addNewItem('experience')"/>
						</div>
					</div>
				</div>
			</div>

			<div v-show="component === 'services'">
				<label for="title">Title</label>
				<input v-model="editedServices.title" placeholder="Title" type="text"/>
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
						<div>{{ truncateContent(serviceFileName) }}</div>
						<img alt="remove" class="remove" src="../../assets/icons/red-trash.png" @click="removeImage()"/>
					</div>
				</div>
				<label for="boxes">Boxes</label>
				<div class="box-container">
					<div v-for="(box, index) in editedServices.boxes" :key="box.id">
						<div :class="{'services-shadowed-boxes' : index !== editedServices.boxes.length-1 || !newBoxAdded }">
							<img v-if="index !== editedServices.boxes.length-1 || !newBoxAdded" alt="cross" src="../../assets/icons/cross.png"
								 :class="{'cross' : index !== editedServices.boxes.length-1 || !newBoxAdded }" @click="removeBox(box.id, editedServices.id)"/>
							{{ box.name }}
						</div>

						<div v-if="index === editedServices.boxes.length-1 && newBoxAdded">
							<input v-model="editedServices.boxes[index].name" placeholder="box name" type="text" class="mb-10 mt-10"/>
						</div>
					</div>
				</div>

				<div class="about-addition-box">
					<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png" @click="addNewItem('service')"/>
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
						{{ truncateContent(backendFileName) }}
					</div>
					<img alt="remove" class="remove" src="../../assets/icons/red-trash.png" @click="removeImage"/>
				</div>

				<label for="Link">Link</label>
				<input v-model="editedImages.link" placeholder="Link" type="text"/>
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
import {Messages} from "@/config/config";

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
			isAddExperienceActive: false as boolean,
			isAddLanguageActive: false as boolean,
			isAddSkillActive: false as boolean,
			isAddEducationActive: false as boolean,
			isAddBoxActive: false as boolean,
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
			enter: Messages.enter,
			newToolAdded: false as boolean,
			newSkillAdded: false as boolean,
			newLanguageAdded: false as boolean,
			newEducationAdded: false as boolean,
			newExperienceAdded: false as boolean,
			newServiceAdded: false as boolean,
			newBoxAdded: false as boolean,
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
			this.originalServices = JSON.parse(JSON.stringify(newService)); // Deep copy
			this.oldServiceImageUrl = this.editedServices.image;
		},
		backend (newImage: BackendType) {
			this.editedImages = { ...newImage };
			this.originalBackend = { ...newImage };
			this.oldServiceImageUrl = this.editedImages.image;
		}
	},
	computed: {
		saveDisabled() : boolean {
			return !this.isModified;
		},
		isModified() :any {
			switch (this.component) {
				case 'case-studies':
					return JSON.stringify(this.originalCaseStudy) !== JSON.stringify(this.editedCaseStudy);
				case 'posts':
					return JSON.stringify(this.originalPost) !== JSON.stringify(this.editedPost);
				case 'about-me':
					return !this.deepEqual(this.originalAbouts, this.editedAbouts);
				case 'services':
					return !this.deepEqual(this.originalServices, this.editedServices);
				case 'backend':
					return JSON.stringify(this.originalBackend) !== JSON.stringify(this.editedImages);
				default:
					break;
			}
		}
	},
	methods: {
		addNewItem(type: string) {
			switch (type) {
				case 'tool':
					this.newToolAdded = true;
					if (this.editedAbouts.tool && this.editedAbouts.tool.length > 0) {
						const lastTool = this.editedAbouts.tool[this.editedAbouts.tool.length - 1];
						if (lastTool.name !== "" && lastTool.level !== 0) {
							this.editedAbouts.tool.push({id: this.generateId(), level: 0, name: ""});
						}
					} else {
						this.editedAbouts.tool = [{id: this.generateId(), level: 0, name: ""}];
					}
					break;
				case 'skill':
					this.newSkillAdded = true;
					if (this.editedAbouts.skill && this.editedAbouts.skill.length > 0) {
						const lastSkill = this.editedAbouts.skill[this.editedAbouts.skill.length - 1];
						if (lastSkill.title !== "" && lastSkill.description !== "") {
							this.editedAbouts.skill.push({id: this.generateId(), title: "", description: ""});
						}
					} else {
						this.editedAbouts.skill = [{id: this.generateId(), title: "", description: ""}];
					}
					break;
				case 'education':
					this.newEducationAdded = true;
					if (this.editedAbouts.education && this.editedAbouts.education.length > 0) {
						const lastEducation = this.editedAbouts.education[this.editedAbouts.education.length - 1];
						if (lastEducation.year !== "" && lastEducation.location !== "" && lastEducation.institution !== "" && lastEducation.course !== "") {
							this.editedAbouts.education.push({id: this.generateId(), year: "", location: "", institution: "", course: ""});
						}
					} else {
						this.editedAbouts.education = [{id: this.generateId(), year: "", location: "", institution: "", course: ""}];
					}
					break;
				case 'language':
					this.newLanguageAdded = true;
					if (this.editedAbouts.languages && this.editedAbouts.languages.length > 0) {
						const lastLanguage = this.editedAbouts.languages[this.editedAbouts.languages.length - 1];
						if (lastLanguage.name !== "" && lastLanguage.level !== 0 ) {
							this.editedAbouts.languages.push({id: this.generateId(), name: "", level: 0 });
						}
					} else {
						this.editedAbouts.languages = [{id: this.generateId(), name: "", level: 0 }];
					}
					break;
				case 'experience':
					this.newExperienceAdded = true;
					if (this.editedAbouts.experience && this.editedAbouts.experience.length > 0) {
						const lasExperience = this.editedAbouts.experience[this.editedAbouts.experience.length - 1];
						if (lasExperience.role !== "" && lasExperience.firm !== "" && lasExperience.duration !== "") {
							this.editedAbouts.experience.push({id: this.generateId(), role: "", firm: "", duration: ""});
						}
					} else {
						this.editedAbouts.experience = [{id: this.generateId(), role: "", firm: "", duration: ""}];
					}
					break;
				case 'service':
					this.newBoxAdded = true;
					if (this.editedServices.boxes && this.editedServices.boxes.length > 0) {
						const lastService = this.editedServices.boxes[this.editedServices.boxes.length - 1];
						if (lastService.name !== "") {
							this.editedServices.boxes.push({id: this.generateId(), name: ""});
						}
					} else {
						this.editedServices.boxes = [{id: this.generateId(), name: ""}];
					}
					break;
				default :
					break;
			}
		},
		closeModal() {
			this.fileItem = null;
			this.caseStudyFileName = '';
			this.serviceFileName = '';
			this.backendFileName = '';
			this.editedImages.link = '';
			this.isAddEducationActive = false;
			this.isAddSkillActive = false;
			this.isAddLanguageActive = false;
			this.isAddExperienceActive = false;
			this.isAddBoxActive = false;
			this.newToolAdded = false;
			this.newSkillAdded = false;
			this.newLanguageAdded = false;
			this.newExperienceAdded = false;
			this.newEducationAdded = false;
			this.newServiceAdded = false;
			this.newBoxAdded = false;
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
							boxes: this.editedServices.boxes
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
									image: url,
									boxes: this.editedServices.boxes
								}).then(() => {
									this.$emit('changes-submitted');
								});
							});
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
					let autoId = db.collection("posts").doc().id;
					db.collection("posts").doc(autoId).set({
						title: this.editedPost.title,
						description: this.editedPost.description,
						date: this.editedPost.date,
						link: this.editedPost.link,
						timestamp: firebase.firestore.FieldValue.serverTimestamp()
					}).then(() => {
						this.$emit('changes-submitted');
						console.log("document successfully added");
					}).catch((error) => {
						console.error("Error adding document:", error);
					});
				} else if (this.component === 'about-me') { //About
					if (this.editedAbouts.tool.length > 0) {
						const index = this.editedAbouts.tool.length - 1;
						if (this.editedAbouts.tool[index].name === '' || this.editedAbouts.tool[index].level === 0) {
							this.editedAbouts.tool.pop();
						}
						await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
							tool: this.editedAbouts.tool
						}).then(() => {
							this.$emit('changes-submitted');
							console.log("document successfully added");
						}).catch((error) => {
							console.error("Error adding document:", error);
						});
					}
					if (this.editedAbouts.skill.length > 0) {
						const index = this.editedAbouts.skill.length - 1;
						if (this.editedAbouts.skill[index].title === '' || this.editedAbouts.skill[index].description === '') {
							this.editedAbouts.skill.pop();
						}
						await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
							skill: this.editedAbouts.skill
						}).then(() => {
							this.$emit('changes-submitted');
							console.log("Skill successfully added");
						}).catch((error) => {
							console.error("Error adding skill:", error);
						});
					}
					if (this.editedAbouts.education.length > 0) {
						const index = this.editedAbouts.education.length - 1;
						if (this.editedAbouts.education[index].year === '' || this.editedAbouts.education[index].location === '' ||
							this.editedAbouts.education[index].institution === '' || this.editedAbouts.education[index].course === '') {
							this.editedAbouts.education.pop();
						}
						await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
							education: this.editedAbouts.education
						}).then(() => {
							this.$emit('changes-submitted');
							console.log("Education successfully added");
						}).catch((error) => {
							console.error("Error adding education:", error);
						});
					}
					if (this.editedAbouts.languages.length > 0) {
						const index = this.editedAbouts.languages.length - 1;
						if (this.editedAbouts.languages[index].name === '' || this.editedAbouts.languages[index].level === 0 ) {
							this.editedAbouts.languages.pop();
						}
						await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
							languages: this.editedAbouts.languages
						}).then(() => {
							this.$emit('changes-submitted');
							console.log("languages successfully added");
						}).catch((error) => {
							console.error("Error adding languages:", error);
						});
					}
					if (this.editedAbouts.experience.length > 0) {
						const index = this.editedAbouts.experience.length - 1;
						if (this.editedAbouts.experience[index].firm === '' || this.editedAbouts.experience[index].duration === '' ||
							this.editedAbouts.experience[index].role === '') {
							this.editedAbouts.experience.pop();
						}
						await firebase.firestore().collection('about').doc(this.editedAbouts.id).update({
							experience: this.editedAbouts.experience
						}).then(() => {
							this.$emit('changes-submitted');
							console.log("experience successfully added");
						}).catch((error) => {
							console.error("Error adding experience:", error);
						});
					}
				} else if (this.component === 'services') { //Services
					if (!this.fileItem) {
						console.error("No file selected for upload.");
						return;
					}
					let storageRef = firebase.storage().ref("images/" + this.serviceFileName);
					let uploadTask = storageRef.put(this.fileItem);

					if (this.editedServices.boxes.length > 0) {
						const index = this.editedServices.boxes.length - 1;
						if (this.editedServices.boxes[index].name === '') {
							this.editedServices.boxes.pop();
						}
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
								boxes: this.editedServices.boxes,
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
			this.backendFileName = '';
			this.editedImages.image = '';
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
				const serviceRef = firebase.firestore().collection('services').doc(serviceId);
				const doc = await serviceRef.get();
				if (doc.exists) {
					const serviceData = doc.data();
					if (serviceData && Array.isArray(serviceData.boxes)) {
						const updatedBoxes = serviceData.boxes.filter((box: any) => box.id !== boxId);

						await serviceRef.update({ boxes: updatedBoxes });

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
		deepEqual(obj1: any, obj2: any): boolean {
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
		validateLevel(index: number) {
			if (this.editedAbouts.tool[index].level > 100) {
				this.editedAbouts.tool[index].level = 100;
			}
			if (this.editedAbouts.tool[index].level < 0) {
				this.editedAbouts.tool[index].level = 0;
			}
		},
		truncateContent(text: string): string {
			if (text.length > 20) {
				return text.substring(0, 20) + '...';
			}
			return text;
		},
	}
});
</script>

<style scoped>
/* Add your styles here */
</style>
