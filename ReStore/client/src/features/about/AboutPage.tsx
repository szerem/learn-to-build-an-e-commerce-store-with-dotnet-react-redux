import {
  Alert,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import React, { useState } from 'react';
import agent from '../../app/api/agent';

const AboutPage = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getValidationErrors = () => {
    agent.TestErrors.getValidationError()
      .then(() => console.log('should not see this'))
      .catch((err) => setValidationErrors(err));
  };

  return (
    <Container>
      <Typography variant="h2">AboutPage</Typography>

      <Box>
        <Typography variant="h6">Test Errors</Typography>
        {/* prettier-ignore */}
        <ButtonGroup fullWidth>
          <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch(console.log)}>400 Error (bad-request)       </Button>
          <Button variant='contained' onClick={() => agent.TestErrors.get401Error().catch(console.log)}>401 Error (unauthorized)      </Button>
          <Button variant='contained' onClick={() => agent.TestErrors.get404Error().catch(console.log)}>404 Error (not-found)         </Button>
          <Button variant='contained' onClick={() => agent.TestErrors.get500Error().catch(console.log)}>500 Error (server-error)      </Button>
          <Button variant='contained' onClick={getValidationErrors}>Test Validation Error                                             </Button>
        </ButtonGroup>
        {validationErrors.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Validation Error</AlertTitle>
            <List>
              {validationErrors.map((error) => (
                <ListItem key={error}>
                  <ListItemText>{error}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default AboutPage;
