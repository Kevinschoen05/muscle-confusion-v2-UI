<template>
    <div class="p-5 flex flex-column flex-auto">
        <div class="grid">
            <div class="col-12">
                <div class="surface-card pl-4 pt-4 pb-4 border-bottom-none">
                    <div class="text-900 font-medium text-xl">Leaderboard</div>
                </div>
                <div
                    class="surface-card   border-top-none border-noround-top border-round flex p-3 flex-column md:flex-row">
                </div>
            </div>
            <div class="col-12 lg:col-6">
                <div class="surface-card shadow-2 border-round h-30rem p-4 overflow-auto">
                    <div class="flex align-items-center justify-content-between mb-3">
                        <div class="text-900 font-medium text-xl">Recent Activity</div>
                        <div>
                            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"></Button>
                            <Menu ref="menu1" id="overlay_menu" :popup="true"></Menu>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col-6">
                <div class="surface-card shadow-2 border-round p-4 h-30rem overflow-auto">
                    <div class="flex align-items-center justify-content-between mb-3">
                        <div class="text-900 font-medium text-xl">Open Matchups</div>
                        <div>
                            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"></Button>
                            <Menu ref="menu2" id="overlay_menu" :popup="true"></Menu>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col-4">
                <div class="surface-card border-round shadow-2 p-4 text-center">

                </div>
            </div>
            <div class="col-12 lg:col-4">
                <div class="surface-card border-round shadow-2 p-4 text-center">
                </div>
            </div>
            <div class="col-12 lg:col-4">
                <div class="surface-card border-round shadow-2 p-4 text-center">
                </div>
            </div>
        </div>
    </div>
</template>