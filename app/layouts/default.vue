<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white transition-colors duration-300">
    <!-- Navigation Navbar -->
    <LayoutNavbar />

    <!-- Main Content -->
    <main class="flex-grow pt-20">
      <slot />
    </main>

    <!-- Footer -->
    <LayoutFooter />
  </div>
</template>
