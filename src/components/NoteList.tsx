import { Grid, Flex, Text, Button, Image, View, Heading } from '@aws-amplify/ui-react';
import { useNotes } from '@/hooks/useNotes';

export const NotesList = () => {
  const { notes, isLoading, deleteNote } = useNotes();

  if (isLoading) {
    return <div>Loading notes...</div>;
  }

  if (!notes.length) {
    return <div>No notes yet. Create your first note!</div>;
  }

  return (
    <Grid
      templateColumns={{ base: '1fr', medium: '1fr 1fr', large: '1fr 1fr 1fr' }}
      gap="2rem"
    >
      {notes.map((note:any) => (
        <Flex
          key={note.id}
          direction="column"
          gap="1rem"
          padding="1rem"
          backgroundColor="white"
          borderRadius="medium"
          boxShadow="small"
        >
          <Heading level={3}>{note.name}</Heading>
          <Text>{note.description}</Text>
          {note.image && (
            <Image
              src={note.image}
              alt={`Image for ${note.name}`}
              objectFit="cover"
              width="100%"
              height="200px"
            />
          )}
          <Button
            variation="destructive"
            onClick={() => deleteNote(note.id)}
          >
            Delete Note
          </Button>
        </Flex>
      ))}
    </Grid>
  );
};
