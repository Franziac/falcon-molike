import Generator from "./Generator";
import DynamicTitle from "./DynamicTitle";
export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-slate-100 to-indigo-100">
      <div className="relative top-28">
        <div className='h-28 flex items-center justify-center'>
          <div className="w-730">
            <DynamicTitle/>
          </div>
        </div>

        <div className="flex h-10 justify-center">
          <button className="w-36 rounded-md bg-gradient-to-br from-purple-500 bg-violet-600">
            <p className="bg-gradient-to-r from-white to-slate-100 text-transparent bg-clip-text font-jost subpixel-antialiase font-medium">Get started</p>
          </button>

        </div>
      </div>
    </main>
  );
}
