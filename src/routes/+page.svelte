<script>
    import config from '$lib/stores/config.json';
    let { data } = $props();
    import * as Collapsible from "$lib/components/ui/collapsible/index.js";
    import { ChevronDown } from "@lucide/svelte";
    import Separator from '$lib/components/ui/separator/separator.svelte';

        // FAQ Data
    const faqData = [
        {
            question: "What is Cable?",
            answer: "Cable is a YSWS (Your SaaS, Your Ship) that focuses on shipping projects that connect to existing applications, such as n8n nodes, Minecraft mods, Discord/Slack bots, and more. We provide the cables, you provide the connections!"
        },
        {
            question: "How do I earn Links (🔗)?",
            answer: "Links (🔗) can be Earned thorugh 2 ways: <br> 1. Completing <a href='/quests'><u>quests</u></a> <br> 2. Submitting projects."
        },
        {
            question: "How do I track my time?",
            answer: "To track you development time, you should use <a href='https://hackatime.hackclub.com' target='_blank'><u>Hackatime</u></a>."
        },
        {
            question: "How do I submit my project?",
            answer: "To submit your project, You should submit a link to your application, and a short description of it in the <a href='/submit/product'><u>Product Submission Form</u></a>."
        },
        {
            question: "Can I submit more than one project?",
            answer: "Yes! You can submit as many projects as you want."
        },
        {
            question: "Is AI Allowed?",
            answer: "Yes, AI is allowed to be used, but, its most be used only as an assistent, IT SHOULD *NOT* Write code insted of you, you should learn thorugh docs / youtube videos / books."
        }
    ];

    let openItems = $state(
        /** @type {Record<number, boolean>} */ (
            Object.fromEntries(faqData.map((_, index) => [index, false]))
        )
    );
</script>
 
