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
						<router-link class="button button--white--coral mt-30" to="/get-in-touch">Ask for an offer</router-link>
					</div>

					<div>
						<p class="design-instruction">If you're looking for design excellence</p>
						<div class="three-column-grid">
							<router-link class="dashboard-item" to=""
										 @mouseover="toggleHover('web',true)" @mouseout="toggleHover('web', false)">
								<img alt="web" class="dashboard-item-icon" :src="isWebHovered ? require('../assets/dashboard/web-coral.svg') : require('../assets/dashboard/web.svg')"/>
								<span class="mt-10">Web</span>
							</router-link>
							<router-link class="dashboard-item" to=""
										 @mouseover="toggleHover('phone',true)" @mouseout="toggleHover('phone', false)">
								<img alt="app" class="dashboard-item-icon" :src="isPhoneHovered ? require('../assets/dashboard/phone-coral.svg') : require('../assets/dashboard/phone.svg')"/>
								<span class="mt-10">Application</span>
							</router-link>
							<router-link class="dashboard-item" to=""
										 @mouseover="toggleHover('software',true)" @mouseout="toggleHover('software', false)">
								<img alt="software" class="dashboard-item-icon" :src="isSoftwareHovered ? require('../assets/dashboard/software-coral.svg') : require('../assets/dashboard/software.svg')"/>
								<span class="mt-10">Software</span>
							</router-link>
							<router-link class="dashboard-item" to=""
										 @mouseover="toggleHover('marketing',true)" @mouseout="toggleHover('marketing', false)">
								<img alt="marketing" class="dashboard-item-icon" :src="isMarketingHovered ? require('../assets/dashboard/marketing-coral.svg') : require('../assets/dashboard/marketing.svg')"/>
								<span class="mt-10">Marketing</span>
							</router-link>
							<router-link class="dashboard-item" to=""
										 @mouseover="toggleHover('brand',true)" @mouseout="toggleHover('brand', false)">
							<img alt="brand" class="dashboard-item-icon" :src="isBrandHovered ? require('../assets/dashboard/brand-coral.svg') : require('../assets/dashboard/brand.svg')"/>
								<span class="mt-10">Brand</span>
							</router-link>
							<router-link class="dashboard-item" to=""
										 @mouseover="toggleHover('redesign',true)" @mouseout="toggleHover('redesign', false)">
								<img alt="redesign" class="dashboard-item-icon" :src="isRedesignHovered ? require('../assets/dashboard/redesign-coral.svg') : require('../assets/dashboard/redesign.svg')"/>
								<span class="mt-10">Redesign</span>
							</router-link>
						</div>
					</div>
				</div>
				<div class="text-center">
					<img alt="transparent-icon" class="transparent-icon" src="../assets/transparent-logo.svg"/>
				</div>
			</div>

		</div>

		<div class="work-group-container">
			<div class="work-group-item" v-on:click="setActive('ux-ui')">
				<img alt="" class="work-icon center" src="../assets/ux-ui-design.svg"
					 v-bind:class="{ 'work-icon-active' : isActive === 'ux-ui'}"/>
				<span class="work-group"
					  v-bind:class="{ 'work-group-active' : isActive === 'ux-ui'}">UX/UI Design</span>
			</div>
			<div class="work-group-item" v-on:click="setActive('graphic')">
				<img alt="" class="work-icon center" src="../assets/graphic-design.svg"
					 v-bind:class="{ 'work-icon-active' : isActive === 'graphic'}"/>
				<span class="work-group"
					  v-bind:class="{ 'work-group-active': isActive === 'graphic'}">Graphic Design</span>
			</div>
		</div>

		<div class="design-container" v-show="isActive === 'ux-ui'">
			<div class="text-center mb-50">
				<img alt="case-studies" class="case-studies " src="../assets/case-studies.svg"/>
			</div>
			<div>
