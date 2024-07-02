<template>
	<div class="is-relative">
		<div v-show="isAdminPage" class="add-box" @click="openModal">
			<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png"/>
		</div>
		<h2 v-show="isAdminPage" v-if="images.length === 0" class="text-center">
			There are no case studies uploaded yet, upload one!
		</h2>

		<div class="backend-container">
			<div v-for="(image, index) in images" :key="index">
				<a class="backend-grid-item" :href="image.link" target="_blank">
					<div :id="'image-' + index" :style="{ 'background-image': 'url(' + image.image + ')' }" class="is-relative">
						<div v-show="isAdminPage" class="toolbar">
							<img alt="remove" src="../../assets/icons/red-trash.png" @click.prevent="removeImage(image.id)"/>
						</div>
					</div>
				</a>
			</div>
		</div>

		<AdminModal :component="component"
					:is-edit-mode="false"
					:is-open="isAdminModalOpen"
					@close="closeModal('admin')"
					@changes-submitted="getImagesFromFirebase"/>
		<NoticeModal :isOpen="isNoticeModalOpen"
					 :message="message"
					 @close="closeModal('notice')"
					 @confirm-delete="deleteConfirmed"/>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Service from "@/components/dynamic-components/Service.vue";
import AdminModal from "@/components/modals/AdminModal.vue";
import NoticeModal from "@/components/modals/NoticeModal.vue";
import firebase from "firebase/compat/app";
import {BackendType} from "@/components/types/BackendType";
import {Messages} from "@/config/config";

export default defineComponent({
	components: {
		Service,
		AdminModal,
		NoticeModal
	},
	props: {
		component: {
			type: String,
			required: false
		},
	},
	mounted() {
		this.getImagesFromFirebase();
	},
	data() {
		return {
			images: [] as BackendType[],
			isAdminModalOpen: false,
			isNoticeModalOpen: false,
			message: Messages.notice,
			editedImages: {
				id: "",
				link: "",
				image: "",
				timestamp: 0
			} as BackendType,
		};
	},
	computed: {
		isAdminPage(): boolean {
			const currentUrl = window.location.href;
			return currentUrl.includes('/admin');
		}
	},
	methods: {
		async getImagesFromFirebase() {
			const snapshot = await firebase.firestore().collection('backend').orderBy('timestamp', 'desc').get();
			this.images = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as BackendType[];
		},
		openModal() {
			this.isAdminModalOpen = true;
		},
		closeModal(type: string) {
			this[type === 'admin' ? 'isAdminModalOpen' : 'isNoticeModalOpen'] = false;
		},
		removeImage(id: string) {
			this.editedImages.id = id;
			this.isNoticeModalOpen = true;
		},
		deleteConfirmed() {
			this.isNoticeModalOpen = false;
			firebase.firestore().collection('backend').doc(this.editedImages.id).delete().then(() => {
				this.getImagesFromFirebase();
				this.isAdminModalOpen = false;
			}).catch(error => {
				console.error("Error removing document: ", error);
				this.isNoticeModalOpen = true;
			});
		}
	},
});
</script>

<style scoped>

</style>
