import dynamic from "next/dynamic";
import Head from "next/head";
import RootLayout from "~/components/Layout";

const GradientBgCanvas = dynamic(
  () => import("../components/GradientBgCanvas/Canvas"
  ).then(module => module.GradientBgCanvas));

export default function LavaLampPage() {
  return (
    <RootLayout>
      <Head>
        <title>Lava Lamp</title>
      </Head>

      <main className="flex relative h-full">
        <GradientBgCanvas />
      </main>
    </RootLayout>
  )
}
