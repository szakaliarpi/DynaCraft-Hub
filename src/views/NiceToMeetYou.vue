<template>
	<div>
		<Navbar></Navbar>
		<div class="main-container">
			<div class="introduction-container">
				<div class="text-column">
					<div class="pl-90 mb-100">
						<div class="large-title-dark mb-50">
							Hi there, I'm
							<mark>John</mark>.<br>
							Nice to meet you!
						</div>

						<p>
							I've been working as a fullstack developer since 2020, delving into both front-end and back-end
							technologies. My experience encompasses a range of programming languages and frameworks,
							allowing me to create versatile and powerful web applications. With a constant drive for
							excellence and a knack for problem-solving, I'm always pushing the boundaries of what I can
							achieve in the digital landscape.
						</p>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/pencil.svg"/>
							<h2>Tools</h2>
						</div>

						<BarChart v-for="(level, index) in toolLevels"
								   :key="index"
								   :tool-name="toolNames[index]"
								   :tool-level="level"
								   :isTool="true"
								   :language-level="en"
								   :languages="en">
						</BarChart>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/ruler.svg"/>
							<h2>Skills</h2>
						</div>

						<div class="pl-90">
							<div class="category-subtitle">
								Front-end
							</div>

							<p class="mb-50">

								Frontend development focuses on crafting the user interface and experience of a website or
								application. It involves coding with languages like HTML, CSS, and JavaScript to create
								visually appealing and interactive elements that users interact with directly.
							</p>

							<div class="category-subtitle">
								Back-end
							</div>

							<p class="mb-50">
								Backend development involves building and maintaining the server-side of websites and
								applications. It encompasses tasks like database management, server configuration,
								and the implementation of business logic.
							</p>
						</div>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/sun.svg"/>
							<h2>Soft skills</h2>
						</div>

						<div class="pl-90">
							<p>
								productivity; precision; problem-solving; effective communication; adaptation;
								curiosity; collaboration; flexibility; continuous learning mindset
							</p>
						</div>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/hat.svg"/>
							<h2>Education</h2>
						</div>

						<div class="pl-90">
							<div class="education-grid">
								<div>
									<div class="date">2011-2015</div>

									<div class="institution">MIT</div>

									<div class="location">Boston</div>

									<div class="field">Information Systems & Technology</div>
								</div>

								<div>
									<div class="date">2016-2020</div>

									<div class="institution">Harvard</div>

									<div class="location">Boston</div>

									<div class="field">Leadership & Management</div>
								</div>
							</div>
						</div>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/hat.svg"/>
							<h2>Languages</h2>
						</div>

						<BarChart v-for="(level, index) in languageLevels"
								   :key="index"
								   :languages="languages[index]"
								   :language-level="level"
								   :isTool="false"
								   :tool-level="high"
								   :tool-name="that">
						</BarChart>
					</div>

					<div class="mb-100">
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/suit-case.svg"/>
							<h2>Experience</h2>
						</div>

						<div class="pl-90">
							<div class="experience">
								<div class="experience-container">
									<div class="title">Internship at Google</div>
									<div class="date">since September 2020</div>
									<ul>
										<li>as front-end developer</li>
										<li>as database maintenance</li>
									</ul>
								</div>

								<div class="title">Junior front-end developer</div>
								<div class="date">since February 2021</div>
								<ul>
									<li>as front-end developer</li>
								</ul>

								<div class="title">Facebook</div>
								<div class="date">from September 2020 to November 2022</div>
								<ul>
									<li>as IT consultant</li>
								</ul>

								<div class="title">Microsoft</div>
								<div class="date">since November 2022 - present</div>
								<ul>
									<li>as Fullstack developer</li>
								</ul>
							</div>
						</div>
					</div>

					<div>
						<div class="category-title">
							<img alt="tools" class="category-icon" src="../assets/icons/dinosaur.svg"/>
							<h2>Fun facts about me</h2>
						</div>

						<div class="pl-90">
							<p class="mb-100">
								The term "debugging" was coined when Grace Hopper removed a moth from a computer, solving a glitch, hence the term "debugging."
							</p>
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

export default defineComponent({
	components: {
		Navbar,
		BarChart,
		Contact
	},
	data() {
		return {
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
		beforeRouteEnter(to: RouteLocationNormalizedLoaded, from: RouteLocationNormalized, next: any) {
			window.scrollTo(0, 0);
			next();
		},
	}
});
</script>

<style scoped>

</style>
