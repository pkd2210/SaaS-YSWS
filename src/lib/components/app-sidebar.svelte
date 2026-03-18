<script lang="ts" module>
	import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
	import HomeIcon from "@lucide/svelte/icons/home";
	import ShoppingCartIcon from "@lucide/svelte/icons/shopping-cart";
	import TrophyIcon from "@lucide/svelte/icons/trophy";
	import images from "@lucide/svelte/icons/images";
	import ScrollText from "@lucide/svelte/icons/scroll-text";
	import SendHorizontal from "@lucide/svelte/icons/send-horizontal";
	import Clapperboard from "@lucide/svelte/icons/clapperboard";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import Cable from "@lucide/svelte/icons/cable";
</script>

<script lang="ts">
	import NavMain from "./nav-main.svelte";
	import NavUser from "./nav-user.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";
	import config from '$lib/stores/config.json';

	let {
		data,
		ref = $bindable(null),
		collapsible = "icon",
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & { data: any } = $props();

	// Create sidebar navigation based on user state
	const sidebarData = $derived({
		user: data.user ? {
			name: data.user.first_name || "User",
			email: data.user.email || "",
			avatar: "https://cachet.dunkirk.sh/users/" + (data.user.slack_id || "default") + "/r",
		} : null,
		navMain: [
			{
				title: "Home",
				url: "/",
				icon: HomeIcon,
				isActive: true,
			},
			{
				title: "Shop",
				url: `/shop`,
				icon: ShoppingCartIcon,
				items: [
					{
						title: "Browse Items",
						url: `/shop`,
					},
					...(data.user ? [{
						title: "Orders",
						url: `/shop/orders`,
					}] : []),
					...(data.user ? [{
						title: "Projects",
						url: `/shop/projects`,
					}] : []),
					
				],
			},
			...(data.user ? [{
				title: "Quests",
				url: `/quests`,
				icon: TrophyIcon,
			}] : []),
			...(data.user ? [{
				title: "Submit",
				icon: SendHorizontal,
				url: `/submit/product`,
//				items: [
//					{
//						title: "Submit Product",
//						url: `/submit/product`,
//					},
//					{
//						title: "Submit Video",
//						url: `/submit/video`,
//					},
//				],
			}] : []),
			{
				title: "FAQ",
				url: `/#faq-section`,
				icon: GalleryVerticalEndIcon,
			},
//			},
//			{
//				title: "Tutorials",
//				icon: ScrollText,
//				items: [
//					{
//						title: "Soon...",
//					},
//					
//				],
//			},
			{
				title: "Gallery",
				url: `/gallery`,
				icon: images,
			},
			...(data.user?.Reviewer ? [{
				title: "Review Submissions",
				icon: Clapperboard,
				url: `/review/products`,
//				items: [
//					{
//						title: "Products",
//						url: `/review/products`,
//					},
//					{
//						title: "Videos",
//						url: `/review/videos`,
//					},
//				],
			}] : []),
		],
	});
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<a href="/">
			<div class="flex items-center gap-3 px-4 py-4">
				<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
					<Cable class="h-6 w-6" />
				</div>
				<div class="flex flex-col">
					<span class="text-lg font-semibold">Cable YSWS</span>
				</div>
			</div>
		</a>
	</Sidebar.Header>
	<Sidebar.Content>
		<Separator style="background-color: #002447;"/>
		<NavMain items={sidebarData.navMain} />
	</Sidebar.Content>
	<Separator style="background-color: #002447;"/>
	<Sidebar.Footer>
		{#if sidebarData.user}
			<NavUser user={sidebarData.user} data={data}/>
		{:else}
			<div class="px-3 py-2">
				<a href="/api/login" class="text-md text-primary hover:underline font-large text-center">Login</a>
			</div>
		{/if}
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
