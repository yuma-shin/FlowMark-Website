type GitHubAsset = {
  name: string;
  browser_download_url: string;
};

type GitHubRelease = {
  html_url?: string;
  assets?: GitHubAsset[];
};

export type FlowMarkDownloadLinks = {
  releasePage: string;
  windowsSetupExe: string;
  windowsPortableExe: string;
  windowsZip: string;
  macArmDmg: string;
  macIntelDmg: string;
  macUniversalZip: string;
  linuxAppImage: string;
  linuxDeb: string;
  linuxRpm: string;
};

const RELEASES_API = "https://api.github.com/repos/yuma-shin/FlowMark/releases/latest";
const FALLBACK_RELEASE_URL = "https://github.com/yuma-shin/FlowMark/releases/tag/v1.0.3";

const defaultLinks: FlowMarkDownloadLinks = {
  releasePage: FALLBACK_RELEASE_URL,
  windowsSetupExe: FALLBACK_RELEASE_URL,
  windowsPortableExe: FALLBACK_RELEASE_URL,
  windowsZip: FALLBACK_RELEASE_URL,
  macArmDmg: FALLBACK_RELEASE_URL,
  macIntelDmg: FALLBACK_RELEASE_URL,
  macUniversalZip: FALLBACK_RELEASE_URL,
  linuxAppImage: FALLBACK_RELEASE_URL,
  linuxDeb: FALLBACK_RELEASE_URL,
  linuxRpm: FALLBACK_RELEASE_URL,
};

let cached: Promise<FlowMarkDownloadLinks> | null = null;

function findAsset(assets: GitHubAsset[], matchers: RegExp[], fallback: string): string {
  const hit = assets.find((asset) =>
    matchers.every((matcher) => matcher.test(asset.name)),
  );
  return hit?.browser_download_url || fallback;
}

export async function getFlowMarkDownloadLinks(): Promise<FlowMarkDownloadLinks> {
  if (cached) return cached;

  cached = (async () => {
    try {
      const headers: Record<string, string> = {
        Accept: "application/vnd.github+json",
      };
      const token = import.meta.env.GITHUB_TOKEN;
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(RELEASES_API, { headers });
      if (!res.ok) return defaultLinks;

      const release = (await res.json()) as GitHubRelease;
      const assets = release.assets || [];
      const releasePage = release.html_url || FALLBACK_RELEASE_URL;

      const windowsSetupExe = findAsset(assets, [/(win|windows)/i, /setup/i, /\.exe$/i], releasePage);
      const windowsPortableExe = findAsset(assets, [/(win|windows)/i, /portable/i, /\.exe$/i], releasePage);
      const windowsZip = findAsset(assets, [/(win|windows)/i, /\.zip$/i], releasePage);

      const macArmDmg = findAsset(assets, [/mac/i, /(arm|arm64|aarch64|silicon)/i, /\.dmg$/i], releasePage);
      const macIntelDmg = findAsset(assets, [/mac/i, /(intel|x64)/i, /\.dmg$/i], releasePage);
      const macUniversalZip = findAsset(assets, [/mac/i, /(universal|all)/i, /\.zip$/i], releasePage);

      const linuxAppImage = findAsset(assets, [/linux/i, /\.appimage$/i], releasePage);
      const linuxDeb = findAsset(assets, [/linux/i, /\.deb$/i], releasePage);
      const linuxRpm = findAsset(assets, [/linux/i, /\.rpm$/i], releasePage);

      const windowsAnyExe = findAsset(assets, [/(win|windows)/i, /\.exe$/i], releasePage);
      const macAnyDmg = findAsset(assets, [/mac/i, /\.dmg$/i], releasePage);

      return {
        releasePage,
        windowsSetupExe: windowsSetupExe === releasePage ? windowsAnyExe : windowsSetupExe,
        windowsPortableExe,
        windowsZip,
        macArmDmg: macArmDmg === releasePage ? macAnyDmg : macArmDmg,
        macIntelDmg: macIntelDmg === releasePage ? macAnyDmg : macIntelDmg,
        macUniversalZip,
        linuxAppImage,
        linuxDeb,
        linuxRpm,
      };
    } catch {
      return defaultLinks;
    }
  })();

  return cached;
}
