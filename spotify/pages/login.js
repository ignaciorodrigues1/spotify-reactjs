import { getProviders, signIn } from "next-auth/react";

function login({ providers }) {
  return (
    <div className="bg-black min-h-screen w-full">
      <div className="px-4 py-4 w-full border-b-[0.1px] border-gray-900 flex items-center justify-center">
        <img className="w-52" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="" />
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-screen">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button 
            className="bg-[#18d860] text-white py-3 px-10 rounded-full"
            onClick={ () => signIn(provider.id, { callbackUrl: "/" }) }
            >Login with {provider.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}