'use client';

import { useSignIn, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { Label } from '@/components/ui/label';
import { Asterisk, Loader } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import Hourglass from '../../../../public/hourglass';

export default function CustomSignIn() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();
  const user = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      const attempt = await signIn.attemptFirstFactor({
        strategy: 'password',
        password,
      });

      if (attempt.status === 'complete') {
        router.push('/home');
      } else {
        setError('Verificação adicional necessária.');
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Erro ao fazer login.');
    }
  };

  const handleOAuth = async (provider: 'google' | 'apple' | 'github') => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: '/oauth-callback',
        redirectUrlComplete: '/home',
      });
    } catch (err) {
      console.error('Erro no OAuth:', err);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch('api/random-student-image');
        const data = await res.json();
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  if(!user.isLoaded) {
    return (
      <main className="bg-neutral-100 animate-pulse">
        <div className="flex items-center justify-center w-full h-screen">
          <Loader className="w-5 h-5 animate-spin text-blue-600" />
        </div>
      </main>
    )
  }

  if(!user.isSignedIn) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 h-full overflow-hidden relative bg-white">
        <div className='relative h-screen'>
          <div className="absolute top-0 z-0 left-0 w-full overflow-hidden rounded-lg bg-white p-6 opacity-25">
            <FlickeringGrid
              className="relative inset-0 w-full h-full z-0 [mask-image:linear-gradient(white,transparent)]"
              squareSize={3}
              gridGap={4}
              color="#000"
              maxOpacity={0.5}
              flickerChance={0.1}
              height={800}
              width={1800}
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-1 absolute top-0 z-50 left-0 w-full h-full">
            <div className="max-w-[310px] w-full flex flex-col items-center justify-center space-y-8">
              <div className='flex flex-col items-center'>
                <Hourglass className='w-16 h-16' />
                <p className='text-xl text-black font-semibold mt-2'>Inicie seu teste gratuito</p>
                <p className='text-md text-neutral-500'>Não pedimos seu cartão</p>
              </div>
              <form onSubmit={handleSubmit} className='flex flex-col w-full'>
                <div className="px-1 flex flex-col">
                  <Label className='font-medium mb-2 text-black'>E-mail</Label>
                  <Input
                    type="email"
                    placeholder="email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border bg-white text-black border-neutral-200 py-5 px-3 mb-2"
                  />
                </div>
                
                <AnimatePresence initial={false}>
                  {email !== '' && (
                    <motion.div
                      key="passwordField"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                        delayChildren: 0.1,
                        staggerChildren: 0.05,
                      }}
                      style={{ overflow: 'hidden' }}
                      className="flex flex-col"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-1">
                          <Label className="font-medium mb-2 text-black mt-4">Senha</Label>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-1">
                          <Input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border bg-white text-black border-neutral-200 py-5 px-3 mb-2"
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="px-1">
                  {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
                </div>

                <div className="px-1">
                  <Button type="submit" size={'lg'} className="w-full bg-blue-600 text-white p-2 mt-4">
                    Entrar
                  </Button>
                </div>
              </form>
              <div className='flex w-full items-center gap-4 mt-3 px-1'>
                <div className="w-full h-[1px] bg-neutral-200"></div>
                <p className='text-sm text-neutral-500 italic'>ou</p>
                <div className="w-full h-[1px] bg-neutral-200"></div>
              </div>
              <div className="flex items-center w-full justify-between space-x-3 px-1">
                <Button
                  onClick={() => handleOAuth('google')}
                  variant={'secondary'}
                  size={'lg'}
                  className='w-full bg-neutral-100 hover:bg-neutral-200'
                >
                  <svg width="256" height="262" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>
                </Button>
                <Button
                  onClick={() => handleOAuth('apple')}
                  variant={'secondary'}
                  size={'lg'}
                  className='w-full bg-neutral-100 hover:bg-neutral-200'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="209" height="256" viewBox="0 0 814 1000"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>
                </Button>
                <Button
                  onClick={() => handleOAuth('github')}
                  variant={'secondary'}
                  size={'lg'}
                  className='w-full bg-neutral-100 hover:bg-neutral-200'
                >
                  <svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Random student"
            width={400}
            height={400}
            unoptimized
            className="h-full hidden lg:block md:block object-cover grayscale max-w-1/2 w-full"
            style={{ objectPosition: 'center' }}
          />
        ) : (
          <div className="h-full hidden lg:block md:block w-full bg-gray-200 animate-pulse"></div>
        )}
      </div>
    );
  } else {
    router.push('/home');
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader className="w-5 h-5 animate-spin text-blue-600" />
      </div>
    )
  }
}
