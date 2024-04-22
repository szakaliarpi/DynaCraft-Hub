<template>
	<div>
		<Navbar></Navbar>
		<div class="services">
			<div class="text-center mb-50">
				<img alt="services" class="case-studies" src="../assets/services.svg"/>
			</div>

			<div class="services-container">
				<img alt="ideation" class="services-icon" src="../assets/icons/ideation.svg"/>
				<div class="services-text">
					<div class="services-title">
						Ac orci phasellus
					</div>
					<div class="services-description">
						Quam viverra orci sagittis eu volutpat. Aliquam etiam erat velit scelerisque in.
						Egestas dui id ornare arcu odio ut sem nulla. Nulla posuere sollicitudin aliquam ultrices sagittis orci.
						Aenean pharetra magna ac placerat.
					</div>
					<div class="box-container">
						<div>
							<div class="services-shadowed-boxes">
								Tortor
							</div>
						</div>
						<div>
							<div class="services-shadowed-boxes">
								Metus aliquam
							</div>
						</div>
						<div>
							<div class="services-shadowed-boxes">
								Bibendum
							</div>
						</div>
						<div>
							<div class="services-shadowed-boxes">
								Placerat
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="services-container">
				<img alt="ux/ui" class="services-icon" src="../assets/icons/design.svg"/>
				<div class="services-text">
					<div class="services-title">
						Duis tristique
					</div>
					<div class="services-description">
						Dictumst quisque sagittis purus sit amet. Dignissim diam quis enim lobortis.
						Dolor magna eget est lorem ipsum. Proin fermentum leo vel orci porta non pulvinar neque.
						Fusce ut placerat orci nulla pellentesque dignissim enim sit.
					</div>
					<div class="box-container">
						<div>
							<div class="services-shadowed-boxes">
								Tristique
							</div>
						</div>
						<div>
							<div class="services-shadowed-boxes">
								Gravida dictum
							</div>
						</div>
						<div>
							<div class="services-shadowed-boxes">
								Consectetur
							</div>
						</div>
						<div>
							<div class="services-shadowed-boxes">
								Commodo
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="services-container">
				<img alt="graphic-design" class="services-icon" src="../assets/frontend.svg"/>
				<div class="services-text">
					<div class="services-title">
						Blandit cursus
					</div>
					<div class="services-description">
						Tincidunt arcu non sodales neque sodales ut etiam sit amet.
						Vestibulum rhoncus est pellentesque elit ullamcorper.
						Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh. Interdum posuere lorem ipsum dolor sit.
						Adipiscing elit duis tristique sollicitudin nibh sit.
					</div>
					<div class="box-container">
						<div>
							<div class="services-shadowed-boxes">
								Volutpat
							</div>
						</div>
						<div>
							<div class="services-shadowed-boxes">
								Pretium
							</div>
						</div>
						<div>
							<div class="services-shadowed-boxes">
								Urna nunc id
							</div>
						</div>
						<div>
							<div class="services-shadowed-boxes">
								Aliquam
							</div>
						</div>
						<div>
							<div class="services-shadowed-boxes">
								Sed egestas
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="text-center mt-30">
				<router-link class="button button--coral" to="/get-in-touch">reach out to me</router-link>
			</div>
		</div>

		<Contact></Contact>
	</div>

</template>

<script lang="ts">
import Contact from "@/components/Contact.vue";
import Navbar from "@/components/Navbar.vue";
import {defineComponent, ref} from "vue";

export default defineComponent({
	components: {
		Navbar,
		Contact,
	},
	data() {
		return {
			discoveryIsActive: true,
			researchIsActive: false,
			ideationIsActive: false,
			designIsActive: false,
			testIsActive: false,
		};
	},
});
</script>

<style scoped>

</style>
