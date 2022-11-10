<template>
    <div class="primary-badge">
        <p class="primary-badge-title">{{ title }}</p>
    </div>
</template>
      
<script>

export default {
    name: 'PrimaryMuscleBadge',
    props: {
        title: String
    },
}

</script>

<style>
.primary-badge {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2px 10px 2px 8px;
    gap: 6px;
    position: relative;
    width: 72px;
    height: 24px;
    background: #1849A9;
    mix-blend-mode: normal;
    border-radius: 16px;
    margin: 1em;
}

.primary-badge-title {
    font-family: 'roboto';
    font-size: 14px;
    font-weight: medium;
    color: #fff}
</style>