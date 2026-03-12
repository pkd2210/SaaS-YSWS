<script>
    import config from '$lib/stores/config.json';
    import GalleryCard from '$lib/components/gallery-card.svelte';
    import { onMount } from 'svelte';

    let projects = [];

    onMount(async () => {
        const res = await fetch('/api/gallery');
        projects = await res.json();
    });
</script>
<div class="flex flex-col gap-6 px-4 max-w-6xl mx-auto w-full">
    <section class="flex flex-col items-center justify-center gap-2 pt-4">
        <div class="title">{config["ysws-name"]}'s Project Gallery</div>
        <div class="subtitle" style="opacity: 0.7;">Explore the projects created by fellow Hack Clubers and get inspired!</div>
    </section>
    {#if projects.length === 0}
        <p class="text-muted-foreground text-center">No Submissions yet</p>
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-start">
            {#each projects as project}
                <GalleryCard {project} />
            {/each}
        </div>
    {/if}
</div>