<template>
	<div class="is-relative">
		<div v-show="isAdminPage" class="add-box" @click="openModal(false, null)">
			<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png"/>
		</div>
		<div :class="{ 'm-0': isAdminPage }" class="post-container is-relative">
			<div v-for="post in Posts" :key="post.id"  class="post-box">
				<div v-show="isAdminPage" class="toolbar">
					<img alt="edit" src="../../assets/icons/edit.png" @click="openModal(true, post)"/>
					<img alt="remove" src="../../assets/icons/trash.png" @click="removePosts(post.id)"/>
				</div>
				<div class="post-title">{{ post.title }}</div>
				<div class="post-description">{{ post.description }}</div>
				<div class="post-bottom-container">
					<div class="post-date">{{ post.date }}</div>
					<a :href="post.link" class="small-button button--orange">Read more</a>
				</div>
			</div>

			<AdminModal :component="component"
						:is-edit-mode="isEditable"
						:is-open="isPostModalOpen"
						:post="editedPosts"
						@close="closeModal('admin')"
						@changes-submitted="getPostsFromFirebase"/>
			<NoticeModal :isOpen="isNoticeModalOpen"
						 :message="message"
						 @close="closeModal('notice')"
						 @confirm-delete="deleteConfirmed"/>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import NoticeModal from "@/components/modals/NoticeModal.vue";
import AdminModal from "@/components/modals/AdminModal.vue";
import firebase from "firebase/compat/app";
import {PostType} from "@/components/types/PostType";
import {Messages} from "@/config/config";

export default defineComponent({
	components: {
		NoticeModal,
		AdminModal
	},
	props: {
		component: {
			type: String,
			required: false
		},
	},
	mounted() {
		this.getPostsFromFirebase();
	},
	data() {
		return {
			isEditable: false as boolean,
			isPostModalOpen: false as boolean,
			isNoticeModalOpen: false as boolean,
			message: Messages.notice,
			Posts: [] as PostType[],
			editedPosts: {
				id: "",
				title: "",
				description: "",
				date: "",
				link: "",
				timestamp: 0
			} as PostType,
		};
	},
	computed: {
		isAdminPage(): boolean {
			const currentUrl = window.location.href;
			return currentUrl.includes('/admin');
		}
	},
	methods: {
		async getPostsFromFirebase() {
			const snapshot = await firebase.firestore().collection('posts').orderBy('timestamp', 'desc').get();
			this.Posts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as PostType[];
		},
		openModal(editMode: boolean, post: PostType | null) {
			if (editMode && post) {
				this.isEditable = true;
				this.editedPosts = {...post};
			} else {
				this.isEditable = false;
				this.editedPosts = {
					id: "",
					title: "",
					description: "",
					date: "",
					link: "",
					timestamp: 0
				};
			}
			this.isPostModalOpen = true;
		},
		closeModal(type: string) {
			this.isEditable = false;
			this[type === 'admin' ? 'isPostModalOpen' : 'isNoticeModalOpen'] = false;
		},
		async removePosts(id: string) {
			this.editedPosts.id = id;
			this.isNoticeModalOpen = true;
		},
		deleteConfirmed() {
			this.isNoticeModalOpen = false;
			firebase.firestore().collection('posts').doc(this.editedPosts.id).delete().then(() => {
				this.getPostsFromFirebase();
				this.isPostModalOpen = false;
			}).catch(error => {
				console.error("Error removing document: ", error);
				this.isNoticeModalOpen = true;
			});
		}
	}
});
</script>

<style scoped>

</style>
