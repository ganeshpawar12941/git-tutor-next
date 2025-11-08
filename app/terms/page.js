import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function TermsPage() {
  return (
    <>
      <SiteNav />
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 relative overflow-hidden" style={{ paddingTop: "3.5rem" }}>
        <div className="relative z-10 py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10">
              <div className="prose prose-invert max-w-none">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">Terms and Conditions</h1>

                <div className="space-y-6 text-slate-300">
                  <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                    <p>
                      By accessing and using Git-Tutor, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">2. User Accounts</h2>
                    <p>
                      You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">3. User Roles</h2>
                    <div className="space-y-3">
                      <div>
                        <strong className="text-white">Students:</strong> Must use @students.git.edu email addresses for registration.
                      </div>
                      <div>
                        <strong className="text-white">Teachers:</strong> Must use @git.edu email addresses and require email verification before accessing the platform.
                      </div>
                      <div>
                        <strong className="text-white">Administrators:</strong> Require special admin keys and have full platform access.
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">4. Acceptable Use</h2>
                    <p>
                      You agree not to use the service to:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe on intellectual property rights</li>
                      <li>Upload malicious content or viruses</li>
                      <li>Harass or abuse other users</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">5. Content</h2>
                    <p>
                      All course materials, videos, and content provided on Git-Tutor are for educational purposes only. You may not reproduce, distribute, or sell this content without permission.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">6. Privacy</h2>
                    <p>
                      Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
                    <p>
                      Git-Tutor is provided "as is" without warranties. We are not liable for any damages arising from your use of the service.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to Terms</h2>
                    <p>
                      We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of updated terms.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">9. Contact</h2>
                    <p>
                      If you have questions about these terms, please contact us through the platform or email us at support@git-tutor.com.
                    </p>
                  </section>
                </div>

                <div className="mt-12 text-center">
                  <p className="text-slate-400 text-sm">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
