function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className=" w-[90%] mx-auto max-w-lg mt-18 pb-18 min-h-screen  ">
      {children}
    </main>
  )
}
export default AuthContainer
