export default function RoiCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-semibold mb-6">ROI Calculator</h1>
        <iframe
          src="/roi-calculator/index.html"
          className="w-full min-h-[1600px] border rounded-xl"
        />
      </div>
    </main>
  )
}
