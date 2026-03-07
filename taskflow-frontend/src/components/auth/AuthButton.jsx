function AuthButton({ text, loading }) {

  return (
    <button
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      disabled={loading}
    >
      {loading ? "Please wait..." : text}
    </button>
  );

}

export default AuthButton;