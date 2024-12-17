'use client'
import { Authenticator } from '@aws-amplify/ui-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { NoteForm } from '@/components/NoteForm';
import { NotesList } from '@/components/NoteList';


Amplify.configure(outputs);
const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator>
        {({ signOut }) => (
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">My Notes App</h1>
            <NoteForm />
            <div className="my-8">
              <h2 className="text-2xl font-bold mb-4">Current Notes</h2>
              <NotesList />
            </div>
            <button
              onClick={signOut}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
        )}
      </Authenticator>
    </QueryClientProvider>
  );
}