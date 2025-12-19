// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
    nitro: {
    preset: 'cloudflare_pages',
  },
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "IES Jakarta Quick Links",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      { name: "msapplication-TileColor", content: "#da532c" },
      { name: "theme-color", content: "#ffffff" },
      {
        name: "description",
        content:
          "We are a church committed to serve the English-speaking community in Jakarta.",
      },
      { property: "og:title", content: "IES Jakarta" },
      {
        property: "og:description",
        content:
          "We are a church committed to serve the English-speaking community in Jakarta.",
      },
      { property: "og:url", content: "https://iesjak.art" },
      {
        property: "og:image",
        content: "https://iesjak.art/graphics/IES-logoWhiteBack.png",
      },
      {
        property: "og:image:secure_url",
        content: "https://iesjak.art/graphics/IES-logoWhiteBack.png",
      },
      { property: "og:updated_time", content: "1633093082000" },
      { property: "profile:username", content: "IESJakarta" },
      { name: "twitter:title", content: "IES Jakarta" },
      {
        name: "twitter:description",
        content:
          "We are a church committed to serve the English-speaking community in Jakarta.",
      },
      {
        name: "twitter:image",
        content: "https://iesjak.art/graphics/IES-logoWhiteBack.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "faviconIESAdmin/favicon-96x96.png",
      },
      {
        rel="icon", 
        type="image/svg+xml", 
        href="faviconIESAdmin/favicon.svg"
      },
      {
        rel="shortcut icon", 
        href="/favicon.ico" 
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "faviconIESAdmin/apple-touch-icon.png",
      },
      { 
        rel: "manifest", 
        href: "faviconIESAdmin/site.webmanifest" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Lato:300",
      },
    ],
  },
  modules: ["@nuxt/content"],
  content: {
    documentDriven: true
  }
});