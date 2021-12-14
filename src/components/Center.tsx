import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

const Center: FC = () => {
  const { data: session } = useSession();

  return (
    <div className="grow">
      <header className="absolute top-4 right-8 text-white">
        <div className="flex items-center p-1 pr-2 space-x-3 bg-black rounded-full opacity-90 duration-200 hover:opacity-80">
          <img className="w-10 h-10 rounded-full" src={session?.user?.image} alt="user profile" />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b from-red-500 to-black h-80 text-white p-8`}>
        <h1>Hello</h1>
      </section>
    </div>
  );
};

export default Center;
