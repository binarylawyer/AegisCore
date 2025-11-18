import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function RolesPage() {
  const roles = [
    {
      id: "law-firms",
      name: "Law Firms, Banks & Accounting Firms",
      description: "Manage AML/KYC workflows for HNW clients with minimal administrative burden",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "indigo",
    },
    {
      id: "galleries",
      name: "Galleries",
      description: "Protect client relationships while meeting compliance obligations",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: "emerald",
    },
    {
      id: "artists",
      name: "Artists",
      description: "Get paid instantly and build relationships with collectors",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: "purple",
    },
    {
      id: "curators",
      name: "Curators",
      description: "Represent collectors without AML/KYC concerns",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "amber",
    },
    {
      id: "regulators",
      name: "Regulators",
      description: "Access organized compliance documentation with reduced administrative costs",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "blue",
    },
    {
      id: "corporations",
      name: "Corporations & Co-ops",
      description: "Smooth process with managed custody and easy insurance",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: "zinc",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">
            Solutions for Your Role
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Aegis Core protects all parties in the art market. Select your role to understand how our platform addresses your specific compliance and operational needs.
          </p>
        </div>

        {/* Role Cards */}
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <Link
                key={role.id}
                href={`/roles/${role.id}`}
                className="group rounded-xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-lg bg-${role.color}-100 text-${role.color}-600 dark:bg-${role.color}-900/40 dark:text-${role.color}-400`}>
                  {role.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {role.name}
                </h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  {role.description}
                </p>
                <div className="mt-6 flex items-center text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 dark:text-indigo-400">
                  Learn More
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Priority Roles Highlight */}
        <section className="mx-auto mt-24 max-w-4xl">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-800 dark:bg-indigo-900/20">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Primary Use Cases
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Aegis Core is designed for three primary user groups: <strong className="text-zinc-900 dark:text-zinc-100">Law Firms</strong> managing compliance workflows, <strong className="text-zinc-900 dark:text-zinc-100">Galleries</strong> protecting relationships while meeting obligations, and <strong className="text-zinc-900 dark:text-zinc-100">Artists</strong> seeking instant payment and collector relationships. Our platform also serves curators, regulators, and corporations with specialized workflows.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

