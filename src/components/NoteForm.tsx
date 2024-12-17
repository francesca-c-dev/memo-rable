// src/components/NoteForm.tsx
import { useState } from 'react';
import { TextField, Button, View, Flex } from '@aws-amplify/ui-react';
import { useNotes } from '@/hooks/useNotes';

// Remove the props interface since we're using the hook directly
export const NoteForm = () => {  // Remove the props parameter
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { createNote, isCreating } = useNotes();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    
    createNote({
      name: form.get('name') as string,
      description: form.get('description') as string,
      imageFile: imageFile || undefined,
    });
    
    event.currentTarget.reset();
    setImageFile(null);
  };

  return (
    <View as="form" margin="3rem 0" onSubmit={handleSubmit}>
      <Flex direction="column" justifyContent="center" gap="2rem" padding="2rem">
        <TextField
          name="name"
          placeholder="Note Name"
          label="Note Name"
          labelHidden
          variation="quiet"
          required
        />
        <TextField
          name="description"
          placeholder="Note Description"
          label="Note Description"
          labelHidden
          variation="quiet"
          required
        />
        <View
          as="input"
          type="file"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          accept="image/png, image/jpeg"
        />
        <Button 
          type="submit" 
          variation="primary"
          isLoading={isCreating}
          loadingText="Creating note..."
        >
          Create Note
        </Button>
      </Flex>
    </View>
  );
};