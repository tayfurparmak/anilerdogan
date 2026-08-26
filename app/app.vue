<script setup lang="ts">
import { useAsyncData, useState } from '#app'

const supabase = useSupabaseClient()
const siteSettings = useState<any>('site-settings', () => null)

const { data } = await useAsyncData('global-settings-init', async () => {
  try {
    const { data: result } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single() as any
    return result
  } catch (e) {
    return null
  }
})

if (data.value) {
  siteSettings.value = data.value
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
