<script>
    import config from '$lib/stores/config.json';
    import * as Table from "$lib/components/ui/table/index.js";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    
    export let data;
    $: users = data.users;
    
    function getRankEmoji(index) {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `${index + 1}.`;
    }
</script>   

<div class="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
    <section class="flex flex-col items-center justify-center gap-4">
        <div class="title">{config["ysws-name"]}'s Leaderboard</div>
    </section>
    
    <div class="rounded-lg border bg-card shadow-sm">
        <Table.Root>
            <Table.Header>
                <Table.Row class="hover:bg-transparent">
                    <Table.Head class="w-20 text-center">Rank</Table.Head>
                    <Table.Head class="w-16"></Table.Head>
                    <Table.Head>Name</Table.Head>
                    <Table.Head class="text-right w-32">{config['tokens-symbol']}</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each users as user, index}
                    <Table.Row class="hover:bg-muted/50 transition-colors">
                        <Table.Cell class="text-center font-medium text-lg">
                            {getRankEmoji(index)}
                        </Table.Cell>
                        <Table.Cell class="p-2">
                            <Avatar.Root class="h-10 w-10">
                                {#if user.imageUrl}
                                    <Avatar.Image src={user.imageUrl} alt={user.displayName} />
                                {/if}
                                <Avatar.Fallback class="text-sm font-medium">
                                    {user.displayName?.split(' ').map(n => n[0]).join('').toUpperCase() || user.SlackID.slice(0, 2).toUpperCase()}
                                </Avatar.Fallback>
                            </Avatar.Root>
                        </Table.Cell>
                        <Table.Cell class="font-medium">
                            <div class="flex flex-col">
                                <a href="https://hackclub.slack.com/team/{user.SlackID}" target="_blank"><span class="font-semibold">{user.displayName || user.SlackID}</span></a>
                                <span class="text-sm text-muted-foreground">@{user.SlackID}</span>
                            </div>
                        </Table.Cell>
                        <Table.Cell class="text-right font-mono font-semibold">
                            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium">
                                {user.Tokens?.toLocaleString() || 0}
                            </span>
                        </Table.Cell>
                    </Table.Row>
                {/each}
                {#if users.length === 0}
                    <Table.Row>
                        <Table.Cell colspan="4" class="text-center text-muted-foreground py-8">
                            No users found. Check back later!
                        </Table.Cell>
                    </Table.Row>
                {/if}
            </Table.Body>
        </Table.Root>
    </div>
</div>