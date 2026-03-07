function AuthLayout({ title, children }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          {title}
        </h2>

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;