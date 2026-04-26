import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.aesciahealth.com'

// AI crawler allow-list. We want every legitimate AI search/training agent to
// reach the public site so that LLM-based discovery surfaces (Claude.ai web
// search, ChatGPT search, Perplexity, Gemini, You.com, etc.) can index and
// cite Aescia. Source for the canonical list:
// https://github.com/ai-robots-txt/ai.robots.txt — we ALLOW the same agents
// that list DISALLOWS, plus a few extras we've identified independently.
//
// CRITICAL: Bravebot is the underlying crawler for Anthropic's WebSearch tool
// (Claude.ai). Without it allowed, Claude users cannot retrieve our content.
const aiCrawlers = [
  // OpenAI family
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ChatGPT Agent',
  'OpenAI',
  'Operator',
  // Anthropic family
  'ClaudeBot',
  'Claude-Web',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  // Brave (powers Anthropic's web search index)
  'Bravebot',
  // Google AI surfaces
  'Google-Extended',
  'GoogleOther',
  'Google-CloudVertexBot',
  'Google-NotebookLM',
  'NotebookLM',
  'Google-Agent',
  'Gemini-Deep-Research',
  // Apple
  'Applebot',
  'Applebot-Extended',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Microsoft / Bing AI
  'bingbot',
  'BingBot',
  // Common Crawl (powers many LLM training corpora)
  'CCBot',
  // ByteDance
  'Bytespider',
  // Meta
  'FacebookBot',
  'Meta-ExternalAgent',
  'meta-externalagent',
  'meta-externalfetcher',
  // Amazon
  'Amazonbot',
  'amazon-kendra',
  // Cohere
  'cohere-ai',
  'cohere-training-data-crawler',
  // Mistral
  'MistralAI-User',
  // You.com
  'YouBot',
  // DuckDuckGo AI
  'DuckAssistBot',
  // Exa.ai
  'ExaBot',
  // AI2 (Allen Institute)
  'AI2Bot',
  'AI2Bot-Dolma',
  // Diffbot, used by many enterprise LLM stacks
  'Diffbot',
  // iAsk
  'iAskBot',
  // Tavily, used by many agentic RAG stacks
  'TavilyBot',
  // Firecrawl, popular agentic RAG ingest
  'FirecrawlAgent',
  // Cloudflare AutoRAG
  'Cloudflare-AutoRAG',
  // Azure AI search
  'AzureAI-SearchBot',
  // DeepSeek
  'DeepSeekBot',
  // Crawl4AI
  'Crawl4AI',
  // Chinese AI surfaces
  'ChatGLM-Spider',
  // Apify (used by many agentic stacks)
  'ApifyBot',
  // LinkedIn (helps with citations in LinkedIn AI features)
  'LinkedInBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/tools/'],
      },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
