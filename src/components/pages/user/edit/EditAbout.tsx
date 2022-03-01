import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {updateAboutApi} from "@api_clients/feature/user/UserApiClient";
import ApiResult from "@api_clients/type/ApiResult";
import User from "@models/db/entity/User";
import {Box, Button, Flex} from "@chakra-ui/react";
import ReactMdeEditor from "@components/widgets/react-mde/ReactMde";
import {Text} from "@chakra-ui/layout/src/text";


interface EditAboutProps {
    userId: string,
    defaultAboutText?: string,
    setCurrentUser: Dispatch<SetStateAction<User>>,
    closeEdit: () => void
}

const EditAbout: FC<EditAboutProps> = ({ userId, defaultAboutText, setCurrentUser, closeEdit }) => {
    const defaultUpdateResult = { loading: false, success: null, error: null };

    const [aboutText, setAboutText] = useState<string>(defaultAboutText as string || '');
    const [updateResult, setUpdateResult] = useState<ApiResult<User>>(defaultUpdateResult);

    const onSave = async () => {
        setUpdateResult({ ...updateResult, loading: true })
        const res = await updateAboutApi(userId, aboutText);

        if (res.success) {
            setCurrentUser(res.success);
            closeEdit();
        } else {
            setUpdateResult(res);

        }
    }


    return (
        <>
            <Box mb='5px'>
                <ReactMdeEditor
                    description={ aboutText }
                    setDescription={ setAboutText }
                />
            </Box>
            <Flex justifyContent='flex-end'>
                {
                    !updateResult.loading &&
                    <Button
                        colorScheme='blue'
                        onClick={onSave}
                        w='80px'
                    >
                        Save
                    </Button>
                }
            </Flex>
            <Flex justifyContent='flex-end'>
                {
                    updateResult.error &&
                    <Text color='red'>{ updateResult.error }</Text>
                }
            </Flex>
        </>
    )
}

export default EditAbout;
