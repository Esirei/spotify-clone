import { GetServerSideProps } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { FC } from 'react';

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

const Login: FC<Props> = ({ providers }) => {
  return (
    <div className="flex flex-col items-center h-screen bg-black justify-center">
      <img src="/images/spotify-logo.png" alt="" className="w-52 h-52" />

      {Object.values(providers).map(provider => (
        <div key={provider.id} className="mt-5">
          <button
            className="bg-[#20D760] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const providers = await getProviders();
  console.log(providers);
  return { props: { providers } };
};
