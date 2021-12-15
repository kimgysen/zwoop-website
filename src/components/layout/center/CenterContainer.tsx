import {ContainerProps} from '@chakra-ui/layout';
import {Box} from '@chakra-ui/react';

interface CenterContainerProps extends ContainerProps {}

const CenterContainer = ({ children }: CenterContainerProps) => {
  return (
      <Box
          margin={ 'auto' }
          pt={ '50px' }
          width={{ base: "100%", md: "95%" }}
          maxW={"1000"}
          minH="100vh"
          h="100%"
      >
        {children}
      </Box>
  );
};

export default CenterContainer;
