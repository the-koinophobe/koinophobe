/**
 * useDocumentMeta — updates <title> and <meta name="description"> per route.
 * No react-helmet dependency needed. Works in all modern browsers.
 */
import { useEffect } from "react";

interface Meta {
  title: string;
  description: string;
  canonicalPath?: string;
}

export function useDocumentMeta({ title, description, canonicalPath }: Meta) {
  useEffect(() => {
    // Title
    document.title = title;

    // Description
    let desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.name = "description";
      document.head.appendChild(desc);
    }
    desc.content = description;

    // OG title
    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title;

    // OG description
    let ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description;

    // Canonical
    if (canonicalPath) {
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = `https://koinophobe.dev${canonicalPath}`;
    }
  }, [title, description, canonicalPath]);
}
