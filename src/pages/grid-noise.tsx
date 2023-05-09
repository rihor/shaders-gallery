import dynamic from "next/dynamic";
import RootLayout from "~/components/Layout";

const GridNoiseCanvas = dynamic(
  () => import("../components/GridNoiseCanvas/Canvas"
  ).then(module => module.GridNoiseCanvas));

export default function LavaLampPage() {
  return (
    <RootLayout>
      <main className="flex relative h-full">
        <GridNoiseCanvas />
      </main>
    </RootLayout>
  )
}
