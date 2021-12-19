import {ContainerProps} from '@chakra-ui/layout';
import {Box} from '@chakra-ui/react';

interface CenterContainerProps extends ContainerProps {}

const CenterContainer = ({ children }: CenterContainerProps) => {
  return (
      <Box
          margin={ 'auto' }
          width={{ base: "100%" }}
          maxW={"6xl"}
          minH="100vh"
          h="100%"
      >
        {children}
      </Box>
  );
};

export default CenterContainer;
