import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { getToken } from '../utils/auth';

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,

    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Login.vue')

    },
    {
        path: '/notes',
        name: 'Notes',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Notes.vue')

    },
    // 注册页面路由
    {
        path: '/register',
        name: 'Register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Register.vue')

    },

    // 我的地址页面路由
    {
        path: '/address',
        name: 'Address',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Address.vue')

    },
   

    {
        path: '/user',
        name: 'User',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/User.vue')
    }, {
        path: '/product_list',
        name: 'Product_List',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Product_List.vue')
    },
    {
        path: '/product_message',
        name: 'Product_message',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Product_message.vue')
    },
    {
        path: '/person',
        name: 'Person',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Person.vue')
    },
     {
        path: '/pathAbout',
        name: 'PathAbout',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/PathAbout.vue')
    },
]

const router = createRouter({
        history: createWebHashHistory(),
        routes
    })
    // 路由守卫(判断用户是否登录，有登陆状态去往该页面，没有的话去登陆页面)
router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem('token');		//获取登录存储的数据
    if (to.path === '/login' || to.path === '/register') {		//如果当前进入页面是登录或注册就不执行任何操作，继续进入。
        next();
    } else {//否则判断是否存在登录存储的数据，不存在就进入登录页面
        if (token === null || token==='') {
            next('/login');
        } else {
            next();
        }
    }

})

export default router