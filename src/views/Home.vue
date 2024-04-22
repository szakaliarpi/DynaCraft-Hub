<template>
	<div>
		<Navbar></Navbar>
		<div class="first-panel">
			<div class="main-container">
				<div class="two-column-grid">
					<div class="grid-item">
						<div class="large-title">
							 Shared vision.<br> Collaborative<br>
							<mark class="coral">innovation</mark>.
						</div>

						<div class="is-flex gap">
							<div class="first-panel-text">
								Fusing design with user goals, crafting seamless experiences.
							</div>
						</div>
						<router-link class="button button--white--coral mt-30" to="/get-in-touch">reach out to me</router-link>
					</div>

					<div>
						<p class="design-instruction">If you're looking for design excellence</p>
						<div class="three-column-grid">
							<router-link class="dashboard-item" to="/services"
										 @mouseover="toggleHover('web',true)" @mouseout="toggleHover('web', false)">
								<img alt="web" class="dashboard-item-icon" :src="isWebHovered ? require('../assets/dashboard/web-coral.svg') : require('../assets/dashboard/web.svg')"/>
								<span class="mt-10">Web</span>
							</router-link>
							<router-link class="dashboard-item" to="/services"
										 @mouseover="toggleHover('phone',true)" @mouseout="toggleHover('phone', false)">
								<img alt="app" class="dashboard-item-icon" :src="isPhoneHovered ? require('../assets/dashboard/phone-coral.svg') : require('../assets/dashboard/phone.svg')"/>
								<span class="mt-10">Application</span>
							</router-link>
							<router-link class="dashboard-item" to="/services"
										 @mouseover="toggleHover('software',true)" @mouseout="toggleHover('software', false)">
								<img alt="software" class="dashboard-item-icon" :src="isSoftwareHovered ? require('../assets/dashboard/software-coral.svg') : require('../assets/dashboard/software.svg')"/>
								<span class="mt-10">Software</span>
							</router-link>
							<router-link class="dashboard-item" to="/services"
										 @mouseover="toggleHover('data',true)" @mouseout="toggleHover('data', false)">
								<img alt="data" class="dashboard-item-icon" :src="isDataHovered ? require('../assets/dashboard/marketing-coral.svg') : require('../assets/dashboard/marketing.svg')"/>
								<span class="mt-10">Data</span>
							</router-link>
							<router-link class="dashboard-item" to="/services"
										 @mouseover="toggleHover('brand',true)" @mouseout="toggleHover('brand', false)">
							<img alt="brand" class="dashboard-item-icon" :src="isBrandHovered ? require('../assets/dashboard/brand-coral.svg') : require('../assets/dashboard/brand.svg')"/>
								<span class="mt-10">Brand</span>
							</router-link>
							<router-link class="dashboard-item" to="/services"
										 @mouseover="toggleHover('rework',true)" @mouseout="toggleHover('rework', false)">
								<img alt="rework" class="dashboard-item-icon" :src="isReworkHovered ? require('../assets/dashboard/redesign-coral.svg') : require('../assets/dashboard/redesign.svg')"/>
								<span class="mt-10">Rework</span>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<div class="text-center">
				<img alt="transparent-icon" class="transparent-icon" src="../assets/transparent-logo.svg"/>
			</div>
		</div>

		<div class="work-group-container">
			<div class="work-group-item" v-on:click="setActive('front-end')">
				<img alt="" class="work-icon center" src="../assets/frontend.svg"
					 v-bind:class="{ 'work-icon-active' : isActive === 'front-end'}"/>
				<span class="work-group"
					  v-bind:class="{ 'work-group-active' : isActive === 'front-end'}">Front-end</span>
			</div>
			<div class="work-group-item" v-on:click="setActive('graphic')">
				<img alt="" class="work-icon center" src="../assets/backend.svg"
					 v-bind:class="{ 'work-icon-active' : isActive === 'graphic'}"/>
				<span class="work-group"
					  v-bind:class="{ 'work-group-active': isActive === 'graphic'}">Back-end</span>
			</div>
		</div>

		<div class="design-container" v-show="isActive === 'front-end'">
			<div class="text-center mb-50">
				<img alt="case-studies" class="case-studies " src="../assets/case-studies.svg"/>
			</div>
			<div>
				<div class="work-container">
					<img alt="random1" class="work-container-image" src="../assets/randoms/random1.jpg"/>
					<div class="work-container-text">
						<div class="work-container-title">Donec in libero</div>
						<div class="work-container-description">
							Nam consequat commodo ligula, eget congue purus lacinia id.
						</div>
						<div>
							<router-link class="button button--white" to="/case-study/kompozit">see more
							</router-link>
						</div>
					</div>
				</div>

				<div class="work-container">
					<img alt="random2" class="work-container-image" src="../assets/randoms/random2.jpg"/>
					<div class="work-container-text">
						<div class="work-container-title">Vivamus consectetur</div>
						<div class="work-container-description">
							Aenean non purus in risus dignissim congue.
						</div>
						<div>
							<router-link class="button button--white" to="/case-study/romanian-friend">see more</router-link>
						</div>
					</div>
				</div>

				<div class="work-container">
					<img alt="random3" class="work-container-image" src="../assets/randoms/random3.jpg"/>
					<div class="work-container-text">
						<div class="work-container-title">Curabitur vulputate</div>
						<div class="work-container-description">
							Vivamus tempus tempor consequat,
						</div>
						<div>
							<router-link class="button button--white" to="/case-study/hotbed">see more
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="container" v-show="isActive === 'front-end'">
			<h2>Can’t get enough?</h2>
			<span class="blog-post">Check out some interesting posts.</span>

			<div class="post-container">
				<div class="post-box">
					<div class="post-title">WHERE DOES IT COME FROM?</div>
					<div class="post-description">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
					</div>
					<div class="post-bottom-container">
						<div class="post-date">Nov 28th, 2023</div>
						<a class="small-button button--coral"
						   href="https://www.google.com">Read more</a>
					</div>
				</div>

				<div class="post-box">
					<div class="post-title">WHY DO WE USE IT?</div>
					<div class="post-description">
						It is a long established fact that a reader will be distracted by
						the readable content of a page when looking at its layout.
					</div>
					<div class="post-bottom-container">
						<div class="post-date">Sept 20th, 2023</div>
						<a class="small-button button--coral"
						   href="https://www.facebook.com">Read
							more</a>
					</div>
				</div>

				<div class="post-box">
					<div class="post-title">WHERE CAN I GET SOME?</div>
					<div class="post-description">
						Contrary to popular belief, Lorem Ipsum is not simply random text.
						It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
					</div>
					<div class="post-bottom-container">
						<div class="post-date">Aug 25th, 2023</div>
						<a class="small-button button--coral"
						   href="https://www.instagram.com">Read
							more</a>
					</div>
				</div>
			</div>
		</div>

		<div class="design-container" v-show="isActive === 'graphic'">
			<div class="text-center mb-50">
				<img alt="logofolio" class="logofolio" src="../assets/logofolio..svg"/>
			</div>

			<div class="logofolio-container">
				<router-link class="logofolio-grid-item" id="pertu" to="/case-study/pertu"><img src="../assets/logofolio/pertu-logo.svg" alt="logo1"></router-link>
				<div class="logofolio-grid-item"><img src="../assets/logofolio/publow-logo.svg" alt="logo2"></div>
				<div class="logofolio-grid-item"><img src="../assets/logofolio/mullmar-logo.svg" alt="logo3"></div>
				<div class="logofolio-grid-item"><img src="../assets/logofolio/kompozit-logo.svg" alt="logo4"></div>
				<div class="logofolio-grid-item"><img src="../assets/logofolio/folkapp-logo.svg" alt="logo5"></div>
				<div class="logofolio-grid-item"><img src="../assets/logofolio/scroll-roll-design-logo.svg" alt="logo6"></div>
				<div class="logofolio-grid-item"><img src="../assets/logofolio/expoil-loog.svg" alt="logo7"></div>
				<div class="logofolio-grid-item"><img src="../assets/logofolio/tekergo-logo.svg" alt="logo8"></div>
				<div class="logofolio-grid-item"><img src="../assets/logofolio/wire-donkey-logo.svg" alt="logo9"></div>
				<div class="logofolio-grid-item"><img src="../assets/logofolio/element-logo.svg" alt="logo10"></div>
				<div class="logofolio-grid-item"><img src="../assets/logofolio/night-manager-logo.svg" alt="logo11"></div>
			</div>

		</div>
		<Contact></Contact>
	</div>
