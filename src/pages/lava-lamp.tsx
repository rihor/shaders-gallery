import dynamic from "next/dynamic";
import RootLayout from "~/components/Layout";

const GradientBgCanvas = dynamic(
  () => import("../components/GradientBgCanvas/Canvas"
  ).then(module => module.GradientBgCanvas));

export default function LavaLampPage() {
  return (
    <RootLayout>
      <main className="flex relative h-full">
        <GradientBgCanvas />
      </main>
    </RootLayout>
  )
}
