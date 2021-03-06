import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  {
    path: '/card',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Card',
        component: () => import('@/views/card/index'),
        meta: { title: 'Card', icon: 'card' }
      }
    ]
  },
  {
    path: '/collapse',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Collapse',
        component: () => import('@/views/collapse/index'),
        meta: { title: 'Collapse', icon: 'collapse' }
      }
    ]
  },
  {
    path: '/apply',
    component: Layout,
    redirect: '/apply/post',
    name: 'Apply',
    meta: {
      title: 'Apply',
      icon: 'apply'
    },
    children: [
      {
        path: 'post',
        component: () => import('@/views/apply/post/index'), // Parent router-view
        name: 'Post',
        meta: {
          title: 'Post',
          icon: 'post'
        }
      },
      {
        path: 'list',
        component: () => import('@/views/apply/list/index'),
        name: 'List',
        meta: {
          title: 'List',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/community',
    component: Layout,
    redirect: '/community/list',
    name: 'Community',
    meta: {
      title: 'Community',
      icon: 'community'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/community/list/index'),
        name: 'CommunityList',
        meta: {
          title: 'List',
          icon: 'list'
        }
      },
      {
        path: 'collapse',
        component: () => import('@/views/community/collapse/index'),
        name: 'CommunityCollapse',
        meta: {
          title: 'Collapse',
          icon: 'collapse'
        }
      },
      {
        path: 'card',
        name: 'CommunityCard',
        component: () => import('@/views/community/card/index'),
        meta: { title: 'Card', icon: 'card' }
      }
    ]
  },
  {
    path: '/design',
    component: Layout,
    redirect: '/design/list',
    name: 'Design',
    meta: { title: 'Design', icon: 'design' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/design/list/index'), // Parent router-view
        name: 'DesignList',
        meta: {
          title: 'List',
          icon: 'list'
        }
      },
      {
        path: 'view',
        component: () => import('@/views/design/view/index'), // Parent router-view
        name: 'DesignView',
        hidden: true,
        meta: {
          title: 'View',
          icon: 'eye'
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/design/edit/index'), // Parent router-view
        hidden: true,
        name: 'DesignEdit',
        meta: {
          title: 'Edit',
          icon: 'edit'
        }
      }

    ]
  },
  {
    path: '/drawing_audit',
    component: Layout,
    redirect: '/drawing_audit/list',
    name: 'DrawingCheck',
    meta: { title: 'DrawingCheck', icon: 'check' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/drawing_audit/list/index'), // Parent router-view
        name: 'DrawingCheckList',
        meta: {
          title: 'List',
          icon: 'list'
        }
      },
      {
        path: 'audit',
        component: () => import('@/views/drawing_audit/audit/index'), // Parent router-view
        hidden: true,
        name: 'DrawingCheckAudit',
        meta: {
          title: 'Audit',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/street',
    component: Layout,
    redirect: '/street/list',
    name: 'Street',
    meta: { title: 'Street', icon: 'street' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/street/list/index'), // Parent router-view
        name: 'StreetList',
        meta: {
          title: 'List',
          icon: 'list'
        }
      },
      {
        path: 'audit',
        component: () => import('@/views/street/audit/index'), // Parent router-view
        hidden: true,
        name: 'StreetAudit',
        meta: {
          title: 'Audit',
          icon: 'list'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
