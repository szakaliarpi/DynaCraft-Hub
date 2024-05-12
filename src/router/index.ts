import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from "@/views/Home.vue";
import GetInTouch from "@/views/GetInTouch.vue";
import Services from "@/views/Services.vue";
import Admin from "@/views/Admin.vue";
import Login from "@/views/Login.vue";
import {auth} from "@/main";
import AboutMe from "@/components/AboutMe.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/nice-to-meet-you',
        name: 'nice-to-meet-you',
        component: AboutMe
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
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
            authRequired: true,
        },
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (auth.currentUser) {
            next();
        } else {
            if (to.path === '/admin') {
                next({
                    path: '/login',
                });
            } else {
                next();
            }
        }
    } else {
        next();
    }
});

export default router;
