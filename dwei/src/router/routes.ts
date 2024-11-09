import type { RouteRecordRaw } from "vue-router";
/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      hidden：        是否隐藏此路由
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

/**
 * 静态路由（默认路由）
 */
export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true,
    },
  },

  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404.vue"),
    meta: {
      hidden: true,
    },
  },


];

/**
 * 定义动态路由
 */
//管理员后台路由
export const allAsyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name:'Home',
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name:'asyncHome1',
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "home",
          icon: "ele-HomeFilled",
        },
      },
    ],
  },

  {
    path: "/usermanage",
    name:'usermanage',
    component: () => import("@/layout/index.vue"),
    redirect:'/usermanage/usermanageedit',
    children:[
      {
        path: "/usermanage/usermanageedit",
        name:'usermanageedit',
        component: () => import("@/views/backstage/usermanage/index.vue"),
        meta: {
          title: "user manage",
          icon: "ele-User",
        },
      },
    ]
  },

  {
    path: "/applyfor",
    name:'applyfor',
    component: () => import("@/layout/index.vue"),
    redirect:'/applyfor/applyfor',
    children:[
      {
        path: "/applyfor/applyfor",
        name:'apply for',
        component: () => import("@/views/backstage/applyfor/index.vue"),
        meta: {
          title: "applyfor",
          icon: "ele-User",
        },
      },
    ]
  },

  {
    path: "/typeList",
    name:'typeList',
    component: () => import("@/layout/index.vue"),
    redirect:'/typeList/typeList',
    children:[
      {
        path: "/typeList/typeList",
        name:'type List',
        component: () => import("@/views/backstage/typeList/index.vue"),
        meta: {
          title: "typeList",
          icon: "ele-User",
        },
      },
    ]
  },

  {
    path: "/pendingapproval",
    name:'pendingapproval',
    component: () => import("@/layout/index.vue"),
    redirect:'/pendingapproval/pendingapproval',
    children:[
      {
        path: "/pendingapproval/pendingapproval",
        name:'pendingapproval',
        component: () => import("@/views/backstage/pendingapproval/index.vue"),
        meta: {
          title: "pendingapproval",
          icon: "ele-User",
        },
      },
    ]
  },

  {
    path: "/myapprove",
    name:'myapprove',
    component: () => import("@/layout/index.vue"),
    redirect:'/myapprove/myapprove',
    children:[
      {
        path: "/myapprove/myapprove",
        name:'myapprove',
        component: () => import("@/views/backstage/myapprove/index.vue"),
        meta: {
          title: "myapprove",
          icon: "ele-User",
        },
      },
    ]
  },

  {
    path: "/turndown",
    name:'turndown',
    component: () => import("@/layout/index.vue"),
    redirect:'/turndown/turndown',
    children:[
      {
        path: "/turndown/turndown",
        name:'turndown',
        component: () => import("@/views/backstage/turndown/index.vue"),
        meta: {
          title: "turndown",
          icon: "ele-User",
        },
      },
    ]
  },

  {
    path: "/approvaldetails",
    name:'approvaldetails',
    component: () => import("@/layout/index.vue"),
    redirect:'/approvaldetails/approvaldetails',
    children:[
      {
        path: "/approvaldetails/approvaldetails",
        name:'approvaldetails',
        component: () => import("@/views/backstage/approvaldetails/index.vue"),
        meta: {
          title: "approvaldetails",
          icon: "ele-User",
        },
      },
    ]
  },

  // {
  //   path: "/uwd",
  //   name:'uwd',
  //   component: () => import("@/layout/index.vue"),
  //   redirect:'/uwd/uwdedit',Redis Experiment Management System
  //   children:[
  //     {
  //       path: "/uwd/uwdedit",
  //       name:'uwdedit',
  //       component: () => import("@/views/backstage/uwdRedis实验管理系统edit/index.vue"),
  //       meta: {
  //         title: "uwd标签管理",
  //         icon: "ele-DataAnalysis",
  //       },
  //     },
  //   ]
  // },
  // {
  //   path: "/img",
  //   name:'img',
  //   component: () => import("@/layout/index.vue"),
  //   redirect:'/img/imgedit',
  //   children:[
  //     {
  //       path: "/img/imgedit",
  //       name:'imgedit',
  //       component: () => import("@/views/backstage/img/index.vue"),
  //       meta: {
  //         title: "场景地图",
  //         icon: "ele-Picture",
  //       },
  //     },
  //   ]
  // },
  // {
  //   path: "/locationdata",
  //   name:'locationdata',
  //   component: () => import("@/layout/index.vue"),
  //   redirect:'/locationdata/locationdataedit',
  //   children:[
  //     {
  //       path: "/locationdata/locationdataedit",
  //       name:'locationdataedit',
  //       component: () => import("@/views/backstage/locationdata/index.vue"),
  //       meta: {
  //         title: "位置数据管理",
  //         icon: "ele-Place",
  //       },
  //     },
  //   ]
  // },
  // {
  //   path: "/publish",
  //   name:'publish',
  //   component: () => import("@/layout/index.vue"),
  //   redirect:'/publish/locationpublish',
  //   children:[
  //     {
  //       path: "/publish/locationpublish",
  //       name:'locationpublish',
  //       component: () => import("@/views/backstage/locationpublish/index.vue"),
  //       meta: {
  //         title: "位置发布管理",
  //         icon: "ele-Collection",
  //       },
  //     },
  //   ]
  // },
  // {
  //   path: "/object",
  //   name:'object',
  //   component: () => import("@/layout/index.vue"),
  //   redirect:'/object/objectBindings',
  //   children:[
  //     {
  //       path: "/object/objectBindings",
  //       name:'objectBindings',
  //       component: () => import("@/views/backstage/objectBindings/index.vue"),
  //       meta: {
  //         title: "对象绑定",
  //         icon: "ele-Switch",
  //       },
  //     },
  //   ]
  // },
  // {
  //   path: "/location",
  //   name:'location',
  //   component: () => import("@/layout/index.vue"),
  //   redirect:'/location/locationshow',
  //   children:[
  //     {
  //       path: "/location/locationshow",
  //       name:'locationshow',
  //       component: () => import("@/views/backstage/location/index.vue"),
  //       meta: {
  //         title: "定位展示",
  //         icon: "ele-Location",
  //       },
  //     },
  //   ]
  // },



  /* 匹配任意的路由 必须最后注册 */
  {
    path: "/:pathMatch(.*)",
    name:'any',
    redirect: "/404",
    meta: {
      hidden: true,
    },
  },
];




