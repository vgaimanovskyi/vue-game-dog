import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dog",
    name: "Dog",
    component: () => import("@/views/Dog.vue"),
  },
  {
    path: "/layer",
    name: "Layer",
    component: () => import("@/views/Layer.vue"),
  },
  {
    path: "/npc",
    name: "NPC",
    component: () => import("@/views/NPC.vue"),
  },
  {
    path: "/shooter",
    name: "Shooter",
    component: () => import("@/views/Shooter.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
