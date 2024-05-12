<template>
	<div class="admin">
		<AdminNavbar/>
		<div class="admin-grid">
			<div class="admin-group-item" v-on:click="setActive('case-studies')">
				<img alt="case studies" class="admin-icon center" src="../assets/icons/studies.png"
					 v-bind:class="{ 'admin-icon-active' : isActive === 'case-studies'}"/>
				<span class="admin-group"
					  v-bind:class="{ 'admin-group-active' : isActive === 'case-studies'}">Case Studies
				</span>
			</div>
			<div class="admin-group-item" v-on:click="setActive('posts')">
				<img alt="posts" class="admin-icon center" src="../assets/icons/post.png"
					 v-bind:class="{ 'admin-icon-active' : isActive === 'posts'}"/>
				<span class="admin-group"
					  v-bind:class="{ 'admin-group-active': isActive === 'posts'}">Posts
				</span>
			</div>
			<div class="admin-group-item" v-on:click="setActive('about-me')">
				<img alt="nice to meet you" class="admin-icon center" src="../assets/icons/about-me.png"
					 v-bind:class="{ 'admin-icon-active' : isActive === 'about-me'}"/>
				<span class="admin-group"
					  v-bind:class="{ 'admin-group-active': isActive === 'about-me'}">About me
				</span>
			</div>
			<div class="admin-group-item" v-on:click="setActive('services')">
				<img alt="services" class="admin-icon center" src="../assets/icons/services.png"
					 v-bind:class="{ 'admin-icon-active' : isActive === 'services'}"/>
				<span class="admin-group"
					  v-bind:class="{ 'admin-group-active': isActive === 'services'}">Services
				</span>
			</div>
		</div>

		<div v-show="isActive === 'case-studies'">
			<CaseStudies :component="isActive"></CaseStudies>
		</div>
		<div v-show="isActive === 'posts'">
			<Posts :component="isActive"></Posts>
		</div>
		<div v-show="isActive === 'about-me'">
			<About :component="isActive"></About>
		</div>
		<div v-show="isActive === 'services'">
			<Services :component="isActive"></Services>
		</div>
	</div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import {defineComponent} from "vue";
import AdminNavbar from "@/components/AdminNavbar.vue";
import CaseStudies from "@/components/admin/CaseStudies.vue";
import AboutMe from "@/components/admin/About.vue";
import Services from "@/components/admin/Services.vue";
import Posts from "@/components/admin/Posts.vue";
import About from "@/components/admin/About.vue";

export default defineComponent({
	components: {
		Services,
		AboutMe,
		CaseStudies,
		Navbar,
		AdminNavbar,
		Posts,
		About
	},
	data() {
		return {
			isActive: 'case-studies',
		};
	},
	methods: {
		setActive(group: string): void {
			this.isActive = group;
		}
	},
});
</script>

<style scoped>

</style>
