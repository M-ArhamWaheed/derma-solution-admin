import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";

export default function ProfileSettingsPage() {
  return (
    <>
      <Navbar user={null} />
      <main className="container mx-auto py-8">
        {/* Back to Account Section */}
        <section className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/book-consultation" className="text-muted-foreground text-base font-normal cursor-pointer flex items-center gap-1">
              <span className="text-xl font-bold">&#8592;</span> Go back
            </Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Profile</h1>
        </section>

        {/* Personal Details Section */}
        <section className="max-w-3xl mx-auto bg-muted rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input type="text" className="w-full rounded-lg border px-2 py-1 text-lg text-black font-medium bg-white" defaultValue="Yaseen" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <div className="relative">
                <input type="text" className="w-full rounded-lg border px-2 py-1 text-lg text-black font-medium bg-white pr-4" defaultValue="Akhtar" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xl">🚫</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone number</label>
              <div className="flex items-center gap-2">
                <span className="inline-block w-10 h-10 bg-muted border rounded-lg flex items-center justify-center text-xl">📱</span>
                <input type="text" className="w-full rounded-lg border px-2 py-1 text-lg text-black font-medium bg-white" defaultValue="+44 7944 499411" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full rounded-lg border px-2 py-1      text-lg text-black font-medium bg-white" defaultValue="yaseenakhtar01@gmail.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of birth (optional)</label>
              <div className="flex items-center gap-2">
                <span className="inline-block w-10 h-10 bg-muted border rounded-lg flex items-center justify-center text-xl">📅</span>
                <input type="text" className="w-full rounded-lg border px-2 py-1 text-lg text-black font-medium bg-white" placeholder="Choose date" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender (optional)</label>
              <select className="w-full rounded-lg border px-2 py-1 text-lg text-black font-medium bg-white">
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end mt-1">
              <button type="submit" className="bg-[#222] text-white text-lg font-semibold rounded-full px-6 py-2 shadow-md hover:bg-[#111] transition-all">
                Save changes
              </button>
            </div>
          </form>
        </section>

        {/* Addresses Section */}
        <section className="max-w-3xl mx-auto bg-muted rounded-xl shadow p-6 mt-4">
          <h2 className="text-2xl font-bold mb-4">Addresses</h2>
          {/* Shipping */}
          <div className="mb-2">
            <div className="text-xl font-semibold mb-1">Shipping</div>
            <div className="text-muted-foreground mb-2">Add a shipping address here to be pre-filled for quicker checkout.</div>
            <button className="bg-[#222] text-white text-lg font-semibold rounded-full px-8 py-2 shadow-md hover:bg-[#111] transition-all">Add address</button>
          </div>
          <hr className="my-2 border-muted-foreground/20" />
          {/* Billing */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-xl font-semibold mb-1">Billing</div>
              <div className="text-base font-medium">Yaseen Akhtar</div>
              <div>Bateson Way, 21, Woking,</div>
              <div>Surrey, United Kingdom</div>
              <div>GU215LE</div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="rounded-full border px-8 py-2 text-base font-semibold bg-[#222] hover:bg-muted transition">Edit</button>
              <button className="rounded-full border px-8 py-2 text-base font-semibold bg-muted text-muted-foreground hover:bg-red-100 hover:text-black transition">Delete</button>
            </div>
          </div>
        </section>

        {/* Notification Preferences Section */}
        <section className="max-w-3xl mx-auto bg-muted rounded-xl shadow p-6 mt-4">
          <h2 className="text-2xl font-bold mb-4">Notification Preferences</h2>
          {/* Email Preferences */}
          <div className="mb-2">
            <div className="text-xl font-semibold mb-2">Email</div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm font-semibold text-muted-foreground">Reminders</div>
                <div className="text-base">Email reminders about your appointments.</div>
              </div>
              <input type="checkbox" checked className="w-10 h-6 rounded-full accent-green-500" readOnly />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-muted-foreground">Marketing updates</div>
                <div className="text-base">Email updates about offers, products and services.</div>
              </div>
              <input type="checkbox" className="w-10 h-6 rounded-full accent-green-500" readOnly />
            </div>
          </div>
          <hr className="my-4 border-muted-foreground/20" />
          {/* SMS Preferences */}
          <div>
            <div className="text-xl font-semibold mb-2">SMS</div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm font-semibold text-muted-foreground">Reminders</div>
                <div className="text-base">SMS reminders about your appointments.</div>
              </div>
              <input type="checkbox" checked className="w-10 h-6 rounded-full accent-green-500" readOnly />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-muted-foreground">Marketing updates</div>
                <div className="text-base">SMS updates about offers, products and services.</div>
              </div>
              <input type="checkbox" className="w-10 h-6 rounded-full accent-green-500" readOnly />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
