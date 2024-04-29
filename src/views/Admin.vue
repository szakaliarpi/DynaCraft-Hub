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
			<CaseStudies></CaseStudies>
		</div>
		<div v-show="isActive === 'posts'">
			<Posts></Posts>
		</div>
		<div v-show="isActive === 'about-me'">
			<AboutMe></AboutMe>
		</div>
		<div v-show="isActive === 'services'">
			<Services></Services>
		</div>

<!--		<div class="is-flex">
			<div class="flex-1">
				<label for="first-name">title</label>
				<input id="first-name" type="text" v-model="title"/>
			</div>

			<div class="flex-1">
				<label for="first-name">description</label>
				<input id="last-name" type="text" v-model="description"/>
			</div>

			<div class="flex-1">
				<label for="email">link</label>
				<input id="last-name" type="text" v-model="link"/>
			</div>

			<div class="flex-1">
				<label for="email">image</label>
				<input id="last-name" type="file" v-on:change="fileChanged($event)"/>
			</div>
		</div>-->

	</div>

</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import {defineComponent} from "vue";
import firebase from "firebase/compat/app";
import AdminNavbar from "@/components/AdminNavbar.vue";
import CaseStudies from "@/components/admin/CaseStudies.vue";
import AboutMe from "@/components/admin/AboutMe.vue";
import Services from "@/components/admin/Services.vue";
import Posts from "@/components/admin/Posts.vue";

export default defineComponent({
	components: {
		Services,
		AboutMe,
		CaseStudies,
		Navbar,
		AdminNavbar,
		Posts,
	},
	data() {
		return {
			isActive: 'case-studies',
			title: '',
			description: '',
			link: '',
			image: '',
			fileItem: Blob,
			fileName: '',
		};
	},
	methods: {
		setActive(group: string): void {
			this.isActive = group;
		},
		fileChanged(e) {
			this.fileItem = e.target.files[0];
			this.fileName = this.fileItem.name;
				///csak ennyi leessz itt, ennel lejjeb a save gomb kor

			console.log(firebase.storage());

			let storageRef = firebase.storage().ref("images/"+this.fileName);
			let uploadTask = storageRef.put(this.fileItem as any);

			uploadTask.on("state_changed", (snapshot)=>{
				console.log(snapshot)
			}, (error)=>{
				console.log(error)
			}, ()=>{
				uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
					console.log(url);
					//itt feltolteni az adatot firestore ba, mint az email
				})
			})

		}
	},
});
</script>

<style scoped>

</style>
