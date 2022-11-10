<template>
    <div class="badge">
        <p class="badge-title">{{ title }}</p>
    </div>
</template>
      
<script>

export default {
    name: 'SecondaryMuscleBadge',
    props: {
        title: String
    },
}

</script>

<style>
.badge {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2px 10px 2px 8px;
    gap: 6px;
    position: relative;
    width: 72px;
    height: 24px;
    background: #EFF8FF;
    mix-blend-mode: normal;
    border-radius: 16px;
    margin: 1em;
}

.badge-title {
    font-family: 'roboto';
    font-size: 14px;
    font-weight: medium;
    color: #1849A9}
</style>