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

						<div class="is-flex gap-30">
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
		</div>

		<div class="work-group-container">
			<div class="work-group-item" v-on:click="setActive('front-end')">
				<img alt="" class="work-icon center" src="../assets/frontend.svg"
					 v-bind:class="{ 'work-icon-active' : isActive === 'front-end'}"/>
				<span class="work-group"
					  v-bind:class="{ 'work-group-active' : isActive === 'front-end'}">Front-end</span>
			</div>
			<div class="work-group-item" v-on:click="setActive('back-end')">
				<img alt="" class="work-icon center" src="../assets/backend.svg"
					 v-bind:class="{ 'work-icon-active' : isActive === 'back-end'}"/>
				<span class="work-group"
					  v-bind:class="{ 'work-group-active': isActive === 'back-end'}">Back-end</span>
			</div>
		</div>

		<div class="design-container" v-show="isActive === 'front-end'">
			<CaseStudy/>
		</div>

		<div class="container" v-show="isActive === 'front-end'">
			<h2>Can’t get enough?</h2>
			<span class="blog-post">Check out some interesting posts.</span>
			<Post/>
		</div>

		<div class="design-container" v-show="isActive === 'back-end'">
			<Backend/>
		</div>
		<Contact></Contact>
	</div>
</template>

<script lang="ts">
import Contact from "@/components/Contact.vue";
import Navbar from "@/components/Navbar.vue";
import {defineComponent} from "vue";
import {RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";
import CaseStudy from "@/components/dynamic-components/CaseStudy.vue";
import Post from "@/components/dynamic-components/Post.vue";
import Backend from "@/components/admin/Backend.vue";

export default defineComponent({
	components: {
		Backend,
		CaseStudy,
		Contact,
		Navbar,
		Post
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
			caseStudies: []
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
