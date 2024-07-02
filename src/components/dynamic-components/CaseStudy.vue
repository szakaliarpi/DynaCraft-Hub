<template>
	<div class="is-relative">
		<div v-show="isAdminPage" class="add-box" @click="openModal(false, null)">
			<img alt="add" class="navbar-icon" src="../../assets/icons/plus.png"/>
		</div>
		<h2 v-if="caseStudies.length === 0" class="text-center">
			There are no case studies uploaded yet, upload one!
		</h2>
		<div v-for="caseStudy in caseStudies" :key="caseStudy.id" class="work-container">
			<div v-show="isAdminPage" class="toolbar">
				<img alt="edit" src="../../assets/icons/edit.png" @click="openModal(true, caseStudy)"/>
				<img alt="remove" src="../../assets/icons/trash.png" @click="removeCaseStudy(caseStudy.id)"/>
			</div>
			<div :style="{ 'background-image': 'url(' + caseStudy.image + ')' }" class="work-container-image"></div>
			<div class="work-container-text">
				<div class="work-container-title">{{ truncateTitle(caseStudy.title) }}</div>
				<div class="work-container-description">
					{{ truncateDescription(caseStudy.description) }}
				</div>
				<div>
					<a :href="caseStudy.link" class="button button--white" target="_blank">see more</a>
				</div>
			</div>
		</div>

		<AdminModal :case-study="editedCaseStudy"
					:component="component"
					:is-edit-mode="isEditable"
					:is-open="isAdminModalOpen"
					@close="closeModal('admin')"
					@changes-submitted="getCaseStudiesFromFirebase"/>
		<NoticeModal :isOpen="isNoticeModalOpen"
					 :message="message"
					 @close="closeModal('notice')"
					 @confirm-delete="deleteConfirmed"/>
	</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import firebase from "firebase/compat/app";
import AdminModal from "@/components/modals/AdminModal.vue";
import NoticeModal from "@/components/modals/NoticeModal.vue";
import {CaseStudyType} from "@/components/types/CaseStudyType";
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
		this.getCaseStudiesFromFirebase();
	},
	data() {
		return {
			caseStudies: [] as CaseStudyType[],
			isAdminModalOpen: false,
			isNoticeModalOpen: false,
			message: Messages.notice,
			editedCaseStudy: {
				id: "",
				title: "",
				description: "",
				link: "",
				image: "",
				timestamp: 0
			} as CaseStudyType,
			isEditable: false,
			deleteError: Messages.delete_error,
		};
	},
	computed: {
		isAdminPage(): boolean {
			const currentUrl = window.location.href;
			return currentUrl.includes('/admin');
		}
	},
	methods: {
		async getCaseStudiesFromFirebase() {
			const snapshot = await firebase.firestore().collection('studies').orderBy('timestamp', 'desc').get();
			this.caseStudies = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as CaseStudyType[];
		},
		truncateTitle(text: string): string {
			if (text.length > 28) {
				return text.substring(0, 25) + '...';
			}
			return text;
		},
		truncateDescription(text: string): string {
			if (text.length > 218) {
				return text.substring(0, 215) + '...';
			}
			return text;
		},
		openModal(editMode: boolean, caseStudy: CaseStudyType | null) {
			if (editMode && caseStudy) {
				this.isEditable = true;
				this.editedCaseStudy = {...caseStudy};
			} else {
				this.isEditable = false;
				this.editedCaseStudy = {
					id: "",
					title: "",
					description: "",
					link: "",
					image: "",
					timestamp: 0
				};
			}
			this.isAdminModalOpen = true;
		},
		closeModal(type: string) {
			this.isEditable = false;
			this[type === 'admin' ? 'isAdminModalOpen' : 'isNoticeModalOpen'] = false;
		},
		async removeCaseStudy(id: string) {
			this.editedCaseStudy.id = id;
			this.isNoticeModalOpen = true;
		},
		async deleteConfirmed() {
			this.isNoticeModalOpen = false;
			const caseStudy = this.caseStudies.find(cs => cs.id === this.editedCaseStudy.id);
			if (caseStudy && caseStudy.image) {
				const storageRef = firebase.storage().refFromURL(caseStudy.image);
				await storageRef.delete().catch(error => {
					console.error("Error removing image: ", error);
					this.message = this.deleteError;
					this.isNoticeModalOpen = true;
					return;
				});
			}
			firebase.firestore().collection('studies').doc(this.editedCaseStudy.id).delete().then(() => {
				this.getCaseStudiesFromFirebase();
				this.isAdminModalOpen = false;
			}).catch(error => {
				console.error("Error removing document: ", error);
				this.message = this.deleteError;
				this.isNoticeModalOpen = true;
			});
		}
	}
});
</script>

