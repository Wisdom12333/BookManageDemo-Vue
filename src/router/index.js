import Vue from 'vue'
import VueRouter from 'vue-router'
import BookManage from "@/views/BookManage";
import AddBook from "@/views/AddBook";
import Index from "@/views/Index";
import BookUpdate from "@/views/BookUpdate"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "图书管理",
    component: Index,
    show: true,
    redirect: "/BookManage",
    children: [
      {
        path: "/BookManage",
        name: "查询",
        component: BookManage
      },
      {
        path: "/AddBook",
        name: "添加",
        component: AddBook
      }
    ]
  },
  {
    path: "/Update",
    // name: "修改",
    component: BookUpdate,
    show: false
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
