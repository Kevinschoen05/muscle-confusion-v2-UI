<template>
    <div :class="primary ? 'primary' : 'secondary'">
        <p>{{ title }}</p>
    </div>
</template>
      
<script>

export default {
    name: 'PrimaryMuscleBadge',
    props: {
        title: String,
        primary: Boolean,
    },
}

</script>

<style>
.primary {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2px 10px 2px 8px;
    width: 72px;
    height: 24px;
    background: #1849A9;
    mix-blend-mode: normal;
    border-radius: 16px;
    margin: 1em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: medium;
    color: #fff
}

.secondary {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2px 10px 2px 8px;
    gap: 6px;
    position: relative;
    width: 72px;
    height: 24px;
    background: #B2DDFF;
    mix-blend-mode: normal;
    border-radius: 16px;
    margin: .5em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: medium;
    color: #1849A9
}

</style>