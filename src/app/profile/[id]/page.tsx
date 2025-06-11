export default function UserProfile({params}:any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-2xl">Welcome to your profile page {params.id}!</p>
      <p>Here you can view and edit your profile information.</p>
    </div>
  );
}
