import MobileMenu from "@/components/shared/MobileMenu";

export default function MenuPage() {
  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="w-full">
        <div className="bg-transparent">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}
