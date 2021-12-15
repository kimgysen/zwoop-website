import React, {useMemo, useState} from "react";
import ApiResult from "../../../../../../api-client/type/ApiResult";
import {
    Box,
    Button,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Spinner, Stack,
    Text
} from "@chakra-ui/react";
import {FaUserAlt} from "react-icons/fa";
import {CheckCircleIcon} from "@chakra-ui/icons";
import {validateNickName, validateRegistration} from "@components/layout/navbar/modal/content/LoginPopupHelper";
import {verifyNickName} from "../../../../../../api-client/authentication/VerifyNickNameService";
import debounce from "lodash.debounce";
import {registerUser} from "../../../../../../api-client/authentication/UserService";

interface RegisterFragmentProps {
    initialState: ApiResult,
    state: ApiResult,
    setState: React.Dispatch<React.SetStateAction<any>>,
    publicAddressTrx: string | undefined
}

const apiResultInitState = { loading: false, result: null, error: null }
const nickApiResultInitState = { ...apiResultInitState, result: { success: false } };

const RegisterFragment: React.FC<RegisterFragmentProps> = ({ initialState, state, setState, publicAddressTrx }) => {

    const [nickApiResult, setNickApiResult] = useState<ApiResult>(nickApiResultInitState);

    const handleOnNickChange = async (nickName: string) => {
        setNickApiResult({ ...nickApiResultInitState, loading: true });

        try {
            validateNickName(nickName);
            const { result, error } = await verifyNickName(nickName);
            setNickApiResult({ ...nickApiResultInitState, result, error });

        } catch (e: any) {
            setNickApiResult({ ...nickApiResultInitState, error: e.message });

        }
    }

    const debouncedHandleOnNickChange = useMemo(
        () => debounce(handleOnNickChange, 300)
        , []);

    const handleRegister = async () => {
        setState({ ...initialState, loading: true, result: { location: null } });
        const nickName = nickApiResult.result?.nickName;

        try {
            validateRegistration(publicAddressTrx, nickName);
            const { result, error } = await registerUser(publicAddressTrx, nickName);
            setState({ ...initialState, result, error });

        } catch (e: any) {
            setState({ ...initialState, error: e.message });
        }
    }

    return (
        <Box align="right">
            <Box>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        color="gray.300">
                        <Icon as={FaUserAlt} color="gray.300" />
                    </InputLeftElement>
                    <Input
                        autoFocus
                        onFocus={ e =>  e.target.select() }
                        onChange={event => debouncedHandleOnNickChange(event.target.value)}
                        pl={ '40px' }
                        pr={ '40px' }
                        placeholder="nickName"
                    />
                    <InputRightElement>
                        {
                            nickApiResult.loading && <Spinner size="sm" />
                        }
                        {
                            nickApiResult.result!.success &&
                            <CheckCircleIcon
                                h="1.75rem"
                                size="sm"
                                color="green.300"
                            />
                        }
                    </InputRightElement>
                </InputGroup>
                {
                    nickApiResult.error &&
                    <Text
                        align="left"
                        fontSize="sm"
                        color="red"
                    >
                        { nickApiResult.error }
                    </Text>
                }
            </Box>

            <Button
                onClick={ handleRegister }
                disabled={ !nickApiResult.result!.success }
                display={{ base: 'none', md: 'inline-flex' }}
                mt={ '10px' }
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                _hover={{
                    bg: 'pink.300',
                }}>
                Register
            </Button>
            {
                state.error &&
                <Text
                    align="right"
                    fontSize="sm"
                    color="red"
                >
                    { state.error }
                </Text>
            }

        </Box>
    )
};

export default RegisterFragment;