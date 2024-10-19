function Layout({children}) {
    return ( 
        <main className="mx-auto min-h-screen max-w-screen-lg px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0 text-white">
            {children}
        </main>
     );
}

export default Layout;