//医生路由
export const doctorAsyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name:'Home',
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name:'asyncHome1',
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "home",
          icon: "ele-HomeFilled",
        },
      },
    ],
  },


  // {
  //   path: "/record",
  //   name:'record',
  //   component: () => import("@/layout/index.vue"),
  //   redirect:'/record/communityuploadprofile',
  //   children:[
  //     {
  //       path: "/record/communityuploadprofile",
  //       name:'communityuploadprofile',
  //       component: () => import("@/views/backstage/postapplyfor/index.vue"),
  //       meta: {
  //         title: "物料管理",
  //         icon: "ele-Grid",
  //       },
  //     },
  //   ]
  // },

  /* 匹配任意的路由 必须最后注册 */
  {
    path: "/:pathMatch(.*)",
    name:'any',
    redirect: "/404",
    meta: {
      hidden: true,
    },
  },
];


//用户路由
export const userAsyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name:'Home',
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name:'asyncHome1',
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "home",
          icon: "ele-HomeFilled",
        },
      },
    ],
  },
  {
    path: "/uwd",
    name:'uwd',
    component: () => import("@/layout/index.vue"),
    redirect:'/uwd/uwdedit',
    children:[
      {
        path: "/uwd/uwdedit",
        name:'uwdedit',
        component: () => import("@/views/backstage/uwdedit/index.vue"),
        meta: {
          title: "uwdlabelmanagement",
          icon: "ele-DataAnalysis",
        },
      },
    ]
  },
  {
    path: "/img",
    name:'img',
    component: () => import("@/layout/index.vue"),
    redirect:'/img/imgedit',
    children:[
      {
        path: "/img/imgedit",
        name:'imgedit',
        component: () => import("@/views/backstage/img/index.vue"),
        meta: {
          title: "scene map",
          icon: "ele-Picture",
        },
      },
    ]
  },
  {
    path: "/locationdata",
    name:'locationdata',
    component: () => import("@/layout/index.vue"),
    redirect:'/locationdata/locationdataedit',
    children:[
      {
        path: "/locationdata/locationdataedit",
        name:'locationdataedit',
        component: () => import("@/views/backstage/locationdata/index.vue"),
        meta: {
          title: "Location data management",
          icon: "ele-Place",
        },
      },
    ]
  },
  {
    path: "/publish",
    name:'publish',
    component: () => import("@/layout/index.vue"),
    redirect:'/publish/locationpublish',
    children:[
      {
        path: "/publish/locationpublish",
        name:'locationpublish',
        component: () => import("@/views/backstage/locationpublish/index.vue"),
        meta: {
          title: "Location publishing management",
          icon: "ele-Collection",
        },
      },
    ]
  },
  {
    path: "/object",
    name:'object',
    component: () => import("@/layout/index.vue"),
    redirect:'/object/objectBindings',
    children:[
      {
        path: "/object/objectBindings",
        name:'objectBindings',
        component: () => import("@/views/backstage/objectBindings/index.vue"),
        meta: {
          title: "Object binding",
          icon: "ele-Switch",
        },
      },
    ]
  },
  {
    path: "/location",
    name:'location',
    component: () => import("@/layout/index.vue"),
    redirect:'/location/locationshow',
    children:[
      {
        path: "/location/locationshow",
        name:'locationshow',
        component: () => import("@/views/backstage/location/index.vue"),
        meta: {
          title: "Positioning display",
          icon: "ele-Location",
        },
      },
    ]
  },

  /* 匹配任意的路由 必须最后注册 */
  {
    path: "/:pathMatch(.*)",
    name:'any',
    redirect: "/404",
    meta: {
      hidden: true,
    },
  },
];

