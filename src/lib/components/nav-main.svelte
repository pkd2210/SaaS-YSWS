<script lang="ts">
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

	let {
		items,
	}: {
		items: {
			title: string;
			url: string;
			// this should be `Component` after @lucide/svelte updates types
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			icon?: any;
			isActive?: boolean;
			items?: {
				title: string;
				url: string;
			}[];
		}[];
	} = $props();
</script>

<Sidebar.Group>
	<Sidebar.Menu class="space-y-2">
		{#each items as item (item.title)}
			{#if item.items && item.items.length > 0}
				<!-- Item with sub-items: clickable main + expandable sub-menu -->
				<Collapsible.Root open={item.isActive} class="group/collapsible">
					{#snippet child({ props })}
						<Sidebar.MenuItem {...props} class="mb-2">
							<div class="flex w-full">
								<!-- Main clickable link -->
								<Sidebar.MenuButton class="flex-1" tooltipContent={item.title} size="lg">
									{#snippet child({ props })}
										<a href={item.url} {...props} class="flex items-center gap-3 flex-1 text-base">
											{#if item.icon}
												<item.icon class="h-5 w-5" />
											{/if}
											<span>{item.title}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
								<!-- Separate expand/collapse trigger -->
								<Collapsible.Trigger>
									{#snippet child({ props })}
										<button {...props} class="flex h-12 w-12 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
											<ChevronRightIcon
												class="h-5 w-5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
											/>
										</button>
									{/snippet}
								</Collapsible.Trigger>
							</div>
							<Collapsible.Content>
							<Sidebar.MenuSub class="ml-4 space-y-1">
								{#each item.items as subItem (subItem.title)}
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton size="md">
											{#snippet child({ props })}
												<a href={subItem.url} {...props} class="text-base py-2">
														<span>{subItem.title}</span>
													</a>
												{/snippet}
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									{/each}
								</Sidebar.MenuSub>
							</Collapsible.Content>
						</Sidebar.MenuItem>
					{/snippet}
				</Collapsible.Root>
			{:else}
				<!-- Simple clickable item without sub-items -->
				<Sidebar.MenuItem class="mb-2">
					<div class="flex w-full">
						<Sidebar.MenuButton class="flex-1" tooltipContent={item.title} size="lg">
							{#snippet child({ props })}
								<a href={item.url} {...props} class="flex flex-1 items-center gap-3 text-base">
									{#if item.icon}
										<item.icon class="h-5 w-5" />
									{/if}
									<span>{item.title}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
						<div class="h-12 w-12 shrink-0" aria-hidden="true"></div>
					</div>
				</Sidebar.MenuItem>
			{/if}
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
