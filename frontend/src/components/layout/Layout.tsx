import Topbar from "../shared/TopBar";


export default function Layout({ title, children, showBack }: { title: string, showBack?: boolean, children: React.ReactNode }) {
  return (
    <>
      <Topbar title={title} showBack={showBack} />
      <main className="w-full p-4">{children}</main>
    </>
  );
}