<!--				<div class="work-container">-->
<!--					<img alt="flatco" class="work-container-image" src="../assets/work/bard.svg"/>-->
<!--					<div class="work-container-text">-->
<!--						<div class="work-container-title">Flatco</div>-->
<!--						<div class="work-container-description">-->
<!--							Leading owner and operator of residential real estate-->
<!--						</div>-->
<!--						<div>-->
<!--							<router-link class="button button&#45;&#45;white" to="/case-study/flatco">Read case study-->
<!--							</router-link>-->
<!--						</div>-->
<!--					</div>-->
<!--				</div>-->

				<div class="work-container">
					<img alt="hotbed" class="work-container-image" src="../assets/work/kompozit.svg"/>
					<div class="work-container-text">
						<div class="work-container-title">Kompoz.it</div>
						<div class="work-container-description">
							Field service management solution for documenting the work of service
						</div>
						<div>
							<router-link class="button button--white" to="/case-study/kompozit">Read case study
							</router-link>
						</div>
					</div>
				</div>

				<div class="work-container">
					<img alt="pen" class="work-container-image" src="../assets/work/romfriend.svg"/>
					<div class="work-container-text">
						<div class="work-container-title">Romanian Friend</div>
						<div class="work-container-description">
							Day trips and unique Romanian experiences
						</div>
						<div>
							<router-link class="button button--white" to="/case-study/romanian-friend">Read case study</router-link>
						</div>
					</div>
				</div>

				<div class="work-container">
					<img alt="contractual" class="work-container-image" src="../assets/work/hotbed.svg"/>
					<div class="work-container-text">
						<div class="work-container-title">Hotbed</div>
						<div class="work-container-description">
							Further’s internal software for finances, project management and statistics. My very first
							UX and UI project.
						</div>
						<div>
							<router-link class="button button--white" to="/case-study/hotbed">Read case study
							</router-link>
						</div>
					</div>
				</div>

				<div class="work-container">
					<img alt="pen" class="work-container-image" src="../assets/work/szulinapiujsag.svg"/>
					<div class="work-container-text">
						<div class="work-container-title">Szülinapi újság</div>
						<div class="work-container-description">
							UX and UI redesign of a page from where customers can by newspaper as a gift
						</div>
						<div>
							<router-link class="button button--white" to="/case-study/szulinapi-ujsag">Read case study</router-link>
						</div>
					</div>
				</div>

				<div class="work-container">
					<img alt="contractual" class="work-container-image" src="../assets/work/contractual.svg"/>
					<div class="work-container-text">
						<div class="work-container-title">Contractual</div>
						<div class="work-container-description">
							Redesigning an application that facilitates the management, creation, and storage of
							contracts for a law firm.
						</div>
						<div>
							<router-link class="button button--white" to="/case-study/contractual">Read case study
							</router-link>
						</div>
					</div>
				</div>

				<!--					<div class="hide-on-desktop mt-10">-->
				<!--						<div class="post-box">-->
				<!--							<div class="post-title">LOW AND HIGH FIDELITY PROTOTYPES</div>-->
				<!--							<div class="post-description">-->
				<!--								When should you use low-fidelity prototypes? And when should you go for-->
				<!--								high-fidelity one?-->
				<!--								How do these both fit into user research? Find out by clicking on the read more-->
				<!--								button.-->
				<!--							</div>-->
				<!--							<div class="post-bottom-container">-->
				<!--								<div class="post-date">Nov 28th, 2022</div>-->
				<!--								<a class="small-button button&#45;&#45;coral"-->
				<!--								   href="https://gofurther.digital/en/blog/posts/low-and-high-fidelity-prototypes">Read-->
				<!--									more</a>-->
				<!--							</div>-->
				<!--						</div>-->

				<!--						<div class="post-box">-->
				<!--							<div class="post-title">CONDUCTING USABILITY TESTS</div>-->
				<!--							<div class="post-description">-->
				<!--								Usability testing is a crucial step in product development.-->
				<!--								But what happens during a usability interview and how should you facilitate such a-->
				<!--								test?-->
				<!--							</div>-->
				<!--							<div class="post-bottom-container">-->
				<!--								<div class="post-date">Sept 29th, 2022</div>-->
				<!--								<a class="small-button button&#45;&#45;coral"-->
				<!--								   href="https://gofurther.digital/en/blog/posts/conducting-usability-tests">Read-->
				<!--									more</a>-->
				<!--							</div>-->
				<!--						</div>-->

				<!--						<div class="post-box">-->
				<!--							<div class="post-title">WHAT IS CUSTOMER JOURNEY MAPPING?</div>-->
				<!--							<div class="post-description">-->
				<!--								A well-designed customer journey map keeps the customer at the forefront of the-->
				<!--								decision-making-->
				<!--								process and highlights any struggles that customers might experience.-->
				<!--							</div>-->
				<!--							<div class="post-bottom-container">-->
				<!--								<div class="post-date">Aug 25th, 2022</div>-->
				<!--								<a class="small-button button&#45;&#45;coral"-->
				<!--								   href="https://gofurther.digital/en/blog/posts/what-is-customer-journey-mapping">Read-->
				<!--									more</a>-->
				<!--							</div>-->
				<!--						</div>-->

				<!--						<div class="post-box">-->
				<!--							<div class="post-title">HOW TO USE THE VALUE PROPOSITION CANVAS?</div>-->
				<!--							<div class="post-description">-->
				<!--								Why is your value proposition an important part of your business plan? How to-->
				<!--								formulate it?-->
				<!--								How to visualize it using the value proposition canvas?-->
				<!--							</div>-->
				<!--							<div class="post-bottom-container">-->
				<!--								<div class="post-date">May 18th, 2022</div>-->
				<!--								<a class="small-button button&#45;&#45;coral"-->
				<!--								   href="https://gofurther.digital/en/blog/posts/how-to-use-the-value-proposition-canvas">Read-->
				<!--									more</a>-->
				<!--							</div>-->
				<!--						</div>-->

				<!--						<div class="post-box">-->
				<!--							<div class="post-title">HOW TO USE PERSONAS?</div>-->
				<!--							<div class="post-description">-->
				<!--								What are personas, why are they important in product development and how to create-->
				<!--								them?-->
				<!--								Find out by reading this in-depth article about personas.-->
				<!--							</div>-->
				<!--							<div class="post-bottom-container">-->
				<!--								<div class="post-date">Feb 14th, 2022</div>-->
				<!--								<a class="small-button button&#45;&#45;coral"-->
				<!--								   href="https://gofurther.digital/en/blog/posts/how-to-use-personas-in-product-development">Read-->
				<!--									more</a>-->
				<!--							</div>-->
				<!--						</div>-->
				<!--					</div>-->
			</div>
		</div>

		<div class="container" v-show="isActive === 'ux-ui'">
			<h2>Can’t get enough?</h2>
			<span class="blog-post">Check out our blog posts co-written with Further Digital Solutions.</span>

			<div class="post-container">
				<div class="post-box">
					<div class="post-title">LOW AND HIGH FIDELITY PROTOTYPES</div>
					<div class="post-description">
						When should you use low-fidelity prototypes? And when should you go for high-fidelity
						one?
						How do these both fit into user research? Find out by clicking on the read more button.
					</div>
					<div class="post-bottom-container">
						<div class="post-date">Nov 28th, 2022</div>
						<a class="small-button button--coral"
						   href="https://gofurther.digital/en/blog/posts/low-and-high-fidelity-prototypes">Read
							more</a>
					</div>
				</div>

				<div class="post-box">
					<div class="post-title">CONDUCTING USABILITY TESTS</div>
					<div class="post-description">
						Usability testing is a crucial step in product development.
						But what happens during a usability interview and how should you facilitate such a test?
					</div>
					<div class="post-bottom-container">
						<div class="post-date">Sept 29th, 2022</div>
						<a class="small-button button--coral"
						   href="https://gofurther.digital/en/blog/posts/conducting-usability-tests">Read
							more</a>
					</div>
				</div>

				<div class="post-box">
					<div class="post-title">WHAT IS CUSTOMER JOURNEY MAPPING?</div>
					<div class="post-description">
						A well-designed customer journey map keeps the customer at the forefront of the
						decision-making
						process and highlights any struggles that customers might experience.
					</div>
					<div class="post-bottom-container">
						<div class="post-date">Aug 25th, 2022</div>
						<a class="small-button button--coral"
						   href="https://gofurther.digital/en/blog/posts/what-is-customer-journey-mapping">Read
							more</a>
					</div>
				</div>

				<div class="post-box">
					<div class="post-title">HOW TO USE THE VALUE PROPOSITION CANVAS?</div>
					<div class="post-description">
						Why is your value proposition an important part of your business plan? How to formulate
						it?
						How to visualize it using the value proposition canvas?
					</div>
					<div class="post-bottom-container">
						<div class="post-date">May 18th, 2022</div>
						<a class="small-button button--coral"
						   href="https://gofurther.digital/en/blog/posts/how-to-use-the-value-proposition-canvas">Read
							more</a>
					</div>
				</div>

				<div class="post-box">
					<div class="post-title">HOW TO USE PERSONAS?</div>
					<div class="post-description">
						What are personas, why are they important in product development and how to create them?
						Find out by reading this in-depth article about personas.
					</div>
					<div class="post-bottom-container">
						<div class="post-date">Feb 14th, 2022</div>
						<a class="small-button button--coral"
						   href="https://gofurther.digital/en/blog/posts/how-to-use-personas-in-product-development">Read
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
			isActive: 'ux-ui',
			isWebHovered: false,
			isPhoneHovered: false,
			isSoftwareHovered: false,
			isMarketingHovered: false,
			isBrandHovered: false,
			isRedesignHovered: false,
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
				case 'marketing':
					this.isMarketingHovered = value;
					break;
				case 'brand':
					this.isBrandHovered = value;
					break;
				case 'redesign':
					this.isRedesignHovered = value;
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
