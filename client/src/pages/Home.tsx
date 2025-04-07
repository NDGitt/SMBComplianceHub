import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-cyan-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                Berkeley Business Compliance Portal
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                Discover the exact requirements for your Berkeley business and
                find local service providers to help you stay compliant with city, state and federal regulations.
              </p>
              <Link href="/discovery">
                <Button
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-md shadow-md transition"
                  size="lg"
                >
                  Discover Your Requirements
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <img
                src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Small business owner working"
                className="rounded-lg shadow-lg"
                width="600"
                height="400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How We Help Berkeley Businesses
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Berkeley-Specific Requirements</h3>
              <p className="text-gray-600">
                Access comprehensive compliance requirements for restaurants, daycares, and salons 
                operating in Berkeley, CA with actual links to forms and applications.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Local Service Providers</h3>
              <p className="text-gray-600">
                Connect with Berkeley-area experts and service providers who specialize in local 
                compliance requirements and can guide you through the process.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Level Compliance</h3>
              <p className="text-gray-600">
                Understand city, state, and federal requirements relevant to your Berkeley business 
                and get guidance on meeting all applicable regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to navigate Berkeley's business requirements?
          </h2>
          <p className="text-xl mb-8">
            Start your compliant Berkeley business journey with our comprehensive guidance tool.
          </p>
          <Link href="/discovery">
            <Button
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-md shadow-md transition"
              size="lg"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
