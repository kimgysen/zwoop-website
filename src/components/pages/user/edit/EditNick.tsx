import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {updateNickNameApi} from "@api_clients/feature/user/UserApiClient";
import ApiResult from "@api_clients/type/ApiResult";
import User from "@models/db/entity/User";
import {Button, Flex, Input, Text, VStack} from "@chakra-ui/react";


interface EditNickProps {
    userId: string,
    nickName: string,
    setCurrentUser: Dispatch<SetStateAction<User>>,
    closeEdit: () => void
}

const EditNick: FC<EditNickProps> = ({ userId, nickName, setCurrentUser, closeEdit }) => {
    const defaultUpdateResult = { loading: false, success: null, error: null };

    const [updatedNick, setUpdatedNick] = useState<string>(nickName);
    const [updateResult, setUpdateResult] = useState<ApiResult<User>>(defaultUpdateResult);

    const handleChange = (e: any) => {
        setUpdateResult(defaultUpdateResult)
        setUpdatedNick(e.target.value);
    }

    const onSave = async () => {
        setUpdateResult({ ...updateResult, loading: true })
        const res = await updateNickNameApi(userId, updatedNick as string);

        if (res.success) {
            setCurrentUser(res.success);
            closeEdit();
        } else {
            setUpdateResult(res);
        }
    }

    return (
        <VStack align='left'>
            <Flex>
                <Input
                    size='sm'
                    mr='2px'
                    autoFocus
                    onChange={ handleChange }
                    onFocus={ e =>  e.target.select() }
                    variant='outline'
                    placeholder='nickName'
                    defaultValue={ nickName }
                />
                {
                    updateResult.loading &&
                    <Button
                        size='sm'
                        disabled
                        isLoading
                        colorScheme='blue'
                        variant='outline'
                        w='80px'
                    />
                }
                {
                    !updateResult.loading &&
                    <Button
                        size='sm'
                        colorScheme='blue'
                        onClick={onSave}
                        isDisabled={ updatedNick === '' }
                        w='50px'
                    >
                        Save
                    </Button>
                }
            </Flex>
            {
                updateResult.error &&
                <Text
                    fontSize='sm'
                    color='red'
                >
                    { updateResult.error }
                </Text>
            }
        </VStack>
    )
}

export default EditNick;
