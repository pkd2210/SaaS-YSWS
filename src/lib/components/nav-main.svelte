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
	<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each items as item (item.title)}
			{#if item.items && item.items.length > 0}
				<!-- Item with sub-items: clickable main + expandable sub-menu -->
				<Collapsible.Root open={item.isActive} class="group/collapsible">
					{#snippet child({ props })}
						<Sidebar.MenuItem {...props}>
							<div class="flex w-full">
								<!-- Main clickable link -->
								<Sidebar.MenuButton class="flex-1" tooltipContent={item.title}>
									{#snippet child({ props })}
										<a href={item.url} {...props} class="flex items-center gap-2 flex-1">
											{#if item.icon}
												<item.icon />
											{/if}
											<span>{item.title}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
								<!-- Separate expand/collapse trigger -->
								<Collapsible.Trigger>
									{#snippet child({ props })}
										<button {...props} class="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
											<ChevronRightIcon
												class="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
											/>
										</button>
									{/snippet}
								</Collapsible.Trigger>
							</div>
							<Collapsible.Content>
								<Sidebar.MenuSub>
									{#each item.items ?? [] as subItem (subItem.title)}
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												{#snippet child({ props })}
													<a href={subItem.url} {...props}>
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
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent={item.title}>
						{#snippet child({ props })}
							<a href={item.url} {...props} class="flex items-center gap-2">
								{#if item.icon}
									<item.icon />
								{/if}
								<span>{item.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/if}
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