</template>

<script lang="ts">
import Contact from "@/components/Contact.vue";
import Navbar from "@/components/Navbar.vue";
import {defineComponent} from "vue";
import {RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";

export default defineComponent({
	components: {
		Contact,
		Navbar
	},
	data() {
		return {
			isActive: 'front-end',
			isWebHovered: false,
			isPhoneHovered: false,
			isSoftwareHovered: false,
			isDataHovered: false,
			isBrandHovered: false,
			isReworkHovered: false,
		};
	},
	methods: {
		beforeRouteEnter(to: RouteLocationNormalizedLoaded, from: RouteLocationNormalized, next: any) {
			window.scrollTo(0, 0);
			next();
		},
		setActive(group: string): void {
			this.isActive = group;
		},
		toggleHover(content: string, value: boolean): void {
			switch (content) {
				case 'web':
					this.isWebHovered = value;
					break;
				case 'phone':
					this.isPhoneHovered = value;
					break;
				case 'software':
					this.isSoftwareHovered = value;
					break;
				case 'data':
					this.isDataHovered = value;
					break;
				case 'brand':
					this.isBrandHovered = value;
					break;
				case 'rework':
					this.isReworkHovered = value;
					break;
				default:
					break;
			}
		},
	}
});
</script>

<style scoped>

</style>
