import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "parabreak — Godotのためのメタエンジン",
  description:
    "parabreakはランタイムレイヤー。キャラクターをセーブファイル、メニュー、プレイヤーの前回セッション、システム時計に届かせる。Godot 4.x向けの型付フック35本。",
  alternates: {
    canonical: "/ja",
    languages: {
      en: "/",
      ko: "/ko",
      ja: "/ja",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "parabreak — Godotのためのメタエンジン",
    description:
      "プレイヤーに気づくゲームを作る。セーブ、セリフ、UI、OSレイヤーまで35本の型付フック。",
    url: "https://parabreak.com/ja",
    siteName: "parabreak",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "parabreak — Godotのためのメタエンジン",
    description:
      "プレイヤーに気づくゲーム。Godot 4.x向け35フック。Free Core。有料HooksとPlus。",
  },
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
