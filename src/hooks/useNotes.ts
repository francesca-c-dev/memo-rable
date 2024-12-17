import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';
import { getUrl, uploadData } from 'aws-amplify/storage';
import { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

export const useNotes = () => {
  const queryClient = useQueryClient();

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const { data } = await client.models.Note.list();
      return Promise.all(
        data.map(async (note) => {
          if (note.image) {
            const linkToStorageFile = await getUrl({
              path: ({ identityId }) => `media/${identityId}/${note.image}`,
            });
            return { ...note, image: linkToStorageFile.url };
          }
          return note;
        })
      );
    },
  });

  const createNoteMutation = useMutation({
    mutationFn: async ({ 
      name, 
      description, 
      imageFile 
    }: { 
      name: string; 
      description: string; 
      imageFile?: File 
    }) => {
      const noteData = {
        name,
        description,
        image: imageFile?.name,
      };

      const { data: newNote } = await client.models.Note.create(noteData);

      if (imageFile && newNote?.image) {
        await uploadData({
          path: ({ identityId }) => `media/${identityId}/${newNote?.image}`,
          data: imageFile,
        }).result;
      }

      return newNote;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (noteId: string) => {
      const { data } = await client.models.Note.delete({
        id: noteId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return {
    notes,
    isLoading,
    createNote: createNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    isCreating: createNoteMutation.isPending,
    isDeleting: deleteNoteMutation.isPending,
    error: createNoteMutation.error || deleteNoteMutation.error,
  };
};