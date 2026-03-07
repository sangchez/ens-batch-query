// https://v3.router.vuejs.org/installation.html#direct-download-cdn

import type { RouterOptions } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

const routerOptions: RouterOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/layouts/Default.vue"),
      children: [
        {
          path: "",
          name: "index",
          component: () => import("../views/home/Index.vue"),
        },
      ],
    },
  ],
};

export default createRouter(routerOptions);
