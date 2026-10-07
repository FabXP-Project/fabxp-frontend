import { SignIn } from "@clerk/nextjs";
import { FabxpLogo } from "@/components/FabxpLogo";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#139c70]/10 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#00b5b8]/10 blur-[100px]" />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-4 mt-12 mb-16">
        <div className="mb-8 scale-110">
          <FabxpLogo size="md" />
        </div>
        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "w-full shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100",
              headerTitle: "text-2xl font-bold text-slate-900 font-sans tracking-tight",
              headerSubtitle: "text-slate-500 text-sm",
              formButtonPrimary: "bg-[#139c70] hover:bg-[#0f855e] text-white shadow-sm rounded-xl py-2.5 transition-all active:scale-[0.98]",
              footerActionLink: "text-[#139c70] hover:text-[#0f855e] font-medium transition-colors",
              identityPreviewEditButtonIcon: "text-[#139c70]",
              formFieldInput: "rounded-xl border-slate-200 focus:border-[#139c70] focus:ring-[#139c70]/20 py-2.5",
              formFieldLabel: "text-slate-700 font-medium",
              dividerLine: "bg-slate-200",
              dividerText: "text-slate-400 font-medium",
              socialButtonsBlockButton: "rounded-xl border-slate-200 hover:bg-slate-50 transition-colors",
            }
          }}
        />
      </div>
    </div>
  );
}
