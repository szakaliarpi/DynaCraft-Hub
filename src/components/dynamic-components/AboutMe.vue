<template>
	<div >
		<Navbar v-show="!isAdminPage"/>
		<div v-for="about in abouts" :key="about.id" :class="{ 'main-container': !isAdminPage }">
			<div class="introduction-container">
				<div v-show="isAdminPage" :class="{ 'bg-orange': isAdminPage }" class="toolbar">
					<img alt="edit" src="../../assets/icons/edit.png" @click="openModal(true, post)"/>
					<img alt="remove" src="../../assets/icons/trash.png" @click="removePosts(post.id)"/>
				</div>
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
							<img alt="tools" class="category-icon" src="../../assets/icons/pencil.svg"/>
							<h2>Tools</h2>
						</div>

						<BarChart v-for="(level, index) in about.tool.level"
								  :key="index"
								  :isTool="true"
								  :tool-level="level"
								  :tool-name="about.tool.name[index]">
						</BarChart>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../../assets/icons/ruler.svg"/>
							<h2>Skills</h2>
						</div>

						<div v-for="skill in about.skill" class="pl-90">
							<div class="category-subtitle">{{ skill.title }}</div>

							<p class="mb-50">{{ skill.description }}</p>
						</div>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../../assets/icons/sun.svg"/>
							<h2>Soft skills</h2>
						</div>

						<div class="pl-90">
							<p>{{ about.soft_skill }}</p>
						</div>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../../assets/icons/hat.svg"/>
							<h2>Education</h2>
						</div>

						<div class="pl-90">
							<div class="education-grid">
								<div v-for="edu in about.education">
									<div class="date">{{ edu.year }}</div>

									<div class="institution">{{ edu.institution }}</div>

									<div class="location">{{ edu.location }}</div>

									<div class="field">{{ edu.course }}</div>
								</div>
							</div>
						</div>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../../assets/icons/hat.svg"/>
							<h2>Languages</h2>
						</div>

						<BarChart v-for="(level, index) in about.language.level"
								  :key="index"
								  :isTool="false"
								  :language-level="level"
								  :languages="about.language.language[index]">
						</BarChart>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../../assets/icons/suit-case.svg"/>
							<h2>Experience</h2>
						</div>

						<div class="pl-90">
							<div v-for="ex in about.experience" class="experience">
								<div class="experience-container">
									<div class="title">{{ ex.firm }}</div>
									<div class="date">{{ ex.duration }}</div>
									<ul>
										<li>{{ ex.role }}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div>
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../../assets/icons/dinosaur.svg"/>
							<h2>Fun facts about me</h2>
						</div>

						<div class="pl-90">
							<p class="mb-100">{{ about.fact }}</p>
						</div>
					</div>
				</div>

				<div class="image-column hide-on-mobile-tablet">
				</div>
			</div>
		</div>
		<Contact v-show="!isAdminPage"/>
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
			isAdminModalOpen: false as boolean,
			isNoticeModalOpen: false as boolean,
			message: 'Delete for all eternity?',
			editedAboutMe: {
				id: "",
				education: [],
				experience: [],
				fact: "",
				introduction: "",
				language: {language: [], level: []},
				name: "",
				skill: [],
				soft_skill: "",
				title: "",
				tool: {level: [], name: []},
				timestamp: 0
			} as AboutMeType,
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
		openModal(about: AboutMeType | null) {
			if (about) {
				// If in edit mode and caseStudy is provided, set isEditable to true for editing mode
				this.editedAboutMe = {...about};
			} else {
				// If not in edit mode or caseStudy is not provided, set isEditable to false for addition mode
				this.editedAboutMe = {
					id: "",
					education: [],
					experience: [],
					fact: "",
					introduction: "",
					language: {language: [], level: []},
					name: "",
					skill: [],
					soft_skill: "",
					title: "",
					tool: {level: [], name: []},
					timestamp: 0
				};
			}
			this.isAdminModalOpen = true;
		},
	}
});
</script>

<style scoped>

</style>
