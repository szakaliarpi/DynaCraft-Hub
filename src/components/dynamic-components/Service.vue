<template>
	<div class="is-relative">
		<Navbar v-show="!isAdminPage"></Navbar>
		<div class="services">
			<div v-show="!isAdminPage" class="text-center mb-50 mt-10">
				<img alt="services" class="service-image" src="../../assets/services.svg"/>
			</div>

			<div v-show="isAdminPage" class="add-box" @click="openModal(false, null)">
				<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png"/>
			</div>

			<div v-for="service in services" class="services-container" :class="{'is-relative' : isAdminPage }">
				<div v-show="isAdminPage" class="toolbar">
					<img alt="edit" src="../../assets/icons/edit.png" @click="openModal(true, service)"/>
					<img alt="remove" src="../../assets/icons/trash.png" @click="removeServices(service.id)"/>
				</div>
				<div :style="{ 'background-image': 'url(' + service.image + ')' }" class="services-icon"></div>
				<div class="services-text">
					<div class="services-title">{{ truncateTitle(service.title) }}</div>
					<div class="services-description">{{ truncateDescription(service.description) }}</div>
					<div class="box-container">
						<div v-for="box in service.boxes">
							<div class="services-shadowed-boxes">
								{{ box.name }}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-show="!isAdminPage" class="text-center mt-30 mb-30">
				<router-link class="button button--orange" to="/get-in-touch">reach out to me</router-link>
			</div>
		</div>
		<Contact v-show="!isAdminPage"></Contact>

		<AdminModal :component="component"
					:is-edit-mode="isEditable"
					:is-open="isServiceModalOpen"
					:service="editedServices"
					@close="closeModal('admin')"
					@changes-submitted="getServicesFromFirebase"/>
		<NoticeModal :isOpen="isNoticeModalOpen"
					 :message="message"
					 @close="closeModal('notice')"
					 @confirm-delete="deleteConfirmed"/>
	</div>
</template>

<script lang="ts">
import Contact from "@/components/Contact.vue";
import Navbar from "@/components/Navbar.vue";
import {defineComponent} from "vue";
import firebase from "firebase/compat/app";
import {ServiceType} from "@/components/types/ServiceType";
import {Messages} from "@/config/config";
import AdminModal from "@/components/modals/AdminModal.vue";
import NoticeModal from "@/components/modals/NoticeModal.vue";

export default defineComponent({
	components: {
		Navbar,
		Contact,
		AdminModal,
		NoticeModal
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
		this.getServicesFromFirebase();
	},
	data() {
		return {
			services: [] as ServiceType[],
			isEditable: false as boolean,
			isServiceModalOpen: false as boolean,
			isNoticeModalOpen: false as boolean,
			message: Messages.notice,
			editedServices: {
				id: "",
				title: "",
				description: "",
				image: "",
				boxes: [],
				timestamp: 0
			} as ServiceType,
		};
	},
	methods: {
		truncateDescription(text: string): string {
			if (text.length > 218) {
				return text.substring(0, 215) + '...';
			}
			return text;
		},
		truncateTitle(text: string): string {
			if (text.length > 28) {
				return text.substring(0, 25) + '...';
			}
			return text;
		},
		async getServicesFromFirebase() {
			const snapshot = await firebase.firestore().collection('services').get();
			this.services = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as ServiceType[];
		},
		openModal(editMode: boolean, service: ServiceType | null) {
			if (editMode && service) {
				this.isEditable = true;
				this.editedServices = {...service};
			} else {
				this.isEditable = false;
				this.editedServices = {
					id: "",
					title: "",
					description: "",
					image: "",
					boxes: [],
					timestamp: 0
				};
			}
			this.isServiceModalOpen = true;
		},
		closeModal(type: string) {
			this.isEditable = false;
			this[type === 'admin' ? 'isServiceModalOpen' : 'isNoticeModalOpen'] = false;
		},
		async removeServices(id: string) {
			this.editedServices.id = id;
			this.isNoticeModalOpen = true;
		},
		deleteConfirmed() {
			this.isNoticeModalOpen = false;
			firebase.firestore().collection('services').doc(this.editedServices.id).delete().then(() => {
				this.getServicesFromFirebase();
				this.isServiceModalOpen = false;
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
