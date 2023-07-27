<template>
    <div class="surface-section px-4 py-5 md:px-6 lg:px-8">
        <div class="text-3xl font-medium text-900 mb-4">User Profile</div>
        <TabMenu :model="items"></TabMenu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [{
                label: 'Biometrics',
                icon: 'pi pi-fw pi-home',
                to: ''
            },
            {
                label: 'Friends',
                icon: 'pi pi-fw pi-calendar',
                to: '/calendar'
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                to: '/edit'
            },
            {
                label: 'Documentation',
                icon: 'pi pi-fw pi-file',
                to: '/documentation'
            },
            {
                label: 'Settings',
                icon: 'pi pi-fw pi-cog',
                to: '/settings'
            }]
        }
    }
}

</script>

