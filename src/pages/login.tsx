import { GetServerSideProps } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { FC } from 'react';

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

const Login: FC<Props> = ({ providers }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black">
      <img src="/images/spotify-logo.png" alt="" className="h-52 w-52" />

      {Object.values(providers).map(provider => (
        <div key={provider.id} className="mt-5">
          <button
            className="rounded-full bg-[#20D760] p-5 text-white"
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
