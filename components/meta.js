import Head from "next/head";

export default function Meta() {
  const description =
    "Jsi na procházce a potřebuješ na velkou? Nezoufej, deník sráčů tě zachrání!";
  const title = "Deník sráčů";
  const keywords =
    "Deník sráčů, záchod, toalety, WC, položit kabel, saulit, trůnění, sráč";
  const mainColor = `af8566ff`;
  const url = "https://deniksracu.cz/";
  return (
    <Head>
      <title>Deník sráčů</title>

      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />

      <link rel="manifest" href="/manifest.json" />

      <meta name="application-name" content={title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="PWA App" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content={mainColor} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@deniksracu" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={url} />

      <meta name="robots" content="all" />
    </Head>
  );
}
