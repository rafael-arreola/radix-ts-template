import { Box, Button, TextField } from '@radix-ui/themes';

export default function WelcomePage() {
  return (
    <Box className="py-4">
      <TextField.Root size="3" placeholder="Reply…">
        <TextField.Slot side="right" px="1">
          <Button size="2">Send</Button>
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
}
