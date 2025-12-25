export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">🚫</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Unauthorized Access
                </h1>
                <p className="text-gray-600 mb-6">
                    You don&apos;t have permission to access this page. Please log in with the correct account type.
                </p>
                <div className="space-y-3">
                    <a
                        href="/"
                        className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Go to Home
                    </a>
                    <a
                        href="/login"
                        className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
                    >
                        Log In
                    </a>
                </div>
            </div>
        </div>
    );
}
