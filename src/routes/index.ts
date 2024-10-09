import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "../view/HomeView.vue";
import LoginView from "../view/LoginView.vue";
import RootLayout from "../layouts/RootLayout.vue";
import CreateBillView from "../view/CreateBillView.vue";


const routes = [
  {
    path: "/",
    component:RootLayout,
    children: [
      {
        path:"/" ,
        component:HomeView
      },
      {
        path:"/create-bill",
        component:CreateBillView
      }
    ]
  },
  {
    path:"/auth",
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router