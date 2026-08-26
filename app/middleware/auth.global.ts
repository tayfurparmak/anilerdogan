export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  const isAdminRoute = to.path.startsWith('/admin')
  const isLoginRoute = to.path === '/admin/login'

  const hasAdminAccess = !!user.value

  // Block unauthorized users from visiting protected admin paths
  if (isAdminRoute && !isLoginRoute && !hasAdminAccess) {
    return navigateTo('/admin/login')
  }

  // Prevent authenticated admin users from visiting the login page again
  if (isLoginRoute && hasAdminAccess) {
    return navigateTo('/admin/dashboard')
  }
})
