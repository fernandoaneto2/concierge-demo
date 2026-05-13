import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold text-stone-800 tracking-tight">
          Concierge
        </h1>
        <p className="text-stone-400 text-sm mt-1">AI inbox for restaurants</p>
      </div>
      <SignUp />
    </div>
  );
}
