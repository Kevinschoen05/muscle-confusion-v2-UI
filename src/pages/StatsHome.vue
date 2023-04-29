<template>
    <div class="min-h-screen flex relative lg:static surface-ground">
        <div id="app-sidebar"
            class="surface-section h-full lg:h-auto hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
            style="width:280px">
            <div class="flex flex-column h-full ">
                <div class="overflow-y-auto fixed">
                    <ul class="list-none p-3 m-0">
                        <li>
                            <div v-ripple
                                class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
                                v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'slidedown', leaveToClass: 'hidden', leaveActiveClass: 'slideup' }">
                                <span class="font-medium">WORKOUT RESULTS</span>
                                <i class="pi pi-chevron-down ml-3"></i>
                            </div>
                            <ul class="list-none p-0 m-0 overflow-hidden">
                                <li>
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-home mr-2"></i>
                                        <span class="font-medium">Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-bookmark mr-2"></i>
                                        <span class="font-medium">Bookmarks</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                                        v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'slidedown', leaveToClass: 'hidden', leaveActiveClass: 'slideup' }">
                                        <i class="pi pi-chart-line mr-2"></i>
                                        <span class="font-medium">Reports</span>
                                        <i class="pi pi-chevron-down ml-auto"></i>
                                    </a>
                                    <ul
                                        class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                        <li>
                                            <a v-ripple
                                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                                                v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'slidedown', leaveToClass: 'hidden', leaveActiveClass: 'slideup' }">
                                                <i class="pi pi-chart-line mr-2"></i>
                                                <span class="font-medium">Revenue</span>
                                                <i class="pi pi-chevron-down ml-auto"></i>
                                            </a>
                                            <ul
                                                class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                                <li>
                                                    <a v-ripple
                                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                        <i class="pi pi-table mr-2"></i>
                                                        <span class="font-medium">View</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a v-ripple
                                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                        <i class="pi pi-search mr-2"></i>
                                                        <span class="font-medium">Search</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a v-ripple
                                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                <i class="pi pi-chart-line mr-2"></i>
                                                <span class="font-medium">Expenses</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-users mr-2"></i>
                                        <span class="font-medium">Team</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-comments mr-2"></i>
                                        <span class="font-medium">Messages</span>
                                        <span
                                            class="inline-flex align-items-center justify-content-center ml-auto bg-blue-500 text-0 border-circle"
                                            style="min-width: 1.5rem; height: 1.5rem">3</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-calendar mr-2"></i>
                                        <span class="font-medium">Calendar</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-cog mr-2"></i>
                                        <span class="font-medium">Settings</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="list-none p-3 m-0">
                        <li>
                            <div v-ripple
                                class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
                                v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'slidedown', leaveToClass: 'hidden', leaveActiveClass: 'slideup' }">
                                <span class="font-medium">EXERCISE DATA</span>
                                <i class="pi pi-chevron-down ml-2"></i>
                            </div>
                            <ul class="list-none p-0 m-0 overflow-hidden">
                                <li>
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-folder mr-2"></i>
                                        <span class="font-medium">Projects</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-chart-bar mr-2"></i>
                                        <span class="font-medium">Performance</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-cog mr-2"></i>
                                        <span class="font-medium">Settings</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="min-h-screen flex flex-column relative flex-auto">
            <div class="flex lg:hidden xl:hidden">
                <a tabindex="0" class="layout-config-button"
                    v-styleclass="{ selector: '#app-sidebar', enterClass: 'hidden', enterActiveClass: 'fadeinleft', leaveToClass: 'hidden', leaveActiveClass: 'fadeoutleft', hideOnOutsideClick: true }">
                    <i class="pi pi-cog text-4xl"></i>
                </a>
            </div>
            <div class="flex flex-column flex-auto">
                <div class="p-5">
                    <div class="grid">
                        <div class="col-12 lg:col-6 xl:col-3">
                            <div class="surface-card shadow-2 p-3 border-1 border-50 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Total Workouts</span>
                                        <div class="text-900 font-medium text-xl">152</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-calendar text-blue-500 text-xl"></i>
                                    </div>
                                </div>
                                <span class="text-green-500 font-medium">24 workouts </span>
                                <span class="text-500">since last missed day</span>
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 xl:col-3">
                            <div class="surface-card shadow-2 p-3 border-1 border-50 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Cumulative Volume</span>
                                        <div class="text-900 font-medium text-xl">420069 lbs</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-chevron-up text-blue-500 text-xl"></i>
                                    </div>
                                </div>
                                <span class="text-green-500 font-medium">%52+ </span>
                                <span class="text-500">last workout</span>
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 xl:col-3">
                            <div class="surface-card shadow-2 p-3 border-1 border-50 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">TBD</span>
                                        <div class="text-900 font-medium text-xl">28441</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-inbox text-blue-500 text-xl"></i>
                                    </div>
                                </div>
                                <span class="text-green-500 font-medium">520 </span>
                                <span class="text-500">TBD</span>
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 xl:col-3">
                            <div class="surface-card shadow-2 p-3 border-1 border-50 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">TBD</span>
                                        <div class="text-900 font-medium text-xl">152 </div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-comment text-blue-500 text-xl"></i>
                                    </div>
                                </div>
                                <span class="text-green-500 font-medium">85 </span>
                                <span class="text-500">TBD</span>
                            </div>
                        </div>
                        <div class="col-12 xl:col-6">
                            <div class="surface-card shadow-2 border-round p-4">
                                <div class="text-xl text-900 font-medium mb-5">Latest News</div>
                                <ul class="list-none p-0 m-0">
                                    <li class="pb-3 border-bottom-1 surface-border">
                                        <div class="font-medium text-900 mb-2">Aenean euismod elementum</div>
                                        <div class="line-height-3 text-600" style="max-width: 30rem">Vitae turpis massa sed
                                            elementum tempus egestas sed sed risus.
                                            In metus vulputate eu scelerisque felis imperdiet proin.</div>
                                    </li>
                                    <li class="py-3 border-bottom-1 surface-border">
                                        <div class="font-medium text-900 mb-2">In iaculis nunc sed augue lacus</div>
                                        <div class="line-height-3 text-600" style="max-width: 30rem">Viverra vitae congue.
                                            Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus.
                                            Elementum eu facilisis sed odio morbi.</div>
                                    </li>
                                    <li class="py-3 border-bottom-1 surface-border">
                                        <div class="font-medium text-900 mb-2">Proin sagittis nisl rhoncus</div>
                                        <div class="line-height-3 text-600" style="max-width: 30rem">In pellentesque massa
                                            placerat duis ultricies lacus. Ac feugiat sed lectus vestibulum mattis
                                            ullamcorper.</div>
                                    </li>
                                </ul>
                                <div class="flex justify-content-between pt-3">
                                    <Button label="Clear All"
                                        class="p-button-outlined p-button-secondary w-6 mr-2"></Button>
                                    <Button label="New Entry" class="p-button-outlined w-6 ml-2"></Button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 xl:col-6">
                            <div class="col-12 xl:col-6">
                                <div class="surface-card shadow-2 border-round p-4">
                                    <div class="text-xl text-900 font-medium mb-5">Latest News</div>
                                    <ul class="list-none p-0 m-0">
                                        <li class="pb-3 border-bottom-1 surface-border">
                                            <div class="font-medium text-900 mb-2">Aenean euismod elementum</div>
                                            <div class="line-height-3 text-600" style="max-width: 30rem">Vitae turpis massa
                                                sed
                                                elementum tempus egestas sed sed risus.
                                                In metus vulputate eu scelerisque felis imperdiet proin.</div>
                                        </li>
                                        <li class="py-3 border-bottom-1 surface-border">
                                            <div class="font-medium text-900 mb-2">In iaculis nunc sed augue lacus</div>
                                            <div class="line-height-3 text-600" style="max-width: 30rem">Viverra vitae
                                                congue.
                                                Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus.
                                                Elementum eu facilisis sed odio morbi.</div>
                                        </li>
                                        <li class="py-3 border-bottom-1 surface-border">
                                            <div class="font-medium text-900 mb-2">Proin sagittis nisl rhoncus</div>
                                            <div class="line-height-3 text-600" style="max-width: 30rem">In pellentesque
                                                massa
                                                placerat duis ultricies lacus. Ac feugiat sed lectus vestibulum mattis
                                                ullamcorper.</div>
                                        </li>
                                    </ul>
                                    <div class="flex justify-content-between pt-3">
                                        <Button label="Clear All"
                                            class="p-button-outlined p-button-secondary w-6 mr-2"></Button>
                                        <Button label="New Entry" class="p-button-outlined w-6 ml-2"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>

</script>

<style>
.pi-cog {
    line-height: 52px !important;
}

.layout-config-button {
    display: block;
    position: fixed;
    width: 52px;
    height: 52px;
    line-height: 52px !important;
    background-color: var(--primary-color);
    text-align: center;
    color: var(--primary-color-text);
    top: 270px;
    right: 0px;
    z-index: 100;
    overflow: hidden;
    cursor: pointer;
    outline: 0 none;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    -webkit-box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
</style>