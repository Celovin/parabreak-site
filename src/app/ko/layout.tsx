import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "parabreak — Godot을 위한 메타 엔진",
  description:
    "parabreak는 캐릭터가 게임 바깥의 것들에 접근하게 해주는 런타임 레이어다. 세이브 파일, 메뉴, 플레이어의 지난 세션, 시스템 시계까지. Godot 4.x용 타입드 훅 35개.",
  alternates: {
    canonical: "/ko",
    languages: {
      en: "/",
      ko: "/ko",
      ja: "/ja",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "parabreak — Godot을 위한 메타 엔진",
    description:
      "플레이어를 의식하는 게임을 만든다. 세이브, 대사, UI, OS 레이어까지 35개 타입드 훅.",
    url: "https://parabreak.com/ko",
    siteName: "parabreak",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "parabreak — Godot을 위한 메타 엔진",
    description:
      "플레이어를 의식하는 게임. Godot 4.x용 훅 35개. Free Core. 유료 Hooks와 Plus.",
  },
};

export default function KoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
