<template>
	<div>
		<div v-show="!isAdminPage">
			<Navbar/>
		</div>
		<div v-for="about in abouts" :key="about.id" class="main-container is-relative">
			<div v-show="isAdminPage" class="add-box" @click="openModal(false, null)">
				<img alt="add" class="navbar-icon" src="../assets/icons/plus.png"/>
			</div>
			<div class="introduction-container">
				<div class="text-column">
					<div class="pl-90 mb-100">
						<div class="large-title-dark mb-50">
							{{ about.title }}
							<mark>{{ about.name }}</mark>
						</div>
						<p>{{ about.introduction }}</p>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/pencil.svg"/>
							<h2>Tools</h2>
						</div>

						<BarChart v-for="(level, index) in about.tools.level"
								  :key="index"
								  :isTool="true"
								  :tool-level="level"
								  :tool-name="about.tools.name[index]">
						</BarChart>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/ruler.svg"/>
							<h2>Skills</h2>
						</div>

						<div v-for="skill in about.skills" class="pl-90">
							<div class="category-subtitle">{{ skill.title }}</div>

							<p class="mb-50">{{ skill.description }}</p>
						</div>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/sun.svg"/>
							<h2>Soft skills</h2>
						</div>

						<div class="pl-90">
							<p>{{ about.softSkills }}</p>
						</div>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/hat.svg"/>
							<h2>Education</h2>
						</div>

						<div class="pl-90">
							<div class="education-grid">
								<div v-for="edu in about.educations">
									<div class="date">{{ edu.year }}</div>

									<div class="institution">{{ edu.institution }}</div>

									<div class="location">{{ edu.location}}</div>

									<div class="field">{{ edu.course }}</div>
								</div>
							</div>
						</div>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/hat.svg"/>
							<h2>Languages</h2>
						</div>

						<BarChart v-for="(level, index) in about.languages.level"
								  :key="index"
								  :isTool="false"
								  :language-level="level"
								  :languages="languages[index]">
						</BarChart>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/suit-case.svg"/>
							<h2>Experience</h2>
						</div>

						<div class="pl-90">
							<div v-for="ex in about.experiences" class="experience">
								<div class="experience-container">
									<div class="title">{{ ex.firm }}</div>
									<div class="date">{{ ex.duration }}</div>
									<ul>
										<li v-for="item in ex.role">{{ item }}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div>
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/dinosaur.svg"/>
							<h2>Fun facts about me</h2>
						</div>

						<div class="pl-90">
							<p class="mb-100">{{ about.facts }}</p>
						</div>
					</div>
				</div>

				<div class="image-column hide-on-mobile-tablet">
				</div>
			</div>
		</div>
		<Contact></Contact>

	</div>
</template>

<script lang="ts">
import BarChart from "@/components/BarChart.vue";
import Contact from "@/components/Contact.vue";
import Navbar from "@/components/Navbar.vue";
import {defineComponent} from "vue";
import {RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";
import firebase from "firebase/compat/app";
import {AboutMeType} from "@/components/types/AboutMeType";

export default defineComponent({
	components: {
		Navbar,
		BarChart,
		Contact
	},
	props: {
		component: {
			type: String,
			required: false
		},
	},
	computed: {
		isAdminPage(): boolean {
			const currentUrl = window.location.href;
			return currentUrl.includes('/admin');
		}
	},
	mounted() {
		this.getAboutMeFromFirebase();
	},
	data() {
		return {
			abouts: [] as AboutMeType[],
			isEditable: false as boolean,
			isAdminModalOpen: false as boolean,
			isNoticeModalOpen: false as boolean,
			message: 'Delete for all eternity?',
			editedAboutMe: {
				id: "",
				educations: [],
				experiences: [],
				facts: "",
				introduction: "",
				languages: {language: [], level: []},
				skills: [],
				softSkills: "",
				title: "",
				tools: {level: [], name: []},
			} as AboutMeType,
			toolLevels: [72, 48, 70, 78, 80, 60, 55],
			languageLevels: [100, 84, 74],
			toolNames: [
				"PHP",
				"Adobe Photoshop",
				"Typescript",
				"Figma",
				"Vue.js",
				"CSS",
				"Databases",
			],
			languages: [
				"English",
				"Dutch",
				"French"
			],
		};
	},
	methods: {
		async getAboutMeFromFirebase() {
			const snapshot = await firebase.firestore().collection('about').get();
			this.abouts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as AboutMeType[];
			console.log(this.abouts);
		},
		beforeRouteEnter(to: RouteLocationNormalizedLoaded, from: RouteLocationNormalized, next: any) {
			window.scrollTo(0, 0);
			next();
		},
		openModal(editMode: boolean, about: AboutMeType | null) {
			if (editMode && about) {
				// If in edit mode and caseStudy is provided, set isEditable to true for editing mode
				this.isEditable = true;
				this.editedAboutMe = {...about};
			} else {
				// If not in edit mode or caseStudy is not provided, set isEditable to false for addition mode
				this.isEditable = false;
				// Reset editedCaseStudy for addition mode
				this.editedAboutMe = {
					id: "",
					educations: [],
					experiences: [],
					facts: "",
					introduction: "",
					languages: {language: [], level: []},
					skills: [],
					softSkills: "",
					title: "",
					tools: {level: [], name: []},
				};
			}
			this.isAdminModalOpen = true;
		},
	}
});
</script>

<style scoped>

</style>
