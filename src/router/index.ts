import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from "@/views/Home.vue";
import NiceToMeetYou from "@/views/NiceToMeetYou.vue";
import GetInTouch from "@/views/GetInTouch.vue";
import Flatco from "@/components/case-study/Flatco.vue";
import Contractual from "@/components/case-study/Contractual.vue";
import Hotbed from "@/components/case-study/Hotbed.vue";
import Pertu from "@/components/case-study/Pertu.vue";
import Services from "@/views/Services.vue";
import RomanianFriend from "@/components/case-study/RomanianFriend.vue";
import Kompozit from "@/components/case-study/Kompozit.vue";
import SzulinapiUjsag from "@/components/case-study/SzulinapiUjsag.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/nice-to-meet-you',
        name: 'nice-to-meet-you',
        component: NiceToMeetYou
    },
    {
        path: '/services',
        name: 'services',
        component: Services
    },
    {
        path: '/get-in-touch',
        name: 'get-in-touch',
        component: GetInTouch
    },
    {
        path: '/case-study/flatco',
        name: 'flatco',
        component: Flatco
    },
    {
        path: '/case-study/kompozit',
        name: 'kompozit',
        component: Kompozit
    },
    {
        path: '/case-study/romanian-friend',
        name: 'romanian-friend',
        component: RomanianFriend
    },
    {
        path: '/case-study/szulinapi-ujsag',
        name: 'szulinapi-ujsag',
        component: SzulinapiUjsag
    },
    {
        path: '/case-study/contractual',
        name: 'contractual',
        component: Contractual
    },
    {
        path: '/case-study/hotbed',
        name: 'hotbed',
        component: Hotbed
    },
    {
        path: '/case-study/pertu',
        name: 'pertu',
        component: Pertu
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router