<div class="center">
    <!-- edit Those to fit your project -->
    <!--     <svg class="hero-svg" style="fill: #3c4858;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><circle cx="50%" cy="50%" r="240" fill="{config['theme-color']}" /><g transform="translate(320, 320) scale(0.6) translate(-320, -320)"><path d="M512 128C514 128 515.9 128.1 517.8 128.3L422.1 224L490 224L562 152C570.8 163 576 176.9 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192C64 156.7 92.7 128 128 128L198.1 128L102.1 224L170 224L265 129L266 128L358.1 128L262.1 224L330 224L425 129L426 128L512.1 128z"/></g></svg>-->
    <div class="title">Welcome to {config["ysws-name"]}'s Shop</div>
    <p class="subtitle" style="text-align: center">You Ship: Something that connect to an existing application (n8n node, minecraft mode, Discord / slack bot, more....)<br>We Ship: Everything the comes with a cable (Cables, mouses, keyboards, more...)</p>
    <!--End of the editing section-->
    <button class="slack-button"><a href="https://hackclub.enterprise.slack.com/archives/C0ALR4T650U" target="_blank">#cable-ysws</a></button>
    <style>
        .hero-svg {
            transition: transform 0.3s ease;
        }
        .hero-svg:hover {
            transform: scale(1.05);
        }
        .slack-button {
            top: 20px;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            background-color: #004080;
        }
        .slack-button a {
            color: white;
            text-decoration: none;
        }
        .slack-button:hover {
            background-color: #003366;
        }
        .demo-button {
            background-color: #6c757d;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            border-radius: 0.375rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-top: 1rem;
        }
        .demo-button:hover {
            background-color: #5a6268;
        }
        </style>
    <!--End of the editing section-->
    <br>
    {#if data.user}
        <a href="/shop"><button class="login-button">Go to Shop</button></a>
    {:else}
        <a href="/api/login"><button class="login-button">Login</button></a>
        <br>
        <!-- <a href="/api/demo-login"><button class="demo-button">Try Demo</button></a> -->
    {/if}
    <section class="section-transition" aria-hidden="true">
    <div class="section-transition-line"></div>
    <a class="faq-jump-button" href="#faq-section">
        Go down to FAQ
        <ChevronDown size={18} />
    </a>
    <div class="section-transition-glow"></div>
</section>
</div>


<div class="faq-container" id="faq-section">
    <section class="faq-header">
        <div class="title">Frequently Asked Questions</div>
        <div class="subtitle">Find answers to common questions about {config["ysws-name"]}</div>
        <div class="text-foreground text-center">By Submitting a Project to this YSWS, You agree you will not preform any fraud, In any shape or form in all of HC Services (Including but not limited to this ysws, lapse, and hackatime)</div>
        <Separator class="my-4" style="background-color: #002447;" />
    </section>
<section class="faq-content">
        <div class="faq-items">
            {#each faqData as faq, index}
                <div class="faq-item">
                    <Collapsible.Root bind:open={openItems[index]}>
                        <Collapsible.Trigger class="faq-question">
                            <span class="faq-question-text">{faq.question}</span>
                            <ChevronDown 
                                class="faq-chevron {openItems[index] ? 'faq-chevron-open' : ''}" 
                                size={20} 
                            />
                        </Collapsible.Trigger>
                        <Collapsible.Content class="faq-answer">
                            <div class="faq-answer-content">
                                <p>{@html faq.answer}</p>
                            </div>
                        </Collapsible.Content>
                    </Collapsible.Root>
                </div>
            {/each}
        </div>
    </section>
</div>
<style>
    :global(html) {
        scroll-behavior: smooth;
    }

    .center {
        position: relative;
        min-height: 100svh;
        padding-bottom: 8.5rem;
        box-sizing: border-box;
    }

    .section-transition {
        position: absolute;
        left: 50%;
        bottom: 2.5rem;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.9rem;
        margin: 0;
        padding: 1.25rem 1rem 1.5rem;
        max-width: 800px;
        width: min(100%, 800px);
    }

    .section-transition-line {
        width: min(92%, 720px);
        height: 3px;
        border-radius: 999px;
        background: linear-gradient(
            90deg,
            transparent 0%,
            color-mix(in srgb, var(--secondary-theme-color, #003366) 25%, white) 16%,
            var(--theme-color, #004080) 50%,
            color-mix(in srgb, var(--secondary-theme-color, #003366) 25%, white) 84%,
            transparent 100%
        );
    }

    .faq-jump-button {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        text-decoration: none;
        font-family: "Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-weight: 700;
        letter-spacing: 0.01em;
        color: var(--background-color, #f3f6ff);
        background: linear-gradient(135deg, var(--theme-color, #004080), var(--secondary-theme-color, #003366));
        border: 1px solid color-mix(in srgb, var(--theme-color, #004080) 60%, white);
        border-radius: 999px;
        padding: 0.55rem 1rem;
        transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
        box-shadow: 0 8px 20px rgba(0, 36, 71, 0.22);
    }

    .faq-jump-button :global(svg) {
        transition: transform 0.25s ease;
    }

    .faq-jump-button:hover {
        transform: translateY(-2px);
        filter: brightness(1.05);
        box-shadow: 0 12px 26px rgba(0, 36, 71, 0.27);
    }

    .faq-jump-button:hover :global(svg) {
        transform: translateY(2px);
    }

    .section-transition-glow {
        width: min(70%, 520px);
        height: 28px;
        border-radius: 999px;
        background: radial-gradient(
            ellipse at center,
            color-mix(in srgb, var(--theme-color, #004080) 14%, transparent) 0%,
            transparent 72%
        );
        pointer-events: none;
    }

    .faq-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .faq-header {
        text-align: center;
        margin-bottom: 3rem;
    }

    .faq-content {
        margin-bottom: 3rem;
    }

    .faq-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .faq-item {
        border: 2px solid var(--secondary-theme-color);
        border-radius: 0.5rem;
        background-color: var(--background-color);
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .faq-item:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }

    :global(.faq-question) {
        width: 100%;
        padding: 1.25rem;
        background: transparent;
        border: none;
        text-align: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all 0.3s ease;
        color: var(--theme-color);
    }

    :global(.faq-question:hover) {
        background-color: rgba(236, 55, 80, 0.1);
    }

    .faq-question-text {
        font-size: 1.1rem;
        font-weight: 600;
        font-family: "Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    :global(.faq-chevron) {
        color: var(--theme-color);
        transition: transform 0.3s ease;
        flex-shrink: 0;
    }

    :global(.faq-chevron-open) {
        transform: rotate(180deg);
    }

    :global(.faq-answer) {
        overflow: hidden;
    }

    .faq-answer-content {
        padding: 0 1.25rem 1.25rem 1.25rem;
        color: var(--secondary-theme-color);
        line-height: 1.6;
        font-size: 1rem;
    }

    .faq-answer-content p {
        margin: 0;
    }

    .faq-contact {
        margin-top: 4rem;
    }

    .contact-card {
        text-align: center;
        padding: 2rem;
        border: 2px solid var(--secondary-theme-color);
        border-radius: 0.5rem;
        background: linear-gradient(135deg, var(--background-color) 0%, rgba(236, 55, 80, 0.05) 100%);
    }

    .contact-card h3 {
        color: var(--theme-color);
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        font-family: "Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .contact-card p {
        color: var(--secondary-theme-color);
        margin-bottom: 1.5rem;
        font-size: 1rem;
    }

    .contact-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        background-color: var(--theme-color);
        color: var(--background-color);
        text-decoration: none;
        border-radius: 0.5rem;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        font-family: "Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .contact-button:hover {
        background-color: var(--secondary-theme-color);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .center {
            min-height: 92svh;
            padding-bottom: 7.5rem;
        }

        .section-transition {
            bottom: 0.25rem;
            padding: 1rem 0.5rem 1.2rem;
        }

        .faq-jump-button {
            font-size: 0.95rem;
            padding: 0.5rem 0.9rem;
        }

        .faq-container {
            padding: 1rem 0.5rem;
        }

        .faq-header {
            margin-bottom: 2rem;
        }

        .faq-question-text {
            font-size: 1rem;
        }

        .faq-answer-content {
            font-size: 0.9rem;
        }

        .contact-card {
            padding: 1.5rem;
        }

        .contact-card h3 {
            font-size: 1.3rem;
        }
    }

    @media (max-width: 480px) {
        .faq-container {
            padding: 1rem 0.25rem;
        }

        :global(.faq-question) {
            padding: 1rem;
        }

        .faq-answer-content {
            padding: 0 1rem 1rem 1rem;
        }
    }
</style>
